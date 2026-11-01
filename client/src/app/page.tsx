import { Suspense } from "react";

import { LeaderboardAd } from "@/components/ads/AdSlot";
import { FacebookSection } from "@/components/home/FacebookSection";
import { HeroSection, HeroSkeleton } from "@/components/home/HeroSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { LatestVideosSection, LatestVideosSkeleton } from "@/components/home/LatestVideosSection";
import { ReelsSection, ReelsSkeleton } from "@/components/home/ReelsSection";
import { Ticker, TickerSkeleton } from "@/components/home/Ticker";
import { TipSection } from "@/components/home/TipSection";
import { Container } from "@/components/ui/Container";
import { SECTION_IDS } from "@/config/navigation";
import { getSiteSettings } from "@/services/settings.service";

/**
 * Home page. Every content block streams independently behind its own
 * <Suspense> boundary, so one slow backend endpoint never blocks the rest.
 */
export default async function HomePage() {
  const settings = await getSiteSettings();
  const { social } = settings;

  return (
    <Container id={SECTION_IDS.top} className="scroll-mt-40">
      <LeaderboardAd slot="topLeaderboard" />

      <Suspense fallback={<TickerSkeleton />}>
        <Ticker />
      </Suspense>

      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<LatestVideosSkeleton social={social} />}>
        <LatestVideosSection social={social} />
      </Suspense>

      <LeaderboardAd slot="midLeaderboard" className="mt-8" />

      <Suspense fallback={<ReelsSkeleton social={social} />}>
        <ReelsSection social={social} />
      </Suspense>

      <LeaderboardAd slot="reelsLeaderboard" className="mt-8" />

      <FacebookSection settings={settings} />

      <Suspense fallback={null}>
        <InstagramSection settings={settings} />
      </Suspense>

      <TipSection messengerUrl={social.messenger} />
    </Container>
  );
}
