/**
 * Email sending with a graceful dev fallback.
 *
 * In production, set RESEND_API_KEY (and optionally EMAIL_FROM) to send real
 * email via Resend. Without a key — e.g. local dev — the message is logged to
 * the server console instead, so the verification flow is fully testable
 * without an email provider or outbound network.
 */
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM ?? "Jerumed Nexus <noreply@jerumed-nexus.ch>";

/** True when a real provider is configured. When false we log instead of send. */
export const emailConfigured = Boolean(RESEND_API_KEY);

type Lang = "de" | "en";

interface LinkCopy { subject: string; heading: string; body: string; button: string; expiry: string; ignore: string; }

/** Button-link email body, shared by the verification + password-reset emails. */
function linkEmailHtml(accent: string, copy: LinkCopy, link: string) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;color:#1A1A1A">
      <h1 style="font-size:22px;color:${accent}">${copy.heading}</h1>
      <p style="font-size:15px;line-height:1.6">${copy.body}</p>
      <p style="margin:28px 0">
        <a href="${link}" style="background:${accent};color:#fff;text-decoration:none;padding:13px 26px;font-size:14px;font-weight:600;display:inline-block">
          ${copy.button}
        </a>
      </p>
      <p style="font-size:12px;color:#696969">${copy.expiry}</p>
      <p style="font-size:12px;color:#9B9B9B">${copy.ignore}</p>
    </div>`;
}

/** Sends one email via Resend, or logs it in dev when no provider is configured. */
async function deliver(opts: Readonly<{ to: string; subject: string; html: string; text?: string; replyTo?: string }>) {
  if (!emailConfigured) {
    console.log(`\n[email:dev] "${opts.subject}" -> ${opts.to}\n`);
    return { ok: true, dev: true };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.text ? { text: opts.text } : {}),
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend failed: ${res.status} ${detail}`);
  }
  return { ok: true, dev: false };
}

export async function sendVerificationEmail(to: string, link: string, lang: Lang) {
  const copy = VERIFY_COPY[lang];
  return deliver({ to, subject: copy.subject, html: linkEmailHtml("#197A56", copy, link) });
}

/** Where contact-form submissions are delivered. */
const CONTACT_TO = process.env.CONTACT_TO ?? "support@jerumed-nexus.ch";

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

/** Sends a contact-form submission to the support inbox (reply-to = the sender). */
export async function sendContactEmail(p: ContactInput) {
  const subject = `Kontaktanfrage von ${p.name}`;
  const text =
    `Name: ${p.name}\nE-Mail: ${p.email}\nTelefon: ${p.phone || "—"}\nPraxis: ${p.company || "—"}\n\n${p.message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1A1A1A">
      <h2 style="font-size:18px;color:#2563EB">Neue Kontaktanfrage</h2>
      <table style="font-size:14px;line-height:1.7;border-collapse:collapse">
        <tr><td style="color:#6B7280;padding-right:14px">Name</td><td>${esc(p.name)}</td></tr>
        <tr><td style="color:#6B7280;padding-right:14px">E-Mail</td><td>${esc(p.email)}</td></tr>
        <tr><td style="color:#6B7280;padding-right:14px">Telefon</td><td>${esc(p.phone || "—")}</td></tr>
        <tr><td style="color:#6B7280;padding-right:14px">Praxis</td><td>${esc(p.company || "—")}</td></tr>
      </table>
      <p style="font-size:14px;line-height:1.7;white-space:pre-line;border-top:1px solid #E5E7EB;padding-top:14px;margin-top:14px">${esc(p.message)}</p>
    </div>`;

  return deliver({ to: CONTACT_TO, subject, html, text, replyTo: p.email });
}

export async function sendPasswordResetEmail(to: string, link: string, lang: Lang) {
  const copy = RESET_COPY[lang];
  return deliver({ to, subject: copy.subject, html: linkEmailHtml("#2563EB", copy, link) });
}

const RESET_COPY = {
  de: {
    subject: "Passwort zurücksetzen",
    heading: "Passwort zurücksetzen",
    body: "Wir haben eine Anfrage erhalten, Ihr Passwort zurückzusetzen. Klicken Sie auf die Schaltfläche, um ein neues Passwort festzulegen.",
    button: "Neues Passwort festlegen",
    expiry: "Dieser Link ist 1 Stunde gültig.",
    ignore: "Falls Sie dies nicht angefordert haben, können Sie diese E-Mail ignorieren — Ihr Passwort bleibt unverändert.",
  },
  en: {
    subject: "Reset your password",
    heading: "Reset your password",
    body: "We received a request to reset your password. Click the button below to choose a new one.",
    button: "Set a new password",
    expiry: "This link is valid for 1 hour.",
    ignore: "If you didn't request this, you can safely ignore this email — your password stays the same.",
  },
} as const;

const VERIFY_COPY = {
  de: {
    subject: "Bestätigen Sie Ihre E-Mail-Adresse",
    heading: "Willkommen bei Jerumed Nexus",
    body: "Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Kundenkonto zu aktivieren.",
    button: "E-Mail bestätigen",
    expiry: "Dieser Link ist 24 Stunden gültig.",
    ignore: "Falls Sie sich nicht registriert haben, können Sie diese E-Mail ignorieren.",
  },
  en: {
    subject: "Confirm your email address",
    heading: "Welcome to Jerumed Nexus",
    body: "Please confirm your email address to activate your client account.",
    button: "Confirm email",
    expiry: "This link is valid for 24 hours.",
    ignore: "If you didn't register, you can safely ignore this email.",
  },
} as const;
