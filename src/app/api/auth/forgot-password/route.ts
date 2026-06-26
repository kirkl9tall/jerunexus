import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail, emailConfigured } from "@/lib/email";
import { isValidEmail } from "@/lib/validation";
import { apiMsg, getPortalLang } from "@/lib/portal-i18n";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = (body?.email ?? "").trim().toLowerCase();
  const lang = getPortalLang();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: apiMsg("invalidEmail") }, { status: 400 });
  }

  // Explicit feedback: tell the user whether this email has an account.
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: apiMsg("resetNoAccount") }, { status: 404 });
  }

  // Tidy up expired tokens, then issue a fresh single-use one for this email.
  await prisma.passwordReset.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS);
  await prisma.passwordReset.upsert({
    where: { email },
    create: { email, token, expiresAt },
    update: { token, expiresAt },
  });

  const origin = process.env.APP_URL || new URL(req.url).origin;
  const link = `${origin}/portal/reset-password?token=${token}`;
  const sentMsg = lang === "en"
    ? `We've sent a password-reset link to ${email}. Please check your inbox.`
    : `Wir haben einen Link zum Zurücksetzen an ${email} gesendet. Bitte prüfen Sie Ihren Posteingang.`;

  try {
    await sendPasswordResetEmail(email, link, lang);
  } catch (err) {
    console.error("[forgot-password] email send failed:", err);
    // In dev, surface the link so the flow stays testable without a provider.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, message: sentMsg, devResetUrl: link });
    }
    return NextResponse.json({ error: apiMsg("emailSendFailed") }, { status: 502 });
  }

  return NextResponse.json({ ok: true, message: sentMsg, ...(emailConfigured ? {} : { devResetUrl: link }) });
}
