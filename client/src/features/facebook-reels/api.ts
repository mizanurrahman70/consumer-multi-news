import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { SectionHeading } from "@/types/cms";
import type { FacebookVideo } from "@/types/content";

export const FACEBOOK_REELS_SECTION = "facebook-reels";
export const FACEBOOK_REELS_ENDPOINT = sectionEndpoint(FACEBOOK_REELS_SECTION);

export interface FacebookReelsData {
  heading: SectionHeading;
  videos: FacebookVideo[];
}

export function fetchFacebookReels(): Promise<FacebookReelsData> {
  return fetchJson<FacebookReelsData>(FACEBOOK_REELS_ENDPOINT);
}
