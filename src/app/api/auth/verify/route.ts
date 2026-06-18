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

  const starter = await prisma.plan.findUnique({ where: { key: "starter" } });

  const user = await prisma.user.create({
    data: {
      email: pending.email,
      passwordHash: pending.passwordHash,
      name: pending.name,
      practiceName: pending.practiceName,
      ...(starter && {
        subscription: {
          create: {
            planId: starter.id,
            status: "active",
            renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      healthItems: {
        create: [
          { component: "Server & Infrastruktur", status: "ok", detail: "Alle Systeme laufen normal." },
          { component: "Backup", status: "ok", detail: "Letztes Backup erfolgreich abgeschlossen." },
          { component: "Netzwerk & VPN", status: "ok", detail: "Verbindung stabil." },
          { component: "IT-Sicherheit", status: "ok", detail: "Keine Bedrohungen erkannt." },
          { component: "Praxissoftware", status: "ok", detail: "Version aktuell." },
          { component: "E-Mail (HIN)", status: "ok", detail: "Versand und Empfang funktionieren." },
        ],
      },
    },
  });

  await prisma.pendingRegistration.delete({ where: { id: pending.id } }).catch(() => {});
  await createSession(user.id);

  return NextResponse.redirect(`${origin}/portal`);
}
