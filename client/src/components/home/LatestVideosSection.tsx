import { Fragment, type ReactNode } from "react";

import { AdSlot } from "@/components/ads/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { VideoCard } from "@/components/video/VideoCard";
import { SECTION_IDS } from "@/config/navigation";
import { getLatestVideos } from "@/services/video.service";
import type { SectionHeading } from "@/types/cms";

/** The in-feed ad is inserted after this many cards. */
const IN_FEED_AD_AFTER = 3;
const SKELETON_COUNT = 8;

const gridClass = "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 max-sm:grid-cols-1 max-sm:gap-1";

interface LatestVideosSectionProps {
  heading: SectionHeading;
  limit: number;
}

function LatestVideosShell({ heading, children }: { heading: SectionHeading; children: ReactNode }) {
  return (
    <section id={SECTION_IDS.latest} className="mt-10 scroll-mt-40">
      <SectionHeader heading={heading} />
      <div className={gridClass}>{children}</div>
    </section>
  );
}

/** Grid of published Strapi "Video" entries: pinned first, then newest. */
export async function LatestVideosSection({ heading, limit }: LatestVideosSectionProps) {
  const videos = await getLatestVideos(limit);
  if (videos.length === 0) return null;

  return (
    <LatestVideosShell heading={heading}>
      {videos.map((video, index) => (
        <Fragment key={video.id}>
          <VideoCard video={video} />
          {index === IN_FEED_AD_AFTER - 1 && <AdSlot slot="videoInFeed" />}
        </Fragment>
      ))}
    </LatestVideosShell>
  );
}

export function LatestVideosSkeleton({ heading }: Pick<LatestVideosSectionProps, "heading">) {
  return (
    <LatestVideosShell heading={heading}>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div key={index} className="flex flex-col gap-2" aria-hidden="true">
          <div className="skeleton aspect-video rounded-media" />
          <Skeleton className="w-[90%]" />
          <Skeleton className="w-3/5" />
        </div>
      ))}
    </LatestVideosShell>
  );
}
