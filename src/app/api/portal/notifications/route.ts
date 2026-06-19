import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

/**
 * Unread-conversation notification count.
 *  - admin:  open tickets whose latest message came from a client AND arrived
 *            after the admin last opened that ticket.
 *  - client: own open tickets whose latest message came from support AND arrived
 *            after the client last opened that ticket.
 * Opening a conversation (which fetches its messages) stamps the read time, so
 * the badge clears once you've actually read the latest reply.
 */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ count: 0 });

  const isAdmin = user.role === "admin";
  const fromOther = isAdmin ? "user" : "support";

  const tickets = await prisma.ticket.findMany({
    where: isAdmin ? { status: "open" } : { userId: user.id, status: "open" },
    select: {
      clientReadAt: true,
      adminReadAt: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1, select: { sender: true, createdAt: true } },
    },
  });

  const count = tickets.filter((t) => {
    const last = t.messages[0];
    if (last?.sender !== fromOther) return false;
    const readAt = isAdmin ? t.adminReadAt : t.clientReadAt;
    // Unread when never opened, or the latest message is newer than the last read.
    return !readAt || last.createdAt > readAt;
  }).length;

  return NextResponse.json({ count });
}
