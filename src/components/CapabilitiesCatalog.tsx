"use client";

const B   = "#2563EB";
const INK = "#0A0A0A";

type Item = { title: string; desc: string };
type Group = { label: string; items: ReadonlyArray<Item> };
export type CapabilitiesData = {
  tag: string;
  title: string;
  sub: string;
  groups: ReadonlyArray<Group>;
};

/**
 * Themed catalog of productized solutions, rendered as a grouped, numbered
 * card grid. Pass the dictionary's `capabilities` block; reusable across pages.
 */
export default function CapabilitiesCatalog({ data }: Readonly<{ data: CapabilitiesData }>) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{data.tag}</span>
      </div>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 700, color: INK, lineHeight: 1.05, letterSpacing: "-.03em", marginBottom: 20, whiteSpace: "pre-line", maxWidth: 640 }}>{data.title}</h2>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 14, color: "#6B7280", lineHeight: 1.75, maxWidth: 620, marginBottom: 60 }}>{data.sub}</p>

      {data.groups.map((g, gi) => {
        const offset = data.groups.slice(0, gi).reduce((sum, gg) => sum + gg.items.length, 0);
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

      <style>{`
        .cap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 16px; }
        .cap-card { padding: 24px 22px; background: #F5F5F3; border: 1px solid #E5E7EB; transition: transform .2s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease; }
        .cap-card:hover { background: #fff; border-color: #2563EB; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.07); }
      `}</style>
    </>
  );
}
