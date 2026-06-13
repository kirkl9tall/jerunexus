import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import UpgradeGrid from "@/components/portal/UpgradeGrid";

export const dynamic = "force-dynamic";

export default async function UpgradePage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).upgrade;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const [plans, sub] = await Promise.all([
    prisma.plan.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.subscription.findUnique({ where: { userId: user.id }, include: { plan: true } }),
  ]);

  const pendingPlan = sub?.requestedPlanId
    ? plans.find((p) => p.id === sub.requestedPlanId)
    : null;

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 36px", lineHeight: 1.65, maxWidth: 560 }}>
        {t.intro}
      </p>

      <UpgradeGrid
        plans={plans.map((p) => ({
          key: p.key,
          name: p.name,
          priceLabel: t.perMonth(p.priceChf.toLocaleString(locale)),
          description: p.description,
          features: p.features,
        }))}
        currentKey={sub?.plan.key ?? null}
        pendingKey={pendingPlan?.key ?? null}
        t={{
          current: t.current,
          pending: t.pending,
          active: t.active,
          requested: t.requested,
          request: t.request,
          requesting: t.requesting,
          fallbackError: t.fallbackError,
        }}
      />
    </>
  );
}
