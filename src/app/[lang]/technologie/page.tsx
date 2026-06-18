"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const INK = "#0A0A0A";

export default function TechnologyPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.technology;

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.nav.items[3]}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20 }}>{p.heroTitle}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.4)", maxWidth: 560 }}>{p.heroSub}</p>
        </div>
      </section>

      {/* Tech stack grid */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="fg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, border: "1px solid #E5E7EB" }}>
            {p.stack.map((s, i) => (
              <div key={s.cat} style={{ padding: "32px 28px", borderRight: (i + 1) % 4 === 0 ? "none" : "1px solid #E5E7EB", borderBottom: i >= p.stack.length - 4 ? "none" : "1px solid #E5E7EB" }}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: B, marginBottom: 12 }}>{s.cat}</p>
                <p style={{ fontSize: 14, color: "#374151", fontFamily: "'DM Mono',monospace", lineHeight: 1.7 }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section style={{ background: "#F5F5F3", borderTop: "1px solid #E5E7EB", padding: "64px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#9CA3AF", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>{t.tools.tag}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {t.tools.items.map((tool) => (
              <div key={tool} style={{ padding: "9px 18px", background: "#fff", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 600, color: "#374151", letterSpacing: ".02em" }}>{tool}</div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
