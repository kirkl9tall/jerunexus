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

  // Always respond identically (anti-enumeration): never reveal whether the
  // address has an account.
  const genericOk = () => NextResponse.json({ ok: true, message: apiMsg("resetSent") });

  if (!email || !isValidEmail(email)) return genericOk();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return genericOk();

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

  try {
    await sendPasswordResetEmail(email, link, lang);
  } catch (err) {
    console.error("[forgot-password] email send failed:", err);
    // In dev, surface the link so the flow stays testable without a provider.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ ok: true, message: apiMsg("resetSent"), devResetUrl: link });
    }
    return genericOk(); // still generic in prod — don't leak the failure
  }

  return NextResponse.json({ ok: true, message: apiMsg("resetSent"), ...(emailConfigured ? {} : { devResetUrl: link }) });
}
