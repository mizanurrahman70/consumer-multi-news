import "server-only";

import { getHomePage } from "@/services/home.service";
import { getLatestVideos } from "@/services/video.service";

import type { LatestVideosData } from "@/api/client/types";

/** Data for GET /api/home (Strapi → Video, heading from Home Page). */
export async function loadLatestVideos(): Promise<LatestVideosData> {
  const home = await getHomePage();
  return { heading: home.latestSection, videos: await getLatestVideos(home.latestLimit) };
}
