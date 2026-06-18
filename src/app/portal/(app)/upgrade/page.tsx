import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict, localizePlan } from "@/lib/portal-i18n";
import UpgradeGrid from "@/components/portal/UpgradeGrid";

export const dynamic = "force-dynamic";

export default async function UpgradePage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).upgrade;
  const locale = lang === "de" ? "de-CH" : "en-GB";

  const [allPlans, sub] = await Promise.all([
    prisma.plan.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.subscription.findUnique({ where: { userId: user.id }, include: { plan: true } }),
  ]);
  // The free tier isn't something you "upgrade to" — only show paid plans.
  const plans = allPlans.filter((p) => p.priceChf > 0);

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
        plans={plans.map((p) => {
          const text = localizePlan(lang, p);
          return {
            key: p.key,
            name: text.name,
            priceLabel: t.perMonth(p.priceChf.toLocaleString(locale)),
            description: text.description,
            features: text.features,
          };
        })}
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
