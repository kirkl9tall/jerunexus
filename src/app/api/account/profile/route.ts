import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/auth";
import { apiMsg } from "@/lib/portal-i18n";

export async function PATCH(req: Request) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: apiMsg("notAuthed") }, { status: 401 });

  const body = await req.json().catch(() => null);
  const data: Record<string, string | null> = {};

  if (typeof body?.name === "string" && body.name.trim()) data.name = body.name.trim();
  if (typeof body?.practiceName === "string") data.practiceName = body.practiceName.trim() || null;
  if (typeof body?.phone === "string") data.phone = body.phone.trim() || null;
  if (typeof body?.avatarUrl === "string") {
    if (body.avatarUrl.length > 700_000) {
      return NextResponse.json({ error: apiMsg("imgTooBig") }, { status: 400 });
    }
    data.avatarUrl = body.avatarUrl || null;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: apiMsg("noChanges") }, { status: 400 });
  }

  await prisma.user.update({ where: { id: userId }, data });
  return NextResponse.json({ ok: true });
}
