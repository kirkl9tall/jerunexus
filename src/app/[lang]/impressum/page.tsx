"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B   = "#2563EB";
const INK = "#0A0A0A";

export default function LegalPage() {
  const params = useParams();
  const t = getDictionary(params.lang as string);
  const p = t.pages.impressum;

  return (
    <PageLayout>
      <section style={{ background: INK, padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{t.pages.legalTag}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em" }}>{p.title}</h1>
        </div>
      </section>

      <section style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ border: "1px solid #E5E7EB", padding: "40px 36px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24, color: INK }}>{p.company}</h2>
            <p style={{ color: "#6B7280", lineHeight: 1.8, marginBottom: 8 }}>{p.address}</p>
            <p style={{ color: "#6B7280", marginBottom: 4 }}>
              E-Mail: <a href={"mailto:" + p.email} style={{ color: B, textDecoration: "none" }}>{p.email}</a>
            </p>
            <p style={{ color: "#6B7280" }}>Tel: {p.phone}</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
