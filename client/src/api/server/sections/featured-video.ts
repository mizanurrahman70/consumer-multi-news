import "server-only";

import { getHomePage } from "@/services/home.service";

import type { FeaturedVideoData } from "@/api/client/types";

/** Data for GET /api/home (Strapi → Home Page → hero). */
export async function loadFeaturedVideo(): Promise<FeaturedVideoData> {
  return (await getHomePage()).featured;
}
