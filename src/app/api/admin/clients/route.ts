import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminUser } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const clients = await prisma.user.findMany({
    where: { role: "client" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      practiceName: true,
      createdAt: true,
      subscription: { include: { plan: true } },
      _count: { select: { tickets: { where: { status: "open" } } } },
    },
  });
  return NextResponse.json({ clients });
}
