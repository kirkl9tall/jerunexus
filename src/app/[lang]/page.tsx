"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getDictionary, locales } from "@/lib/translations";

const B  = "#2563EB";
const BD = "#1d4ed8";
const INK = "#0A0A0A";

function R({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.07 });
    o.observe(el); return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "" }: { end: string | number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(String(end)) || 0; if (!num) return;
        let cur = 0; const step = Math.max(1, Math.floor(num / 50));
        const iv = setInterval(() => { cur = Math.min(cur + step, num); setVal(cur); if (cur >= num) clearInterval(iv); }, 40);
      }
    }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const SVG_ICONS = [
  <><rect key="r" x="3" y="11" width="18" height="11" rx="2"/><path key="p" d="M7 11V7a5 5 0 0110 0v4"/><circle key="c" cx="12" cy="16" r="1"/></>,
  <><circle key="c" cx="12" cy="12" r="10"/><line key="l" x1="2" y1="12" x2="22" y2="12"/><path key="p" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10"/></>,
  <><path key="p" d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/><polyline key="pl" points="11 15 12 16 14 14"/></>,
  <><rect key="r" x="2" y="3" width="20" height="14" rx="2"/><line key="l1" x1="8" y1="21" x2="16" y2="21"/><line key="l2" x1="12" y1="17" x2="12" y2="21"/><path key="p" d="M10 10h4M12 8v4"/></>,
  <><ellipse key="e" cx="12" cy="5" rx="9" ry="3"/><path key="p1" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path key="p2" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><polyline key="pl" points="15 11 16 12 18 10"/></>,
  <><path key="p" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line key="l" x1="9" y1="10" x2="15" y2="10"/></>,
  <><path key="p" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline key="pl1" points="17 21 17 13 7 13 7 21"/><polyline key="pl2" points="7 3 7 8 15 8"/></>,
  <><rect key="r" x="2" y="3" width="20" height="14" rx="2"/><line key="l1" x1="8" y1="21" x2="16" y2="21"/><line key="l2" x1="12" y1="17" x2="12" y2="21"/><polyline key="pl" points="7 10 12 7 17 10"/></>,
  <><circle key="c" cx="12" cy="12" r="3"/><path key="p" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
  <><path key="p" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline key="pl" points="14 2 14 8 20 8"/><line key="l1" x1="16" y1="13" x2="8" y2="13"/><line key="l2" x1="16" y1="17" x2="8" y2="17"/></>,
  <path key="p" d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
  <><path key="p1" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle key="c" cx="9" cy="7" r="4"/><path key="p2" d="M23 21v-2a4 4 0 00-3-3.87"/><path key="p3" d="M16 3.13a4 4 0 010 7.75"/></>,
];

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const lang   = String(params.lang ?? "de-CH");
  const t      = getDictionary(lang);

  const [menu, setMenu]     = useState(false);
  const [lm, setLm]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [checks, setChecks] = useState([false,false,false,false,false,false]);
  const score = checks.filter(Boolean).length;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };
  const navClick = (i: number) => { i === 0 ? go("hero") : router.push(`/${lang}/${t.nav.links[i]}`); setMenu(false); };

  return (
    <div style={{ background: "#fff", color: INK, fontFamily: "'Inter',system-ui,sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(10,10,10,.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,.07)" : "none", transition: "all .3s" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }} onClick={() => go("hero")}>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", letterSpacing: "-.01em" }}>
              jerumed<span style={{ color: B }}>nexus</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hide-m show-d" style={{ display: "none", alignItems: "center", gap: 36 }}>
            {t.nav.items.map((n, i) => (
              <button key={n} onClick={() => navClick(i)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,.55)", fontSize: 14, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".01em", transition: "color .2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onFocus={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.55)")}
                onBlur={(e) => (e.currentTarget.style.color = "rgba(255,255,255,.55)")}>{n}</button>
            ))}
            <div style={{ position: "relative" }}>
              <button onClick={() => setLm(!lm)}
                style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", padding: "6px 14px", color: "rgba(255,255,255,.7)", fontSize: 12, fontFamily: "'DM Mono',monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all .2s" }}>
                {t.langLabel} <span style={{ fontSize: 8 }}>▾</span>
              </button>
              {lm && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#1a1a1a", border: "1px solid rgba(255,255,255,.1)", padding: 4, minWidth: 160, zIndex: 10 }}>
                  {locales.map((l) => {
                    const ld = getDictionary(l);
                    return (
                      <button key={l} onClick={() => { router.push(`/${l}`); setLm(false); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: lang === l ? "rgba(37,99,235,.15)" : "none", border: "none", color: lang === l ? B : "rgba(255,255,255,.6)", fontSize: 13, fontFamily: "inherit", cursor: "pointer" }}>
                        {ld.langFull}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <button onClick={() => router.push("/portal/login")}
              style={{ background: B, border: "none", padding: "10px 24px", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".04em", transition: "background .2s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onFocus={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}
              onBlur={(e) => (e.currentTarget.style.background = B)}>{t.nav.cta}</button>
          </div>

          {/* Hamburger — mobile only */}
          <button className="show-m" style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }} onClick={() => setMenu(!menu)} aria-label="Menu">
            {[0,1,2].map((i) => (
              <div key={i} style={{ width: 22, height: 1.5, background: "#fff", margin: i === 1 ? "6px 0" : "0", transition: "all .25s",
                opacity: menu && i === 1 ? 0 : 1,
                transform: menu && i === 0 ? "rotate(45deg) translateY(7.5px)" : menu && i === 2 ? "rotate(-45deg) translateY(-7.5px)" : "none"
              }} />
            ))}
          </button>
        </div>

        {menu && (
          <div style={{ background: INK, padding: "20px 40px 28px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
            {t.nav.items.map((n, i) => (
              <button key={n} onClick={() => navClick(i)} style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 0", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.06)", color: "#fff", fontSize: 15, fontFamily: "inherit", cursor: "pointer" }}>{n}</button>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {locales.map((l) => {
                const ld = getDictionary(l);
                return (
                  <button key={l} onClick={() => { router.push(`/${l}`); setMenu(false); }}
                    style={{ padding: "7px 14px", border: `1px solid ${lang === l ? B : "rgba(255,255,255,.15)"}`, background: "none", color: lang === l ? B : "rgba(255,255,255,.5)", fontSize: 12, fontFamily: "'DM Mono',monospace", cursor: "pointer" }}>
                    {ld.langLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          HERO — full dark, editorial headline
      ══════════════════════════════════════ */}
      <section id="hero" className="hero-bg">
        {/* IT photo — full bleed background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "url('/hqq.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", imageRendering: "crisp-edges" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,.75) 0%, rgba(10,10,10,.6) 60%, rgba(10,10,10,.85) 100%)" }} />
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 80px", width: "100%", paddingTop: 160, position: "relative", zIndex: 1 }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <span style={{ display: "inline-block", width: 32, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#fff", letterSpacing: ".14em", textTransform: "uppercase" }}>{t.hero.pre}</span>
          </div>

          {/* Headline — massive */}
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(60px,10vw,130px)", fontWeight: 700, color: "#fff", lineHeight: .92, letterSpacing: "-.04em", marginBottom: 40, maxWidth: 900 }}>
            {t.hero.h1}
            <span style={{ color: B }}>.</span>
          </h1>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
            <div>
              <p style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "#fff", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
                {t.hero.post} — {t.hero.p}
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button onClick={() => go("services")}
                  style={{ background: B, border: "none", padding: "14px 32px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".04em", transition: "background .2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = BD)}
                  onFocus={(e) => (e.currentTarget.style.background = BD)}
                  onMouseOut={(e) => (e.currentTarget.style.background = B)}
                  onBlur={(e) => (e.currentTarget.style.background = B)}>{t.hero.btn1} →</button>
                <button onClick={() => router.push(`/${lang}/kontakt`)}
                  style={{ background: "none", border: "1px solid rgba(255,255,255,.2)", padding: "14px 32px", color: "rgba(255,255,255,.75)", fontSize: 14, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".04em", transition: "all .2s" }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.color = "#fff"; }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "rgba(255,255,255,.75)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; }}>{t.hero.btn2}</button>
              </div>
            </div>

            <button className="quote-btn" onClick={() => router.push(`/${lang}/kontakt`)}>
              {t.hero.quote.split("\n").map((l) => <span key={l}>{l}</span>)}
              <span style={{ marginTop: 6, fontSize: 16 }}>↗</span>
            </button>
          </div>
        </div>

        {/* Highlight strip — sits at bottom of hero */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", position: "relative", zIndex: 1 }}>
          <div className="hl-wrap" style={{ maxWidth: 1400, margin: "0 auto", display: "flex" }}>
            {t.highlights.map((h, i) => (
              <div key={h.t} className={`hl-card${i === 1 ? " active" : ""}`}>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 18, letterSpacing: ".08em", color: B, textTransform: "uppercase", marginBottom: 18, fontWeight: 700 }}>0{i + 1}</p>
                <h3 className="hl-t" style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{h.t}</h3>
                <p className="hl-d" style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,.75)" }}>{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
      <div style={{ background: B }}>
        <div className="stb" style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 40px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24 }}>
          {t.stats.map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1 }}>
                {s.n === "11"    ? <Counter end={11} />
                : s.n === "6+"  ? <><Counter end={6} />+</>
                : s.n === "24/7" ? "24/7"
                : s.n === "100%" ? <><Counter end={100} />%</>
                : s.n}
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.7)", marginTop: 8, letterSpacing: ".06em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Background image — full bleed */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/digitalisation.webp')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,.92) 0%, rgba(10,10,10,.75) 55%, rgba(10,10,10,.4) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto", padding: "120px 40px", width: "100%" }}>
          <R>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(72px,10vw,140px)", fontWeight: 700, color: "#fff", lineHeight: .88, letterSpacing: "-.04em", marginBottom: 20, textTransform: "uppercase" }}>{t.about.tag}</h2>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(18px,2vw,26px)", fontWeight: 500, color: "rgba(255,255,255,.75)", lineHeight: 1.3, marginBottom: 28, whiteSpace: "pre-line", maxWidth: 640, letterSpacing: "-.01em" }}>{t.about.title}</p>
            <p style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "rgba(255,255,255,.6)", lineHeight: 1.8, maxWidth: 520, marginBottom: 52 }}>{t.about.p}</p>
          </R>
          <R delay={.1}>
            <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {t.about.cards.map((c, i) => (
                <div key={c.t} style={{ padding: "28px 32px", background: i === 0 ? "rgba(37,99,235,.15)" : "rgba(255,255,255,.07)", border: `1px solid ${i === 0 ? "rgba(37,99,235,.4)" : "rgba(255,255,255,.12)"}`, minWidth: 220 }}>
                  <div style={{ width: 36, height: 36, background: i === 0 ? B : "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      {i === 0 ? <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></> : <><circle cx="12" cy="12" r="3"/><path d="M5.63 5.63l1.41 1.41M2 12h2M5.63 18.37l1.41-1.41M12 22v-2M18.37 18.37l-1.41-1.41M22 12h-2M18.37 5.63l-1.41 1.41M12 2v2"/></>}
                    </svg>
                  </div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{c.t}</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,.7)" }}>{c.d}</p>
                </div>
              ))}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: "28px 32px", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.04)" }}>
                {t.about.values.map((v) => (
                  <span key={v} style={{ background: "rgba(37,99,235,.2)", border: "1px solid rgba(37,99,235,.35)", padding: "5px 12px", fontSize: 11, color: "#fff", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{v}</span>
                ))}
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════ */}
      <section style={{ background: B, padding: "80px 0 0" }}>
        <R>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 64px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 35, fontWeight: 700, color: "#fff", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>{t.partners.title}</h2>
          </div>
        </R>

        {/* Scrolling marquee strip */}
        <div style={{ borderTop: "1px solid #E5E7EB", background: "#fff", padding: "32px 0" }}>
          <div className="marquee-wrap">
            <div className="marquee-track">
              {(["tomedo","vitomed","Axenita","AESKULAP","HIN","MediData","Ärztekasse","BlueCare","Doctolib","OneDoc","FMH","Swisscom Health","Viollier","Sysmex","Roche","TeamViewer",
                 "tomedo","vitomed","Axenita","AESKULAP","HIN","MediData","Ärztekasse","BlueCare","Doctolib","OneDoc","FMH","Swisscom Health","Viollier","Sysmex","Roche","TeamViewer"]).map((name, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "0 40px", borderRight: "1px solid #E5E7EB", height: 56, whiteSpace: "nowrap" }}>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, color: "#9CA3AF", letterSpacing: ".01em" }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════
          COMPLIANCE
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 16, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.compliance.tag}</span>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 56, whiteSpace: "pre-line", textAlign: "center" }}>{t.compliance.title}</h2>
          </R>
          <div className="fg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: "1px solid #E5E7EB" }}>
            {t.compliance.badges.map((b, i) => (
              <R key={b.t} delay={i * .04}>
                <div style={{ padding: "36px 32px", borderRight: (i + 1) % 3 !== 0 ? "1px solid #E5E7EB" : "none", borderBottom: i < 3 ? "1px solid #E5E7EB" : "none", transition: "background .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
                  <div style={{ fontSize: 28, marginBottom: 20 }}>{b.icon}</div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: INK, marginBottom: 10 }}>{b.t}</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#6B7280" }}>{b.d}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESS — numbered, dark
      ══════════════════════════════════════ */}
      <section style={{ background: INK, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 16, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.process.tag}</span>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 64, textAlign: "center" }}>{t.process.title}</h2>
          </R>
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
            {t.process.steps.map((s, i) => (
              <R key={s.t} delay={i * .07}>
                <div style={{ padding: "0 32px 0 0", borderRight: i < 3 ? "1px solid #fff" : "none", paddingRight: i < 3 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, color: B, letterSpacing: ".14em", marginBottom: 32 }}>{s.n}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: B, marginBottom: 16, letterSpacing: "-.02em" }}>{s.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "#fff" }}>{s.d}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.services.tag}</span>
                </div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, whiteSpace: "pre-line" }}>{t.services.title}</h2>
              </div>
              <button onClick={() => router.push(`/${lang}/leistungen`)}
                style={{ background: "none", border: "1px solid #D1D5DB", padding: "10px 22px", fontSize: 13, fontWeight: 600, color: "#374151", fontFamily: "inherit", cursor: "pointer", letterSpacing: ".04em", transition: "all .2s", whiteSpace: "nowrap" }}
                onMouseOver={(e) => { e.currentTarget.style.background = INK; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = INK; }}
                onFocus={(e) => { e.currentTarget.style.background = INK; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
                onBlur={(e) => { e.currentTarget.style.background = "none"; }}>{t.services.allBtn}</button>
            </div>
          </R>
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, border: "1px solid #E5E7EB" }}>
            {t.services.items.map((s, i) => (
              <R key={s.slug} delay={i * .03}>
                <a href={`/${lang}/leistungen/${s.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div className="svc-card" style={{ borderRight: (i + 1) % 3 !== 0 ? "1px solid #E5E7EB" : "none", borderBottom: i < t.services.items.length - 3 ? "1px solid #E5E7EB" : "none" }}>
                    <div className="svc-ico" style={{ width: 44, height: 44, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "background .2s", flexShrink: 0 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.5" style={{ transition: "stroke .2s" }}>{SVG_ICONS[i] ?? SVG_ICONS[0]}</svg>
                    </div>
                    <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 16, fontWeight: 600, color: INK, marginBottom: 10 }}>{s.t}</h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6B7280", marginBottom: 20 }}>{s.d}</p>
                    <span style={{ fontSize: 12, fontWeight: 600, color: B, letterSpacing: ".06em", textTransform: "uppercase" }}>{t.services.learnMore} →</span>
                  </div>
                </a>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CHECKLIST — dark
      ══════════════════════════════════════ */}
      <section style={{ background: INK, padding: "100px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.checklist.tag}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", marginBottom: 12 }}>{t.checklist.title}</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.35)", marginBottom: 40 }}>{t.checklist.sub}</p>
          </R>
          <R delay={.08}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {t.checklist.items.map((item, i) => (
                <button key={item} onClick={() => { const c = [...checks]; c[i] = !c[i]; setChecks(c); }}
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", cursor: "pointer", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,.07)", fontFamily: "inherit", width: "100%" }}>
                  <div style={{ width: 22, height: 22, border: `1.5px solid ${checks[i] ? B : "rgba(255,255,255,.2)"}`, background: checks[i] ? B : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
                    {checks[i] && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 14, color: checks[i] ? "#fff" : "rgba(255,255,255,.5)", fontWeight: checks[i] ? 500 : 400, transition: "color .2s" }}>{item}</span>
                </button>
              ))}
            </div>
          </R>
          <R delay={.14}>
            <div style={{ marginTop: 32, padding: "24px", background: score >= 5 ? "rgba(16,185,129,.08)" : score >= 3 ? "rgba(245,158,11,.08)" : "rgba(239,68,68,.08)", borderLeft: `3px solid ${score >= 5 ? "#10B981" : score >= 3 ? "#F59E0B" : "#EF4444"}`, display: "flex", gap: 20, alignItems: "center" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 700, color: score >= 5 ? "#10B981" : score >= 3 ? "#F59E0B" : "#EF4444", lineHeight: 1 }}>{score}/6</span>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{score >= 5 ? t.checklist.result.good : score >= 3 ? t.checklist.result.warn : t.checklist.result.bad}</p>
            </div>
          </R>
          {score < 5 && (
            <R delay={.2}>
              <div style={{ marginTop: 20 }}>
                <button onClick={() => router.push(`/${lang}/kontakt`)}
                  style={{ background: B, border: "none", padding: "13px 28px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".04em", transition: "background .2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = BD)}
                  onFocus={(e) => (e.currentTarget.style.background = BD)}
                  onMouseOut={(e) => (e.currentTarget.style.background = B)}
                  onBlur={(e) => (e.currentTarget.style.background = B)}>
                  {t.checklist.cta} →
                </button>
              </div>
            </R>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#F5F5F3" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 56 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.pricing.tag}</span>
                </div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, whiteSpace: "pre-line" }}>{t.pricing.title}</h2>
              </div>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, maxWidth: 360 }}>{t.pricing.sub}</p>
            </div>
          </R>
          <div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
            {t.pricing.plans.map((p, i) => (
              <R key={p.tag} delay={i * .07}>
                <div className={`pg-card${p.featured ? " featured" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: ".14em", color: p.featured ? "rgba(255,255,255,.35)" : "#9CA3AF", display: "block", marginBottom: 12 }}>{p.tag}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 700, color: p.featured ? "#fff" : INK, marginBottom: 28, letterSpacing: "-.02em" }}>{p.name}</h3>
                  <div style={{ marginBottom: 32 }}>
                    <span style={{ fontSize: 12, color: p.featured ? "rgba(255,255,255,.35)" : "#9CA3AF", display: "block", marginBottom: 6 }}>{p.prefix}</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 700, color: p.featured ? "#fff" : INK, letterSpacing: "-.04em", lineHeight: 1 }}>{p.price}</span>
                      <span style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,.3)" : "#9CA3AF" }}>{p.unit}</span>
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${p.featured ? "rgba(255,255,255,.08)" : "#E5E7EB"}`, paddingTop: 24, flex: 1 }}>
                    {p.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${p.featured ? "rgba(255,255,255,.05)" : "#F3F4F6"}`, fontSize: 14, color: p.featured ? "rgba(255,255,255,.7)" : "#374151" }}>
                        <span style={{ color: p.featured ? "#10B981" : B, flexShrink: 0, fontWeight: 700, fontSize: 13, lineHeight: "1.4" }}>✓</span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button
                    style={{ marginTop: 28, background: p.featured ? B : "transparent", border: p.featured ? "none" : `1.5px solid ${INK}`, padding: "13px 0", color: p.featured ? "#fff" : INK, fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".05em", textTransform: "uppercase", transition: "all .2s", width: "100%" }}
                    onMouseOver={(e) => { e.currentTarget.style.background = p.featured ? BD : INK; if (!p.featured) e.currentTarget.style.color = "#fff"; }}
                    onFocus={(e) => { e.currentTarget.style.background = p.featured ? BD : INK; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = p.featured ? B : "transparent"; if (!p.featured) e.currentTarget.style.color = INK; }}
                    onBlur={(e) => { e.currentTarget.style.background = p.featured ? B : "transparent"; }}
                    onClick={() => router.push(`/${lang}/kontakt`)}>{t.pricing.getStarted}</button>
                  <p style={{ fontSize: 11, color: p.featured ? "rgba(255,255,255,.2)" : "#9CA3AF", marginTop: 12, textAlign: "center" }}>{t.pricing.vatNote}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SLA
      ══════════════════════════════════════ */}
      <section style={{ background: INK, padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.sla.tag}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", marginBottom: 64 }}>{t.sla.title}</h2>
          </R>
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
            {t.sla.items.map((s, i) => (
              <R key={s.t} delay={i * .06}>
                <div style={{ padding: "0 32px 0 0", borderRight: i < 3 ? "1px solid #fff" : "none", paddingRight: i < 3 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0 }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 44, fontWeight: 700, color: s.color, marginBottom: 12, letterSpacing: "-.03em", lineHeight: 1 }}>{s.time}</div>
                  <span style={{ display: "inline-block", fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: s.color, marginBottom: 14, borderBottom: `1px solid ${s.color}`, paddingBottom: 4 }}>{s.t}</span>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", lineHeight: 1.65 }}>{s.d}</p>
                </div>
              </R>
            ))}
          </div>
          <R delay={.2}>
            <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 32 }}>
              <span style={{ color: "#10B981", fontSize: 20, flexShrink: 0 }}>✓</span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>{t.sla.guarantee}</span>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TEAM
      ══════════════════════════════════════ */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.team.tag}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 56, whiteSpace: "pre-line" }}>{t.team.title}</h2>
          </R>
          <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, border: "1px solid #E5E7EB" }}>
            {t.team.members.map((m, i) => (
              <R key={m.name} delay={i * .06}>
                <div style={{ padding: "36px 28px", borderRight: i < 3 ? "1px solid #E5E7EB" : "none", textAlign: "left", transition: "background .2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F3")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}>
                  <div style={{ width: 64, height: 64, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: B }}>{m.img}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: INK, marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: 12, fontWeight: 600, color: B, marginBottom: 12, letterSpacing: ".04em", textTransform: "uppercase" }}>{m.role}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "#6B7280" }}>{m.desc}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TOOLS
      ══════════════════════════════════════ */}
      <section style={{ background: "#F5F5F3", borderTop: "1px solid #E5E7EB", padding: "64px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <R>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#9CA3AF", letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 24 }}>{t.tools.tag}</p>
          </R>
          <R delay={.05}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {t.tools.items.map((tool) => (
                <div key={tool} style={{ padding: "9px 18px", background: "#fff", border: "1px solid #E5E7EB", fontSize: 13, fontWeight: 600, color: "#374151", letterSpacing: ".02em" }}>{tool}</div>
              ))}
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER — dark full-bleed
      ══════════════════════════════════════ */}
      <section style={{ background: INK, padding: "120px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: "40%", height: "100%", opacity: .08, overflow: "hidden" }}>
          <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=70" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
          <R>
            <div style={{ maxWidth: 700 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.ctaBanner.title.split("\n")[0]}</span>
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 28 }}>
                {t.ctaBanner.title.split("\n").slice(1).join(" ") || t.ctaBanner.title}
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: 40 }}>{t.ctaBanner.p}</p>
              <button onClick={() => router.push(`/${lang}/kontakt`)}
                style={{ background: B, border: "none", padding: "15px 36px", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", letterSpacing: ".04em", transition: "background .2s" }}
                onMouseOver={(e) => (e.currentTarget.style.background = BD)}
                onFocus={(e) => (e.currentTarget.style.background = BD)}
                onMouseOut={(e) => (e.currentTarget.style.background = B)}
                onBlur={(e) => (e.currentTarget.style.background = B)}>{t.ctaBanner.btn} →</button>
            </div>
          </R>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="hp" style={{ display: "flex", gap: 80, alignItems: "center" }}>
            <div style={{ flex: "0 0 44%", minWidth: 280 }}>
              <R>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=70" alt="Team" width={400} height={500} style={{ width: "100%", display: "block", gridRow: "1/3", height: "100%", objectFit: "cover" }} />
                  <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=70" alt="Office" width={400} height={240} style={{ width: "100%", display: "block" }} />
                  <div style={{ background: B, padding: "28px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{t.help.exp.n}</span>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.65)", textAlign: "center", lineHeight: 1.4 }}>{t.help.exp.l}</span>
                  </div>
                </div>
              </R>
            </div>
            <div style={{ flex: 1 }}>
              <R>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.help.tag}</span>
                </div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, marginBottom: 20, whiteSpace: "pre-line" }}>{t.help.title}</h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6B7280", marginBottom: 36 }}>{t.help.p}</p>
              </R>
              <R delay={.08}>
                <div style={{ display: "flex", gap: 2, flexWrap: "wrap", marginBottom: 16 }}>
                  {[
                    { label: t.help.phone.label, value: t.help.phone.value, icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0122 16.92z"/> },
                    { label: t.help.email.label, value: t.help.email.value, icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></> },
                  ].map((item) => (
                    <div key={item.label} style={{ flex: 1, minWidth: 190, background: "#F5F5F3", border: "1px solid #E5E7EB", padding: "20px 22px", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 40, height: 40, background: B, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">{item.icon}</svg>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500, letterSpacing: ".1em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </R>
              <R delay={.12}>
                <div style={{ padding: "16px 20px", background: "#FEF2F2", borderLeft: "3px solid #EF4444", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: "#EF4444", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t.emergency.label}</span>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>{t.emergency.phone} · {t.emergency.note}</span>
                </div>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES BAR
      ══════════════════════════════════════ */}
      <div style={{ borderTop: "1px solid #E5E7EB", background: "#F5F5F3", padding: "32px 40px" }}>
        <div className="fg" style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 32 }}>
          {t.features.map((f, i) => (
            <div key={f.t} style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 36, height: 36, background: B, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                  {i === 0 ? <polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/> : i === 1 ? <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></> : i === 2 ? <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></> : <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>}
                </svg>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: INK, marginBottom: 4 }}>{f.t}</h4>
                <p style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.5 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{ background: INK, padding: "72px 40px 36px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="fb" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 56, marginBottom: 56 }}>
            <div>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-.01em" }}>
                  jerumed<span style={{ color: B }}>nexus</span>
                </span>
              </div>
              <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.75, maxWidth: 280 }}>{t.footer.desc}</p>
              <div style={{ display: "flex", gap: 2, marginTop: 24 }}>
                {["f","in","𝕏","▶"].map((s) => (
                  <div key={s} style={{ width: 32, height: 32, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#6B7280", cursor: "pointer" }}>{s}</div>
                ))}
              </div>
            </div>
            {[t.footer.l1, t.footer.l2, t.footer.l3].map((links, ci) => {
              const footerUrls = [
                [`/${lang}/leistungen/it-sicherheit`,`/${lang}/leistungen/netzwerk`,`/${lang}/leistungen/server-cloud`,`/${lang}/leistungen/praxissoftware`,`/${lang}/leistungen/labor`,`/${lang}/leistungen/managed-it`],
                [`/${lang}/kontakt`,`/${lang}/kontakt`,`/${lang}/kontakt`,`/${lang}/datenschutz`,`/${lang}/kontakt`],
                [`/${lang}/ueber-uns`,`/${lang}/kontakt`,`/${lang}/kontakt`,`/${lang}/kontakt`],
              ];
              return (
                <div key={t.footer.cols[ci]}>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 20, letterSpacing: ".06em", textTransform: "uppercase" }}>{t.footer.cols[ci]}</h4>
                  {links.map((l, i) => <a key={l} href={footerUrls[ci]?.[i] ?? "#"} className="ft-l">{l}</a>)}
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24 }}>
            <div className="ft-bot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#374151", letterSpacing: ".04em" }}>{t.footer.copy}</p>
              <div style={{ display: "flex", gap: 24 }}>
                {t.footer.legal.map((l, i) => {
                  const legalUrls = [`/${lang}/datenschutz`,`/${lang}/datenschutz`,`/${lang}/impressum`,`/${lang}/impressum`];
                  return <a key={l} href={legalUrls[i] ?? "#"} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#374151", textDecoration: "none", letterSpacing: ".04em" }}>{l}</a>;
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
