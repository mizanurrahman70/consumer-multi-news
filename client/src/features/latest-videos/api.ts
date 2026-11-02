import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { SectionHeading } from "@/types/cms";
import type { Video } from "@/types/content";

export const LATEST_VIDEOS_SECTION = "latest-videos";
export const LATEST_VIDEOS_ENDPOINT = sectionEndpoint(LATEST_VIDEOS_SECTION);

export interface LatestVideosData {
  heading: SectionHeading;
  videos: Video[];
}

export function fetchLatestVideos(): Promise<LatestVideosData> {
  return fetchJson<LatestVideosData>(LATEST_VIDEOS_ENDPOINT);
}
