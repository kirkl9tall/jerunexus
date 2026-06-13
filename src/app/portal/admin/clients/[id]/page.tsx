import { redirect, notFound } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import AdminSubscriptionPanel from "@/components/portal/AdminSubscriptionPanel";

export const dynamic = "force-dynamic";

export default async function AdminClientDetail({ params }: Readonly<{ params: { id: string } }>) {
  const admin = await getAdminUser();
  if (!admin) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).admin.client;
  const inboxT = getPortalDict(lang).admin.inbox;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const [client, plans] = await Promise.all([
    prisma.user.findFirst({
      where: { id: params.id, role: "client" },
      include: {
        subscription: { include: { plan: true } },
        tickets: { orderBy: { createdAt: "desc" } },
      },
    }),
    prisma.plan.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!client) notFound();

  const requestedPlan = client.subscription?.requestedPlanId
    ? plans.find((p) => p.id === client.subscription!.requestedPlanId)
    : null;

  return (
    <>
      <a href="/portal/admin/clients" className="p-arrow-link" style={{ color: "var(--gray)", marginBottom: 20, display: "inline-flex" }}>{t.back}</a>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 10 }}>{client.name}</h1>
      <hr className="p-rule" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 36 }}>
        {/* Contact */}
        <div className="p-card">
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t.contact}</h3>
          <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div className="p-label">{t.email}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{client.email}</div>
            </div>
            <div>
              <div className="p-label">{t.phone}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{client.phone ?? "—"}</div>
            </div>
            <div>
              <div className="p-label">{t.practice}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{client.practiceName ?? "—"}</div>
            </div>
            <div>
              <div className="p-label">{t.customerSince}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{new Date(client.createdAt).toLocaleDateString(locale)}</div>
            </div>
          </dl>
        </div>

        {/* Current subscription summary */}
        <div className="p-card">
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{t.currentPlan}</h3>
          {client.subscription ? (
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Libre Franklin',sans-serif" }}>{client.subscription.plan.name}</div>
                <div style={{ fontSize: 14, color: "var(--green)", fontWeight: 600, marginTop: 2 }}>
                  {t.perMonth(client.subscription.plan.priceChf.toLocaleString(locale))}
                </div>
              </div>
              <div>
                <div className="p-label">{t.status}</div>
                <div style={{ fontSize: 14, marginTop: 4, fontWeight: 600, color: "var(--green-dark)" }}>
                  {client.subscription.status === "pending_upgrade" ? t.statusPending : t.statusActive}
                </div>
              </div>
              {client.subscription.renewsAt && (
                <div>
                  <div className="p-label">{t.renewal}</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>{new Date(client.subscription.renewsAt).toLocaleDateString(locale)}</div>
                </div>
              )}
            </dl>
          ) : (
            <p style={{ fontSize: 14, color: "var(--gray-light)" }}>{t.noPlan}</p>
          )}
        </div>
      </div>

      {/* Subscription controls */}
      <div style={{ marginTop: 2 }}>
        <AdminSubscriptionPanel
          clientId={client.id}
          currentPlanKey={client.subscription?.plan.key ?? null}
          status={client.subscription?.status ?? null}
          requestedPlanName={requestedPlan?.name ?? null}
          plans={plans.map((p) => ({ key: p.key, name: p.name, priceLabel: t.perMonth(p.priceChf.toLocaleString(locale)) }))}
          t={{
            subscription: t.subscription,
            pendingUpgrade: t.pendingUpgrade,
            approve: t.approve,
            reject: t.reject,
            changePlan: t.changePlan,
            changePlanHint: t.changePlanHint,
            assign: t.assign,
            assigning: t.assigning,
            saved: t.saved,
            failed: t.failed,
          }}
        />
      </div>

      {/* Tickets */}
      <div style={{ marginTop: 48 }}>
        <div className="p-label" style={{ marginBottom: 14 }}>{t.tickets}</div>
        {client.tickets.length === 0 ? (
          <div className="p-card" style={{ textAlign: "center", padding: "36px 28px", color: "var(--gray-light)", fontSize: 14 }}>{t.noTickets}</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {client.tickets.map((tk) => (
              <a key={tk.id} href={`/portal/admin/inbox?ticket=${tk.id}`} className="p-card" style={{ display: "flex", alignItems: "center", gap: 18, textDecoration: "none" }}>
                <span className={`p-dot ${tk.status === "open" ? "warn" : "ok"}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{tk.subject}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 3 }}>
                    {tk.channel === "chat" ? inboxT.chat : inboxT.email} · {new Date(tk.createdAt).toLocaleDateString(locale)} · {tk.status === "open" ? inboxT.statusOpen : inboxT.statusClosed}
                  </div>
                </div>
                <span style={{ color: "var(--green)", fontWeight: 600, fontSize: 14 }}>{t.openTicket}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
