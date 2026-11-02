import "server-only";

import { getHomePage } from "@/services/home.service";

import type { FeaturedVideoData } from "./api";

/** Data for GET /api/sections/featured-video (Strapi → Home Page → hero). */
export async function loadFeaturedVideo(): Promise<FeaturedVideoData> {
  return (await getHomePage()).featured;
}
