import { AdSlot } from "@/components/ads/AdSlot";
import { FeaturedPlayer } from "@/components/home/FeaturedPlayer";
import { TrendingList } from "@/components/home/TrendingList";
import { Skeleton } from "@/components/ui/Skeleton";
import { getFeaturedVideo, getTrendingVideos } from "@/services/video.service";

const gridClass = "mt-6 grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]";
const sideHeadingClass = "heading-side mb-1.5 border-b-3 border-brand pb-1.5";

/** Featured video (left) and trending list with an ad (right). */
export async function HeroSection() {
  const [featured, trending] = await Promise.all([getFeaturedVideo(), getTrendingVideos()]);

  return (
    <div className={gridClass}>
      <div>
        <FeaturedPlayer video={featured.video} />
        <div className="text-kicker-label mt-3.5">{featured.kicker}</div>
        <h1 className="mt-1 mb-1.5 text-hero font-bold">{featured.video.title}</h1>
        <div className="text-meta-muted">{featured.meta}</div>
      </div>

      <aside>
        <h2 className={sideHeadingClass}>Trending Now</h2>
        <TrendingList videos={trending} />
        <AdSlot slot="heroRectangle" className="mt-5" />
      </aside>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className={gridClass} aria-hidden="true">
      <div>
        <div className="skeleton aspect-video rounded-media" />
        <Skeleton className="mt-4 w-24" />
        <Skeleton className="mt-3 h-7 w-4/5" />
        <Skeleton className="mt-3 w-1/3" />
      </div>
      <div>
        <h2 className={sideHeadingClass}>Trending Now</h2>
        {["w-[90%]", "w-4/5", "w-[85%]", "w-3/4", "w-[88%]"].map((width) => (
          <div key={width} className="border-b border-line py-4">
            <Skeleton className={`h-4 ${width}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
