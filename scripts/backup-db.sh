#!/usr/bin/env bash
###############################################################################
# Nightly PostgreSQL backup for Jerumed Nexus.
#
# Dumps the database from the running compose `db` container, gzips it into
# ~/backups, and deletes dumps older than KEEP_DAYS. Meant to be run by cron.
#
# Install on the VPS (as the deploy user):
#   mkdir -p ~/backups
#   crontab -e
#   # then add (runs every night at 03:00):
#   0 3 * * * /home/deploy/jerunexus/scripts/backup-db.sh >> /home/deploy/backups/backup.log 2>&1
#
# Restore a dump:
#   gunzip -c ~/backups/jerunexus-YYYY-MM-DD_HH-MM.sql.gz \
#     | docker compose exec -T db psql -U "$POSTGRES_USER" "$POSTGRES_DB"
###############################################################################
set -euo pipefail

KEEP_DAYS=14
BACKUP_DIR="${HOME}/backups"

# Run from the repo root, where docker-compose.yml and .env live.
cd "$(dirname "$0")/.."

# Load POSTGRES_USER / POSTGRES_DB from the same .env the stack uses.
set -a
# shellcheck disable=SC1091
source .env
set +a

mkdir -p "$BACKUP_DIR"
STAMP="$(date +%F_%H-%M)"
FILE="${BACKUP_DIR}/jerunexus-${STAMP}.sql.gz"

echo "[$(date)] dumping database -> ${FILE}"
docker compose exec -T db pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$FILE"

# Keep only the last KEEP_DAYS days of backups.
find "$BACKUP_DIR" -name 'jerunexus-*.sql.gz' -mtime "+${KEEP_DAYS}" -delete

echo "[$(date)] done. recent backups:"
ls -lh "${BACKUP_DIR}"/jerunexus-*.sql.gz 2>/dev/null | tail -5
