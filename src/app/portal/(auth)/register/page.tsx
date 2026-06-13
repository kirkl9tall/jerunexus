import { getPortalLang, getPortalDict } from "@/lib/portal-i18n";
import { RegisterForm } from "@/components/portal/AuthForms";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const lang = getPortalLang();
  const t = getPortalDict(lang);
  return <RegisterForm lang={lang} t={t.register} />;
}
