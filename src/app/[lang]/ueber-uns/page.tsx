"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";

export default function AboutPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.about;

  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-30%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,.08), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 12 }}>{p.heroTitle}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.55)" }}>{p.heroSub}</p>
        </div>
      </section>

      <section style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto" }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{p.story.tag}</span>
        <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 700, marginTop: 10, marginBottom: 24, color: "#0f172a", whiteSpace: "pre-line" }}>{p.story.title}</h2>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "#475569", marginBottom: 16 }}>{p.story.p1}</p>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "#475569" }}>{p.story.p2}</p>
      </section>

      <section style={{ background: "#f8fafc", padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div style={{ padding: 32, borderRadius: 16, background: "#fff", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{p.mission.tag}</span>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 8, marginBottom: 12, color: "#0f172a" }}>{p.mission.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#475569" }}>{p.mission.p}</p>
          </div>
          <div style={{ padding: 32, borderRadius: 16, background: "#fff", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{p.vision.tag}</span>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 8, marginBottom: 12, color: "#0f172a" }}>{p.vision.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#475569" }}>{p.vision.p}</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.team.tag}</span>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.team.title}</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
          {t.team.members.map((m) => (
            <div key={m.name} style={{ textAlign: "center", padding: "36px 24px", borderRadius: 16, border: "1px solid #eee", background: "#fff" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, fontWeight: 700, color: B }}>{m.img}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{m.name}</h3>
              <p style={{ fontSize: 13, fontWeight: 600, color: B, marginBottom: 12 }}>{m.role}</p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#64748b" }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: B, padding: "70px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 24 }}>{t.ctaBanner.title.replace("\n"," ")}</h2>
        <a href={`/${lang}/kontakt`} style={{ display: "inline-block", background: "#fff", color: B, padding: "16px 40px", borderRadius: 10, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>Kontakt →</a>
      </section>
    </PageLayout>
  );
}
