"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const INK = "#0A0A0A";

export default function ServicePage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const page = t.servicePages["netzwerk"];
  if (!page) return <div style={{ padding: 200, textAlign: "center", fontSize: 20 }}>{t.pages.notFound}</div>;

  return (
    <PageLayout>
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
            <a href={`/${lang}`} style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,.35)", fontSize: 11, textDecoration: "none", letterSpacing: ".08em" }}>Home</a>
            <span style={{ color: "rgba(255,255,255,.15)", fontSize: 11 }}>/</span>
            <a href={`/${lang}/leistungen`} style={{ fontFamily: "'DM Mono',monospace", color: "rgba(255,255,255,.35)", fontSize: 11, textDecoration: "none", letterSpacing: ".08em" }}>{t.nav.items[1]}</a>
            <span style={{ color: "rgba(255,255,255,.15)", fontSize: 11 }}>/</span>
            <span style={{ fontFamily: "'DM Mono',monospace", color: B, fontSize: 11, letterSpacing: ".08em" }}>{page.title}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20 }}>{page.title}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.4)", lineHeight: 1.7, maxWidth: 600 }}>{page.heroSub}</p>
        </div>
      </section>

      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {(page.sections as Array<{ t: string; p?: string; items?: string[] }>)?.map((sec, si) => (
            <div key={sec.t} style={{ marginBottom: 64, paddingBottom: 64, borderBottom: "1px solid #E5E7EB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em" }}>{String(si + 1).padStart(2, "0")}</span>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, color: INK, letterSpacing: "-.02em" }}>{sec.t}</h2>
              </div>
              {sec.p && <p style={{ fontSize: 16, lineHeight: 1.85, color: "#6B7280", marginBottom: 32, maxWidth: 720 }}>{sec.p}</p>}
              {sec.items && (
                <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: "1px solid #E5E7EB" }}>
                  {sec.items.map((item, ii) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 20px", borderRight: (ii + 1) % 3 === 0 ? "none" : "1px solid #E5E7EB", borderBottom: ii >= (sec.items?.length ?? 0) - 3 ? "none" : "1px solid #E5E7EB", background: "#fff" }}>
                      <span style={{ color: B, fontSize: 13, fontWeight: 700, flexShrink: 0, lineHeight: "1.6" }}>✓</span>
                      <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: INK, padding: "80px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", marginBottom: 10 }}>{t.servicePageCta.title}</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.4)" }}>{t.servicePageCta.sub}</p>
          </div>
          <a href={`/${lang}/kontakt`}
            style={{ background: B, padding: "14px 32px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", textDecoration: "none", letterSpacing: ".04em", transition: "background .2s", display: "inline-block" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#1d4ed8")}
            onFocus={(e) => (e.currentTarget.style.background = "#1d4ed8")}
            onMouseOut={(e) => (e.currentTarget.style.background = B)}
            onBlur={(e) => (e.currentTarget.style.background = B)}>
            {t.servicePageCta.btn}
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
