import type { Metadata } from "next";
import { getDictionary } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    title: t.pricing.title.replace("\n", " "),
    description: t.pricing.sub,
  };
}

export default function PreiseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
