import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import SettingsForms from "@/components/portal/SettingsForms";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  const t = getPortalDict(getPortalLang()).settings;

  return (
    <>
      <div className="p-label">{t.label}</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{t.title}</h1>
      <hr className="p-rule" />
      <p style={{ fontSize: 15, color: "var(--gray)", margin: "20px 0 36px", lineHeight: 1.65, maxWidth: 560 }}>
        {t.intro}
      </p>

      <SettingsForms
        profile={{
          name: user.name,
          email: user.email,
          practiceName: user.practiceName ?? "",
          phone: user.phone ?? "",
          avatarUrl: user.avatarUrl,
        }}
        t={t}
      />
    </>
  );
}
