# Jerumed Nexus — Production Deployment (Docker + Caddy)

This stack runs the portal behind **Caddy** as the single public entrypoint.
Caddy **automatically provisions and renews TLS certificates** from Let's
Encrypt, terminates HTTPS, adds security headers, rate-limits, and
reverse-proxies to the Next.js app. The app and PostgreSQL are **never exposed
directly** — only Caddy publishes ports 80/443.

```
Internet ──▶ Caddy (80/443)  ──▶  app:3000 (Next.js)  ──▶  db:5432 (Postgres)
             auto-HTTPS · headers ·       standalone               private network
             rate limits                    server
```

## Services (`docker-compose.yml`)

| Service   | Role                                                        | Exposed |
|-----------|-------------------------------------------------------------|---------|
| `caddy`   | Public entrypoint: auto-HTTPS, security headers, rate limit | 80, 443 |
| `app`     | Next.js standalone server                                   | internal |
| `db`      | PostgreSQL 16                                               | internal |
| `migrate` | One-shot: runs `prisma migrate deploy`, then exits          | —       |

> **Why a custom Caddy image?** Caddy core has no rate limiter, so
> `caddy/Dockerfile` compiles in the `caddy-ratelimit` plugin to keep the
> brute-force / spam protection on `/api/auth/*`. Everything else (auto-HTTPS,
> reverse proxy, compression) is built into Caddy.

---

## First deployment

