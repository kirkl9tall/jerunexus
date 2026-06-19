import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";
import { getDictionary } from "@/lib/translations";

const SLUGS = [
  "it-sicherheit", "netzwerk", "server-cloud", "praxissoftware", "labor",
  "kommunikation", "backup", "website", "managed-it", "beratung",
  "telemedizin", "schulung",
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = getDictionary(lang);
  const page = (t.servicePages as Record<string, { title: string; heroSub: string } | undefined>)[slug];
  return {
    title: page?.title ?? t.services.tag,
    description: page?.heroSub ?? t.services.title.replace("\n", " "),
  };
}

export default function Page() {
  return <ServiceDetail />;
}
