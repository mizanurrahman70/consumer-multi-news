import "server-only";

import { loadFacebookPage } from "./facebook-page/server";
import { loadFacebookReels } from "./facebook-reels/server";
import { loadFeaturedVideo } from "./featured-video/server";
import { loadInstagram } from "./instagram/server";
import { loadLatestVideos } from "./latest-videos/server";
import { loadLiveStream } from "./live/server";
import { loadTicker } from "./ticker/server";
import { loadTip } from "./tip/server";
import { loadTrendingVideos } from "./trending-videos/server";

/**
 * Home-page section name → server loader. Served by GET /api/sections/[section];
 * each feature's `api.ts` + hook fetch from there in the browser.
 * The loaders call cached, tagged services, so Strapi is not hit per request
 * and the Strapi API token never reaches the browser.
 */
export const SECTION_LOADERS = {
  ticker: loadTicker,
  live: loadLiveStream,
  "featured-video": loadFeaturedVideo,
  "trending-videos": loadTrendingVideos,
  "latest-videos": loadLatestVideos,
  "facebook-reels": loadFacebookReels,
  "facebook-page": loadFacebookPage,
  instagram: loadInstagram,
  tip: loadTip,
} as const satisfies Record<string, () => Promise<unknown>>;

export type SectionName = keyof typeof SECTION_LOADERS;

export function isSectionName(value: string): value is SectionName {
  return Object.hasOwn(SECTION_LOADERS, value);
}
