import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

/**
 * "Whose turn is it" notification count.
 *  - admin:  open tickets whose latest message came from a client (awaiting reply)
 *  - client: tickets whose latest message came from support (admin replied last)
 * Clears naturally when the other side responds — no read-state table needed.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ count: 0 });

  if (user.role === "admin") {
    const tickets = await prisma.ticket.findMany({
      where: { status: "open" },
      select: { messages: { orderBy: { createdAt: "desc" }, take: 1, select: { sender: true } } },
    });
    const count = tickets.filter((t) => t.messages[0]?.sender === "user").length;
    return NextResponse.json({ count });
  }

  const tickets = await prisma.ticket.findMany({
    where: { userId: user.id, status: "open" },
    select: { messages: { orderBy: { createdAt: "desc" }, take: 1, select: { sender: true } } },
  });
  const count = tickets.filter((t) => t.messages[0]?.sender === "support").length;
  return NextResponse.json({ count });
}
