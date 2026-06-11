import type { Metadata } from "next";
import { getDictionary } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    title: t.services.tag,
    description: t.services.title.replace("\n", " "),
  };
}

export default function LeistungenLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
