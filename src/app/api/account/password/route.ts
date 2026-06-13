import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { apiMsg } from "@/lib/portal-i18n";

export async function POST(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const body = await req.json().catch(() => null);
  const current = body?.currentPassword ?? "";
  const next = body?.newPassword ?? "";

  if (next.length < 8) {
    return NextResponse.json({ error: apiMsg("newPwMin") }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !(await bcrypt.compare(current, user.passwordHash))) {
    return NextResponse.json({ error: apiMsg("currentPwWrong") }, { status: 401 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await bcrypt.hash(next, 12) },
  });
  return NextResponse.json({ ok: true });
}
