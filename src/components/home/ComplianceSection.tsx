"use client";
import { useEffect, useRef, useState } from "react";

const B = "#2563EB";
const INK = "#0A0A0A";

type Badge = { t: string; d: string; icon: string };
type Props = Readonly<{ tag: string; title: string; badges: ReadonlyArray<Badge> }>;

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export default function ComplianceSection({ tag, title, badges }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let ticking = false;
    const compute = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      const distance = rect.height - globalThis.innerHeight; // scrollable while pinned
      setProgress(distance > 0 ? clamp(-rect.top / distance) : 0);
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

  const n = badges.length;
  const START = 0.1;
  const END = 1;
  const slot = (END - START) / n;

  // Triangular opacity peaking at each badge's slot — one cert cross-fades into
  // the next in the same place. The last one holds once reached.
  const opacityFor = (i: number) => {
    const center = START + (i + 0.5) * slot;
    if (i === n - 1 && progress >= center) return 1;
    return clamp(1 - Math.abs(progress - center) / (slot * 0.62));
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", height: `${100 + n * 34}vh`, background: INK }}>
      {/* Pinned stage */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 40px" }}>
        {/* Shield background image */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/background-sheild.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,.35) 0%, rgba(0,0,0,.62) 100%)" }} />
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Persistent eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ display: "inline-block", width: 36, height: 2, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 600, color: "#60a5fa", letterSpacing: ".12em", textTransform: "uppercase" }}>{tag}</span>
            <span style={{ display: "inline-block", width: 36, height: 2, background: B }} />
          </div>

          {/* Cross-fading certifications — all stacked in the same place */}
          <div style={{ position: "relative", minHeight: "44vh" }}>
            {badges.map((b, i) => (
              <div
                key={b.t}
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  opacity: opacityFor(i),
                  transform: `translateY(${(1 - opacityFor(i)) * 18}px)`,
                  transition: "opacity .2s linear, transform .2s linear",
                  pointerEvents: "none",
                }}
              >
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: "#60a5fa", letterSpacing: ".18em", marginBottom: 18 }}>
                  {String(i + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,6vw,84px)", fontWeight: 700, color: "#fff", letterSpacing: "-.04em", lineHeight: 1, marginBottom: 22, textShadow: "0 2px 30px rgba(0,0,0,.5)" }}>{b.t}</h3>
                <p style={{ fontSize: "clamp(15px,1.6vw,20px)", color: "rgba(255,255,255,.78)", lineHeight: 1.6, maxWidth: 560, textShadow: "0 1px 16px rgba(0,0,0,.5)" }}>{b.d}</p>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
            {badges.map((b, i) => (
              <span key={b.t} style={{ width: opacityFor(i) > 0.5 ? 22 : 7, height: 3, background: opacityFor(i) > 0.5 ? "#60a5fa" : "rgba(255,255,255,.25)", transition: "all .3s" }} />
            ))}
          </div>

          {/* Section title — subtle below the rotating certs */}
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.5)", marginTop: 28, whiteSpace: "pre-line" }}>{title.replace("\n", " ")}</p>
        </div>
      </div>
    </div>
  );
}
