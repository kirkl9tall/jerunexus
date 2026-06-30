"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDictionary, locales } from "@/lib/translations";

const B   = "#2563EB";
const BD  = "#1d4ed8";
const INK = "#0A0A0A";
const MUTED = "#6B7280";
const LINE  = "#E5E7EB";

export default function Navbar() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const [menu, setMenu] = useState(false);
  const [lm,   setLm]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,.9)" : "#fff", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: `1px solid ${LINE}`, boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,.06)" : "none", transition: "all .3s" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

        <a href={`/${lang}`} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: INK, letterSpacing: "-.01em" }}>
            jerumed<span style={{ color: B }}>nexus</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hide-m show-d" style={{ display: "none", alignItems: "center", gap: 36 }}>
          {t.nav.items.map((n, i) => (
            <a key={n} href={i === 0 ? `/${lang}` : `/${lang}/${t.nav.links[i]}`}
              style={{ color: MUTED, fontSize: 14, fontFamily: "'Inter',sans-serif", textDecoration: "none", letterSpacing: ".01em", transition: "color .2s" }}
              onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = INK)}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.color = INK)}
              onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}>{n}</a>
          ))}

          <div style={{ position: "relative" }}>
            <button onClick={() => setLm(!lm)}
              style={{ background: "rgba(10,10,10,.04)", border: `1px solid ${LINE}`, padding: "6px 14px", color: "#374151", fontSize: 12, fontFamily: "'DM Mono',monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all .2s" }}>
              {t.langLabel} <span style={{ fontSize: 8 }}>▾</span>
            </button>
            {lm && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", border: `1px solid ${LINE}`, boxShadow: "0 10px 30px rgba(0,0,0,.1)", padding: 4, minWidth: 160, zIndex: 10 }}>
                {locales.map((l) => {
                  const ld = getDictionary(l);
                  return (
                    <button key={l} onClick={() => { router.push(`/${l}`); setLm(false); }}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: lang === l ? "rgba(37,99,235,.1)" : "none", border: "none", color: lang === l ? B : "#374151", fontSize: 13, fontFamily: "'Inter',sans-serif", cursor: "pointer" }}>
                      {ld.langFull}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <a href="/portal/login"
            style={{ background: B, border: "none", padding: "10px 24px", color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", textDecoration: "none", letterSpacing: ".04em", transition: "background .2s", display: "inline-block" }}
            onMouseOver={(e) => (e.currentTarget.style.background = BD)}
            onFocus={(e) => (e.currentTarget.style.background = BD)}
            onMouseOut={(e) => (e.currentTarget.style.background = B)}
            onBlur={(e) => (e.currentTarget.style.background = B)}>{t.nav.cta}</a>
        </div>

        {/* Hamburger — mobile only */}
        <button className="show-m" style={{ background: "none", border: "none", padding: 8, cursor: "pointer" }} onClick={() => setMenu(!menu)} aria-label="Menu">
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 22, height: 1.5, background: INK, margin: i === 1 ? "6px 0" : "0", transition: "all .25s",
              opacity: menu && i === 1 ? 0 : 1,
              transform: menu && i === 0 ? "rotate(45deg) translateY(7.5px)" : menu && i === 2 ? "rotate(-45deg) translateY(-7.5px)" : "none"
            }} />
          ))}
        </button>
      </div>

      {menu && (
        <div style={{ background: "#fff", padding: "20px 40px 28px", borderTop: `1px solid ${LINE}` }}>
          {t.nav.items.map((n, i) => (
            <a key={n} href={i === 0 ? `/${lang}` : `/${lang}/${t.nav.links[i]}`}
              style={{ display: "block", padding: "13px 0", borderBottom: `1px solid ${LINE}`, color: INK, fontSize: 15, fontFamily: "'Inter',sans-serif", textDecoration: "none" }}>{n}</a>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {locales.map((l) => {
              const ld = getDictionary(l);
              return (
                <button key={l} onClick={() => { router.push(`/${l}`); setMenu(false); }}
                  style={{ padding: "7px 14px", border: `1px solid ${lang === l ? B : LINE}`, background: "none", color: lang === l ? B : MUTED, fontSize: 12, fontFamily: "'DM Mono',monospace", cursor: "pointer" }}>
                  {ld.langLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
