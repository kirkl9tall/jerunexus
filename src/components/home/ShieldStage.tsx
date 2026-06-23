"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Three.js lives in a separate chunk that is only fetched when this stage
// scrolls near the viewport — never on other pages or at initial load.
const ShieldScene = dynamic(() => import("./ShieldScene"), { ssr: false });

export default function ShieldStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 440, height: 260, margin: "0 auto 48px" }}>
      {show && <ShieldScene />}
    </div>
  );
}
