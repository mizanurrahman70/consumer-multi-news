"use client";

import { Fragment, type ReactNode } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoCard } from "@/components/video/VideoCard";
import { SECTION_IDS } from "@/config/navigation";
import { useSection } from "@/hooks/useSection";

/** The in-feed ad is inserted after this many cards. */
const IN_FEED_AD_AFTER = 3;

const gridClass = "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 max-sm:grid-cols-1 max-sm:gap-1";

interface LatestVideosSectionProps {
  /** Server-rendered ad placed inside the grid. */
  inFeedAd?: ReactNode;
}

/** Grid of published Strapi "Video" entries: pinned first, then newest. */
export function LatestVideosSection({ inFeedAd }: LatestVideosSectionProps) {
  const data = useSection("latestVideos");
  if (!data || data.videos.length === 0) return null;

  return (
    <section id={SECTION_IDS.latest} className="mt-10 scroll-mt-40">
      <SectionHeader heading={data.heading} />
      <div className={gridClass}>
        {data.videos.map((video, index) => (
          <Fragment key={video.id}>
            <VideoCard video={video} />
            {index === IN_FEED_AD_AFTER - 1 && inFeedAd}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
