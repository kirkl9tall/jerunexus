"use client";
import { useParams, useRouter } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const BD  = "#1d4ed8";
const INK = "#0A0A0A";

export default function PricingPage() {
  const params = useParams();
  const router = useRouter();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.pricing.tag}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20, whiteSpace: "pre-line" }}>{t.pricing.title}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.4)", maxWidth: 500 }}>{t.pricing.sub}</p>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "80px 40px", background: "#F5F5F3" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {t.pricing.plans.map((p) => (
              <div key={p.tag} style={{ padding: "44px 36px", border: "1px solid #E5E7EB", background: p.featured ? INK : "#fff", display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: ".14em", color: p.featured ? "rgba(255,255,255,.35)" : "#9CA3AF", display: "block", marginBottom: 12 }}>{p.tag}</span>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: p.featured ? "#fff" : INK, marginBottom: 28, letterSpacing: "-.02em" }}>{p.name}</h3>
                <div style={{ marginBottom: 32 }}>
                  <span style={{ fontSize: 12, color: p.featured ? "rgba(255,255,255,.35)" : "#9CA3AF", display: "block", marginBottom: 6 }}>{p.prefix}</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 700, color: p.featured ? "#fff" : INK, letterSpacing: "-.04em", lineHeight: 1 }}>{p.price}</span>
                    <span style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,.3)" : "#9CA3AF" }}>{p.unit}</span>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${p.featured ? "rgba(255,255,255,.08)" : "#E5E7EB"}`, paddingTop: 24, flex: 1 }}>
                  {p.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${p.featured ? "rgba(255,255,255,.05)" : "#F3F4F6"}`, fontSize: 14, color: p.featured ? "rgba(255,255,255,.7)" : "#374151" }}>
                      <span style={{ color: p.featured ? "#10B981" : B, flexShrink: 0, fontWeight: 700, fontSize: 13, lineHeight: "1.4" }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  style={{ marginTop: 28, background: p.featured ? B : "transparent", border: p.featured ? "none" : `1.5px solid ${INK}`, padding: "13px 0", color: p.featured ? "#fff" : INK, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase", transition: "all .2s", width: "100%" }}
                  onMouseOver={(e) => { e.currentTarget.style.background = p.featured ? BD : INK; if (!p.featured) e.currentTarget.style.color = "#fff"; }}
                  onFocus={(e) => { e.currentTarget.style.background = p.featured ? BD : INK; if (!p.featured) e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = p.featured ? B : "transparent"; if (!p.featured) e.currentTarget.style.color = INK; }}
                  onBlur={(e) => { e.currentTarget.style.background = p.featured ? B : "transparent"; if (!p.featured) e.currentTarget.style.color = INK; }}
                  onClick={() => router.push(`/${lang}/kontakt`)}>
                  {t.pricing.getStarted}
                </button>
                <p style={{ fontSize: 11, color: p.featured ? "rgba(255,255,255,.2)" : "#9CA3AF", marginTop: 12, textAlign: "center" }}>{t.pricing.vatNote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
