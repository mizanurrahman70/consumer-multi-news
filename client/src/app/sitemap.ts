import type { MetadataRoute } from "next";

import { publicEnv } from "@/config/public-env";
import { getPublishedPages } from "@/services/page.service";

/** /sitemap.xml — the home page plus every published Strapi page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPages();
  return [
    { url: `${publicEnv.siteUrl}/`, changeFrequency: "hourly", priority: 1 },
    ...pages.map((page) => ({
      url: `${publicEnv.siteUrl}/${page.slug}`,
      lastModified: page.updatedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
