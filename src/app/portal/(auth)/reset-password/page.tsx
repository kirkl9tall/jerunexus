import { getPortalLang } from "@/lib/portal-i18n";
import { ResetPasswordForm } from "@/components/portal/AuthForms";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  const lang = getPortalLang();
  return <ResetPasswordForm lang={lang} />;
}
