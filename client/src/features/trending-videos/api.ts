import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { Video } from "@/types/content";

export const TRENDING_VIDEOS_SECTION = "trending-videos";
export const TRENDING_VIDEOS_ENDPOINT = sectionEndpoint(TRENDING_VIDEOS_SECTION);

export interface TrendingVideosData {
  title: string;
  videos: Video[];
}

export function fetchTrendingVideos(): Promise<TrendingVideosData> {
  return fetchJson<TrendingVideosData>(TRENDING_VIDEOS_ENDPOINT);
}
