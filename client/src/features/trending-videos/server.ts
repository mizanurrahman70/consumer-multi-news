import "server-only";

import { getHomePage } from "@/services/home.service";

import type { TrendingVideosData } from "./api";

/** Data for GET /api/sections/trending-videos (Strapi → Home Page → trendingVideos). */
export async function loadTrendingVideos(): Promise<TrendingVideosData> {
  const home = await getHomePage();
  return { title: home.trendingTitle, videos: home.trending };
}
