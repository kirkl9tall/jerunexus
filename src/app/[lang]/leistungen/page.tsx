"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";
import CapabilitiesCatalog from "@/components/CapabilitiesCatalog";

const B   = "#2563EB";
const INK = "#0A0A0A";

const slugs = ["it-sicherheit","netzwerk","server-cloud","praxissoftware","labor","kommunikation","backup","website","managed-it","beratung","telemedizin","schulung"];

const groups = [
  { tag: "SICHERHEIT & INFRASTRUKTUR",      tagEn: "SECURITY & INFRASTRUCTURE",        indices: [0,1,2,6]    },
  { tag: "MEDIZINISCHE SOFTWARE",            tagEn: "MEDICAL SOFTWARE & INTEGRATION",   indices: [3,4,5,10]   },
  { tag: "MANAGED SERVICES & BERATUNG",      tagEn: "MANAGED SERVICES & CONSULTING",    indices: [8,9,11]     },
  { tag: "DIGITALE PRÄSENZ",                 tagEn: "DIGITAL PRESENCE",                 indices: [7]          },
];

export default function ServicesPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const isEn = lang === "en";

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.services.tag}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20, whiteSpace: "pre-line" }}>{t.services.title}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.4)", maxWidth: 560 }}>{t.services.sub ?? ""}</p>
        </div>
      </section>

      {/* Category anchors */}
      <div style={{ background: "#F5F5F3", borderBottom: "1px solid #E5E7EB", padding: "16px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {groups.map((g, gi) => (
            <button key={g.tag}
              onClick={() => document.getElementById(`group-${gi}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              style={{ padding: "7px 16px", border: "1px solid #D1D5DB", background: "#fff", fontSize: 11, fontFamily: "'DM Mono',monospace", letterSpacing: ".08em", color: "#6B7280", cursor: "pointer", transition: "all .2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = INK; }}
              onFocus={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = INK; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
              onBlur={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#6B7280"; e.currentTarget.style.borderColor = "#D1D5DB"; }}>
              {isEn ? g.tagEn : g.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped services */}
      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {groups.map((g, gi) => (
            <div key={g.tag} id={`group-${gi}`} style={{ marginBottom: 80, scrollMarginTop: 140 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em" }}>{String(gi + 1).padStart(2, "0")}</span>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: INK, letterSpacing: "-.02em" }}>{isEn ? g.tagEn : g.tag}</h2>
                <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
              </div>

              {/* Container draws the top + left edges; every cell draws its right + bottom.
                  This keeps the grid lines complete even when a group's last row is partial. */}
              <div className="sg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, borderTop: "1px solid #E5E7EB", borderLeft: "1px solid #E5E7EB" }}>
                {g.indices.map((idx) => {
                  const s = t.services.items[idx];
                  if (!s) return null;
                  return (
                    <a key={idx} href={`/${lang}/leistungen/${slugs[idx]}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div className="svc-card" style={{ borderTop: "none", borderRight: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB", height: "100%" }}>
                        <div className="svc-ico" style={{ width: 44, height: 44, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "background .2s" }}>
                          <span className="svc-num" style={{ fontFamily: "'DM Mono',monospace", fontWeight: 500, fontSize: 13 }}>{String(idx + 1).padStart(2, "0")}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, color: INK, marginBottom: 10 }}>{s.t}</h3>
                        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6B7280", marginBottom: 20 }}>{s.d}</p>
                        <span style={{ fontSize: 12, fontWeight: 600, color: B, letterSpacing: ".06em", textTransform: "uppercase" }}>{t.services.learnMore} →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specialised solutions & productized add-ons */}
      <section style={{ borderTop: "1px solid #E5E7EB", padding: "90px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Shared capabilities catalog (the same block also appears on the Technology page). */}
          <CapabilitiesCatalog data={t.pages.technology.capabilities} />
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: B, padding: "48px 40px" }}>
        <div className="stb" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24, textAlign: "center" }}>
          {t.stats.map((s) => (
            <div key={s.n}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.7)", marginTop: 8, letterSpacing: ".06em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
