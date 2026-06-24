"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const FlowLines = dynamic(() => import("./FlowLines"), { ssr: false });

const ACCENT = "#e0a96b"; // warm copper, matching the shield background
const INK = "#0A0A0A";

type Badge = { t: string; d: string; icon: string };
type Props = Readonly<{ tag: string; title: string; badges: ReadonlyArray<Badge> }>;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export default function ComplianceSection({ tag, title, badges }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  const getProgress = useRef(() => progressRef.current).current;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const distance = rect.height - globalThis.innerHeight; // scrollable while pinned
      const v = distance > 0 ? clamp(-rect.top / distance) : 0;
      progressRef.current = v;
      setProgress(v);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
    compute();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } },
      { rootMargin: "300px" },
    );
    io.observe(wrap);
    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
      io.disconnect();
    };
  }, []);

  const n = badges.length;
  const START = 0.08;
  const slot = (1 - START) / n;
  // Which certification is showing now — one pops in at a time (no muddy fade).
  const activeIndex = clamp(Math.floor((progress - START) / slot), 0, n - 1);

  return (
    <div ref={wrapRef} style={{ position: "relative", height: `${100 + n * 34}vh`, background: INK }}>
      {/* Pinned stage */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px" }}>
        {/* Shield background image */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/background-sheild.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,.15) 0%, rgba(0,0,0,.45) 100%)" }} />
        </div>

        {/* Flowing copper wires — animated over the shield, glow via additive blending */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.85 }}>
          {show && <FlowLines getProgress={getProgress} color={0xf0bf85} />}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 2, textAlign: "center" }}>
          {/* Persistent eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ display: "inline-block", width: 36, height: 2, background: ACCENT }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 600, color: ACCENT, letterSpacing: ".12em", textTransform: "uppercase" }}>{tag}</span>
            <span style={{ display: "inline-block", width: 36, height: 2, background: ACCENT }} />
          </div>

          {/* Certifications — one pops in at a time, in the same place */}
          <div style={{ position: "relative", minHeight: "44vh" }}>
            {badges.map((b, i) => {
              const active = i === activeIndex;
              return (
                <div
                  key={b.t}
                  style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    opacity: active ? 1 : 0,
                    transform: active ? "scale(1)" : "scale(.9)",
                    transition: "opacity .3s ease, transform .45s cubic-bezier(.34,1.56,.64,1)",
                    pointerEvents: "none",
                  }}
                >
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: ACCENT, letterSpacing: ".18em", marginBottom: 18 }}>
                    {String(i + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,6vw,84px)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,.6)" }}>{b.t}</h3>
                  <p style={{ fontSize: "clamp(15px,1.6vw,20px)", color: "rgba(255,255,255,.82)", lineHeight: 1.6, maxWidth: 560, textShadow: "0 1px 16px rgba(0,0,0,.6)" }}>{b.d}</p>
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
            {badges.map((b, i) => (
              <span key={b.t} style={{ width: i === activeIndex ? 22 : 7, height: 3, background: i <= activeIndex ? ACCENT : "rgba(255,255,255,.25)", transition: "all .3s" }} />
            ))}
          </div>

          {/* Section title — subtle below the certifications */}
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.5)", marginTop: 28, whiteSpace: "pre-line" }}>{title.replace("\n", " ")}</p>
        </div>
      </div>
    </div>
  );
}
