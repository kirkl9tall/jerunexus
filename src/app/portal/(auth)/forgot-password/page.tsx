import { getPortalLang } from "@/lib/portal-i18n";
import { ForgotPasswordForm } from "@/components/portal/AuthForms";

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  const lang = getPortalLang();
  return <ForgotPasswordForm lang={lang} />;
}
