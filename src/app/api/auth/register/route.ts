import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { apiMsg, getPortalLang } from "@/lib/portal-i18n";
import { sendVerificationEmail, emailConfigured } from "@/lib/email";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";
  const name = (body?.name ?? "").trim();
  const practiceName = (body?.practiceName ?? "").trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: apiMsg("invalidEmail") }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: apiMsg("pwMin") }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: apiMsg("nameRequired") }, { status: 400 });
  }

  // A confirmed account already owns this email.
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: apiMsg("emailExists") }, { status: 409 });
  }

  // Opportunistic cleanup: drop expired pending sign-ups so the table stays small.
  await prisma.pendingRegistration.deleteMany({ where: { expiresAt: { lt: new Date() } } });

  const passwordHash = await bcrypt.hash(password, 12);
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);

  // Replace any earlier pending sign-up for this email (re-register / resend).
  await prisma.pendingRegistration.upsert({
    where: { email },
    create: { email, passwordHash, name, practiceName, token, expiresAt },
    update: { passwordHash, name, practiceName, token, expiresAt },
  });

  const origin = process.env.APP_URL || new URL(req.url).origin;
  const link = `${origin}/api/auth/verify?token=${token}`;
  const lang = getPortalLang();

  try {
    await sendVerificationEmail(email, link, lang);
  } catch (err) {
    console.error("[register] email send failed:", err);
    // In dev, don't dead-end on a provider rejection (e.g. Resend's free-tier
    // "test recipient only" limit) — surface the link so the flow stays testable.
    // In production a send failure is a hard error.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, pending: true, devVerifyUrl: link });
    }
    return NextResponse.json({ error: apiMsg("emailSendFailed") }, { status: 502 });
  }

  // When no provider is configured we also return the link for dev testing.
  return NextResponse.json({ ok: true, pending: true, ...(emailConfigured ? {} : { devVerifyUrl: link }) });
}
