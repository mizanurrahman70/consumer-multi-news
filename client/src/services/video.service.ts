import { cacheLife, cacheTag } from "next/cache";

import { FALLBACK_LATEST, FALLBACK_TICKER } from "@/data/fallback/videos";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { strapiGet } from "@/lib/strapi/client";
import { mapList, toTickerItem, toVideo } from "@/lib/strapi/mappers/content";
import { latestVideosQuery, tickerQuery } from "@/lib/strapi/queries";
import type { StrapiTickerItem, StrapiVideo } from "@/lib/strapi/types";
import type { TickerItem, Video } from "@/types/content";

const TICKER_LIMIT = 8;

/** Published videos: pinned first (by pin order), then newest first. */
export async function getLatestVideos(limit: number): Promise<Video[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.latest);

  const raw = await strapiGet<StrapiVideo[]>("/videos", latestVideosQuery(limit));
  return raw ? mapList(raw, toVideo) : FALLBACK_LATEST.slice(0, limit);
}

/**
 * Active "BREAKING" headlines. When editors have none scheduled right now,
 * the latest video titles are shown instead (as on the original site).
 */
export async function getTickerItems(): Promise<TickerItem[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.ticker, CACHE_TAGS.latest);

  const raw = await strapiGet<StrapiTickerItem[]>("/ticker-items", tickerQuery(TICKER_LIMIT, new Date().toISOString()));
  if (!raw) return FALLBACK_TICKER;

  const items = mapList(raw, toTickerItem);
  if (items.length > 0) return items;

  const videos = await getLatestVideos(TICKER_LIMIT);
  return videos.map((video) => ({ id: video.id, text: video.title, youtubeId: video.youtubeId }));
}
