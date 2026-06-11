"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B = "#2563EB";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const params = useParams();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");

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

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px", borderRadius: 10,
    border: "1px solid #e2e8f0", fontSize: 15, outline: "none",
    background: "#f8fafc", fontFamily: "inherit",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8,
  };

  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 80px", textAlign: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.contact.tag}</span>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", marginTop: 12 }}>{t.contact.title}</h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.55)", marginTop: 12 }}>{t.contact.sub}</p>
      </section>

      <section style={{ padding: "80px 32px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48 }} className="hp">
          {/* Contact info */}
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 28 }}>Kontakt Info</h3>
            <div style={{ marginBottom: 16, padding: "20px 24px", borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", letterSpacing: ".08em", marginBottom: 4 }}>{t.help.phone.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{t.help.phone.value}</div>
            </div>
            <div style={{ marginBottom: 16, padding: "20px 24px", borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", letterSpacing: ".08em", marginBottom: 4 }}>{t.help.email.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{t.help.email.value}</div>
            </div>
            <div style={{ padding: "16px 20px", borderRadius: 12, background: "#f0f4ff", border: "1px solid rgba(37,99,235,.1)" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: B }}>{t.emergency.label} </span>
              <span style={{ fontSize: 13, color: "#475569" }}>{t.emergency.phone} · {t.emergency.note}</span>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 36, border: "1px solid #e2e8f0", boxShadow: "0 8px 32px rgba(0,0,0,.04)" }}>
            {state === "sent" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Nachricht gesendet!</h3>
                <p style={{ color: "#64748b" }}>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gap: 18 }}>
                  <div>
                    <label style={labelStyle}>{t.contact.form.name} *</label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.contact.form.email} *</label>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.contact.form.phone}</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.contact.form.company}</label>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t.contact.form.message} *</label>
                    <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
                      style={{ ...inputStyle, resize: "none" }} />
                  </div>
                  {state === "error" && (
                    <p style={{ fontSize: 13, color: "#ef4444" }}>Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.</p>
                  )}
                  <button type="submit" disabled={state === "sending"}
                    style={{ width: "100%", background: state === "sending" ? "#94a3b8" : B, border: "none", borderRadius: 10, padding: "16px", color: "#fff", fontSize: 16, fontWeight: 600, cursor: state === "sending" ? "not-allowed" : "pointer", transition: "all .3s" }}>
                    {state === "sending" ? "..." : `${t.contact.form.send} →`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
