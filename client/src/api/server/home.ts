import "server-only";

import type { HomeData } from "@/api/client/types";

import { loadFacebookPage } from "./sections/facebook-page";
import { loadFacebookReels } from "./sections/facebook-reels";
import { loadFeaturedVideo } from "./sections/featured-video";
import { loadInstagram } from "./sections/instagram";
import { loadLatestVideos } from "./sections/latest-videos";
import { loadLiveStream } from "./sections/live";
import { loadTicker } from "./sections/ticker";
import { loadTip } from "./sections/tip";
import { loadTrendingVideos } from "./sections/trending-videos";

/**
 * Every home-page section in one object. Used twice:
 *  - by the home page, as the hooks' first data (in the HTML, good for SEO);
 *  - by GET /api/home, which the hooks call to refresh in the browser.
 * Loaders read cached, tagged services, so Strapi is not hit per request.
 */
export async function loadHome(): Promise<HomeData> {
  const [ticker, live, featuredVideo, trendingVideos, latestVideos, facebookReels, facebookPage, instagram, tip] =
    await Promise.all([
      loadTicker(),
      loadLiveStream(),
      loadFeaturedVideo(),
      loadTrendingVideos(),
      loadLatestVideos(),
      loadFacebookReels(),
      loadFacebookPage(),
      loadInstagram(),
      loadTip(),
    ]);

  return { ticker, live, featuredVideo, trendingVideos, latestVideos, facebookReels, facebookPage, instagram, tip };
}
