import type { MetadataRoute } from "next";

import { publicEnv } from "@/config/public-env";

/** Footer "Company" pages, each backed by its own Strapi single type. */
const COMPANY_PATHS = ["/about-us", "/advertise", "/privacy-policy", "/contact"];

/** /sitemap.xml — the home page plus the company pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${publicEnv.siteUrl}/`, changeFrequency: "hourly", priority: 1 },
    ...COMPANY_PATHS.map((path) => ({
      url: `${publicEnv.siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
