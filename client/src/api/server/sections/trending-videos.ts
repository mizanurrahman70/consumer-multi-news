import "server-only";

import { getHomePage } from "@/services/home.service";

import type { TrendingVideosData } from "@/api/client/types";

/** Data for GET /api/home (Strapi → Home Page → trendingVideos). */
export async function loadTrendingVideos(): Promise<TrendingVideosData> {
  const home = await getHomePage();
  return { title: home.trendingTitle, videos: home.trending };
}
