import { AdSlot } from "@/components/ads/AdSlot";
import { FeaturedPlayer } from "@/components/home/FeaturedPlayer";
import { TrendingList } from "@/components/home/TrendingList";
import type { FeaturedVideo, Video } from "@/types/content";

interface HeroSectionProps {
  featured: FeaturedVideo;
  trendingTitle: string;
  trending: Video[];
}

/** Featured video (left) and trending list with an ad (right). Content: Strapi → Home Page. */
export function HeroSection({ featured, trendingTitle, trending }: HeroSectionProps) {
  return (
    <div className="mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div>
        {/* Keyed so a new hero video from the CMS gets a fresh player state. */}
        <FeaturedPlayer key={featured.video.youtubeId} video={featured.video} />
        {featured.kicker && <div className="text-kicker-label mt-3.5">{featured.kicker}</div>}
        <h1 className="mt-1 mb-1.5 text-hero font-bold">{featured.video.title}</h1>
        {featured.meta && <div className="text-meta-muted">{featured.meta}</div>}
      </div>

      <aside>
        {trending.length > 0 && (
          <>
            <h2 className="heading-side mb-1.5 border-b-3 border-brand pb-1.5">{trendingTitle}</h2>
            <TrendingList videos={trending} />
          </>
        )}
        <AdSlot slot="heroRectangle" className="mt-5" />
      </aside>
    </div>
  );
}
