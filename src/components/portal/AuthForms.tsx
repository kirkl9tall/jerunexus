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

          <p style={{ fontSize: 14, color: "var(--gray)", marginTop: 28 }}>
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
