"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";
import { team } from "@/lib/team";
import { pillars, journey, differentiators, badges, partners, testimonials, type PartnerEntity } from "@/lib/about-data";

const B    = "#2563EB";
const INK  = "#0A0A0A";
const OFF  = "#F5F5F3";
const LINE  = "#E5E7EB";
const MUTED = "#6B7280";

/** Blue mono eyebrow used above each section (matches the rest of the site). */
function Eyebrow({ children, center = false }: Readonly<{ children: React.ReactNode; center?: boolean }>) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: center ? "center" : "flex-start", gap: 12, marginBottom: 20 }}>
      <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{children}</span>
      {center && <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />}
    </div>
  );
}

const h2Style: React.CSSProperties = { fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 48, whiteSpace: "pre-line" };

const LinkedInIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z"/></svg>
);
const GitHubIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48l-.01-1.7c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.36 1.11 2.94.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.58.69.48A10.02 10.02 0 0022 12.26C22 6.58 17.52 2 12 2z"/></svg>
);

/** A partner entity: real logo where available, otherwise a tech-style text badge. */
function PartnerBadge({ e }: Readonly<{ e: PartnerEntity }>) {
  if (e.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={e.logo} alt={e.name} className="ab-logo" style={{ height: 26, width: "auto", objectFit: "contain" }} loading="lazy" />
    );
  }
  return <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#374151", background: OFF, border: `1px solid ${LINE}`, borderRadius: 8, padding: "8px 16px" }}>{e.name}</span>;
}

