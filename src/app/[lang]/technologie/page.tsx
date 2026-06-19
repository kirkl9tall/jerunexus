"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const INK = "#0A0A0A";

/** Small blue accent label used at the top of each section (matches the hero). */
function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
      <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{children}</span>
    </div>
  );
}

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
          <SectionLabel>{t.nav.items[3]}</SectionLabel>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20 }}>{p.heroTitle}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.4)", maxWidth: 560 }}>{p.heroSub}</p>
        </div>
      </section>

      {/* Stack — editorial numbered spec sheet */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionLabel>Stack</SectionLabel>
          <div style={{ borderTop: "1px solid #E5E7EB" }}>
            {p.stack.map((s, i) => (
              <div
                key={s.cat}
                className="tech-row"
                style={{ display: "grid", gridTemplateColumns: "minmax(200px,340px) 1fr", gap: 32, padding: "26px 0", borderBottom: "1px solid #E5E7EB", alignItems: "baseline" }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: B, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 700, color: INK, letterSpacing: "-.01em" }}>{s.cat}</h3>
                </div>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#374151", lineHeight: 1.75 }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Software — header styled like the hero's first label */}
      <section style={{ background: "#F5F5F3", borderTop: "1px solid #E5E7EB", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionLabel>{t.tools.tag}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 700, color: INK, lineHeight: 1.05, letterSpacing: "-.03em", marginBottom: 44, whiteSpace: "pre-line", maxWidth: 640 }}>{t.tools.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {t.tools.items.map((tool) => (
              <div key={tool} style={{ padding: "10px 18px", background: "#fff", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 600, color: "#374151", letterSpacing: ".02em" }}>{tool}</div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .tech-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </PageLayout>
  );
}
