import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminUser } from "@/lib/auth";
import { ensureMonitoringItems } from "@/lib/health";

/**
 * Admin actions on a client subscription:
 *  { action: "setPlan", planKey }   — switch the client to a plan immediately
 *  { action: "approveUpgrade" }     — apply the requested plan and clear the request
 *  { action: "rejectUpgrade" }      — clear the pending request, keep current plan
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const action = body?.action;

  const sub = await prisma.subscription.findUnique({ where: { userId: params.id } });

  if (action === "setPlan") {
    const plan = await prisma.plan.findUnique({ where: { key: body?.planKey ?? "" } });
    if (!plan) return NextResponse.json({ error: "Plan not found" }, { status: 404 });

    if (sub) {
      await prisma.subscription.update({
        where: { userId: params.id },
        data: { planId: plan.id, status: "active", requestedPlanId: null },
      });
    } else {
      await prisma.subscription.create({
        data: {
          userId: params.id,
          planId: plan.id,
          status: "active",
          renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }
    if (plan.priceChf > 0) await ensureMonitoringItems(params.id);
    return NextResponse.json({ ok: true });
  }

  if (action === "approveUpgrade") {
    if (!sub?.requestedPlanId) return NextResponse.json({ error: "No pending upgrade" }, { status: 400 });
    const requested = await prisma.plan.findUnique({ where: { id: sub.requestedPlanId } });
    await prisma.subscription.update({
      where: { userId: params.id },
      data: { planId: sub.requestedPlanId, status: "active", requestedPlanId: null },
    });
    if (requested && requested.priceChf > 0) await ensureMonitoringItems(params.id);
    return NextResponse.json({ ok: true });
  }

  if (action === "rejectUpgrade") {
    if (!sub) return NextResponse.json({ error: "No subscription" }, { status: 400 });
    await prisma.subscription.update({
      where: { userId: params.id },
      data: { status: "active", requestedPlanId: null },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
