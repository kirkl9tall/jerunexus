import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";

/**
 * Email confirmation link target. Validates the token, promotes the pending
 * sign-up into a real User (with its Starter subscription + seeded health
 * items), logs the person in, and redirects into the portal.
 *
 * On a bad/expired/used token it redirects to login with an error flag.
 */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const origin = process.env.APP_URL || new URL(req.url).origin;

  const fail = () => NextResponse.redirect(`${origin}/portal/login?verify=invalid`);

  if (!token) return fail();

  const pending = await prisma.pendingRegistration.findUnique({ where: { token } });
  if (!pending || pending.expiresAt < new Date()) {
    if (pending) await prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => {});
    return fail();
  }

  // Guard against a race where the email got confirmed/registered already.
  const already = await prisma.user.findUnique({ where: { email: pending.email } });
  if (already) {
    await prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => {});
    return NextResponse.redirect(`${origin}/portal/login?verify=already`);
  }

  // New accounts start on the free tier: portal access + one free service.
  // Paid IT monitoring is unlocked when they subscribe to a plan.
  const free = await prisma.plan.findUnique({ where: { key: "free" } });

  const user = await prisma.user.create({
    data: {
      email: pending.email,
      passwordHash: pending.passwordHash,
      name: pending.name,
      practiceName: pending.practiceName,
      ...(free && {
        subscription: {
          create: { planId: free.id, status: "active" },
        },
      }),
      healthItems: {
        create: [
          { component: "Portal-Dashboard", status: "ok", detail: "Kostenloser Service — aktiv." },
        ],
      },
    },
  });

  await prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => {});
  await createSession(user.id);

  return NextResponse.redirect(`${origin}/portal`);
}
