import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { apiMsg } from "@/lib/portal-i18n";

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

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: apiMsg("emailExists") }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const starter = await prisma.plan.findUnique({ where: { key: "starter" } });

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      practiceName,
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

  await createSession(user.id);
  return NextResponse.json({ ok: true });
}
