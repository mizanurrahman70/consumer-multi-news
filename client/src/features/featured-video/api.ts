import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { FeaturedVideo } from "@/types/content";

export const FEATURED_VIDEO_SECTION = "featured-video";
export const FEATURED_VIDEO_ENDPOINT = sectionEndpoint(FEATURED_VIDEO_SECTION);

export type FeaturedVideoData = FeaturedVideo;

export function fetchFeaturedVideo(): Promise<FeaturedVideoData> {
  return fetchJson<FeaturedVideoData>(FEATURED_VIDEO_ENDPOINT);
}
