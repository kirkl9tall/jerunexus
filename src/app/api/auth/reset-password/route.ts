import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { apiMsg } from "@/lib/portal-i18n";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const token = (body?.token ?? "").trim();
  const password = body?.password ?? "";

  if (password.length < 8) {
    return NextResponse.json({ error: apiMsg("pwMin") }, { status: 400 });
  }
  if (!token) {
    return NextResponse.json({ error: apiMsg("resetInvalid") }, { status: 400 });
  }

  const reset = await prisma.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.expiresAt < new Date()) {
    return NextResponse.json({ error: apiMsg("resetInvalid") }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  // The account is guaranteed to exist (the token was issued for a real user),
  // but guard anyway in case it was deleted in the meantime.
  const user = await prisma.user.findUnique({ where: { email: reset.email } });
  if (!user) {
    await prisma.passwordReset.delete({ where: { token } }).catch(() => {});
    return NextResponse.json({ error: apiMsg("resetInvalid") }, { status: 400 });
  }

  await prisma.user.update({ where: { email: reset.email }, data: { passwordHash } });
  await prisma.passwordReset.delete({ where: { token } }).catch(() => {}); // single-use

  return NextResponse.json({ ok: true, message: apiMsg("resetOk") });
}
