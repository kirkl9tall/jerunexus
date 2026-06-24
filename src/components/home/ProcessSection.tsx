"use client";
import { useEffect, useRef, useState } from "react";

const B = "#2563EB";
const INK = "#0A0A0A";

type Step = { n: string; t: string; d: string };
type Props = Readonly<{ tag: string; title: string; steps: ReadonlyArray<Step> }>;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export default function ProcessSection({ tag, title, steps }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setP(clamp(1 - center / globalThis.innerHeight));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(compute); } };
    compute();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);
    return () => {
      globalThis.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = steps.length;
  // One wire: it first descends into the timeline (connectorP), then the light
  // travels along the horizontal timeline (lineP), lighting each step in turn.
  const connectorP = clamp((p - 0.14) / 0.13);
  const lineP = clamp((p - 0.27) / 0.48);
  const litFor = (i: number) => clamp((lineP * n - i) / 0.7);

  return (
    <section ref={ref} style={{ background: INK, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 16, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{tag}</span>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05 }}>{title}</h2>
        </div>

        {/* Connector wire — descends from above (the certifications wires) into the timeline */}
        <div style={{ position: "relative", height: 110 }}>
          <svg viewBox="0 0 1000 110" preserveAspectRatio="none" width="100%" height="110" style={{ display: "block", overflow: "visible" }} aria-hidden="true">
            <defs>
              <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path
              d="M 540 -120 C 440 -10, 90 30, 4 110"
              fill="none"
              stroke="url(#wireGrad)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - connectorP}
              style={{ filter: "drop-shadow(0 0 5px #38bdf8)", transition: "stroke-dashoffset .1s linear" }}
            />
          </svg>
        </div>

        {/* Horizontal timeline — the same wire continues, lighting each step */}
        <div style={{ position: "relative", height: 2, background: "rgba(255,255,255,.12)", marginBottom: 44 }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: 2, width: `${lineP * 100}%`, background: B, boxShadow: `0 0 14px ${B}` }} />
          {steps.map((s, i) => {
            const lit = litFor(i) > 0.5;
            return (
              <span key={s.t} style={{
                position: "absolute", left: `${((i + 0.5) / n) * 100}%`, top: "50%",
                width: lit ? 12 : 8, height: lit ? 12 : 8, borderRadius: "50%",
                transform: "translate(-50%,-50%)",
                background: lit ? B : "rgba(255,255,255,.25)",
                boxShadow: lit ? `0 0 14px 3px ${B}` : "none",
                transition: "all .3s",
              }} />
            );
          })}
          <span style={{
            position: "absolute", left: `${lineP * 100}%`, top: "50%", width: 12, height: 12, borderRadius: "50%",
            transform: "translate(-50%,-50%)", background: "#fff", boxShadow: `0 0 18px 5px ${B}`,
            opacity: lineP > 0 && lineP < 1 ? 1 : 0, transition: "opacity .3s",
          }} />
        </div>

        {/* Steps — light up as the wire reaches them */}
        <div className="sg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0 }}>
          {steps.map((s, i) => {
            const lit = litFor(i);
            return (
              <div key={s.t} style={{
                borderRight: i < n - 1 ? "1px solid rgba(255,255,255,.12)" : "none",
                paddingRight: i < n - 1 ? 32 : 0, paddingLeft: i > 0 ? 32 : 0,
                opacity: 0.25 + 0.75 * lit,
                transform: `translateY(${(1 - lit) * 18}px)`,
                transition: "opacity .35s ease, transform .35s ease",
              }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 22, color: B, letterSpacing: ".14em", marginBottom: 28 }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: B, marginBottom: 16, letterSpacing: "-.02em" }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#fff" }}>{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
