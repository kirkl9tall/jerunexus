import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict, localizePlan } from "@/lib/portal-i18n";

export const dynamic = "force-dynamic";

export default async function AdminUpgradesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).admin.upgrades;

  const [subs, plans] = await Promise.all([
    prisma.subscription.findMany({
      where: { status: "pending_upgrade", requestedPlanId: { not: null } },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, email: true, practiceName: true } }, plan: true },
    }),
    prisma.plan.findMany(),
  ]);
  const planById = new Map(plans.map((p) => [p.id, p]));

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 32px", lineHeight: 1.65, maxWidth: 560 }}>{t.intro}</p>

      {subs.length === 0 ? (
        <div className="p-card" style={{ textAlign: "center", padding: "40px 28px", color: "var(--gray-light)", fontSize: 14 }}>{t.empty}</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {subs.map((sub) => {
            const requested = sub.requestedPlanId ? planById.get(sub.requestedPlanId) : null;
            return (
              <a key={sub.id} href={`/portal/admin/clients/${sub.user.id}`} className="p-card" style={{ display: "flex", alignItems: "center", gap: 18, textDecoration: "none" }}>
                <span className="p-dot warn" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{sub.user.practiceName ?? sub.user.name}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)", marginTop: 3 }}>{sub.user.email}</div>
                  <div style={{ fontSize: 13, marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: "var(--gray)" }}>{t.current}: {localizePlan(lang, sub.plan).name}</span>
                    <span style={{ color: "var(--green)", fontWeight: 700 }}>→</span>
                    <span style={{ color: "var(--ink)", fontWeight: 700 }}>{requested ? localizePlan(lang, requested).name : "—"}</span>
                  </div>
                </div>
                <span style={{ color: "var(--green)", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>{t.viewClient}</span>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
