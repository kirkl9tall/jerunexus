# syntax=docker/dockerfile:1

###############################################################################
# Custom Caddy image — stock Caddy plus the rate-limiting plugin, hardened to
# run as a non-root user.
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

# Run as an unprivileged user. `cap_net_bind_service` lets the binary still bind
# the privileged ports 80/443 without root. Caddy writes certs to /data and
# state to /config, so those must be owned by the runtime user.
RUN apk add --no-cache libcap \
 && setcap cap_net_bind_service=+ep /usr/bin/caddy \
 && addgroup -g 10001 caddy 2>/dev/null || true \
 && adduser -D -H -u 10001 -G caddy caddynr 2>/dev/null || adduser -D -H -u 10001 caddynr \
 && mkdir -p /data /config \
 && chown -R 10001:10001 /data /config

USER 10001:10001
