"use client";

import { Fragment, type ReactNode } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { VideoCard } from "@/components/video/VideoCard";
import { SECTION_IDS } from "@/config/navigation";

import { useLatestVideos } from "./useLatestVideos";

/** The in-feed ad is inserted after this many cards. */
const IN_FEED_AD_AFTER = 3;
const SKELETON_COUNT = 8;

const gridClass = "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 max-sm:grid-cols-1 max-sm:gap-1";

interface LatestVideosSectionProps {
  /** Server-rendered ad placed inside the grid. */
  inFeedAd?: ReactNode;
}

function LatestVideosSkeleton() {
  return (
    <section className="mt-10" aria-hidden="true">
      <Skeleton className="mb-[18px] h-7 w-56" />
      <div className={gridClass}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="skeleton aspect-video rounded-media" />
            <Skeleton className="w-[90%]" />
            <Skeleton className="w-3/5" />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Grid of published Strapi "Video" entries: pinned first, then newest. */
export function LatestVideosSection({ inFeedAd }: LatestVideosSectionProps) {
  const { data, isLoading } = useLatestVideos();
  if (isLoading) return <LatestVideosSkeleton />;
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
