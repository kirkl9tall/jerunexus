import { deCH } from './de-CH';
import { en } from './en';

export type Locale = 'de-CH' | 'de-DE' | 'en';

const dictionaries: Record<Locale, typeof deCH> = {
  'de-CH': deCH,
  'de-DE': { ...deCH, lang: 'de-DE', langLabel: 'DE (DE)', langFull: 'Deutsch (DE)' },
  'en': en as typeof deCH,
};

export function getDictionary(locale: string): typeof deCH {
  return dictionaries[locale as Locale] || deCH;
}

export const locales: Locale[] = ['de-CH', 'de-DE', 'en'];
export type Dictionary = typeof deCH;
