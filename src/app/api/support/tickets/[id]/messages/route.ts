import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { apiMsg } from "@/lib/portal-i18n";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const ticket = await prisma.ticket.findFirst({
    where: { id: params.id, userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!ticket) return NextResponse.json({ error: apiMsg("ticketNotFound") }, { status: 404 });

  return NextResponse.json({ ticket });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const ticket = await prisma.ticket.findFirst({ where: { id: params.id, userId } });
  if (!ticket) return NextResponse.json({ error: apiMsg("ticketNotFound") }, { status: 404 });

  const body = await req.json().catch(() => null);
  const text = (body?.body ?? "").trim();
  if (!text) return NextResponse.json({ error: apiMsg("emptyMessage") }, { status: 400 });

  const message = await prisma.message.create({
    data: { ticketId: ticket.id, sender: "user", body: text },
  });
  return NextResponse.json({ ok: true, message });
}
