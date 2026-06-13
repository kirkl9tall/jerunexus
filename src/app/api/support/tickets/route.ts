import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { apiMsg } from "@/lib/portal-i18n";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const tickets = await prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" }, take: 1 } },
  });
  return NextResponse.json({ tickets });
}

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const body = await req.json().catch(() => null);
  const subject = (body?.subject ?? "").trim();
  const channel = body?.channel === "email" ? "email" : "chat";
  const message = (body?.message ?? "").trim();

  if (!subject) return NextResponse.json({ error: apiMsg("subjectRequired") }, { status: 400 });
  if (!message) return NextResponse.json({ error: apiMsg("messageRequired") }, { status: 400 });

  const ticket = await prisma.ticket.create({
    data: {
      userId,
      subject,
      channel,
      messages: { create: { sender: "user", body: message } },
    },
  });

  return NextResponse.json({ ok: true, ticketId: ticket.id });
}
