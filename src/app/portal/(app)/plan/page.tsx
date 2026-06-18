import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict, localizePlan, localizePlanName } from "@/lib/portal-i18n";

export const dynamic = "force-dynamic";

export default async function PlanPage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).plan;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const sub = await prisma.subscription.findUnique({
    where: { userId: user.id },
    include: { plan: true },
  });

  const requestedPlan = sub?.requestedPlanId
    ? await prisma.plan.findUnique({ where: { id: sub.requestedPlanId } })
    : null;

  const planText = sub ? localizePlan(lang, sub.plan) : null;

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />

      {!sub ? (
        <div className="p-card" style={{ marginTop: 36, textAlign: "center", padding: "48px 28px", color: "var(--gray)" }}>
          {t.noPlan}{" "}
          <a href="/portal/upgrade" className="p-arrow-link">{t.viewPlans}</a>
        </div>
      ) : (
        <>
          {sub.status === "pending_upgrade" && requestedPlan && (
            <div className="p-success" style={{ marginTop: 28 }}>
              {t.pendingBanner(localizePlanName(lang, requestedPlan))}
            </div>
          )}

          <div className="p-card" style={{ marginTop: sub.status === "pending_upgrade" ? 0 : 36, padding: 0 }}>
            <div style={{ background: "var(--green-dark)", color: "#fff", padding: "32px 32px 28px" }}>
              <div className="p-label" style={{ color: "rgba(255,255,255,.6)" }}>{t.activePlan}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap", marginTop: 10 }}>
                <h2 style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}>{planText!.name}</h2>
                <span style={{ fontFamily: "'Libre Franklin',sans-serif", fontSize: 18, fontWeight: 600, color: "#7BC5A3" }}>
                  {t.perMonth(sub.plan.priceChf.toLocaleString(locale))}
                </span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.75)", marginTop: 8 }}>{planText!.description}</p>
            </div>

            <div style={{ padding: 32 }}>
              <div className="p-label" style={{ marginBottom: 16 }}>{t.included}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {planText!.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                    <span style={{ color: "var(--green)", fontWeight: 700 }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <div style={{ display: "flex", gap: 28, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--hairline)", flexWrap: "wrap" }}>
                <div>
                  <div className="p-label">{t.status}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6, color: "var(--green-dark)" }}>
                    {sub.status === "pending_upgrade" ? t.statusPending : t.statusActive}
                  </div>
                </div>
                {sub.renewsAt && (
                  <div>
                    <div className="p-label">{t.renewal}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>
                      {new Date(sub.renewsAt).toLocaleDateString(locale)}
                    </div>
                  </div>
                )}
                <div>
                  <div className="p-label">{t.customerSince}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>
                    {new Date(sub.createdAt).toLocaleDateString(locale)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <a href="/portal/upgrade" className="p-btn">{t.upgradeBtn}</a>
          </div>
        </>
      )}
    </>
  );
}
