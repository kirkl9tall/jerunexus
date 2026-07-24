import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

/** Send visitors to their last-chosen language (persisted by LocalePersist),
 *  defaulting to de-CH for first-time visitors. */
export default function RootPage() {
  const locale = cookies().get('jn_locale')?.value === 'en' ? 'en' : 'de-CH';
  redirect(`/${locale}`);
}
