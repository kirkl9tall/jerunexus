import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import AdminInbox from "@/components/portal/AdminInbox";

export const dynamic = "force-dynamic";

export default async function AdminInboxPage({ searchParams }: Readonly<{ searchParams: { ticket?: string } }>) {
  const admin = await getAdminUser();
  if (!admin) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).admin.inbox;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const tickets = await prisma.ticket.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { user: { select: { id: true, name: true, email: true, practiceName: true } } },
  });

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.65, maxWidth: 560 }}>{t.intro}</p>

      <AdminInbox
        initialTickets={tickets.map((tk) => ({
          id: tk.id,
          subject: tk.subject,
          channel: tk.channel,
          status: tk.status,
          createdAt: tk.createdAt.toISOString(),
          user: tk.user,
        }))}
        initialTicketId={searchParams.ticket ?? null}
        t={t}
        locale={locale}
      />
    </>
  );
}
