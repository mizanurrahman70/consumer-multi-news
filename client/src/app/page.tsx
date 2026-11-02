import type { Metadata } from "next";

import { loadHome } from "@/api/server/home";
import { AdSlot, LeaderboardAd } from "@/components/ads/AdSlot";
import { HomeDataProvider } from "@/components/providers/HomeDataProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SECTION_IDS } from "@/config/navigation";
import { FacebookPageSection } from "@/features/facebook-page";
import { FacebookReelsSection } from "@/features/facebook-reels";
import { FeaturedVideoSection } from "@/features/featured-video";
import { InstagramSection } from "@/features/instagram";
import { LatestVideosSection } from "@/features/latest-videos";
import { LiveSection } from "@/features/live";
import { Ticker } from "@/features/ticker";
import { TipSection } from "@/features/tip";
import { TrendingSection } from "@/features/trending-videos";
import { toMetadata } from "@/lib/seo/metadata";
import { getHomePage } from "@/services/home.service";
import { getSiteSettings } from "@/services/settings.service";

/** Home page SEO from Strapi → Home Page → seo (falls back to the site defaults). */
export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  return toMetadata(home.seo ?? settings.defaultSeo, { path: "/", siteName: settings.name });
}

/**
 * Home page layout. All section data is loaded once on the server and handed
 * to the hooks as their first value, so the HTML already contains every
 * section; in the browser the sections keep refreshing from /api/home.
 * Each section's UI lives in `src/features/<section>`. Ads stay server-rendered.
 */
export default async function HomePage() {
  const [data, home] = await Promise.all([loadHome(), getHomePage()]);

  return (
    <HomeDataProvider data={data}>
      <Container id={SECTION_IDS.top} className="scroll-mt-40">
        <LeaderboardAd slot="topLeaderboard" />
        <Ticker />
        <LiveSection />

        <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
          <FeaturedVideoSection />
          <aside>
            <TrendingSection />
            <AdSlot slot="heroRectangle" className="mt-5" />
          </aside>
        </div>

        <LatestVideosSection inFeedAd={<AdSlot slot="videoInFeed" />} />
        <LeaderboardAd slot="midLeaderboard" className="mt-8" />
        <FacebookReelsSection />
        <LeaderboardAd slot="reelsLeaderboard" className="mt-8" />
        <FacebookPageSection ad={<AdSlot slot="facebookHalfPage" />} />
        <InstagramSection ad={<AdSlot slot="instagramRectangle" className="m-0" />} />
        <TipSection />

        <JsonLd data={home.seo?.structuredData} />
      </Container>
    </HomeDataProvider>
  );
}
