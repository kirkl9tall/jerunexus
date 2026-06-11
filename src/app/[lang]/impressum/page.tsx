"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";

export default function LegalPage() {
  const params = useParams();
  const t = getDictionary(params.lang as string);

  const p = t.pages.impressum;
  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 60px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 40, fontWeight: 700, color: "#fff" }}>{p.title}</h1>
      </section>
      <section style={{ padding: "60px 32px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ padding: 32, borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>{p.company}</h2>
          <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: 8 }}>{p.address}</p>
          <p style={{ color: "#475569", marginBottom: 4 }}>E-Mail: <a href={"mailto:" + p.email} style={{ color: B }}>{p.email}</a></p>
          <p style={{ color: "#475569" }}>Tel: {p.phone}</p>
        </div>
      </section>
    </PageLayout>
  );
}
