import type { Metadata } from "next";
import { getDictionary } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  const page = (t.servicePages as Record<string, { title: string; heroSub: string } | undefined>)["netzwerk"];
  return {
    title: page?.title ?? t.services.tag,
    description: page?.heroSub ?? t.services.title.replace("\n", " "),
  };
}

export default function ServiceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
