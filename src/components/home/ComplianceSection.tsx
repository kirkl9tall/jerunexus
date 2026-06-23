"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ShieldScene = dynamic(() => import("./ShieldScene"), { ssr: false });

const B = "#2563EB";
const INK = "#0A0A0A";

type Badge = { t: string; d: string; icon: string };
type Props = Readonly<{ tag: string; title: string; badges: ReadonlyArray<Badge> }>;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export default function ComplianceSection({ tag, title, badges }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  // Stable getter so the (memo-free) ShieldScene reads live progress each frame.
  const getProgress = useRef(() => progressRef.current).current;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const distance = rect.height - globalThis.innerHeight; // scrollable while pinned
      const p = distance > 0 ? clamp(-rect.top / distance) : 0;
      progressRef.current = p;
      setProgress(p);
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(compute); }
    };

    compute();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", onScroll);

    // Lazy-load the WebGL scene only when the section nears the viewport.
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
  // Badges reveal one-by-one between 12% and 95% of the scroll.
  const START = 0.12;
  const END = 0.95;
  const step = (END - START) / n;

  return (
    <div ref={wrapRef} style={{ position: "relative", height: `${100 + n * 32}vh`, background: "#fff" }}>
      {/* Pinned stage */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px" }}>
        {/* Background shield — slides L→R + half-rotates with scroll progress */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.5, pointerEvents: "none" }}>
          {show && <ShieldScene getProgress={getProgress} />}
        </div>

        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 16, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{tag}</span>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: INK, letterSpacing: "-.03em", lineHeight: 1.05, whiteSpace: "pre-line" }}>{title}</h2>
          </div>

          {/* Badges — each revealed by scroll, accumulating one at a time */}
          <div className="fg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, border: "1px solid #E5E7EB" }}>
            {badges.map((b, i) => {
              const local = clamp((progress - (START + i * step)) / (step * 0.7));
              return (
                <div
                  key={b.t}
                  className="hover-card"
                  style={{
                    padding: "36px 32px",
                    borderRight: (i + 1) % 3 === 0 ? "none" : "1px solid #E5E7EB",
                    borderBottom: i < n - 3 ? "1px solid #E5E7EB" : "none",
                    opacity: local,
                    transform: `translateY(${(1 - local) * 28}px)`,
                    transition: "opacity .25s linear, transform .25s linear",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 20 }}>{b.icon}</div>
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: INK, marginBottom: 10 }}>{b.t}</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: "#6B7280" }}>{b.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
