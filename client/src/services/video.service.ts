import { cacheLife, cacheTag } from "next/cache";

import { apiGet, apiGetList } from "@/lib/api/client";
import { API_ENDPOINTS, CACHE_TAGS, LIST_LIMITS } from "@/lib/api/endpoints";
import {
  FALLBACK_FEATURED,
  FALLBACK_LATEST,
  FALLBACK_TICKER,
  FALLBACK_TRENDING,
} from "@/data/fallback/videos";
import type { FeaturedVideo, TickerItem, Video } from "@/types/content";

/*
 * Video content services. Each function is cached ("use cache") and tagged,
 * so the backend can refresh exactly what changed via POST /api/revalidate.
 * When the backend is unavailable each one returns bundled fallback content.
 */

export async function getFeaturedVideo(): Promise<FeaturedVideo> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.featured);

  return (await apiGet<FeaturedVideo>(API_ENDPOINTS.featured)) ?? FALLBACK_FEATURED;
}

export async function getTrendingVideos(limit: number = LIST_LIMITS.trending): Promise<Video[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.trending);

  const videos = await apiGetList<Video>(API_ENDPOINTS.trending, { limit });
  return (videos ?? FALLBACK_TRENDING).slice(0, limit);
}

export async function getLatestVideos(limit: number = LIST_LIMITS.latest): Promise<Video[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.latest);

  const videos = await apiGetList<Video>(API_ENDPOINTS.latest, { limit });
  return (videos ?? FALLBACK_LATEST).slice(0, limit);
}

export async function getTickerItems(limit: number = LIST_LIMITS.ticker): Promise<TickerItem[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.ticker);

  const items = await apiGetList<TickerItem>(API_ENDPOINTS.ticker, { limit });
  return (items ?? FALLBACK_TICKER).slice(0, limit);
}
