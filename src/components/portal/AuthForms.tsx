"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LangToggle } from "./PortalShell";
import type { PortalDict, PortalLang } from "@/lib/portal-i18n";

function AuthSide({ title, items }: Readonly<{ title: string; items: readonly string[] }>) {
  return (
    <div className="p-auth-side">
      <div className="p-label" style={{ color: "rgba(255,255,255,.6)" }}>Portal</div>
      <h2 style={{ fontSize: "clamp(28px,3vw,42px)", fontWeight: 700, color: "#fff", marginTop: 16, maxWidth: 420, whiteSpace: "pre-line" }}>
        {title}
      </h2>
      <hr className="p-rule" style={{ background: "#fff" }} />
      <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "rgba(255,255,255,.85)" }}>
            <span style={{ color: "#7BC5A3" }}>—</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Brand() {
  return (
    <a href="/de-CH" style={{ textDecoration: "none" }}>
      <span style={{ fontFamily: "'Libre Franklin',sans-serif", fontWeight: 800, fontSize: 20, color: "var(--ink)" }}>
        jerumed<span style={{ color: "var(--green)" }}>nexus</span>
      </span>
    </a>
  );
}

/** Shared two-pane auth page chrome (brand header + side panel). */
function AuthShell({ lang, homeHref, homeLabel, sideTitle, sideItems, children }: Readonly<{ lang: PortalLang; homeHref: string; homeLabel: string; sideTitle: string; sideItems: readonly string[]; children: React.ReactNode }>) {
  return (
    <div className="p-auth">
      <div className="p-auth-pane">
        <div className="p-auth-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Brand />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href={homeHref} className="p-arrow-link" style={{ color: "var(--gray)" }}>{homeLabel}</a>
              <LangToggle lang={lang} />
            </div>
          </div>
          {children}
        </div>
      </div>
      <AuthSide title={sideTitle} items={sideItems} />
    </div>
  );
}

export function LoginForm({ lang, t }: Readonly<{ lang: PortalLang; t: PortalDict["login"] }>) {
  const router = useRouter();
  const search = useSearchParams();
  const verify = search.get("verify");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  let verifyNotice: { kind: "ok" | "err"; text: string } | null = null;
  if (verify === "invalid") verifyNotice = { kind: "err", text: t.verifyInvalid };
  else if (verify === "already") verifyNotice = { kind: "ok", text: t.verifyAlready };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setBusy(false);
    if (res.ok) {
      router.push("/portal");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? t.fallbackError);
    }
  }

  return (
    <div className="p-auth">
      <div className="p-auth-pane">
        <div className="p-auth-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Brand />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href="/de-CH" className="p-arrow-link" style={{ color: "var(--gray)" }}>{t.home}</a>
              <LangToggle lang={lang} />
            </div>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 36 }}>{t.title}</h1>
          <hr className="p-rule" />
          <p style={{ fontSize: 14, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.6 }}>{t.sub}</p>

          {verifyNotice && <div className={verifyNotice.kind === "ok" ? "p-success" : "p-error"}>{verifyNotice.text}</div>}
          {error && <div className="p-error">{error}</div>}

          <form onSubmit={submit}>
            <div className="p-field">
              <label htmlFor="email">{t.email}</label>
              <input id="email" type="email" className="p-input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="p-field">
              <label htmlFor="password">{t.password}</label>
              <input id="password" type="password" className="p-input" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>
            <button type="submit" className="p-btn" disabled={busy} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
              {busy ? t.submitting : t.submit}
            </button>
          </form>

          <p style={{ fontSize: 14, marginTop: 18 }}>
            <a href="/portal/forgot-password" className="p-arrow-link">{lang === "en" ? "Forgot password?" : "Passwort vergessen?"}</a>
          </p>
          <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 12 }}>
            {t.noAccount}{" "}
            <a href="/portal/register" className="p-arrow-link">{t.registerLink}</a>
          </p>
        </div>
      </div>
      <AuthSide title={t.sideTitle} items={t.sideItems} />
    </div>
  );
}

