import { NextResponse } from "next/server";
import type { Subscription } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { getAdminUser } from "@/lib/auth";
import { ensureMonitoringItems } from "@/lib/health";

const ok = () => NextResponse.json({ ok: true });
const err = (error: string, status: number) => NextResponse.json({ error }, { status });

/** Switch the client to a plan immediately (creating the subscription if needed). */
async function setPlan(userId: string, planKey: unknown) {
  const plan = await prisma.plan.findUnique({ where: { key: typeof planKey === "string" ? planKey : "" } });
  if (!plan) return err("Plan not found", 404);

  await prisma.subscription.upsert({
    where: { userId },
    update: { planId: plan.id, status: "active", requestedPlanId: null },
    create: {
      userId,
      planId: plan.id,
      status: "active",
      renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  if (plan.priceChf > 0) await ensureMonitoringItems(userId);
  return ok();
}

/** Apply the client's requested plan and clear the request. */
async function approveUpgrade(userId: string, sub: Subscription | null) {
  if (!sub?.requestedPlanId) return err("No pending upgrade", 400);

  const requested = await prisma.plan.findUnique({ where: { id: sub.requestedPlanId } });
  await prisma.subscription.update({
    where: { userId },
    data: { planId: sub.requestedPlanId, status: "active", requestedPlanId: null },
  });

  if (requested && requested.priceChf > 0) await ensureMonitoringItems(userId);
  return ok();
}

/** Clear the pending request, keep the current plan. */
async function rejectUpgrade(userId: string, sub: Subscription | null) {
  if (!sub) return err("No subscription", 400);
  await prisma.subscription.update({
    where: { userId },
    data: { status: "active", requestedPlanId: null },
  });
  return ok();
}

/**
 * Admin actions on a client subscription:
 *  { action: "setPlan", planKey }   — switch the client to a plan immediately
 *  { action: "approveUpgrade" }     — apply the requested plan and clear the request
 *  { action: "rejectUpgrade" }      — clear the pending request, keep current plan
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUser();
  if (!admin) return err("Forbidden", 403);

  const body = await req.json().catch(() => null);
  const sub = await prisma.subscription.findUnique({ where: { userId: params.id } });

  switch (body?.action) {
    case "setPlan":
      return setPlan(params.id, body?.planKey);
    case "approveUpgrade":
      return approveUpgrade(params.id, sub);
    case "rejectUpgrade":
      return rejectUpgrade(params.id, sub);
    default:
      return err("Unknown action", 400);
  }
}
