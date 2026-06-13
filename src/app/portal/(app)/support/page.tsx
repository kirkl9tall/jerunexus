import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import SupportCenter from "@/components/portal/SupportCenter";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).support;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const tickets = await prisma.ticket.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 36px", lineHeight: 1.65, maxWidth: 560 }}>
        {t.intro}
      </p>

      <SupportCenter
        initialTickets={tickets.map((ticket) => ({
          id: ticket.id,
          subject: ticket.subject,
          channel: ticket.channel,
          status: ticket.status,
          createdAt: ticket.createdAt.toISOString(),
        }))}
        t={t}
        locale={locale}
      />
    </>
  );
}