export default function AboutPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.about;
  const groupLabels = p.partners.groups as Record<string, string>;

  return (
    <PageLayout>
      {/* 1 · Hero */}
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

      {/* 2 · Stats bar */}
      <section style={{ background: OFF, borderBottom: `1px solid ${LINE}`, padding: "56px 40px" }}>
        <div className="ab-stats" style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24 }}>
          {p.stats.map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,4vw,48px)", fontWeight: 700, color: B, letterSpacing: "-.03em", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: MUTED, marginTop: 10, letterSpacing: ".04em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · What we do — pillars */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Eyebrow>{p.pillars.tag}</Eyebrow>
          <h2 style={h2Style}>{p.pillars.title}</h2>
          <div className="ab-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {pillars.map((pl, i) => {
              const it = p.pillars.items[i];
              if (!it) return null;
              return (
                <div key={pl.id} className="ab-card" style={{ padding: "32px 28px", background: "#fff", border: `1px solid ${LINE}` }}>
                  <div style={{ fontSize: 30, marginBottom: 18 }}>{pl.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: INK, marginBottom: 12, letterSpacing: "-.01em" }}>{it.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: MUTED }}>{it.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 + 5 · Story + Mission/Vision */}
      <section style={{ background: OFF, borderTop: `1px solid ${LINE}`, padding: "100px 40px" }}>
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
                <div key={card.tag} style={{ padding: "36px 28px", background: card.dark ? INK : "#fff", border: card.dark ? "none" : `1px solid ${LINE}` }}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: B, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 14 }}>{card.tag}</p>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: card.dark ? "#fff" : INK, marginBottom: 12 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: card.dark ? "rgba(255,255,255,.5)" : "#6B7280" }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 · Our journey — vertical timeline */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Eyebrow>{p.journey.tag}</Eyebrow>
          <h2 style={h2Style}>{p.journey.title}</h2>
          <div style={{ position: "relative", paddingLeft: 34 }}>
            <span style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: LINE }} />
            {journey.map((j, i) => {
              const it = p.journey.items[i];
              if (!it) return null;
              return (
                <div key={j.id} style={{ position: "relative", paddingBottom: i < journey.length - 1 ? 40 : 0 }}>
                  <span style={{ position: "absolute", left: -34, top: 3, width: 12, height: 12, borderRadius: "50%", background: B, boxShadow: "0 0 0 4px #fff" }} />
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8, letterSpacing: "-.01em" }}>{it.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.7, color: MUTED }}>{it.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7 · Why Jerumed Nexus — differentiators */}
      <section style={{ background: OFF, borderTop: `1px solid ${LINE}`, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Eyebrow>{p.why.tag}</Eyebrow>
          <h2 style={h2Style}>{p.why.title}</h2>
          <div className="ab-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {differentiators.map((d, i) => {
              const it = p.why.items[i];
              if (!it) return null;
              return (
                <div key={d.id} className="ab-card" style={{ padding: "30px 26px", background: "#fff", border: `1px solid ${LINE}` }}>
                  <div style={{ fontSize: 26, marginBottom: 16 }}>{d.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: INK, marginBottom: 10, letterSpacing: "-.01em" }}>{it.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: MUTED }}>{it.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 · Compliance & standards strip */}
      <section style={{ padding: "80px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow center>{p.compliance.tag}</Eyebrow>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", marginBottom: 36 }}>{p.compliance.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 26 }}>
            {badges.map((bd, i) => (
              <span key={bd.id} style={{ fontFamily: "'DM Mono',monospace", fontSize: 12.5, color: "#374151", background: OFF, border: `1px solid ${LINE}`, borderRadius: 8, padding: "9px 16px", letterSpacing: ".02em" }}>{p.compliance.badges[i]}</span>
            ))}
          </div>
          <p style={{ fontSize: 13, fontStyle: "italic", color: "#9CA3AF", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>{p.compliance.disclaimer}</p>
        </div>
      </section>

      {/* 9 · Expanded team */}
      <section style={{ background: OFF, borderTop: `1px solid ${LINE}`, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Eyebrow>{p.team.tag}</Eyebrow>
          <h2 style={h2Style}>{p.team.title}</h2>
          <div className="ab-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {team.map((m, i) => {
              const it = p.team.members[i];
              if (!it) return null;
              return (
                <div key={m.id} style={{ padding: "32px 30px", background: "#fff", border: `1px solid ${LINE}`, display: "flex", gap: 22 }}>
                  <div style={{ flexShrink: 0 }}>
                    {m.photo
                      ? <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundImage: `url(${m.photo})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                      : <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20, color: B }}>{m.initials}</div>}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: INK, marginBottom: 3 }}>{m.name}</h3>
                    <p style={{ fontSize: 12, fontWeight: 600, color: B, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 12 }}>{it.role}</p>
                    <p style={{ fontSize: 13.5, lineHeight: 1.65, color: MUTED, marginBottom: 14 }}>{it.bio}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: (m.linkedin || m.github) ? 14 : 0 }}>
                      {m.expertise.map((x) => (
                        <span key={x} style={{ fontFamily: "'DM Mono',monospace", fontSize: 10.5, color: "#374151", background: OFF, border: `1px solid ${LINE}`, borderRadius: 6, padding: "4px 9px" }}>{x}</span>
                      ))}
                    </div>
                    {(m.linkedin || m.github) && (
                      <div style={{ display: "flex", gap: 12 }}>
                        {m.linkedin && <a className="ab-social" href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} style={{ color: MUTED, display: "inline-flex" }}>{LinkedInIcon}</a>}
                        {m.github && <a className="ab-social" href={m.github} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on GitHub`} style={{ color: MUTED, display: "inline-flex" }}>{GitHubIcon}</a>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10 · Partners & ecosystem */}
      <section style={{ padding: "100px 40px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Eyebrow>{p.partners.tag}</Eyebrow>
          <h2 style={h2Style}>{p.partners.title}</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {partners.map((g) => (
              <div key={g.id} className="ab-prow" style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", borderTop: `1px solid ${LINE}`, padding: "22px 0" }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: MUTED, letterSpacing: ".1em", textTransform: "uppercase", minWidth: 210 }}>{groupLabels[g.id]}</span>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                  {g.entities.map((e) => <PartnerBadge key={e.name} e={e} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · Case notes / testimonials */}
      <section style={{ background: OFF, borderTop: `1px solid ${LINE}`, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <Eyebrow>{p.testimonials.tag}</Eyebrow>
          <h2 style={h2Style}>{p.testimonials.title}</h2>
          <div className="ab-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {testimonials.map((ts, i) => {
              const it = p.testimonials.items[i];
              if (!it) return null;
              return (
                <div key={ts.id} style={{ padding: "36px 34px", background: "#fff", border: `1px solid ${LINE}`, position: "relative" }}>
                  <span aria-hidden="true" style={{ fontFamily: "Georgia,serif", fontSize: 64, lineHeight: 1, color: "rgba(37,99,235,.16)", position: "absolute", top: 14, right: 22 }}>&rdquo;</span>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: INK, marginBottom: 20, position: "relative" }}>{it.quote}</p>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: B, letterSpacing: ".04em" }}>— {it.attribution}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12 · Dual CTA */}
      <section style={{ background: INK, padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow center>{p.cta.tag}</Eyebrow>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 36, whiteSpace: "pre-line" }}>{p.cta.title}</h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`/${lang}/kontakt`} style={{ background: B, color: "#fff", padding: "15px 34px", fontSize: 15, fontWeight: 600, textDecoration: "none", letterSpacing: ".03em", display: "inline-block" }}>{p.cta.primary} →</a>
            <a href={`/${lang}/preise`} style={{ background: "none", color: "#fff", border: "1px solid rgba(255,255,255,.3)", padding: "15px 34px", fontSize: 15, fontWeight: 600, textDecoration: "none", letterSpacing: ".03em", display: "inline-block" }}>{p.cta.secondary}</a>
          </div>
        </div>
      </section>

      <style>{`
        .ab-card { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .ab-card:hover { border-color: #2563EB; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.06); }
        .ab-social { transition: color .2s ease; }
        .ab-social:hover { color: #2563EB; }
        .ab-logo { filter: grayscale(100%); opacity: .6; transition: filter .3s ease, opacity .3s ease; }
        .ab-logo:hover { filter: grayscale(0); opacity: 1; }
        @media (max-width: 1024px) {
          .ab-4 { grid-template-columns: repeat(2,1fr) !important; }
          .ab-3 { grid-template-columns: repeat(2,1fr) !important; }
          .hp   { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 720px) {
          .ab-stats { grid-template-columns: repeat(2,1fr) !important; gap: 32px 16px !important; }
          .ab-4, .ab-3, .ab-2 { grid-template-columns: 1fr !important; }
          .ab-prow { align-items: flex-start !important; }
        }
      `}</style>
    </PageLayout>
  );
}
