#!/usr/bin/env bash
###############################################################################
# Nightly PostgreSQL backup for Jerumed Nexus — local + encrypted off-site.
#
# 1. Dumps the database from the running compose `db` container and gzips it
#    into ~/backups (local copy, KEEP_DAYS retention).
# 2. OPTIONAL off-site: if RCLONE_REMOTE and AGE_RECIPIENT are both set, the
#    dump is encrypted with age (public-key) and uploaded with rclone to
#    off-site object storage. Only ciphertext ever leaves the server — the age
#    PRIVATE key stays offline, so even a full server compromise can't read the
#    off-site backups. Off-site copies are pruned after KEEP_OFFSITE_DAYS.
#
# Install on the VPS (cron, nightly 03:00):
#   crontab -e
#   # local-only:
#   0 3 * * * /home/ubuntu/nexus-jerumed/jerunexus/scripts/backup-db.sh >> /home/ubuntu/backups/backup.log 2>&1
#   # with off-site (see DEPLOY.md "Off-site backups" for one-time setup):
#   0 3 * * * RCLONE_REMOTE=b2:jerumed-backups AGE_RECIPIENT=age1xxxx /home/ubuntu/nexus-jerumed/jerunexus/scripts/backup-db.sh >> /home/ubuntu/backups/backup.log 2>&1
#
# Restore a LOCAL dump:
#   gunzip -c ~/backups/jerunexus-YYYY-MM-DD_HH-MM.sql.gz \
#     | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'
#
# Restore an OFF-SITE dump (needs your offline age private key):
#   rclone copy b2:jerumed-backups/jerunexus-YYYY-MM-DD_HH-MM.sql.gz.age .
#   age -d -i ~/jerumed-backup.key jerunexus-YYYY-MM-DD_HH-MM.sql.gz.age \
#     | gunzip | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'
###############################################################################
set -euo pipefail

KEEP_DAYS=14                                    # local retention (days)
KEEP_OFFSITE_DAYS="${KEEP_OFFSITE_DAYS:-30}"    # off-site retention (days)
BACKUP_DIR="${HOME}/backups"

# Run from the repo root so `docker compose` finds the stack.
cd "$(dirname "$0")/.."

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%F_%H-%M)"
FILE="${BACKUP_DIR}/jerunexus-${STAMP}.sql.gz"

echo "[$(date)] dumping database -> ${FILE}"
# POSTGRES_USER / POSTGRES_DB are read from the db container's OWN environment
# (set by compose), so we never parse the host .env — values like EMAIL_FROM
# with spaces/<> would break a bash `source`.
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > "$FILE"

# Keep only the last KEEP_DAYS days of LOCAL backups.
find "$BACKUP_DIR" -name 'jerunexus-*.sql.gz' -mtime "+${KEEP_DAYS}" -delete

# ---- optional encrypted off-site copy ----------------------------------
# Enabled only when BOTH vars are set, so sensitive data is never uploaded
# unencrypted by accident:
#   RCLONE_REMOTE   rclone remote + bucket, e.g. "b2:jerumed-backups"
#   AGE_RECIPIENT   an age public key (age1...); the dump is encrypted to it
if [[ -n "${RCLONE_REMOTE:-}" && -n "${AGE_RECIPIENT:-}" ]]; then
  ENC="${FILE}.age"
  echo "[$(date)] encrypting -> $(basename "$ENC")"
  age -r "$AGE_RECIPIENT" -o "$ENC" "$FILE"

  echo "[$(date)] uploading -> ${RCLONE_REMOTE}/"
  rclone copy "$ENC" "${RCLONE_REMOTE}/" --no-traverse

  rm -f "$ENC"   # local plaintext gzip stays; off-site holds only the .age

  # Prune off-site copies older than KEEP_OFFSITE_DAYS ("|| true": tolerate none).
  rclone delete "${RCLONE_REMOTE}/" --min-age "${KEEP_OFFSITE_DAYS}d" \
    --include 'jerunexus-*.sql.gz.age' || true

  echo "[$(date)] off-site copies:"
  rclone lsl "${RCLONE_REMOTE}/" | tail -5
else
  echo "[$(date)] off-site upload skipped (set RCLONE_REMOTE + AGE_RECIPIENT to enable)"
fi

echo "[$(date)] done. recent local backups:"
ls -lh "${BACKUP_DIR}"/jerunexus-*.sql.gz 2>/dev/null | tail -5
