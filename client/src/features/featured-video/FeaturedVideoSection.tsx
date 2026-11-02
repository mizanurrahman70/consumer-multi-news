"use client";

import { useSection } from "@/hooks/useSection";

import { FeaturedPlayer } from "./FeaturedPlayer";

/** Big hero video with kicker, title and meta (Strapi → Home Page → hero). */
export function FeaturedVideoSection() {
  const featured = useSection("featuredVideo");
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
