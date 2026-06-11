import type { Metadata } from "next";
import { locales } from "@/lib/translations";

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

export default function LangLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
