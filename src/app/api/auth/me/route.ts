import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

// Reads the httpOnly session cookie — must run live, never cached.
export const dynamic = "force-dynamic";

/** Lightweight session probe for the marketing-site nav. Returns the logged-in
 *  user's display fields, or { user: null } when signed out. Always 200. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({
    user: { name: user.name, email: user.email, avatarUrl: user.avatarUrl, role: user.role },
  });
}
