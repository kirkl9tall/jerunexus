import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import PortalShell from "@/components/portal/PortalShell";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");
  if (user.role !== "admin") redirect("/portal");

  const lang = getPortalLang();
  const dict = getPortalDict(lang);
  const a = dict.admin;

  const shellT = {
    portal: a.portal,
    home: dict.shell.home,
    nav: dict.shell.nav,
    logout: dict.shell.logout,
    allOk: dict.shell.allOk,
    menu: dict.shell.menu,
  };

  const items = [
    { href: "/portal/admin", label: a.nav.overview, icon: "▦" },
    { href: "/portal/admin/inbox", label: a.nav.inbox, icon: "✉" },
    { href: "/portal/admin/clients", label: a.nav.clients, icon: "◷" },
  ];

  return (
    <PortalShell
      user={{ name: user.name, email: user.email, avatarUrl: user.avatarUrl }}
      lang={lang}
      t={shellT}
      items={items}
      rootHref="/portal/admin"
      notifyHref="/portal/admin/inbox"
    >
      {children}
    </PortalShell>
  );
}
