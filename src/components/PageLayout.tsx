"use client";
import Navbar from "./Navbar";
import Footer from "./Footer";

const B = "#2563EB";

export default function PageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div style={{ background: "#fff", color: "#1e293b", fontFamily: "'Plus Jakarta Sans','DM Sans',system-ui,sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

      <Navbar />
      {children}

      {/* CTA banner before footer */}
      <div style={{ background: B, padding: "48px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".12em", color: "rgba(255,255,255,.6)", textTransform: "uppercase", marginBottom: 12 }}>JERUMED NEXUS</p>
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "#fff", marginBottom: 20 }}>Bereit für eine bessere Praxis-IT?</h2>
        <a href="kontakt" style={{ display: "inline-block", background: "#fff", color: B, padding: "14px 36px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>Beratung anfragen →</a>
      </div>

      <Footer />
    </div>
  );
}
