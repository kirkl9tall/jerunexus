"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const INK = "#0A0A0A";

export default function AboutPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.about;

  return (
    <PageLayout>
      {/* Hero */}
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{p.story.tag}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20 }}>{p.heroTitle}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.4)", maxWidth: 560 }}>{p.heroSub}</p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="hp" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 28, whiteSpace: "pre-line" }}>{p.story.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#6B7280", marginBottom: 20 }}>{p.story.p1}</p>
              <p style={{ fontSize: 16, lineHeight: 1.85, color: "#6B7280" }}>{p.story.p2}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {[
                { tag: p.mission.tag, title: p.mission.title, body: p.mission.p, dark: true },
                { tag: p.vision.tag,  title: p.vision.title,  body: p.vision.p,  dark: false },
              ].map((card) => (
                <div key={card.tag} style={{ padding: "36px 28px", background: card.dark ? INK : "#F5F5F3", border: card.dark ? "none" : "1px solid #E5E7EB" }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: B, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 14 }}>{card.tag}</p>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: card.dark ? "#fff" : INK, marginBottom: 12 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: card.dark ? "rgba(255,255,255,.5)" : "#6B7280" }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#F5F5F3", borderTop: "1px solid #E5E7EB", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.team.tag}</span>
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 56, whiteSpace: "pre-line" }}>{t.team.title}</h2>

          <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, border: "1px solid #E5E7EB" }}>
            {t.team.members.map((m, i) => (
              <div key={m.name} style={{ padding: "36px 28px", borderRight: i < 3 ? "1px solid #E5E7EB" : "none", background: "#fff" }}>
                <div style={{ width: 56, height: 56, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: B }}>{m.img}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: INK, marginBottom: 4 }}>{m.name}</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: B, marginBottom: 12, letterSpacing: ".04em", textTransform: "uppercase" }}>{m.role}</p>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6B7280" }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
