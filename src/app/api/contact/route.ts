import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 422 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 422 });
  }

  try {
    await sendContactEmail({ name, email, phone: body.phone, company: body.company, message });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Could not send your message right now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
