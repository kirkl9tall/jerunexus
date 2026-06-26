// One-time verification endpoint: hit /api/sentry-test once after configuring
// the DSN to confirm errors reach your Sentry dashboard, then delete this file.
export const dynamic = "force-dynamic";

export function GET() {
  throw new Error("Sentry test error — if you see this in Sentry, it works ✅");
}
