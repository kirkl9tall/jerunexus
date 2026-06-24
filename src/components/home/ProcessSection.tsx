"use client";
import { useEffect, useRef, useState } from "react";

const B = "#2563EB";
const INK = "#0A0A0A";

type Step = { n: string; t: string; d: string };
type Props = Readonly<{ tag: string; title: string; steps: ReadonlyArray<Step> }>;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

// Flowing wave height (0–100 viewBox units) at a horizontal fraction + time.
const waveY = (frac: number, t: number) =>
  50 + 14 * Math.sin(frac * 5.5 + t * 1.1) + 7 * Math.sin(frac * 11 - t * 1.5);

export default function ProcessSection({ tag, title, steps }: Props) {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef(0);
  const [p, setP] = useState(0);
  const n = steps.length;

  // Scroll progress for this section.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const v = clamp(1 - (rect.top + rect.height / 2) / globalThis.innerHeight);
      progressRef.current = v;
      setP(v);
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

  // Continuously animate the flowing wire (alive), plus node/dot positions.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = 1000;

    const buildPath = (t: number) => {
      let d = `M 0 ${waveY(0, t).toFixed(2)}`;
      for (let x = 20; x <= W; x += 20) d += ` L ${x} ${waveY(x / W, t).toFixed(2)}`;
      return d;
    };

    const paintNode = (i: number, lineP: number, t: number) => {
      const node = nodeRefs.current[i];
      if (!node) return;
      const lit = clamp((lineP * n - i) / 0.7) > 0.5;
      node.style.top = `${waveY((i + 0.5) / n, t)}%`;
      node.style.width = node.style.height = lit ? "13px" : "8px";
      node.style.background = lit ? B : "rgba(255,255,255,.25)";
      node.style.boxShadow = lit ? `0 0 14px 3px ${B}` : "none";
    };

    let raf = 0;
    let visible = false;
    const draw = () => {
      const t = reduce ? 0 : performance.now() / 1000;
      const lineP = clamp((progressRef.current - 0.27) / 0.48);

      pathRef.current?.setAttribute("d", buildPath(t));
      for (let i = 0; i < n; i++) paintNode(i, lineP, t);

      const dot = dotRef.current;
      if (dot) {
        dot.style.left = `${lineP * 100}%`;
        dot.style.top = `${waveY(lineP, t)}%`;
        dot.style.opacity = lineP > 0 && lineP < 1 ? "1" : "0";
      }

      raf = visible ? requestAnimationFrame(draw) : 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) draw();
    }, { threshold: 0 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [n]);

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

        {/* One alive flowing wire — undulates continuously; the light travels and lights each step */}
        <div style={{ position: "relative", height: 100, marginBottom: 40 }}>
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" width="100%" height="100" style={{ display: "block", overflow: "visible" }} aria-hidden="true">
            <defs>
              <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path ref={pathRef} d="M 0 50 L 1000 50" fill="none" stroke="url(#wireGrad)" strokeWidth={2.5} vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px #38bdf8)" }} />
          </svg>
          {/* Step nodes riding the wire */}
          {steps.map((s, i) => (
            <span
              key={s.t}
              ref={(el) => { nodeRefs.current[i] = el; }}
              style={{ position: "absolute", left: `${((i + 0.5) / n) * 100}%`, top: "50%", width: 8, height: 8, borderRadius: "50%", transform: "translate(-50%,-50%)", background: "rgba(255,255,255,.25)", transition: "background .3s, width .3s, height .3s, box-shadow .3s" }}
            />
          ))}
          {/* Leading light travelling along the wire */}
          <span ref={dotRef} style={{ position: "absolute", left: "0%", top: "50%", width: 13, height: 13, borderRadius: "50%", transform: "translate(-50%,-50%)", background: "#fff", boxShadow: `0 0 18px 5px ${B}`, opacity: 0 }} />
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
