#!/usr/bin/env bash
###############################################################################
# Nightly PostgreSQL backup for Jerumed Nexus.
#
# Dumps the database from the running compose `db` container, gzips it into
# ~/backups, and deletes dumps older than KEEP_DAYS. Meant to be run by cron.
#
# Install on the VPS:
#   crontab -e
#   # then add (runs every night at 03:00):
#   0 3 * * * /home/ubuntu/nexus-jerumed/jerunexus/scripts/backup-db.sh >> /home/ubuntu/backups/backup.log 2>&1
#
# Restore a dump:
#   gunzip -c ~/backups/jerunexus-YYYY-MM-DD_HH-MM.sql.gz \
#     | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'
###############################################################################
set -euo pipefail

KEEP_DAYS=14
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

# Keep only the last KEEP_DAYS days of backups.
find "$BACKUP_DIR" -name 'jerunexus-*.sql.gz' -mtime "+${KEEP_DAYS}" -delete

echo "[$(date)] done. recent backups:"
ls -lh "${BACKUP_DIR}"/jerunexus-*.sql.gz 2>/dev/null | tail -5
