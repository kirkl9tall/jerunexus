"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";

const B = "#2563EB";
const BG = "#0f172a";

export default function Footer() {
  const params = useParams();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const l1Links = t.footer.l1.map((_, i) => {
    const slugs = ["it-sicherheit", "netzwerk", "server-cloud", "praxissoftware", "labor", "managed-it"];
    return `/${lang}/leistungen/${slugs[i] ?? ""}`;
  });
  const l2Links = [`/${lang}/kontakt`, `/${lang}/datenschutz`, `/${lang}/impressum`];
  const l3Links = [`/${lang}/ueber-uns`, `/${lang}/technologie`, `/${lang}/preise`, `/${lang}/kontakt`];
  const legalLinks = [`/${lang}/datenschutz`, `/${lang}/datenschutz`, `/${lang}/impressum`, `/${lang}/impressum`];

  const colLinks = [l1Links, l2Links, l3Links];

  return (
    <>
      {/* Newsletter */}
      <div style={{ padding: "48px 32px", borderBottom: "1px solid #eee", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.3, whiteSpace: "pre-line" }}>
            {t.newsletter.title}
          </h3>
          <div style={{ display: "flex", gap: 0 }}>
            <input
              placeholder={t.newsletter.placeholder}
              aria-label={t.newsletter.placeholder}
              style={{ padding: "12px 18px", border: "1px solid #e2e8f0", borderRadius: "8px 0 0 8px", fontSize: 14, outline: "none", width: 260, color: "#1e293b", background: "#f8fafc" }}
            />
            <button style={{ background: B, border: "none", borderRadius: "0 8px 8px 0", padding: "12px 24px", color: "#fff", fontSize: 13, fontWeight: 700, letterSpacing: ".06em", cursor: "pointer" }}>
              ✉ {t.newsletter.btn}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: BG, padding: "56px 32px 32px", color: "#94a3b8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fb" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            {/* Brand column */}
            <div>
              <a href={`/${lang}`} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, textDecoration: "none" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${B},#06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>JN</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 18, color: "#e2e8f0" }}>jerumed<span style={{ color: B }}>nexus</span></span>
              </a>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 300 }}>{t.footer.desc}</p>
            </div>

            {/* Link columns */}
            {t.footer.cols.map((col, ci) => (
              <div key={col}>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 18, position: "relative", paddingBottom: 12 }}>
                  {col}<span style={{ position: "absolute", bottom: 0, left: 0, width: 32, height: 2, background: B }} />
                </h4>
                {[t.footer.l1, t.footer.l2, t.footer.l3][ci]?.map((label, i) => (
                  <a key={label} href={colLinks[ci]?.[i] ?? "#"} className="ft-l">{label}</a>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }} className="ft-bot">
            <p style={{ fontSize: 13, color: "#475569" }}>{t.footer.copy}</p>
            <div style={{ display: "flex", gap: 16 }}>
              {t.footer.legal.map((label, i) => (
                <a key={label} href={legalLinks[i] ?? "#"} style={{ fontSize: 13, color: "#475569", textDecoration: "none" }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
