"use client";
import Reveal from "./Reveal";
import type { SectionProps } from "./types";

const B = "#2563EB";

const SVG_ICONS = [
  <><rect key="r" x="3" y="11" width="18" height="11" rx="2"/><path key="p" d="M7 11V7a5 5 0 0110 0v4"/><circle key="c" cx="12" cy="16" r="1"/></>,
  <><circle key="c" cx="12" cy="12" r="10"/><line key="l" x1="2" y1="12" x2="22" y2="12"/><path key="p" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,
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

export default function ServicesSection({ t, lang }: Readonly<SectionProps>) {
  return (
    <section id="services" style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".15em", color: B }}>{t.services.tag}</span>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, lineHeight: 1.2, marginTop: 10, color: "#0f172a", whiteSpace: "pre-line" }}>{t.services.title}</h2>
        </div>
      </Reveal>
      <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 20 }}>
        {t.services.items.map((s, i) => (
          <Reveal key={s.slug} delay={i * .04}>
            <a href={`/${lang}/leistungen/${s.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="svc-card">
                <div className="svc-ico" style={{ width: 48, height: 48, borderRadius: 12, background: "#f0f4ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, transition: "all 0.3s" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="1.5">{SVG_ICONS[i] ?? SVG_ICONS[0]}</svg>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#64748b", marginBottom: 14 }}>{s.d}</p>
                <span style={{ fontSize: 13, fontWeight: 600, color: B, letterSpacing: ".06em", textTransform: "uppercase" }}>{t.services.learnMore} →</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
