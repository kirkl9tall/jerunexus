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
  if (!sub) return NextResponse.json({ error: apiMsg("noSubscription") }, { status: 404 });

  if (sub.planId === plan.id) {
    return NextResponse.json({ error: apiMsg("alreadyOnPlan") }, { status: 400 });
  }

  await prisma.subscription.update({
    where: { userId },
    data: { requestedPlanId: plan.id, status: "pending_upgrade" },
  });

  return NextResponse.json({ ok: true });
}
