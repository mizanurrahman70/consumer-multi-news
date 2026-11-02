import type { Metadata } from "next";
import { Suspense } from "react";

import { LeaderboardAd } from "@/components/ads/AdSlot";
import { FacebookSection } from "@/components/home/FacebookSection";
import { HeroSection } from "@/components/home/HeroSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { LatestVideosSection, LatestVideosSkeleton } from "@/components/home/LatestVideosSection";
import { LiveSection } from "@/components/home/LiveSection";
import { ReelsSection, ReelsSkeleton } from "@/components/home/ReelsSection";
import { Ticker, TickerSkeleton } from "@/components/home/Ticker";
import { TipSection } from "@/components/home/TipSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { SECTION_IDS } from "@/config/navigation";
import { toMetadata } from "@/lib/seo/metadata";
import { getHomePage } from "@/services/home.service";
import { getSiteSettings } from "@/services/settings.service";

/** Home page SEO from Strapi → Home Page → seo (falls back to the site defaults). */
export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  return toMetadata(home.seo ?? settings.defaultSeo, { path: "/", siteName: settings.name });
}

/**
 * Home page. Texts, hero and trending come from Strapi's "Home Page"; each
 * list (ticker, videos, reels, Instagram) streams behind its own <Suspense>,
 * so one slow request never blocks the rest.
 */
export default async function HomePage() {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);

  return (
    <Container id={SECTION_IDS.top} className="scroll-mt-40">
      <LeaderboardAd slot="topLeaderboard" />

      <Suspense fallback={<TickerSkeleton />}>
        <Ticker />
      </Suspense>

      <Suspense fallback={null}>
        <LiveSection />
      </Suspense>

      <HeroSection featured={home.featured} trendingTitle={home.trendingTitle} trending={home.trending} />

      <Suspense fallback={<LatestVideosSkeleton heading={home.latestSection} />}>
        <LatestVideosSection heading={home.latestSection} limit={home.latestLimit} />
      </Suspense>

      <LeaderboardAd slot="midLeaderboard" className="mt-8" />

      <Suspense fallback={<ReelsSkeleton heading={home.reelsSection} />}>
        <ReelsSection heading={home.reelsSection} />
      </Suspense>

      <LeaderboardAd slot="reelsLeaderboard" className="mt-8" />

      <FacebookSection
        heading={home.facebookSection}
        card={home.facebookBlock}
        pageUrl={settings.social.facebook}
        siteName={settings.name}
      />

      <Suspense fallback={null}>
        <InstagramSection heading={home.instagramSection} card={home.instagramBlock} />
      </Suspense>

      <TipSection card={home.tipBlock} />

      <JsonLd data={home.seo?.structuredData} />
    </Container>
  );
}
