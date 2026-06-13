import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import PortalShell from "@/components/portal/PortalShell";

export default async function PortalAppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");
  if (user.role === "admin") redirect("/portal/admin");

  const lang = getPortalLang();
  const t = getPortalDict(lang);

  return (
    <PortalShell user={{ name: user.name, email: user.email, avatarUrl: user.avatarUrl }} lang={lang} t={t.shell} notifyHref="/portal/support">
      {children}
    </PortalShell>
  );
}
