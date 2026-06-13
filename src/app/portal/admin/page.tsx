import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const admin = await getAdminUser();
  if (!admin) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).admin.overview;
  const inboxT = getPortalDict(lang).admin.inbox;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const [openTickets, totalClients, pendingUpgrades, recent] = await Promise.all([
    prisma.ticket.count({ where: { status: "open" } }),
    prisma.user.count({ where: { role: "client" } }),
    prisma.subscription.count({ where: { status: "pending_upgrade" } }),
    prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { user: { select: { name: true, practiceName: true } } },
    }),
  ]);

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 36px", lineHeight: 1.65, maxWidth: 560 }}>{t.intro}</p>

      <div className="p-stats">
        <div className="p-stat">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.openTickets}</div>
          <div className="n">{openTickets}</div>
          <a href="/portal/admin/inbox" className="p-arrow-link" style={{ marginTop: 14, display: "inline-flex" }}>{t.toInbox}</a>
        </div>
        <div className="p-stat">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.totalClients}</div>
          <div className="n">{totalClients}</div>
          <a href="/portal/admin/clients" className="p-arrow-link" style={{ marginTop: 14, display: "inline-flex" }}>{t.toClients}</a>
        </div>
        <div className="p-stat">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.pendingUpgrades}</div>
          <div className="n" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {pendingUpgrades > 0 && <span className="p-dot warn" style={{ width: 14, height: 14 }} />}
            {pendingUpgrades}
          </div>
          <a href="/portal/admin/clients" className="p-arrow-link" style={{ marginTop: 14, display: "inline-flex" }}>{t.toClients}</a>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="p-label" style={{ marginBottom: 14 }}>{t.recentTickets}</div>
        {recent.length === 0 ? (
          <div className="p-card" style={{ textAlign: "center", padding: "40px 28px", color: "var(--gray-light)", fontSize: 14 }}>{t.noTickets}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {recent.map((ticket) => (
              <a key={ticket.id} href={`/portal/admin/inbox?ticket=${ticket.id}`} className="p-card" style={{ display: "flex", alignItems: "center", gap: 18, textDecoration: "none" }}>
                <span className={`p-dot ${ticket.status === "open" ? "warn" : "ok"}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{ticket.subject}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 3 }}>
                    {ticket.user.practiceName ?? ticket.user.name} · {ticket.channel === "chat" ? inboxT.chat : inboxT.email} · {new Date(ticket.createdAt).toLocaleDateString(locale)}
                  </div>
                </div>
                <span style={{ color: "var(--green)", fontWeight: 600, fontSize: 14 }}>{inboxT.viewClient}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
