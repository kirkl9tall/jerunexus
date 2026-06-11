import type { Metadata } from "next";
import { getDictionary } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    title: t.contact.title,
    description: t.contact.sub,
  };
}

export default function KontaktLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
