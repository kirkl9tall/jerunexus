const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

// Wrapping with Sentry instruments the app and (when SENTRY_ORG/PROJECT/AUTH_TOKEN
// are set) uploads source maps. With those unset, source-map upload is skipped
// and runtime error capture still works.
module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
});