export function RegisterForm({ lang, t }: Readonly<{ lang: PortalLang; t: PortalDict["register"] }>) {
  const [name, setName] = useState("");
  const [practiceName, setPracticeName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, practiceName, email, password }),
    });
    setBusy(false);
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      setDevLink(data.devVerifyUrl ?? null);
      setDone(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? t.fallbackError);
    }
  }

  if (done) {
    return (
      <div className="p-auth">
        <div className="p-auth-pane">
          <div className="p-auth-box">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Brand />
              <a href="/de-CH" className="p-arrow-link" style={{ color: "var(--gray)" }}>{t.home}</a>
            </div>
            <div style={{ width: 56, height: 56, background: "var(--green-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "40px 0 24px", fontSize: 26, color: "var(--green)" }}>✉</div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>{t.checkInboxTitle}</h1>
            <hr className="p-rule" />
            <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 16px", lineHeight: 1.6 }}>{t.checkInboxBody}</p>
            <p style={{ fontSize: 13, color: "var(--gray-light)", lineHeight: 1.6 }}>{t.checkInboxHint}</p>
            {devLink && (
              <div style={{ marginTop: 24, padding: "14px 16px", background: "var(--bg-soft)", border: "1px solid var(--hairline)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gray)", marginBottom: 8, letterSpacing: ".04em" }}>{t.devLink}</div>
                <a href={devLink} className="p-arrow-link" style={{ fontSize: 13, wordBreak: "break-all" }}>{devLink}</a>
              </div>
            )}
            <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 28 }}>
              <a href="/portal/login" className="p-arrow-link">{t.loginLink}</a>
            </p>
          </div>
        </div>
        <AuthSide title={t.sideTitle} items={t.sideItems} />
      </div>
    );
  }

  return (
    <div className="p-auth">
      <div className="p-auth-pane">
        <div className="p-auth-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Brand />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a href="/de-CH" className="p-arrow-link" style={{ color: "var(--gray)" }}>{t.home}</a>
              <LangToggle lang={lang} />
            </div>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 36 }}>{t.title}</h1>
          <hr className="p-rule" />
          <p style={{ fontSize: 14, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.6 }}>{t.sub}</p>

          {error && <div className="p-error">{error}</div>}

          <form onSubmit={submit}>
            <div className="p-field">
              <label htmlFor="name">{t.name}</label>
              <input id="name" className="p-input" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </div>
            <div className="p-field">
              <label htmlFor="practice">{t.practice}</label>
              <input id="practice" className="p-input" value={practiceName} onChange={(e) => setPracticeName(e.target.value)} autoComplete="organization" />
            </div>
            <div className="p-field">
              <label htmlFor="email">{t.email}</label>
              <input id="email" type="email" className="p-input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="p-field">
              <label htmlFor="password">{t.password}</label>
              <input id="password" type="password" className="p-input" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
            </div>
            <button type="submit" className="p-btn" disabled={busy} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
              {busy ? t.submitting : t.submit}
            </button>
          </form>

          <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 28 }}>
            {t.hasAccount}{" "}
            <a href="/portal/login" className="p-arrow-link">{t.loginLink}</a>
          </p>
        </div>
      </div>
      <AuthSide title={t.sideTitle} items={t.sideItems} />
    </div>
  );
}

const FP_COPY = {
  de: { home: "← Startseite", title: "Passwort vergessen", sub: "Geben Sie Ihre E-Mail ein — wir senden Ihnen einen Link zum Zurücksetzen.", email: "E-Mail", submit: "Link senden →", submitting: "Wird gesendet…", sentTitle: "E-Mail gesendet", backToLogin: "Zurück zur Anmeldung", devLink: "Dev-Link:", sideTitle: "Kein Problem.\nWir helfen Ihnen zurück.", sideItems: ["Sicherer Reset-Link", "1 Stunde gültig", "Ihr Konto bleibt geschützt"] },
  en: { home: "← Home", title: "Forgot password", sub: "Enter your email — we'll send you a link to reset it.", email: "Email", submit: "Send link →", submitting: "Sending…", sentTitle: "Email sent", backToLogin: "Back to sign in", devLink: "Dev link:", sideTitle: "No problem.\nLet's get you back in.", sideItems: ["Secure reset link", "Valid for 1 hour", "Your account stays protected"] },
} as const;

