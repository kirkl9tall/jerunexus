"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";
const BG = "#0f172a";

const groups = [
  {
    tag: "SICHERHEIT & INFRASTRUKTUR",
    tagEn: "SECURITY & INFRASTRUCTURE",
    color: "#ef4444",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    indices: [0, 1, 2, 6],
  },
  {
    tag: "MEDIZINISCHE SOFTWARE & INTEGRATION",
    tagEn: "MEDICAL SOFTWARE & INTEGRATION",
    color: "#06b6d4",
    icon: "M22 12h-4l-3 9L9 3l-3 9H2",
    indices: [3, 4, 5, 10],
  },
  {
    tag: "MANAGED SERVICES & BERATUNG",
    tagEn: "MANAGED SERVICES & CONSULTING",
    color: "#8b5cf6",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    indices: [8, 9, 11],
  },
  {
    tag: "DIGITALE PRÄSENZ",
    tagEn: "DIGITAL PRESENCE",
    color: "#f59e0b",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
    indices: [7],
  },
];

const slugs = ["it-sicherheit","netzwerk","server-cloud","praxissoftware","labor","kommunikation","backup","website","managed-it","beratung","telemedizin","schulung"];

export default function ServicesPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const isEn = lang === "en";

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${BG} 0%, #1e293b 100%)`, padding: "120px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.services.tag}</span>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginTop: 12, whiteSpace: "pre-line" }}>{t.services.title}</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
            <a href={`/${lang}`} style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none" }}>Home</a>
            <span style={{ color: "rgba(255,255,255,.2)" }}>/</span>
            <span style={{ color: B, fontSize: 14, fontWeight: 600 }}>{isEn ? "Services" : "Leistungen"}</span>
          </div>
        </div>
      </section>

      {/* Category quick nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee", padding: "20px 32px", position: "sticky", top: 72, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {groups.map((g, gi) => (
            <button key={g.tag} onClick={() => document.getElementById(`group-${gi}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", fontSize: 13, fontWeight: 600, color: "#475569", cursor: "pointer", transition: "all .3s", fontFamily: "inherit" }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.color = g.color; e.currentTarget.style.background = g.color + "08"; }}
              onFocus={(e) => { e.currentTarget.style.borderColor = g.color; e.currentTarget.style.color = g.color; e.currentTarget.style.background = g.color + "08"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "#fff"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "#fff"; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="1.5"><path d={g.icon}/></svg>
              {isEn ? g.tagEn : g.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped services */}
      <section style={{ padding: "60px 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
        {groups.map((g, gi) => (
          <div key={g.tag} id={`group-${gi}`} style={{ marginBottom: 80, scrollMarginTop: 160 }}>
            {/* Group header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: g.color + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="1.5"><path d={g.icon}/></svg>
              </div>
              <div>
                <h2 style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "#0f172a" }}>{isEn ? g.tagEn : g.tag}</h2>
                <div style={{ width: 48, height: 3, borderRadius: 4, background: g.color, marginTop: 8 }} />
              </div>
            </div>

            {/* Service cards in group */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {g.indices.map((idx) => {
                const s = t.services.items[idx];
                if (!s) return null;
                return (
                  <a key={idx} href={`/${lang}/leistungen/${slugs[idx]}`}
                    style={{ textDecoration: "none", color: "inherit", display: "block", padding: "28px 24px", borderRadius: 16, border: "1px solid #eee", background: "#fff", transition: "all .35s", height: "100%", position: "relative", overflow: "hidden" }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${g.color}12`; e.currentTarget.style.borderColor = g.color + "40"; }}
                    onFocus={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${g.color}12`; e.currentTarget.style.borderColor = g.color + "40"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#eee"; }}
                    onBlur={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#eee"; }}>
                    {/* Top accent line */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: g.color, opacity: 0.6 }} />

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: g.color + "10", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: g.color }}>
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a" }}>{s.t}</h3>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: "#64748b", marginBottom: 16 }}>{s.d}</p>
                    <span style={{ fontSize: 12, fontWeight: 700, color: g.color, letterSpacing: ".06em", textTransform: "uppercase" }}>
                      {t.services.learnMore} →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Stats bar */}
      <div style={{ background: B, padding: "36px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24, textAlign: "center" }}>
          {t.stats.map((s) => (
            <div key={s.n}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff" }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${BG}, #1e293b)`, padding: "80px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
          {isEn ? "Ready for professional IT?" : "Bereit für professionelle IT?"}
        </h2>
        <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 32, fontSize: 16, maxWidth: 500, margin: "0 auto 32px" }}>{t.ctaBanner.p}</p>
        <a href={`/${lang}/kontakt`} style={{ display: "inline-block", background: B, color: "#fff", padding: "16px 40px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 15, transition: "transform .2s" }}
          onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
          onFocus={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = "none"; }}
          onBlur={(e) => { e.currentTarget.style.transform = "none"; }}>
          {t.ctaBanner.btn} →
        </a>
      </section>
    </PageLayout>
  );
}
