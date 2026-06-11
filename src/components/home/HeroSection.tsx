"use client";
import { useRouter } from "next/navigation";
import Reveal from "./Reveal";
import type { SectionProps } from "./types";

const B = "#2563EB";
const BD = "#1d4ed8";

const HIGHLIGHT_ICONS = [
  <><rect key="r" x="3" y="11" width="18" height="11" rx="2"/><path key="p" d="M7 11V7a5 5 0 0110 0v4"/></>,
  <><circle key="c" cx="12" cy="12" r="10"/><line key="l1" x1="2" y1="12" x2="22" y2="12"/><path key="p" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
  <><rect key="r" x="2" y="3" width="20" height="14" rx="2"/><line key="l1" x1="12" y1="17" x2="12" y2="21"/><path key="p" d="M10 10h4M12 8v4"/></>,
];

function cardRadius(i: number): string {
  if (i === 0) return "12px 0 0 12px";
  if (i === 2) return "0 12px 12px 0";
  return "0";
}

export default function HeroSection({ t, lang }: Readonly<SectionProps>) {
  const router = useRouter();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="hero-bg">
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "140px 32px 120px", position: "relative", width: "100%" }}>
        <Reveal>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 16, marginBottom: 12, letterSpacing: ".03em", textTransform: "uppercase", fontWeight: 500 }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 2, background: B, marginRight: 10, verticalAlign: "middle" }} />
            {t.hero.pre}
          </p>
        </Reveal>
        <Reveal delay={.08}>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(52px,8vw,110px)", fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{t.hero.h1}</h1>
        </Reveal>
        <Reveal delay={.15}>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: "clamp(17px,2.2vw,24px)", fontWeight: 400, margin: "16px 0 12px", maxWidth: 600 }}>
            {t.hero.post}<span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 2, background: B, marginLeft: 10, verticalAlign: "middle" }} />
          </p>
        </Reveal>
        <Reveal delay={.2}>
          <p style={{ color: "rgba(255,255,255,.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 540, marginBottom: 40 }}>{t.hero.p}</p>
        </Reveal>
        <Reveal delay={.28}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <button onClick={() => scrollTo("services")}
              style={{ background: B, border: "none", borderRadius: 6, padding: "14px 32px", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "inherit", transition: "all .3s", display: "flex", alignItems: "center", gap: 8, letterSpacing: ".04em", textTransform: "uppercase" }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onFocus={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}
              onBlur={(e) => (e.currentTarget.style.background = B)}>{t.hero.btn1} →</button>
            <button onClick={() => router.push(`/${lang}/kontakt`)}
              style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,.3)", borderRadius: 6, padding: "14px 32px", color: "#fff", fontSize: 15, fontWeight: 500, fontFamily: "inherit", transition: "all .3s", display: "flex", alignItems: "center", gap: 8, letterSpacing: ".04em", textTransform: "uppercase" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = "#fff"; }}
              onFocus={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}
              onBlur={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}>{t.hero.btn2} →</button>
          </div>
        </Reveal>

        <button className="quote-btn" onClick={() => router.push(`/${lang}/kontakt`)}>
          {t.hero.quote.split("\n").map((l) => <span key={l}>{l}</span>)}
          <span style={{ marginTop: 5, fontSize: 16 }}>↓</span>
        </button>
      </div>

      {/* Highlight cards */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", top: 40, zIndex: 10 }}>
        <div className="hl-wrap" style={{ display: "flex", gap: 0 }}>
          {t.highlights.map((h, i) => (
            <div key={h.t} className={`hl-card${i === 1 ? " active" : ""}`}
              style={{ borderRadius: cardRadius(i) }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: i === 1 ? "rgba(255,255,255,.15)" : "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === 1 ? "#fff" : B} strokeWidth="1.5">{HIGHLIGHT_ICONS[i]}</svg>
                </div>
                <div>
                  <h3 className="hl-t" style={{ fontSize: 16, fontWeight: 700, color: i === 1 ? "#fff" : "#0f172a", marginBottom: 6 }}>{h.t}</h3>
                  <p className="hl-d" style={{ fontSize: 13, lineHeight: 1.6, color: i === 1 ? "rgba(255,255,255,.8)" : "#64748b" }}>{h.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
