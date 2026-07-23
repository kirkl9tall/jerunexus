import type { Metadata } from "next";
import { locales } from "@/lib/translations";
import LocalePersist from "@/components/LocalePersist";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

function getOgLocale(lang: string): string {
  if (lang === "en") return "en_CH";
  if (lang === "de-DE") return "de_DE";
  return "de_CH";
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";

  return {
    title: {
      default: "Jerumed Nexus — IT Solutions for Healthcare",
      template: "%s | Jerumed Nexus",
    },
    description: isEn
      ? "Professional IT services for medical practices in Switzerland. Cybersecurity, network, EMR integration, lab middleware and managed IT."
      : "Professionelle IT-Dienstleistungen für Arztpraxen in der Schweiz. Cybersecurity, Netzwerk, EMR-Integration, Labor-Middleware und Managed IT.",
    metadataBase: new URL("https://www.jerumed-nexus.ch"),
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      siteName: "Jerumed Nexus",
      locale: getOgLocale(lang),
      type: "website",
    },
  };
}

export default async function LangLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  const isEn = lang === "en";

  // Schema.org structured data — helps search engines understand the business
  // (and backs the "Schema.org medical markup" we offer as a service).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jerumed Nexus",
    url: "https://www.jerumed-nexus.ch",
    description: isEn
      ? "Specialised IT partner for Swiss medical practices: secure Swiss-hosted infrastructure, medical software integration, automation and compliance."
      : "Spezialisierter IT-Partner für Schweizer Arztpraxen: sichere Swiss-hosted Infrastruktur, medizinische Software-Integration, Automatisierung und Compliance.",
    areaServed: { "@type": "Country", name: "Switzerland" },
    address: { "@type": "PostalAddress", addressLocality: "Zürich", addressRegion: "ZH", addressCountry: "CH" },
    email: "support@jerumed-nexus.ch",
    inLanguage: isEn ? "en" : "de-CH",
    availableLanguage: ["de-CH", "en"],
    knowsAbout: [
      "Medical IT", "Cybersecurity", "Network infrastructure", "tomedo", "HL7",
      "Practice software integration", "Lab middleware", "Managed IT", "Backup & disaster recovery",
    ],
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LocalePersist lang={lang} />
      {children}
    </>
  );
}
