import "server-only";

import { getHomePage } from "@/services/home.service";
import { getFacebookVideos } from "@/services/social.service";

import type { FacebookReelsData } from "./api";

/** Data for GET /api/sections/facebook-reels (Strapi → Facebook Video, heading from Home Page). */
export async function loadFacebookReels(): Promise<FacebookReelsData> {
  const [home, videos] = await Promise.all([getHomePage(), getFacebookVideos()]);
  return { heading: home.reelsSection, videos };
}
