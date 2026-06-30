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

/** Editorial numbered spec sheet: NN · category · values. Shared by stack + tools. */
function SpecList({ rows }: Readonly<{ rows: ReadonlyArray<{ cat: string; val: string }> }>) {
  return (
    <div style={{ borderTop: "1px solid #E5E7EB" }}>
      {rows.map((s, i) => (
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
  );
}

export default function TechnologyPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.technology;
  const cap = p.capabilities;

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
          <SpecList rows={p.stack} />
        </div>
      </section>

      {/* Capabilities — themed catalog of productized solutions */}
      <section style={{ borderTop: "1px solid #E5E7EB", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionLabel>{cap.tag}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 700, color: INK, lineHeight: 1.05, letterSpacing: "-.03em", marginBottom: 20, whiteSpace: "pre-line", maxWidth: 640 }}>{cap.title}</h2>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#6B7280", lineHeight: 1.75, maxWidth: 620, marginBottom: 60 }}>{cap.sub}</p>

          {cap.groups.map((g, gi) => {
            const offset = cap.groups.slice(0, gi).reduce((sum, gg) => sum + gg.items.length, 0);
            return (
              <div key={g.label} style={{ marginTop: gi === 0 ? 0 : 52 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: INK, letterSpacing: ".12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{g.label}</span>
                  <span style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#9CA3AF" }}>{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <div className="cap-grid">
                  {g.items.map((it, ii) => (
                    <div key={it.title} className="cap-card">
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".06em" }}>{String(offset + ii + 1).padStart(2, "0")}</span>
                      <h3 style={{ marginTop: 10, marginBottom: 10, fontFamily: "'Space Grotesk',sans-serif", fontSize: 16.5, fontWeight: 700, color: INK, lineHeight: 1.25, letterSpacing: "-.01em" }}>{it.title}</h3>
                      <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#6B7280" }}>{it.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tools & Software — header styled like the hero's first label */}
      <section style={{ background: "#F5F5F3", borderTop: "1px solid #E5E7EB", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionLabel>{t.tools.tag}</SectionLabel>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 700, color: INK, lineHeight: 1.05, letterSpacing: "-.03em", marginBottom: 44, whiteSpace: "pre-line", maxWidth: 640 }}>{t.tools.title}</h2>
          <SpecList rows={t.tools.groups} />
        </div>
      </section>

      <style>{`
        .cap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 16px; }
        .cap-card { padding: 24px 22px; background: #F5F5F3; border: 1px solid #E5E7EB; transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease; }
        .cap-card:hover { background: #fff; border-color: #2563EB; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.07); }
        @media (max-width: 640px) {
          .tech-row { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </PageLayout>
  );
}
