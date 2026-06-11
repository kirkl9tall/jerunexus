"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getDictionary, locales } from "@/lib/translations";

const B = "#2563EB";
const BD = "#1d4ed8";
const BG = "#0f172a";

function R({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(30px)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  );
}

const svgIcons = [
  <svg key={0} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><circle cx="12" cy="16" r="1"/></svg>,
  <svg key={1} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  <svg key={2} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/><polyline points="11 15 12 16 14 14"/></svg>,
  <svg key={3} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M10 10h4M12 8v4"/></svg>,
  <svg key={4} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><polyline points="15 11 16 12 18 10"/></svg>,
  <svg key={5} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><line x1="9" y1="10" x2="15" y2="10"/></svg>,
  <svg key={6} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  <svg key={7} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polyline points="7 10 12 7 17 10"/></svg>,
  <svg key={8} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  <svg key={9} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg key={10} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  <svg key={11} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
];

function SvcIcon({ i }: { i: number }) {
  return (
    <div className="svc-ico" style={{ width: 48, height: 48, borderRadius: 12, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, transition: "all 0.3s" }}>
      {svgIcons[i] ?? svgIcons[0]}
    </div>
  );
}

function Counter({ end, suffix = "", duration = 2000 }: { end: string | number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState<number | string>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(String(end)) || 0;
        if (!num) { setVal(end); return; }
        const step = Math.max(1, Math.floor(num / 60));
        let cur = 0;
        const iv = setInterval(() => {
          cur += step;
          if (cur >= num) { setVal(num); clearInterval(iv); }
          else setVal(cur);
        }, duration / 60);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function Home() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const [menu, setMenu] = useState(false);
  const [lm, setLm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [checks, setChecks] = useState([false, false, false, false, false, false]);
  const score = checks.filter(Boolean).length;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenu(false); };

  const navClick = (i: number) => {
    if (i === 0) { go("hero"); }
    else { router.push(`/${lang}/${t.nav.links[i]}`); }
    setMenu(false);
  };

  return (
    <div style={{ background: "#fff", color: "#1e293b", fontFamily: "'Plus Jakarta Sans','DM Sans',system-ui,sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

      {/* ═══ TOP BAR ═══ */}
      <div style={{ background: BG, padding: "8px 0", fontSize: 13, color: "rgba(255,255,255,.6)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: B }}>●</span>{t.top.addr}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <span><span style={{ color: B }}>☎</span> {t.top.phone}</span>
            <span><span style={{ color: B }}>✉</span> {t.top.email}</span>
          </div>
        </div>
      </div>

      {/* ═══ NAV ═══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,.95)" : "#fff", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: "1px solid #f0f0f0", transition: "all .3s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("hero")}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: `linear-gradient(135deg,${B},#06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>JN</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 19, color: BG }}>jerumed<span style={{ color: B }}>nexus</span></span>
          </div>

          <div className="hide-m show-d" style={{ display: "none", alignItems: "center", gap: 28 }}>
            {t.nav.items.map((n, i) => (
              <button key={i} onClick={() => navClick(i)}
                style={{ background: "none", border: "none", color: "#64748b", fontSize: 15, fontWeight: 500, fontFamily: "inherit" }}
                onMouseOver={(e) => (e.currentTarget.style.color = B)}
                onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}>{n}</button>
            ))}

            <div style={{ position: "relative" }}>
              <button onClick={() => setLm(!lm)}
                style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "7px 14px", color: "#475569", fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                {t.langLabel} <span style={{ fontSize: 9 }}>▾</span>
              </button>
              {lm && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#fff", borderRadius: 10, boxShadow: "0 10px 36px rgba(0,0,0,.1)", padding: 5, minWidth: 150, border: "1px solid #eee" }}>
                  {locales.map((l) => {
                    const ld = getDictionary(l);
                    return (
                      <button key={l} onClick={() => { router.push(`/${l}`); setLm(false); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: lang === l ? "#f0f4ff" : "none", border: "none", borderRadius: 7, color: lang === l ? B : "#475569", fontSize: 14, fontWeight: lang === l ? 600 : 400, fontFamily: "inherit" }}>
                        {ld.langFull}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button onClick={() => router.push(`/${lang}/kontakt`)}
              style={{ background: B, border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", transition: "all .3s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}>{t.nav.cta}</button>
          </div>

          <button className="hide-m" style={{ display: "block", background: "none", border: "none", padding: 8 }} onClick={() => setMenu(!menu)}>
            <div style={{ width: 22, height: 2, background: "#1e293b", transition: "all .3s", transform: menu ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#1e293b", margin: "5px 0", opacity: menu ? 0 : 1, transition: "all .3s" }} />
            <div style={{ width: 22, height: 2, background: "#1e293b", transition: "all .3s", transform: menu ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>
        {menu && (
          <div style={{ padding: "16px 32px 24px", borderTop: "1px solid #f0f0f0" }}>
            {t.nav.items.map((n, i) => (
              <button key={i} onClick={() => navClick(i)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", background: "none", border: "none", borderBottom: "1px solid #f5f5f5", color: "#1e293b", fontSize: 15, fontWeight: 500, fontFamily: "inherit" }}>{n}</button>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {locales.map((l) => {
                const ld = getDictionary(l);
                return (
                  <button key={l} onClick={() => { router.push(`/${l}`); setMenu(false); }}
                    style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${lang === l ? B : "#e2e8f0"}`, background: lang === l ? "#f0f4ff" : "#fff", color: lang === l ? B : "#64748b", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
                    {ld.langLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" className="hero-bg">
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "140px 32px 120px", position: "relative", width: "100%" }}>
          <R><p style={{ color: "rgba(255,255,255,.65)", fontSize: 16, marginBottom: 12, letterSpacing: ".03em", textTransform: "uppercase", fontWeight: 500 }}>
            <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 2, background: B, marginRight: 10, verticalAlign: "middle" }} />{t.hero.pre}</p></R>
          <R delay={.08}><h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(52px,8vw,110px)", fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{t.hero.h1}</h1></R>
          <R delay={.15}><p style={{ color: "rgba(255,255,255,.7)", fontSize: "clamp(17px,2.2vw,24px)", fontWeight: 400, margin: "16px 0 12px", maxWidth: 600 }}>
            {t.hero.post}<span style={{ display: "inline-block", width: 7, height: 7, borderRadius: 2, background: B, marginLeft: 10, verticalAlign: "middle" }} /></p></R>
          <R delay={.2}><p style={{ color: "rgba(255,255,255,.45)", fontSize: 15, lineHeight: 1.7, maxWidth: 540, marginBottom: 40 }}>{t.hero.p}</p></R>
          <R delay={.28}><div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <button onClick={() => go("services")}
              style={{ background: B, border: "none", borderRadius: 6, padding: "14px 32px", color: "#fff", fontSize: 15, fontWeight: 600, fontFamily: "inherit", transition: "all .3s", display: "flex", alignItems: "center", gap: 8, letterSpacing: ".04em", textTransform: "uppercase" }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}>{t.hero.btn1} →</button>
            <button onClick={() => router.push(`/${lang}/kontakt`)}
              style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,.3)", borderRadius: 6, padding: "14px 32px", color: "#fff", fontSize: 15, fontWeight: 500, fontFamily: "inherit", transition: "all .3s", display: "flex", alignItems: "center", gap: 8, letterSpacing: ".04em", textTransform: "uppercase" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.borderColor = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,.3)"; }}>{t.hero.btn2} →</button>
          </div></R>

          <div className="quote-btn" onClick={() => router.push(`/${lang}/kontakt`)} style={{ cursor: "none" }}>
            {t.hero.quote.split("\n").map((l, i) => <span key={i}>{l}</span>)}<span style={{ marginTop: 5, fontSize: 16 }}>↓</span>
          </div>
        </div>

        {/* 3 highlight cards */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", top: 40, zIndex: 10 }}>
          <div className="hl-wrap" style={{ display: "flex", gap: 0 }}>
            {t.highlights.map((h, i) => (
              <div key={i} className={`hl-card${i === 1 ? " active" : ""}`} style={{ borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : "0" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: i === 1 ? "rgba(255,255,255,.15)" : "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={i === 1 ? "#fff" : "#2563EB"} strokeWidth="1.5">
                      {i === 0 ? <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></> : i === 1 ? <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></> : <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M10 10h4M12 8v4"/></>}
                    </svg>
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

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "100px 32px 80px", maxWidth: 1280, margin: "0 auto", marginTop: 50 }}>
        <div className="hp" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 45%", position: "relative", minWidth: 280 }}>
            <R><div style={{ borderRadius: 12, overflow: "hidden", position: "relative" }}>
              <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=75" alt="Team at work" width={600} height={400} style={{ width: "100%", display: "block", borderRadius: 12 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, background: "rgba(15,23,42,.92)", backdropFilter: "blur(8px)", borderRadius: "12px 0 12px 0", padding: "20px 28px" }}>
                {t.about.values.map((v, i) => <div key={i} style={{ padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,.08)" : "none", color: "rgba(255,255,255,.85)", fontSize: 14, fontWeight: 500 }}>{v}</div>)}
              </div>
            </div></R>
          </div>
          <div style={{ flex: 1 }}>
            <R>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.about.tag}</span>
              <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, marginBottom: 20, color: "#0f172a", whiteSpace: "pre-line" }}>{t.about.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#64748b", marginBottom: 28 }}>{t.about.p}</p>
            </R>
            <R delay={.1}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {t.about.cards.map((c, i) => (
                <div key={i} style={{ padding: 24, borderRadius: 12, border: i === 1 ? `2px solid ${B}` : "1px solid #e2e8f0", background: i === 1 ? B : "#fff", transition: "all .3s" }}>
                  <div style={{ fontSize: 24, marginBottom: 10, color: i === 1 ? "#fff" : B }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={i === 1 ? "#fff" : "#2563EB"} strokeWidth="1.5">
                      {i === 0 ? <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10"/></> : <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 0l-.06-.06a1.65 1.65 0 00-2.82 1.18V21a2 2 0 01-4 0"/></>}
                    </svg>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: i === 1 ? "#fff" : "#0f172a", marginBottom: 6 }}>{c.t}</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: i === 1 ? "rgba(255,255,255,.8)" : "#64748b" }}>{c.d}</p>
                </div>
              ))}
            </div></R>
          </div>
        </div>
      </section>

      {/* ═══ STATS BANNER ═══ */}
      <div style={{ background: B, padding: "36px 32px" }}>
        <div className="stb" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24 }}>
          {t.stats.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                {s.n === "11" ? <Counter end={11} /> : s.n === "6+" ? <><Counter end={6} />+</> : s.n === "24/7" ? "24/7" : s.n === "100%" ? <><Counter end={100} />%</> : s.n}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,.75)", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ PARTNERS ═══ */}
      <section style={{ padding: "80px 32px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <R><h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "#0f172a", lineHeight: 1.3, whiteSpace: "pre-line", marginBottom: 48 }}>
            {t.partners.title}
          </h2></R>
          <R delay={.1}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
            {t.partners.logos.map((logo, i) => (
              <div key={i} style={{ padding: "18px 12px", borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0", textAlign: "center", transition: "all .3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = B; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(37,99,235,.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.5">
                    {i % 4 === 0 ? <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="12" y1="17" x2="12" y2="21"/></> : i % 4 === 1 ? <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> : i % 4 === 2 ? <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></> : <><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10"/><line x1="2" y1="12" x2="22" y2="12"/></>}
                  </svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{logo}</span>
              </div>
            ))}
          </div></R>
        </div>
      </section>

      {/* ═══ COMPLIANCE BADGES ═══ */}
      <section style={{ padding: "80px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <R><div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.compliance.tag}</span>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.compliance.title}</h2>
        </div></R>
        <div className="fg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {t.compliance.badges.map((b, i) => (
            <R key={i} delay={i * .05}><div style={{ padding: "24px 20px", borderRadius: 14, border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "flex-start", gap: 14, transition: "all .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = B; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{b.icon}</div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{b.t}</h4>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: "#64748b" }}>{b.d}</p>
              </div>
            </div></R>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <R><div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.process.tag}</span>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a" }}>{t.process.title}</h2>
        </div></R>
        <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
          {t.process.steps.map((s, i) => (
            <R key={i} delay={i * .08}><div style={{ padding: "36px 28px", borderRight: i < 3 ? "1px solid #e2e8f0" : "none", position: "relative", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: i === 0 ? B : "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 22, fontWeight: 800, color: i === 0 ? "#fff" : B, transition: "all .3s", border: i === 0 ? "none" : "2px solid #e2e8f0" }}>{s.n}</div>
              {i < 3 && <div style={{ position: "absolute", top: 50, right: -12, width: 24, height: 2, background: "#e2e8f0", zIndex: 2 }} className="hide-m" />}
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{s.t}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "#64748b" }}>{s.d}</p>
            </div></R>
          ))}
        </div>
      </section>

      {/* ═══ TECH ARCHITECTURE DIAGRAM ═══ */}
      <section style={{ padding: "80px 32px", background: BG }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <R><div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.techDiagram.tag}</span>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#fff", whiteSpace: "pre-line" }}>{t.techDiagram.title}</h2>
          </div></R>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {t.techDiagram.layers.map((layer, i) => {
              const opacity = 0.15 + i * 0.14;
              const width = 100 - i * 6;
              return (
                <R key={i} delay={i * .08}><div style={{ width: `${width}%`, margin: "0 auto", padding: "18px 24px", borderRadius: 12, background: `rgba(37,99,235,${opacity})`, border: "1px solid rgba(37,99,235,0.15)", display: "flex", justifyContent: "center", alignItems: "center", transition: "all .3s", position: "relative" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(37,99,235,${opacity + 0.1})`; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(37,99,235,${opacity})`; e.currentTarget.style.transform = "none"; }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{layer.t}</span>
                  {i < 5 && <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)", width: 2, height: 8, background: "rgba(37,99,235,.3)" }} />}
                </div></R>
              );
            })}
          </div>
          <R delay={.5}><p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,.35)", marginTop: 24 }}>{t.techDiagram.note}</p></R>
        </div>
      </section>

      {/* ═══ SERVICES GRID ═══ */}
      <section id="services" style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <R><div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.services.tag}</span>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.services.title}</h2>
        </div></R>
        <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
          {t.services.items.map((s, i) => (
            <R key={i} delay={i * .04}>
              <a href={`/${lang}/leistungen/${s.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="svc-card" style={{ cursor: "none" }}>
                  <SvcIcon i={i} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{s.t}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "#64748b", marginBottom: 14 }}>{s.d}</p>
                  <span style={{ fontSize: 13, fontWeight: 600, color: B, letterSpacing: ".06em", textTransform: "uppercase" }}>{t.services.learnMore} →</span>
                </div>
              </a>
            </R>
          ))}
        </div>
      </section>

      {/* ═══ SECURITY CHECKLIST ═══ */}
      <section style={{ padding: "80px 32px", background: BG }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <R><div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.checklist.tag}</span>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#fff" }}>{t.checklist.title}</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", marginTop: 10 }}>{t.checklist.sub}</p>
          </div></R>
          <R delay={.1}><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {t.checklist.items.map((item, i) => (
              <div key={i} onClick={() => { const c = [...checks]; c[i] = !c[i]; setChecks(c); }}
                style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 12, background: checks[i] ? "rgba(37,99,235,.12)" : "rgba(255,255,255,.04)", border: `1px solid ${checks[i] ? "rgba(37,99,235,.3)" : "rgba(255,255,255,.08)"}`, transition: "all .3s" }}
               >
                <div style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${checks[i] ? B : "rgba(255,255,255,.2)"}`, background: checks[i] ? B : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s", flexShrink: 0 }}>
                  {checks[i] && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ fontSize: 14, color: checks[i] ? "#fff" : "rgba(255,255,255,.6)", fontWeight: checks[i] ? 600 : 400, transition: "all .3s" }}>{item}</span>
              </div>
            ))}
          </div></R>
          <R delay={.2}><div style={{ marginTop: 28, padding: "20px 24px", borderRadius: 14, background: score >= 5 ? "rgba(34,197,94,.1)" : score >= 3 ? "rgba(245,158,11,.1)" : "rgba(239,68,68,.1)", border: `1px solid ${score >= 5 ? "rgba(34,197,94,.2)" : score >= 3 ? "rgba(245,158,11,.2)" : "rgba(239,68,68,.2)"}`, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: score >= 5 ? "#22c55e" : score >= 3 ? "#f59e0b" : "#ef4444", marginBottom: 6 }}>{score}/6</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>{score >= 5 ? t.checklist.result.good : score >= 3 ? t.checklist.result.warn : t.checklist.result.bad}</p>
          </div></R>
          {score < 5 && <R delay={.3}><div style={{ textAlign: "center", marginTop: 20 }}>
            <button onClick={() => router.push(`/${lang}/kontakt`)}
              style={{ background: B, border: "none", borderRadius: 8, padding: "13px 28px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", letterSpacing: ".04em", textTransform: "uppercase" }}>{t.checklist.cta} →</button>
          </div></R>}
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section style={{ padding: "100px 32px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <R><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 56 }} className="hp">
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.pricing.tag}</span>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.pricing.title}</h2>
            </div>
            <div style={{ maxWidth: 400 }}>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>{t.pricing.sub}</p>
              <button style={{ background: "none", border: "1px solid #1e293b", borderRadius: 6, padding: "10px 24px", fontSize: 13, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "#1e293b", fontFamily: "inherit" }}>{t.pricing.btn}</button>
            </div>
          </div></R>

          <div className="pg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {t.pricing.plans.map((p, i) => (
              <R key={i} delay={i * .08}><div style={{ background: p.featured ? BG : "#fff", border: p.featured ? "none" : "1px solid #e2e8f0", borderRadius: 16, padding: "40px 32px", textAlign: "center", transition: "all .35s", position: "relative", overflow: "hidden", boxShadow: p.featured ? "0 20px 60px rgba(15,23,42,.15)" : "none" }}
                onMouseEnter={(e) => { if (!p.featured) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(15,23,42,.08)"; } }}
                onMouseLeave={(e) => { if (!p.featured) { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; } }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: B }}>{p.tag}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: p.featured ? "#fff" : "#0f172a", marginTop: 8, marginBottom: 16 }}>{p.name}</h3>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: p.featured ? "rgba(255,255,255,.5)" : "#94a3b8", marginBottom: 6, textTransform: "lowercase", letterSpacing: ".03em" }}>{p.prefix}</div>
                  <span style={{ fontSize: 48, fontWeight: 800, color: p.featured ? "#fff" : "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{p.price}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".06em", color: p.featured ? "rgba(255,255,255,.5)" : "#94a3b8", marginBottom: 28, textTransform: "uppercase" }}>{p.unit}</div>
                <div style={{ borderTop: `1px solid ${p.featured ? "rgba(255,255,255,.1)" : "#eee"}`, paddingTop: 20 }}>
                  {p.features.map((f, fi) => (
                    <div key={fi} style={{ padding: "10px 0", borderBottom: `1px solid ${p.featured ? "rgba(255,255,255,.06)" : "#f5f5f5"}`, fontSize: 14, color: p.featured ? "rgba(255,255,255,.8)" : "#475569" }}>{f}</div>
                  ))}
                </div>
                <button
                  style={{ marginTop: 28, background: p.featured ? B : "transparent", border: p.featured ? "none" : `1.5px solid ${B}`, borderRadius: 8, padding: "12px 32px", color: p.featured ? "#fff" : B, fontSize: 14, fontWeight: 600, fontFamily: "inherit", letterSpacing: ".04em", textTransform: "uppercase", transition: "all .3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.background = p.featured ? BD : B)}
                  onMouseOut={(e) => { e.currentTarget.style.background = p.featured ? B : "transparent"; if (!p.featured) e.currentTarget.style.color = B; }}
                  onClick={() => router.push(`/${lang}/kontakt`)}>{t.pricing.getStarted}</button>
                <p style={{ fontSize: 11, color: p.featured ? "rgba(255,255,255,.35)" : "#94a3b8", marginTop: 16 }}>{t.pricing.vatNote}</p>
              </div></R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SLA GUARANTEE ═══ */}
      <section style={{ padding: "100px 32px", background: BG, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80vw", height: "80vw", borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,.06),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <R><div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.sla.tag}</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#fff" }}>{t.sla.title}</h2>
          </div></R>
          <R delay={.1}><div style={{ position: "relative", marginBottom: 48 }}>
            <div className="hide-m" style={{ position: "absolute", top: 40, left: "12%", right: "12%", height: 2, background: "linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#2563EB)", opacity: .3, zIndex: 0 }} />
            <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20, position: "relative", zIndex: 1 }}>
              {t.sla.items.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 20px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: s.color, opacity: .08 }} />
                    <div style={{ position: "absolute", inset: 6, borderRadius: "50%", border: `2px solid ${s.color}`, opacity: .25 }} />
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.color, boxShadow: `0 0 20px ${s.color}40` }} />
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>{s.time}</div>
                  <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 6, background: `${s.color}15`, border: `1px solid ${s.color}25`, marginBottom: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: s.color }}>{s.t}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.4)", lineHeight: 1.5 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div></R>
          <R delay={.3}><div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 36px", borderRadius: 16, background: "rgba(37,99,235,.08)", border: "1px solid rgba(37,99,235,.15)", backdropFilter: "blur(8px)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(37,99,235,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", color: "rgba(255,255,255,.4)", textTransform: "uppercase", marginBottom: 2 }}>{t.sla.uptimeLabel}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{t.sla.guarantee}</div>
              </div>
            </div>
          </div></R>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <R><div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.team.tag}</span>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.team.title}</h2>
        </div></R>
        <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {t.team.members.map((m, i) => (
            <R key={i} delay={i * .08}><div style={{ textAlign: "center", padding: "36px 24px", borderRadius: 16, border: "1px solid #eee", background: "#fff", transition: "all .35s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(15,23,42,.07)"; e.currentTarget.style.borderColor = "transparent"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#eee"; }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, fontWeight: 800, color: B }}>{m.img}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{m.name}</h3>
              <p style={{ fontSize: 13, fontWeight: 600, color: B, marginBottom: 12 }}>{m.role}</p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#64748b" }}>{m.desc}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                {["in", "𝕏", "✉"].map((s, si) => (
                  <div key={si} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#94a3b8", transition: "all .2s" }}
                    onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.borderColor = B; (e.currentTarget as HTMLElement).style.color = B; }}
                    onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLElement).style.color = "#94a3b8"; }}>{s}</div>
                ))}
              </div>
            </div></R>
          ))}
        </div>
      </section>

      {/* ═══ SOFTWARE & TOOLS ═══ */}
      <section style={{ padding: "80px 32px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <R><div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.tools.tag}</span>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.tools.title}</h2>
          </div></R>
          <R delay={.1}><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14 }}>
            {t.tools.items.map((tool, i) => (
              <div key={i} style={{ padding: "20px 16px", borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0", textAlign: "center", transition: "all .3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = B; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{tool}</span>
              </div>
            ))}
          </div></R>
        </div>
      </section>

      {/* ═══ CTA DARK BANNER ═══ */}
      <section style={{ background: `linear-gradient(135deg,${BG},#1e293b)`, padding: "80px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", opacity: .15, overflow: "hidden" }}>
          <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=70" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>
          <R>
            <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 16, whiteSpace: "pre-line" }}>{t.ctaBanner.title}</h2>
            <div style={{ width: 60, height: 3, background: B, marginBottom: 20 }} />
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 28 }}>{t.ctaBanner.p}</p>
            <button onClick={() => router.push(`/${lang}/kontakt`)}
              style={{ background: B, border: "none", borderRadius: 6, padding: "13px 28px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "inherit", letterSpacing: ".04em", textTransform: "uppercase", transition: "all .3s", display: "flex", alignItems: "center", gap: 8 }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}>{t.ctaBanner.btn} →</button>
          </R>
        </div>
      </section>

      {/* ═══ NEED MORE HELP ═══ */}
      <section id="contact" style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <div className="hp" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 45%", minWidth: 280 }}>
            <R><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=70" alt="Team" width={400} height={500} style={{ width: "100%", borderRadius: 12, display: "block", gridRow: "1/3", height: "100%", objectFit: "cover" }} />
              <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=70" alt="Office" width={400} height={240} style={{ width: "100%", borderRadius: 12, display: "block" }} />
              <div style={{ background: B, borderRadius: 12, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <span style={{ fontSize: 42, fontWeight: 800, color: "#fff" }}>{t.help.exp.n}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,.8)", textAlign: "center" }}>{t.help.exp.l}</span>
              </div>
            </div></R>
          </div>

          <div style={{ flex: 1 }}>
            <R>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.help.tag}</span>
              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, marginBottom: 16, color: "#0f172a", whiteSpace: "pre-line" }}>{t.help.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#64748b", marginBottom: 28 }}>{t.help.p}</p>
            </R>
            <R delay={.1}><div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200, background: B, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.75.32 1.54.55 2.35.68A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "rgba(255,255,255,.6)" }}>{t.help.phone.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{t.help.phone.value}</div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 200, background: B, borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "rgba(255,255,255,.6)" }}>{t.help.email.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{t.help.email.value}</div>
                </div>
              </div>
            </div></R>
            <R delay={.15}><div style={{ marginTop: 14, padding: "16px 20px", borderRadius: 12, background: "#f0f4ff", border: `1px solid rgba(37,99,235,.12)`, display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div><span style={{ fontSize: 12, fontWeight: 700, color: B }}>{t.emergency.label}</span><span style={{ fontSize: 13, color: "#475569", marginLeft: 8 }}>{t.emergency.phone} · {t.emergency.note}</span></div>
            </div></R>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES BAR ═══ */}
      <div style={{ borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "28px 32px" }}>
        <div className="fg" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 24 }}>
          {t.features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ color: B, flexShrink: 0, marginTop: 2 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5">
                  {i === 0 ? <polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/> : i === 1 ? <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></> : i === 2 ? <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></> : <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>}
                </svg>
              </div>
              <div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{f.t}</h4>
                <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ NEWSLETTER ═══ */}
      <div style={{ padding: "48px 32px", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, color: "#0f172a", whiteSpace: "pre-line", lineHeight: 1.3 }}>{t.newsletter.title}</h3>
          <div style={{ display: "flex", gap: 0 }}>
            <input placeholder={t.newsletter.placeholder} style={{ padding: "12px 18px", border: "1px solid #e2e8f0", borderRadius: "8px 0 0 8px", fontSize: 14, fontFamily: "inherit", outline: "none", width: 260, color: "#1e293b", background: "#f8fafc" }} />
            <button
              style={{ background: B, border: "none", borderRadius: "0 8px 8px 0", padding: "12px 24px", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "inherit", letterSpacing: ".06em", display: "flex", alignItems: "center", gap: 6, transition: "background .3s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}>✉ {t.newsletter.btn}</button>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: BG, padding: "56px 32px 32px", color: "#94a3b8" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fb" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${B},#06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>JN</span>
                </div>
                <span style={{ fontWeight: 700, fontSize: 18, color: "#e2e8f0" }}>jerumed<span style={{ color: B }}>nexus</span></span>
              </div>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 300 }}>{t.footer.desc}</p>
              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                {["f", "in", "𝕏", "▶"].map((s, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#94a3b8" }}>{s}</div>
                ))}
              </div>
            </div>
            {[t.footer.l1, t.footer.l2, t.footer.l3].map((links, ci) => {
              const footerUrls = [
                [`/${lang}/leistungen/it-sicherheit`, `/${lang}/leistungen/netzwerk`, `/${lang}/leistungen/server-cloud`, `/${lang}/leistungen/praxissoftware`, `/${lang}/leistungen/labor`, `/${lang}/leistungen/managed-it`],
                [`/${lang}/kontakt`, `/${lang}/kontakt`, `/${lang}/kontakt`, `/${lang}/datenschutz`, `/${lang}/kontakt`],
                [`/${lang}/ueber-uns`, `/${lang}/kontakt`, `/${lang}/kontakt`, `/${lang}/kontakt`],
              ];
              return (
                <div key={ci}>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 18, position: "relative", paddingBottom: 12 }}>
                    {t.footer.cols[ci]}<span style={{ position: "absolute", bottom: 0, left: 0, width: 32, height: 2, background: B }} />
                  </h4>
                  {links.map((l, i) => <a key={i} href={footerUrls[ci]?.[i] ?? "#"} className="ft-l">{l}</a>)}
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 20 }}>
            <div className="ft-bot" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <p style={{ fontSize: 13, color: "#475569" }}>{t.footer.copy}</p>
              <div style={{ display: "flex", gap: 16 }}>
                {t.footer.legal.map((l, i) => {
                  const legalUrls = [`/${lang}/datenschutz`, `/${lang}/datenschutz`, `/${lang}/impressum`, `/${lang}/impressum`];
                  return <a key={i} href={legalUrls[i] ?? "#"} style={{ fontSize: 13, color: "#475569", textDecoration: "none" }}>{l}</a>;
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
