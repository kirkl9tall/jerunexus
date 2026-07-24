import type { MetadataRoute } from "next";
import { locales } from "@/lib/translations";

const BASE = "https://jerumed-nexus.ch";

// Public marketing routes (portal + api are excluded — see robots.ts).
const PAGES = ["", "leistungen", "ueber-uns", "technologie", "preise", "kontakt", "datenschutz", "impressum"];
// Service-detail slugs under /leistungen/[slug].
const SERVICE_SLUGS = [
  "it-sicherheit", "netzwerk", "server-cloud", "praxissoftware", "labor", "kommunikation",
  "backup", "website", "managed-it", "beratung", "telemedizin", "schulung",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const lang of locales) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE}/${lang}${page ? `/${page}` : ""}`,
        changeFrequency: "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }
    for (const slug of SERVICE_SLUGS) {
      entries.push({
        url: `${BASE}/${lang}/leistungen/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return entries;
}
