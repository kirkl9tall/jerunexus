import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  // In production: swap this block for Resend / Nodemailer / SendGrid.
  // RESEND example (add RESEND_API_KEY to .env.local):
  //
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "noreply@jerumed-nexus.ch",
  //     to: "info@jerumed-nexus.ch",
  //     subject: `Kontaktanfrage von ${name}`,
  //     text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${body.phone ?? "—"}\nPraxis: ${body.company ?? "—"}\n\n${message}`,
  //   });

  console.info("[contact]", { name, email, phone: body.phone, company: body.company, message });

  return NextResponse.json({ ok: true });
}
