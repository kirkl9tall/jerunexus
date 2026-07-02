import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { apiMsg } from "@/lib/portal-i18n";

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const body = await req.json().catch(() => null);
  const planKey = body?.planKey ?? "";

  const plan = await prisma.plan.findUnique({ where: { key: planKey } });
  if (!plan) return NextResponse.json({ error: apiMsg("planNotFound") }, { status: 404 });

  const sub = await prisma.subscription.findUnique({ where: { userId } });

  if (sub?.planId === plan.id) {
    return NextResponse.json({ error: apiMsg("alreadyOnPlan") }, { status: 400 });
  }

  // Record the upgrade request. If the client has no subscription yet (never
  // assigned a plan), start them on the free tier with the requested plan
  // pending — mirrors the admin setPlan upsert so the request always goes through.
  const freePlan = sub ? null : await prisma.plan.findUnique({ where: { key: "free" } });
  await prisma.subscription.upsert({
    where: { userId },
    update: { requestedPlanId: plan.id, status: "pending_upgrade" },
    create: {
      userId,
      planId: freePlan?.id ?? plan.id,
      requestedPlanId: plan.id,
      status: "pending_upgrade",
    },
  });

  return NextResponse.json({ ok: true });
}
