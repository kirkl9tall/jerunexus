// Sentry init for the Node.js server runtime (API routes, server components).
// No-ops when NEXT_PUBLIC_SENTRY_DSN is unset (e.g. local dev).
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: 0.1,
  // Don't send personal data by default (medical context).
  sendDefaultPii: false,
});
