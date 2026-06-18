import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPortalLang, getPortalDict, localizeHealth } from "@/lib/portal-i18n";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const lang = getPortalLang();
  const t = getPortalDict(lang).health;

  const items = await prisma.healthItem.findMany({
    where: { userId: user.id },
    orderBy: { component: "asc" },
  });

  const issues = items.filter((i) => i.status !== "ok").length;
  const statusLabel: Record<string, string> = { ok: t.statusOk, warn: t.statusWarn, crit: t.statusCrit };
  const statusColor: Record<string, string> = { ok: "var(--green-dark)", warn: "var(--warn)", crit: "var(--crit)" };
  const locale = lang === "de" ? "de-CH" : "en-GB";

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 36px", lineHeight: 1.65, maxWidth: 560 }}>
        {issues === 0 ? t.introOk : t.introIssue(issues)}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item) => {
          const loc = localizeHealth(lang, item);
          return (
          <div key={item.id} className="p-card" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span className={`p-dot ${item.status}`} style={{ width: 12, height: 12 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>{loc.component}</h3>
              {loc.detail && (
                <p style={{ fontSize: 13, color: "var(--gray)", marginTop: 4 }}>{loc.detail}</p>
              )}
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: statusColor[item.status] ?? "var(--gray)" }}>
                {statusLabel[item.status] ?? item.status}
              </div>
              <div style={{ fontSize: 11, color: "var(--gray-light)", marginTop: 4 }}>
                {t.checked}: {new Date(item.checkedAt).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" })}
              </div>
            </div>
          </div>
          );
        })}
        {items.length === 0 && (
          <div className="p-card" style={{ textAlign: "center", padding: "48px 28px", color: "var(--gray-light)" }}>
            {t.empty}
          </div>
        )}
      </div>
    </>
  );
}
