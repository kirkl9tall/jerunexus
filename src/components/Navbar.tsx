"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDictionary, locales } from "@/lib/translations";

const B = "#2563EB";
const BD = "#1d4ed8";
const BG = "#0f172a";

export default function Navbar() {
  const params = useParams();
  const router = useRouter();
  const lang = (params.lang as string) || "de-CH";
  const t = getDictionary(lang);

  const [menu, setMenu] = useState(false);
  const [lm, setLm] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div style={{ background: BG, padding: "8px 0", fontSize: 13, color: "rgba(255,255,255,.6)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: B }}>●</span> {t.top.addr}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <span><span style={{ color: B }}>☎</span> {t.top.phone}</span>
            <span><span style={{ color: B }}>✉</span> {t.top.email}</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,.95)" : "#fff", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: "1px solid #f0f0f0", transition: "all .3s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <a href={`/${lang}`} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: `linear-gradient(135deg,${B},#06b6d4)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>JN</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 19, color: BG }}>jerumed<span style={{ color: B }}>nexus</span></span>
          </a>

          {/* Desktop */}
          <div className="hide-m show-d" style={{ display: "none", alignItems: "center", gap: 28 }}>
            {t.nav.items.map((n, i) => (
              <a key={t.nav.links[i]} href={i === 0 ? `/${lang}` : `/${lang}/${t.nav.links[i]}`}
                style={{ color: "#64748b", fontSize: 15, fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
                onMouseOver={(e) => ((e.target as HTMLElement).style.color = B)}
                onFocus={(e) => ((e.target as HTMLElement).style.color = B)}
                onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
                onBlur={(e) => ((e.target as HTMLElement).style.color = "#64748b")}>{n}</a>
            ))}

            {/* Language switcher */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setLm(!lm)}
                style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: "7px 14px", color: "#475569", fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
                {t.langLabel} <span style={{ fontSize: 9 }}>▾</span>
              </button>
              {lm && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#fff", borderRadius: 10, boxShadow: "0 10px 36px rgba(0,0,0,.1)", padding: 5, minWidth: 150, border: "1px solid #eee", zIndex: 100 }}>
                  {locales.map((l) => {
                    const ld = getDictionary(l);
                    return (
                      <button key={l} onClick={() => { router.push(`/${l}`); setLm(false); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 14px", background: lang === l ? "#f0f4ff" : "none", border: "none", borderRadius: 7, color: lang === l ? B : "#475569", fontSize: 14, fontWeight: lang === l ? 600 : 400, fontFamily: "inherit", cursor: "pointer" }}>
                        {ld.langFull}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <a href={`/${lang}/kontakt`}
              style={{ background: B, borderRadius: 8, padding: "10px 24px", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "all .3s" }}
              onMouseOver={(e) => (e.currentTarget.style.background = BD)}
              onFocus={(e) => (e.currentTarget.style.background = BD)}
              onMouseOut={(e) => (e.currentTarget.style.background = B)}
              onBlur={(e) => (e.currentTarget.style.background = B)}>{t.nav.cta}</a>
          </div>

          {/* Mobile toggle */}
          <button className="hide-m" style={{ display: "block", background: "none", border: "none", padding: 8, cursor: "pointer" }} onClick={() => setMenu(!menu)}>
            <div style={{ width: 22, height: 2, background: "#1e293b", transition: "all .3s", transform: menu ? "rotate(45deg) translateY(7px)" : "none" }} />
            <div style={{ width: 22, height: 2, background: "#1e293b", margin: "5px 0", opacity: menu ? 0 : 1, transition: "all .3s" }} />
            <div style={{ width: 22, height: 2, background: "#1e293b", transition: "all .3s", transform: menu ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>

        {menu && (
          <div style={{ padding: "16px 32px 24px", borderTop: "1px solid #f0f0f0" }}>
            {t.nav.items.map((n, i) => (
              <a key={t.nav.links[i]} href={i === 0 ? `/${lang}` : `/${lang}/${t.nav.links[i]}`}
                style={{ display: "block", padding: "12px 0", borderBottom: "1px solid #f5f5f5", color: "#1e293b", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>{n}</a>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {locales.map((l) => {
                const ld = getDictionary(l);
                return (
                  <button key={l} onClick={() => { router.push(`/${l}`); setMenu(false); }}
                    style={{ padding: "7px 14px", borderRadius: 7, border: `1px solid ${lang === l ? B : "#e2e8f0"}`, background: lang === l ? "#f0f4ff" : "#fff", color: lang === l ? B : "#64748b", fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>
                    {ld.langLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