### 1. Prerequisites on the cloud server
- Docker Engine + Docker Compose plugin
- A **domain** with a DNS A/AAAA record pointing at the server IP
  (Let's Encrypt issues certs for domains, not bare IPs)
- Ports **80** and **443** open in the firewall/security group
  (port 80 is required for the ACME HTTP challenge)

### 2. Get the code & configure
```bash
git clone <your-repo> jerunexus && cd jerunexus
cp .env.example .env
```
Edit `.env` and set real values:
- `POSTGRES_PASSWORD` — strong DB password (and mirror it in `DATABASE_URL`)
- `JWT_SECRET` — `openssl rand -base64 48`
- `RESEND_API_KEY` — **rotate the old key first** (it was shared in chat)
- `APP_URL` — `https://your-domain`
- `SITE_ADDRESS` — `your-domain` (the hostname Caddy serves)
- `ACME_EMAIL` — your contact email for Let's Encrypt

### 3. Launch
```bash
docker compose up -d --build
```
Boot order is enforced automatically: `db` (healthy) → `migrate` (completes) →
`app` → `caddy`. On first start Caddy contacts Let's Encrypt and obtains a
certificate for `SITE_ADDRESS` within seconds — **no manual cert step.**

### 4. Verify
```bash
docker compose ps
docker compose logs -f caddy        # watch the certificate get issued
curl -I https://your-domain          # expect 200 + security headers
```

---

## TLS / certificates — fully automatic

- **Issuance:** On startup Caddy requests a cert for `SITE_ADDRESS` from Let's
  Encrypt (HTTP-01 challenge over port 80).
- **Renewal:** Caddy renews automatically (~30 days before expiry). Nothing to
  schedule, no cron, no Certbot.
- **Persistence:** Certs and the ACME account live in the `caddy_data` volume,
  so restarts/redeploys reuse them and never hit rate limits.
- **HTTP→HTTPS:** Caddy redirects plain HTTP to HTTPS by default.
- **HTTP/3:** Enabled (UDP 443 published).

### Local testing without a domain
Set `SITE_ADDRESS=localhost` in `.env`. Caddy then serves HTTPS using
its **own internal CA** (self-signed) — handy for staging on a laptop. Browsers
will warn about the untrusted cert; that's expected for local use.

---

## Security features baked in

- **Automatic TLS** (Let's Encrypt) with modern defaults, auto-renewed.
- **HSTS** (1 year) — browsers refuse plain HTTP after first visit.
- **Security headers**: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, and a Next.js-compatible
  `Content-Security-Policy`; server software hidden (`-Server`).
- **Rate limiting**: `/api/auth/*` capped at 5 r/s per IP (anti brute-force /
  spam sign-ups); everything else 30 r/s per IP.
- App + DB are **not reachable from the internet** — only via Caddy.
- App container runs as a **non-root** user.

---

## Common operations

```bash
# Tail logs
docker compose logs -f app caddy

# Apply new migrations after a code update
git pull
docker compose up -d --build          # `migrate` re-runs automatically

# Reload Caddy after editing the Caddyfile (zero downtime)
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile

# Validate the Caddyfile
docker compose exec caddy caddy validate --config /etc/caddy/Caddyfile

# Stop / start
docker compose down                   # keeps pgdata + caddy_data volumes
docker compose down -v                # ⚠️ also deletes the database AND certs
```

---

## Backups

`scripts/backup-db.sh` dumps the database nightly. It always writes a **local**
gzip to `~/backups` (14-day retention) and — when configured — also pushes an
**encrypted off-site copy** so a lost/wiped server doesn't take the backups with
it.

```
pg_dump ─▶ gzip ─▶ ~/backups (local, 14d)
                 └▶ age-encrypt ─▶ rclone ─▶ off-site bucket (30d)   [optional]
```

### Local-only (minimum)
```bash
crontab -e
# nightly at 03:00:
0 3 * * * /home/ubuntu/nexus-jerumed/jerunexus/scripts/backup-db.sh >> /home/ubuntu/backups/backup.log 2>&1
```

### Off-site, encrypted (recommended for patient data)

The dump is encrypted with **age** *before* upload, so the storage provider only
ever holds ciphertext. The **private key stays offline** (not on the VPS) — even
a fully compromised server cannot decrypt the off-site backups.

**1. Install the two tools on the VPS**
```bash
sudo apt-get update && sudo apt-get install -y age rclone
```

**2. Generate an age keypair — on your LAPTOP, not the server**
```bash
age-keygen -o jerumed-backup.key
# prints: Public key: age1xxxxxxxx...
```
- Keep `jerumed-backup.key` (the **private** key) somewhere safe and OFFLINE
  (password manager / encrypted USB). **If you lose it, the off-site backups are
  unrecoverable.** Do **not** put it on the VPS.
- Copy only the **public** key (`age1...`) — that goes on the server.

**3. Create an off-site bucket + S3 credentials**
Any S3-compatible object storage works. For Swiss/EU data residency prefer a
Swiss (Exoscale, Infomaniak) or EU (Hetzner) provider; Backblaze B2 / Cloudflare
R2 are cheap and have free tiers (data is encrypted regardless, so the provider
sees only ciphertext). Create a **private** bucket, e.g. `jerumed-backups`, and
generate an application key (key id + secret).

**4. Configure rclone on the VPS**
```bash
rclone config        # → n (new remote), name it e.g. "b2", pick your provider,
                     #   paste the key id + secret, leave the rest default
rclone lsd b2:       # sanity check — should list your buckets
```

**5. Test the full path once (run it by hand)**
```bash
RCLONE_REMOTE=b2:jerumed-backups AGE_RECIPIENT=age1xxxxxxxx \
  /home/ubuntu/nexus-jerumed/jerunexus/scripts/backup-db.sh
# expect: "encrypting -> …", "uploading -> b2:jerumed-backups/", "off-site copies:"
```

**6. Schedule it (cron)**
```bash
crontab -e
0 3 * * * RCLONE_REMOTE=b2:jerumed-backups AGE_RECIPIENT=age1xxxxxxxx /home/ubuntu/nexus-jerumed/jerunexus/scripts/backup-db.sh >> /home/ubuntu/backups/backup.log 2>&1
```

### Restore drill (do this once so you know it works)
```bash
# Off-site copy → needs your offline private key:
rclone copy b2:jerumed-backups/jerunexus-YYYY-MM-DD_HH-MM.sql.gz.age .
age -d -i jerumed-backup.key jerunexus-YYYY-MM-DD_HH-MM.sql.gz.age \
  | gunzip | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'
```
> A backup you've never restored is a hope, not a backup. Run the drill once
> against a throwaway database to confirm the dump + key actually work.

---

## Scaling later (Docker → Kubernetes)

This single-host Docker setup comfortably serves a medical-practice portal.
Migrate to Kubernetes only when you need multi-node autoscaling, self-healing,
or multi-region — the images built here drop straight into k8s Deployments
(app + caddy) with a managed Postgres and an ingress/cert-manager (or keep Caddy
as the ingress).
