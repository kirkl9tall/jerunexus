"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";

export default function ServicePage() {
  const params = useParams();
  const t = getDictionary(String(params.lang ?? "de-CH"));
  const page = t.servicePages["website"];
  if (!page) return <div style={{ padding: 200, textAlign: "center", fontSize: 20 }}>Page not found</div>;

  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <a href={`/${params.lang}`} style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none" }}>Home</a>
            <span style={{ color: "rgba(255,255,255,.2)" }}>/</span>
            <a href={`/${params.lang}/leistungen`} style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none" }}>Leistungen</a>
            <span style={{ color: "rgba(255,255,255,.2)" }}>/</span>
            <span style={{ color: B, fontSize: 14, fontWeight: 600 }}>{page.title}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>{page.title}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.55)", lineHeight: 1.7, maxWidth: 600 }}>{page.heroSub}</p>
        </div>
      </section>

      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {(page.sections as Array<{t:string;p?:string;items?:string[]}>)?.map((sec) => (
            <div key={sec.t} style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 4, height: 32, borderRadius: 4, background: B }} />
                <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a" }}>{sec.t}</h2>
              </div>
              {sec.p && <p style={{ fontSize: 16, lineHeight: 1.85, color: "#475569", marginBottom: 24, paddingLeft: 18 }}>{sec.p}</p>}
              {sec.items && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, paddingLeft: 18 }}>
                  {sec.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", borderRadius: 12, background: "#f8fafc", border: "1px solid #e2e8f0", transition: "all .3s" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: "#e0edff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: B, fontSize: 12, fontWeight: 700 }}>✓</span>
                      </div>
                      <span style={{ fontSize: 14, color: "#475569", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: B, padding: "70px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>Kontaktieren Sie uns</h2>
        <p style={{ color: "rgba(255,255,255,.7)", marginBottom: 28, fontSize: 16 }}>Vereinbaren Sie ein kostenloses Erstgespräch.</p>
        <a href={`/${params.lang}/kontakt`} style={{ display: "inline-block", background: "#fff", color: B, padding: "16px 40px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>Kontakt aufnehmen →</a>
      </section>
    </PageLayout>
  );
}
