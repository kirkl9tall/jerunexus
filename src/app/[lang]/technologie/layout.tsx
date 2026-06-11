import type { Metadata } from "next";
import { getDictionary } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    title: t.pages.technology.heroTitle,
    description: t.pages.technology.heroSub,
  };
}

export default function TechnologieLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
