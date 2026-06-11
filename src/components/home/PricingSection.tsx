"use client";
import { useRouter } from "next/navigation";
import Reveal from "./Reveal";
import type { SectionProps } from "./types";

const B = "#2563EB";
const BD = "#1d4ed8";
const BG = "#0f172a";

export default function PricingSection({ t, lang }: Readonly<SectionProps>) {
  const router = useRouter();
  return (
    <section style={{ padding: "100px 32px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 56 }} className="hp">
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.pricing.tag}</span>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.pricing.title}</h2>
            </div>
            <div style={{ maxWidth: 400 }}>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{t.pricing.sub}</p>
              <button style={{ background: "none", border: "1px solid #1e293b", borderRadius: 6, padding: "10px 24px", fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "#1e293b", fontFamily: "inherit" }}>{t.pricing.btn}</button>
            </div>
          </div>
        </Reveal>

        <div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
          {t.pricing.plans.map((p, i) => (
            <Reveal key={p.tag} delay={i * .08}>
              <div style={{ background: p.featured ? BG : "#fff", border: p.featured ? "none" : "1px solid #e2e8f0", borderRadius: 16, padding: "40px 32px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: p.featured ? "0 20px 60px rgba(15,23,42,.15)" : "none" }}
                onMouseEnter={(e) => { if (!p.featured) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(15,23,42,.08)"; } }}
                onMouseLeave={(e) => { if (!p.featured) { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; } }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: B }}>{p.tag}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: p.featured ? "#fff" : "#0f172a", marginTop: 8, marginBottom: 16 }}>{p.name}</h3>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: p.featured ? "rgba(255,255,255,.5)" : "#94a3b8", marginBottom: 6 }}>{p.prefix}</div>
                  <span style={{ fontSize: 48, fontWeight: 800, color: p.featured ? "#fff" : "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{p.price}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", color: p.featured ? "rgba(255,255,255,.5)" : "#94a3b8", marginBottom: 28, textTransform: "uppercase" }}>{p.unit}</div>
                <div style={{ borderTop: `1px solid ${p.featured ? "rgba(255,255,255,.1)" : "#eee"}`, paddingTop: 20 }}>
                  {p.features.map((f) => (
                    <div key={f} style={{ padding: "10px 0", borderBottom: `1px solid ${p.featured ? "rgba(255,255,255,.06)" : "#f5f5f5"}`, fontSize: 14, color: p.featured ? "rgba(255,255,255,.8)" : "#475569" }}>{f}</div>
                  ))}
                </div>
                <button
                  style={{ marginTop: 28, background: p.featured ? B : "transparent", border: p.featured ? "none" : `1.5px solid ${B}`, borderRadius: 8, padding: "12px 32px", color: p.featured ? "#fff" : B, fontSize: 14, fontWeight: 600, fontFamily: "inherit", letterSpacing: ".04em", textTransform: "uppercase", transition: "all .3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = p.featured ? BD : B)}
                  onMouseOut={(e) => { e.currentTarget.style.background = p.featured ? B : "transparent"; if (!p.featured) e.currentTarget.style.color = B; }}
                  onClick={() => router.push(`/${lang}/kontakt`)}>{t.pricing.getStarted}</button>
                <p style={{ fontSize: 11, color: p.featured ? "rgba(255,255,255,.35)" : "#94a3b8", marginTop: 16 }}>{t.pricing.vatNote}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
