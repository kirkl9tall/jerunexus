"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";

export default function PricingPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);

  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 80px", textAlign: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.pricing.tag}</span>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", marginTop: 12, whiteSpace: "pre-line" }}>{t.pricing.title}</h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.5)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>{t.pricing.sub}</p>
      </section>

      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {t.pricing.plans.map((p) => (
            <div key={p.tag} style={{ background: p.featured ? "#0f172a" : "#fff", border: p.featured ? "none" : "1px solid #e2e8f0", borderRadius: 16, padding: "40px 32px", textAlign: "center", boxShadow: p.featured ? "0 20px 60px rgba(15,23,42,.15)" : "none" }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: B }}>{p.tag}</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: p.featured ? "#fff" : "#0f172a", marginTop: 8, marginBottom: 16 }}>{p.name}</h3>
              <div style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,.5)" : "#94a3b8", marginBottom: 6 }}>{p.prefix}</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: p.featured ? "#fff" : "#0f172a", lineHeight: 1 }}>{p.price}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: p.featured ? "rgba(255,255,255,.5)" : "#94a3b8", marginTop: 8, marginBottom: 28, textTransform: "uppercase" }}>{p.unit}</div>
              <div style={{ borderTop: "1px solid " + (p.featured ? "rgba(255,255,255,.1)" : "#eee"), paddingTop: 20 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ padding: "10px 0", borderBottom: "1px solid " + (p.featured ? "rgba(255,255,255,.06)" : "#f5f5f5"), fontSize: 14, color: p.featured ? "rgba(255,255,255,.8)" : "#475569" }}>{f}</div>
                ))}
              </div>
              <a href={`/${lang}/kontakt`} style={{ display: "inline-block", marginTop: 28, background: p.featured ? B : "transparent", border: p.featured ? "none" : "1.5px solid " + B, borderRadius: 8, padding: "12px 32px", color: p.featured ? "#fff" : B, fontSize: 14, fontWeight: 600, textDecoration: "none", textTransform: "uppercase" }}>{t.pricing.getStarted}</a>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
