# syntax=docker/dockerfile:1

###############################################################################
# Jerumed Nexus — production image (multi-stage)
#
# Stages:
#   deps    — install all dependencies (cached layer)
#   builder — generate the Prisma client + build Next.js (standalone output)
#   runner  — tiny runtime image: just the standalone server + static assets
#
# The Next.js app is configured with `output: 'standalone'`, so the runner only
# needs the traced node_modules that Next bundles into `.next/standalone`.
# Database migrations are NOT run here — the compose `migrate` one-shot service
# (built from the `builder` stage, which still has the full Prisma CLI) applies
# them before the app starts. This keeps the runtime image minimal.
###############################################################################

# ---- deps -------------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# libc compat for some npm postinstall scripts on Alpine
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ----------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate the Prisma client into src/generated/prisma (gitignored, so it must
# be produced at build time) BEFORE compiling Next.js.
RUN npx prisma generate

# Disable telemetry; build the standalone server.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner -----------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone server + its traced node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static assets and the public folder are not traced into standalone.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

# `server.js` is emitted by Next at the root of the standalone output.
CMD ["node", "server.js"]
