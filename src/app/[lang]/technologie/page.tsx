"use client";
import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/translations";
import PageLayout from "@/components/PageLayout";

const B    = "#2563EB";
const INK  = "#0A0A0A";
const LINE  = "#E5E7EB";
const MUTED = "#6B7280";

/** Row of 5 stars, filled up to `rating`. */
function Stars({ rating }: Readonly<{ rating: number }>) {
  return (
    <div style={{ display: "flex", gap: 3 }} aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= rating ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const params = useParams();
  const lang = String(params.lang ?? "de-CH");
  const t = getDictionary(lang);
  const p = t.pages.technology;
  const r = p.reviews;

  return (
    <PageLayout>
      {/* Hero + rating summary */}
      <section className="navy-hero" style={{ padding: "140px 40px 80px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: B }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: B, letterSpacing: ".14em", textTransform: "uppercase" }}>{r.tag}</span>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 700, color: "#fff", lineHeight: .95, letterSpacing: "-.04em", marginBottom: 20 }}>{p.heroTitle}</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,.4)", maxWidth: 560, marginBottom: 44 }}>{p.heroSub}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 52, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: "-.03em" }}>{r.ratingValue}</span>
            <div>
              <Stars rating={5} />
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 8, letterSpacing: ".02em" }}>{r.ratingLabel} · {r.ratingNote}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="rv-grid">
            {r.items.map((rev) => (
              <div key={rev.name} className="rv-card">
                <Stars rating={rev.rating} />
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#374151", margin: "18px 0 22px" }}>&ldquo;{rev.quote}&rdquo;</p>
                <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16 }}>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: INK }}>{rev.name}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: MUTED, letterSpacing: ".06em", textTransform: "uppercase", marginTop: 4 }}>{rev.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .rv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .rv-card { padding: 30px 28px; background: #fff; border: 1px solid #E5E7EB; display: flex; flex-direction: column; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .rv-card:hover { border-color: #2563EB; transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.06); }
        .rv-card p { flex: 1; }
        @media (max-width: 1024px) { .rv-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .rv-grid { grid-template-columns: 1fr; } }
      `}</style>
    </PageLayout>
  );
}
