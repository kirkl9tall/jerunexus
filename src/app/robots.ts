import type { MetadataRoute } from "next";

const BASE = "https://www.jerumed-nexus.ch";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The client portal and API are private — keep them out of the index.
      disallow: ["/portal/", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
