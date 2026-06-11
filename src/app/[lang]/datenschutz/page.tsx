"use client";
import { useParams } from 'next/navigation';
import { getDictionary } from '@/lib/translations';
import PageLayout from '@/components/PageLayout';

const B = "#2563EB";

export default function PrivacyPage() {
  const params = useParams();
  const t = getDictionary(params.lang as string);

  const p = t.pages.datenschutz;
  return (
    <PageLayout>
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", padding: "120px 32px 60px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 40, fontWeight: 700, color: "#fff" }}>{p.title}</h1>
      </section>
      <section style={{ padding: "60px 32px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ padding: 32, borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#475569" }}>{p.intro}</p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#475569", marginTop: 20 }}>Diese Seite wird noch vervollständigt.</p>
        </div>
      </section>
    </PageLayout>
  );
}
