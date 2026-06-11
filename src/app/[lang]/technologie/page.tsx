"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";

export default function TechnologyPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.technology;

  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,.08), transparent 70%)", pointerEvents: "none" }} />
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", marginBottom: 12, position: "relative" }}>{p.heroTitle}</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,.55)", position: "relative" }}>{p.heroSub}</p>
      </section>

      <section style={{ padding: "80px 32px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {p.stack.map((s) => (
            <div key={s.cat} style={{ padding: "28px 24px", borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: B, marginBottom: 10 }}>{s.cat}</div>
              <div style={{ fontSize: 15, color: "#475569", fontFamily: "monospace" }}>{s.val}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "80px 32px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.tools.tag}</span>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 10, marginBottom: 40, color: "#0f172a", whiteSpace: "pre-line" }}>{t.tools.title}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
            {t.tools.items.map((tool) => (
              <div key={tool} style={{ padding: "18px 12px", borderRadius: 10, background: "#fff", border: "1px solid #e2e8f0", fontSize: 13, fontWeight: 600, color: "#475569" }}>{tool}</div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
