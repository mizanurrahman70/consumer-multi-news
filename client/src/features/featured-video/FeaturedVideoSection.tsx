"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import { FeaturedPlayer } from "./FeaturedPlayer";
import { useFeaturedVideo } from "./useFeaturedVideo";

function FeaturedVideoSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton aspect-video rounded-media" />
      <Skeleton className="mt-4 w-24" />
      <Skeleton className="mt-3 h-7 w-4/5" />
      <Skeleton className="mt-3 w-1/3" />
    </div>
  );
}

/** Big hero video with kicker, title and meta (Strapi → Home Page → hero). */
export function FeaturedVideoSection() {
  const { data: featured, isLoading } = useFeaturedVideo();
  if (isLoading) return <FeaturedVideoSkeleton />;
  if (!featured) return null;

  return (
    <div>
      {/* Keyed so a new hero video from the CMS gets a fresh player state. */}
      <FeaturedPlayer key={featured.video.youtubeId} video={featured.video} />
      {featured.kicker && <div className="text-kicker-label mt-3.5">{featured.kicker}</div>}
      <h1 className="mt-1 mb-1.5 text-hero font-bold">{featured.video.title}</h1>
      {featured.meta && <div className="text-meta-muted">{featured.meta}</div>}
    </div>
  );
}
