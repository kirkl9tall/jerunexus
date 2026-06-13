import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const t = getPortalDict(getPortalLang()).dash;

  const [sub, healthItems, openTickets] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId: user.id }, include: { plan: true } }),
    prisma.healthItem.findMany({ where: { userId: user.id } }),
    prisma.ticket.count({ where: { userId: user.id, status: "open" } }),
  ]);

  const issues = healthItems.filter((h) => h.status !== "ok").length;
  const healthLabel = issues === 0 ? t.allOk : `${issues} ${issues > 1 ? t.notices : t.notice}`;

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>
        {t.greeting}, {user.name.split(" ")[0]}.
      </h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 36px", lineHeight: 1.65, maxWidth: 560 }}>
        {t.intro}
      </p>

      <div className="p-stats">
        <div className="p-stat">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.yourPlan}</div>
          <div className="n">{sub?.plan.name ?? "—"}</div>
          <a href="/portal/plan" className="p-arrow-link" style={{ marginTop: 14, display: "inline-flex" }}>{t.details}</a>
        </div>
        <div className="p-stat">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.systemStatus}</div>
          <div className="n" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className={`p-dot ${issues === 0 ? "ok" : "warn"}`} style={{ width: 14, height: 14 }} />
            {healthLabel}
          </div>
          <a href="/portal/health" className="p-arrow-link" style={{ marginTop: 14, display: "inline-flex" }}>{t.allComponents}</a>
        </div>
        <div className="p-stat">
          <div className="p-label" style={{ marginBottom: 12 }}>{t.openRequests}</div>
          <div className="n">{openTickets}</div>
          <a href="/portal/support" className="p-arrow-link" style={{ marginTop: 14, display: "inline-flex" }}>{t.toSupport}</a>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="p-label" style={{ marginBottom: 14 }}>{t.quickAccess}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <div className="p-card">
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.contactSupport}</h3>
            <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.6, marginBottom: 18 }}>{t.contactSupportText}</p>
            <a href="/portal/support" className="p-btn">{t.startRequest}</a>
          </div>
          <div className="p-card">
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{t.upgradePlan}</h3>
            <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.6, marginBottom: 18 }}>{t.upgradePlanText}</p>
            <a href="/portal/upgrade" className="p-btn ghost">{t.comparePlans}</a>
          </div>
        </div>
      </div>

      {/* General dashboard widgets — to be filled later */}
      <div style={{ marginTop: 48 }}>
        <div className="p-label" style={{ marginBottom: 14 }}>{t.activity}</div>
        <div className="p-card" style={{ textAlign: "center", padding: "48px 28px", color: "var(--gray-light)" }}>
          <p style={{ fontSize: 14 }}>{t.comingSoon}</p>
        </div>
      </div>
    </>
  );
}
