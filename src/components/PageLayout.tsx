"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";

const B   = "#2563EB";
const BD  = "#1d4ed8";
const INK = "#0A0A0A";

export default function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ background: "#fff", color: INK, fontFamily: "'Inter',system-ui,sans-serif", overflowX: "clip" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Navbar />
      {children}

      {/* CTA before footer */}
      <section style={{ background: INK, padding: "100px 40px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>Kontakt</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", letterSpacing: "-.03em", lineHeight: 1.05 }}>Bereit für eine bessere<br />Praxis-IT?</h2>
          </div>
          <a href="kontakt"
            style={{ background: B, padding: "15px 36px", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", textDecoration: "none", letterSpacing: ".04em", transition: "background .2s", display: "inline-block" }}
            onMouseOver={(e) => (e.currentTarget.style.background = BD)}
            onMouseOut={(e) => (e.currentTarget.style.background = B)}>
            Beratung anfragen →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
