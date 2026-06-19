"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const BD  = "#1d4ed8";
const INK = "#0A0A0A";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const params = useParams();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [state,   setState]   = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "13px 16px", border: "1px solid #E5E7EB",
    fontSize: 14, outline: "none", background: "#fff", fontFamily: "inherit", color: INK,
  };
  const lbl: React.CSSProperties = {
    display: "block", fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500,
    color: "#9CA3AF", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8,
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.contact.tag}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20 }}>{t.contact.title}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.4)", maxWidth: 520 }}>{t.contact.sub}</p>
        </div>
      </section>

      {/* Two-column content: existing contact (left) + live chat (right) */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="hp" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 56, alignItems: "start" }}>

            {/* ── LEFT: contact info + form (unchanged content) ─────────────── */}
            <div>
              {/* Info */}
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: INK, marginBottom: 24, letterSpacing: "-.02em" }}>{t.contact.infoTitle}</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 2 }}>
                {[
                  { label: t.help.phone.label, value: t.help.phone.value },
                  { label: t.help.email.label, value: t.help.email.value },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "22px 24px", border: "1px solid #E5E7EB", background: "#F5F5F3" }}>
                    <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: ".12em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: INK, fontFamily: "'Space Grotesk',sans-serif" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "16px 20px", borderLeft: "3px solid #EF4444", background: "#FEF2F2", display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t.emergency.label}</span>
                <span style={{ fontSize: 13, color: "#6B7280" }}>{t.emergency.phone} · {t.emergency.note}</span>
              </div>

              {/* Form */}
              <div style={{ border: "1px solid #E5E7EB", padding: 36 }}>
                {state === "sent" ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 56, height: 56, background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 22, color: "#fff", fontWeight: 700 }}>✓</div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: INK, marginBottom: 10 }}>{t.contact.successTitle}</h3>
                    <p style={{ fontSize: 14, color: "#6B7280" }}>{t.contact.successSub}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: "grid", gap: 20 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={lbl}>{t.contact.form.name} *</label>
                          <input required value={name} onChange={(e) => setName(e.target.value)} style={inp} />
                        </div>
                        <div>
                          <label style={lbl}>{t.contact.form.email} *</label>
                          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inp} />
                        </div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        <div>
                          <label style={lbl}>{t.contact.form.phone}</label>
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} />
                        </div>
                        <div>
                          <label style={lbl}>{t.contact.form.company}</label>
                          <input value={company} onChange={(e) => setCompany(e.target.value)} style={inp} />
                        </div>
                      </div>
                      <div>
                        <label style={lbl}>{t.contact.form.message} *</label>
                        <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)}
                          style={{ ...inp, resize: "none" }} />
                      </div>
                      {state === "error" && (
                        <p style={{ fontSize: 13, color: "#EF4444" }}>{t.contact.errorMsg}</p>
                      )}
                      <button type="submit" disabled={state === "sending"}
                        style={{ background: state === "sending" ? "#9CA3AF" : B, border: "none", padding: "16px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: state === "sending" ? "not-allowed" : "pointer", letterSpacing: ".04em", fontFamily: "inherit", transition: "background .2s" }}
                        onMouseOver={(e) => { if (state !== "sending") e.currentTarget.style.background = BD; }}
                        onFocus={(e) => { if (state !== "sending") e.currentTarget.style.background = BD; }}
                        onMouseOut={(e) => { if (state !== "sending") e.currentTarget.style.background = B; }}
                        onBlur={(e) => { if (state !== "sending") e.currentTarget.style.background = B; }}>
                        {state === "sending" ? t.contact.sending : `${t.contact.form.send} →`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* ── RIGHT: live chat connect / register ───────────────────────── */}
            <div style={{ background: INK, padding: "44px 40px", color: "#fff", position: "sticky", top: 24 }}>
              {/* online status */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <span className="live-dot" style={{ width: 9, height: 9, borderRadius: "50%", background: "#10B981", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#10B981", letterSpacing: ".14em", textTransform: "uppercase" }}>{t.liveChat.liveNow}</span>
              </div>

              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 14 }}>{t.liveChat.title}</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.85)", fontWeight: 500, marginBottom: 10 }}>{t.liveChat.subtitle}</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.7, marginBottom: 28 }}>{t.liveChat.description}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1px solid rgba(255,255,255,.1)", marginBottom: 32 }}>
                <span style={{ color: "rgba(255,255,255,.3)", fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", flexShrink: 0 }}>⏱</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(255,255,255,.55)" }}>{t.liveChat.hours}</span>
              </div>

              {/* Primary: create account & chat */}
              <a href={`/portal/register`}
                style={{ display: "block", textAlign: "center", background: B, padding: "16px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", textDecoration: "none", letterSpacing: ".04em", transition: "background .2s" }}
                onMouseOver={(e) => (e.currentTarget.style.background = BD)}
                onFocus={(e) => (e.currentTarget.style.background = BD)}
                onMouseOut={(e) => (e.currentTarget.style.background = B)}
                onBlur={(e) => (e.currentTarget.style.background = B)}>
                {t.liveChat.registerChat} →
              </a>

              {/* or divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "18px 0" }}>
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: ".1em" }}>{t.liveChat.or}</span>
                <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)" }} />
              </div>

              {/* Secondary: existing clients log in */}
              <a href={`/portal/login`}
                style={{ display: "block", textAlign: "center", background: "transparent", padding: "15px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", textDecoration: "none", letterSpacing: ".04em", border: "1px solid rgba(255,255,255,.25)", transition: "all .2s" }}
                onMouseOver={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = INK; }}
                onFocus={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = INK; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
                onBlur={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}>
                {t.liveChat.startChat}
              </a>

              <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 18, textAlign: "center" }}>{t.liveChat.noAccount}</p>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,.6); }
          70%  { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
        }
        .live-dot { animation: livePulse 2s infinite; }
        @media (max-width: 860px) {
          .hp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageLayout>
  );
}
