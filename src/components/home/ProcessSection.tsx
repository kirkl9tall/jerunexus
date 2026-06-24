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
  // The travelling light fills the line as the section moves through the viewport.
  const lineP = clamp((p - 0.22) / 0.5);
  const litFor = (i: number) => clamp((lineP * n - i) / 0.7);

  return (
    <section ref={ref} style={{ background: INK, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 16, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{tag}</span>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05 }}>{title}</h2>
        </div>

        {/* Travelling glow line through the steps */}
        <div style={{ position: "relative", height: 2, background: "rgba(255,255,255,.12)", marginBottom: 44 }}>
          {/* filled portion */}
          <div style={{ position: "absolute", left: 0, top: 0, height: 2, width: `${lineP * 100}%`, background: B, boxShadow: `0 0 14px ${B}` }} />
          {/* node dot per step */}
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
          {/* leading light */}
          <span style={{
            position: "absolute", left: `${lineP * 100}%`, top: "50%", width: 12, height: 12, borderRadius: "50%",
            transform: "translate(-50%,-50%)", background: "#fff", boxShadow: `0 0 18px 5px ${B}`,
            opacity: lineP > 0 && lineP < 1 ? 1 : 0, transition: "opacity .3s",
          }} />
        </div>

        {/* Steps — light up as the line reaches them */}
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