export function ForgotPasswordForm({ lang }: Readonly<{ lang: PortalLang }>) {
  const c = FP_COPY[lang];
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [devLink, setDevLink] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    setDevLink(data.devResetUrl ?? null);
    setSent(data.message ?? "");
  }

  return (
    <AuthShell lang={lang} homeHref="/portal/login" homeLabel={c.home} sideTitle={c.sideTitle} sideItems={c.sideItems}>
          {sent === null ? (
            <>
              <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 36 }}>{c.title}</h1>
              <hr className="p-rule" />
              <p style={{ fontSize: 14, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.6 }}>{c.sub}</p>
              <form onSubmit={submit}>
                <div className="p-field">
                  <label htmlFor="email">{c.email}</label>
                  <input id="email" type="email" className="p-input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                </div>
                <button type="submit" className="p-btn" disabled={busy} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                  {busy ? c.submitting : c.submit}
                </button>
              </form>
            </>
          ) : (
            <>
              <div style={{ width: 56, height: 56, background: "var(--green-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "40px 0 24px", fontSize: 26, color: "var(--green)" }}>✉</div>
              <h1 style={{ fontSize: 28, fontWeight: 700 }}>{c.sentTitle}</h1>
              <hr className="p-rule" />
              <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 16px", lineHeight: 1.6 }}>{sent}</p>
              {devLink && (
                <div style={{ marginTop: 24, padding: "14px 16px", background: "var(--bg-soft)", border: "1px solid var(--hairline)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gray)", marginBottom: 8, letterSpacing: ".04em" }}>{c.devLink}</div>
                  <a href={devLink} className="p-arrow-link" style={{ fontSize: 13, wordBreak: "break-all" }}>{devLink}</a>
                </div>
              )}
            </>
          )}
          <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 28 }}>
            <a href="/portal/login" className="p-arrow-link">{c.backToLogin}</a>
          </p>
    </AuthShell>
  );
}

const RP_COPY = {
  de: { home: "← Anmeldung", title: "Neues Passwort", sub: "Wählen Sie ein neues Passwort für Ihr Konto.", password: "Neues Passwort (min. 8 Zeichen)", confirm: "Passwort bestätigen", submit: "Passwort speichern →", submitting: "Wird gespeichert…", mismatch: "Die Passwörter stimmen nicht überein.", noToken: "Ungültiger oder fehlender Link. Bitte fordern Sie einen neuen an.", doneTitle: "Erledigt", toLogin: "Zur Anmeldung →", requestNew: "Neuen Link anfordern →", fallbackError: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.", sideTitle: "Fast geschafft.\nNeues Passwort festlegen.", sideItems: ["Einmaliger Link", "Sichere Verschlüsselung", "Sofort einsatzbereit"] },
  en: { home: "← Sign in", title: "New password", sub: "Choose a new password for your account.", password: "New password (min. 8 chars)", confirm: "Confirm password", submit: "Save password →", submitting: "Saving…", mismatch: "Passwords don't match.", noToken: "Invalid or missing link. Please request a new one.", doneTitle: "Done", toLogin: "Go to sign in →", requestNew: "Request a new link →", fallbackError: "Something went wrong. Please try again.", sideTitle: "Almost there.\nSet your new password.", sideItems: ["Single-use link", "Securely encrypted", "Ready right away"] },
} as const;

export function ResetPasswordForm({ lang }: Readonly<{ lang: PortalLang }>) {
  const c = RP_COPY[lang];
  const search = useSearchParams();
  const token = search.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError(c.mismatch); return; }
    setBusy(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    if (res.ok) setDone(data.message ?? "");
    else setError(data.error ?? c.fallbackError);
  }

  let inner: React.ReactNode;
  if (done !== null) {
    inner = (
      <>
        <div style={{ width: 56, height: 56, background: "var(--green-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "40px 0 24px", fontSize: 26, color: "var(--green)" }}>✓</div>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>{c.doneTitle}</h1>
        <hr className="p-rule" />
        <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 28px", lineHeight: 1.6 }}>{done}</p>
        <a href="/portal/login" className="p-btn" style={{ justifyContent: "center" }}>{c.toLogin}</a>
      </>
    );
  } else if (!token) {
    inner = (
      <>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 36 }}>{c.title}</h1>
        <hr className="p-rule" />
        <div className="p-error" style={{ marginTop: 20 }}>{c.noToken}</div>
        <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 24 }}>
          <a href="/portal/forgot-password" className="p-arrow-link">{c.requestNew}</a>
        </p>
      </>
    );
  } else {
    inner = (
      <>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 36 }}>{c.title}</h1>
        <hr className="p-rule" />
        <p style={{ fontSize: 14, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.6 }}>{c.sub}</p>
        {error && <div className="p-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="p-field">
            <label htmlFor="password">{c.password}</label>
            <input id="password" type="password" className="p-input" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
          </div>
          <div className="p-field">
            <label htmlFor="confirm">{c.confirm}</label>
            <input id="confirm" type="password" className="p-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" />
          </div>
          <button type="submit" className="p-btn" disabled={busy} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
            {busy ? c.submitting : c.submit}
          </button>
        </form>
      </>
    );
  }

  return (
    <AuthShell lang={lang} homeHref="/portal/login" homeLabel={c.home} sideTitle={c.sideTitle} sideItems={c.sideItems}>
          {inner}
    </AuthShell>
  );
}
