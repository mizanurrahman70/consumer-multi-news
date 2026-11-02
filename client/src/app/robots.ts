import type { MetadataRoute } from "next";

import { publicEnv } from "@/config/public-env";

/** /robots.txt — allow everything except internal API routes, and point to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${publicEnv.siteUrl}/sitemap.xml`,
  };
}
