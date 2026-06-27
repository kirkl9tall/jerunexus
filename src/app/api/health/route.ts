import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// A health check must reflect live state on every request — never cache or
// statically render it.
export const dynamic = "force-dynamic";

/**
 * Liveness + readiness probe for uptime monitors (UptimeRobot, Better Stack, …)
 * and the load balancer. Verifies the app is up AND the database is reachable.
 *
 *   200 { status: "ok",    db: "ok"    }  → healthy
 *   503 { status: "error", db: "error" }  → app up but DB unreachable
 *
 * No auth: it exposes no sensitive data, just up/down + DB reachability.
 */
export async function GET() {
  const startedAt = Date.now();
  try {
    // Cheapest possible round-trip that proves the DB connection works.
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      status: "ok",
      db: "ok",
      uptimeSeconds: Math.round(process.uptime()),
      dbLatencyMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { status: "error", db: "error", timestamp: new Date().toISOString() },
      { status: 503 },
    );
  }
}
