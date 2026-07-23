"use client";
import { useEffect } from "react";

/**
 * Remembers the visitor's chosen marketing language in a cookie, so the
 * language-less entry points — the root "/" redirect and the portal's
 * "back to site" links — return them to the same language instead of always
 * falling back to de-CH. Also keeps the portal's own `jn_lang` cookie in sync,
 * so logging in from the English site keeps the portal in English.
 */
export default function LocalePersist({ lang }: Readonly<{ lang: string }>) {
  useEffect(() => {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `jn_locale=${lang};path=/;max-age=${maxAge};samesite=lax`;
    document.cookie = `jn_lang=${lang === "en" ? "en" : "de"};path=/;max-age=${maxAge};samesite=lax`;
  }, [lang]);
  return null;
}
