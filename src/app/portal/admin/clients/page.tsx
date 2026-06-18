import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict, localizePlanName } from "@/lib/portal-i18n";
import AdminClientList from "@/components/portal/AdminClientList";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).admin.clients;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const clients = await prisma.user.findMany({
    where: { role: "client" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, practiceName: true, createdAt: true,
      subscription: { include: { plan: true } },
      _count: { select: { tickets: { where: { status: "open" } } } },
    },
  });

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.65, maxWidth: 560 }}>{t.intro}</p>

      <AdminClientList
        clients={clients.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          practiceName: c.practiceName,
          planName: c.subscription ? localizePlanName(lang, c.subscription.plan) : null,
          openCount: c._count.tickets,
          since: c.createdAt.toLocaleDateString(locale),
        }))}
        t={t}
      />
    </>
  );
}
