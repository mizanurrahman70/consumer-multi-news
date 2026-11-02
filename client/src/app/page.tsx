import type { Metadata } from "next";

import { AdSlot, LeaderboardAd } from "@/components/ads/AdSlot";
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
 * Home page layout. Every content section lives in `src/features/<section>`
 * and loads its own data in the browser through its hook
 * (→ /api/sections/<section>). Ads and SEO data stay server-rendered and are
 * passed into the sections as props.
 */
export default async function HomePage() {
  const home = await getHomePage();

  return (
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
  );
}
