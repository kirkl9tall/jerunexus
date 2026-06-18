# syntax=docker/dockerfile:1

###############################################################################
# Custom Caddy image — stock Caddy plus the rate-limiting plugin.
#
# Caddy core has no rate limiter, so we compile in `caddy-ratelimit` to keep the
# brute-force / spam protection on the auth endpoints. Everything else (auto
# HTTPS via Let's Encrypt, reverse proxy, compression) ships with Caddy.
###############################################################################

FROM caddy:2.8-builder AS builder
RUN xcaddy build \
    --with github.com/mholt/caddy-ratelimit

FROM caddy:2.8-alpine
COPY --from=builder /usr/bin/caddy /usr/bin/caddy
