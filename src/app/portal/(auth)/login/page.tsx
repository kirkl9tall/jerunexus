import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import { LoginForm } from "@/components/portal/AuthForms";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const lang = getPortalLang();
  const t = getPortalDict(lang);
  return <LoginForm lang={lang} t={t.login} />;
}
