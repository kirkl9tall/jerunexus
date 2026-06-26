"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B = "#2563EB";
const INK = "#0A0A0A";

/**
 * Shared template for every `/[lang]/leistungen/<slug>` service detail page.
 * All service pages render through this single component via the dynamic
 * `[slug]` route — content still comes from the translation dictionary via
 * `t.servicePages[slug]`, so localisation is unchanged.
 */
export default function ServiceDetail() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const slug = String(params.slug ?? "");
  const t = getDictionary(lang);
  const page = (t.servicePages as Record<string, typeof t.servicePages[keyof typeof t.servicePages]>)[slug];
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

      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", borderTop: "1px solid #E5E7EB" }}>
          {(page.sections as Array<{ t: string; p?: string; items?: string[] }>)?.map((sec, si) => (
            <div key={sec.t} className="tech-row" style={{ display: "grid", gridTemplateColumns: "minmax(220px,360px) 1fr", gap: 48, padding: "44px 0", borderBottom: "1px solid #E5E7EB", alignItems: "start" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: B, flexShrink: 0 }}>{String(si + 1).padStart(2, "0")}</span>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 700, color: INK, letterSpacing: "-.02em", lineHeight: 1.15 }}>{sec.t}</h2>
              </div>
              <div>
                {sec.p && <p style={{ fontSize: 16, lineHeight: 1.85, color: "#6B7280", marginBottom: sec.items ? 28 : 0, maxWidth: 720 }}>{sec.p}</p>}
                {sec.items && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "12px 36px" }}>
                    {sec.items.map((item) => (
                      <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ color: B, flexShrink: 0, fontFamily: "'DM Mono',monospace", fontSize: 13, lineHeight: "1.6" }}>+</span>
                        <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
