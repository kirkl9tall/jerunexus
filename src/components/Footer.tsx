"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";

const B   = "#2563EB";
const INK = "#0A0A0A";

export default function Footer() {
  const params = useParams();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const l1Links = t.footer.l1.map((_, i) => {
    const slugs = ["it-sicherheit","netzwerk","server-cloud","praxissoftware","labor","managed-it"];
    return `/${lang}/leistungen/${slugs[i] ?? ""}`;
  });
  const l2Links = [`/${lang}/kontakt`, `/${lang}/datenschutz`, `/${lang}/impressum`];
  const l3Links = [`/${lang}/ueber-uns`, `/${lang}/technologie`, `/${lang}/preise`, `/${lang}/kontakt`];
  const legalLinks = [`/${lang}/datenschutz`, `/${lang}/datenschutz`, `/${lang}/impressum`, `/${lang}/impressum`];
  const colLinks = [l1Links, l2Links, l3Links];

  return (
    <footer style={{ background: INK, padding: "72px 40px 36px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="fb" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 56, marginBottom: 56 }}>
          <div>
            <a href={`/${lang}`} style={{ display: "flex", alignItems: "center", marginBottom: 20, textDecoration: "none" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-.01em" }}>
                jerumed<span style={{ color: B }}>nexus</span>
              </span>
            </a>
            <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.75, maxWidth: 280 }}>{t.footer.desc}</p>
            <div style={{ display: "flex", gap: 2, marginTop: 24 }}>
              {["f","in","𝕏","▶"].map((s) => (
                <div key={s} style={{ width: 32, height: 32, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#6B7280", cursor: "pointer" }}>{s}</div>
              ))}
            </div>
          </div>

          {t.footer.cols.map((col, ci) => (
            <div key={col}>
              <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: ".06em", textTransform: "uppercase" }}>{col}</h4>
              {[t.footer.l1, t.footer.l2, t.footer.l3][ci]?.map((label, i) => (
                <a key={label} href={colLinks[ci]?.[i] ?? "#"} className="ft-l">{label}</a>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24 }}>
          <div className="ft-bot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#374151", letterSpacing: ".04em" }}>{t.footer.copy}</p>
            <div style={{ display: "flex", gap: 24 }}>
              {t.footer.legal.map((label, i) => (
                <a key={label} href={legalLinks[i] ?? "#"} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#374151", textDecoration: "none", letterSpacing: ".04em" }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
