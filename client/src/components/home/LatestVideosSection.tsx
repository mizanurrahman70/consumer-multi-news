import { Fragment, type ReactNode } from "react";

import { AdSlot } from "@/components/ads/AdSlot";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { VideoCard } from "@/components/video/VideoCard";
import { SECTION_IDS } from "@/config/navigation";
import { getLatestVideos } from "@/services/video.service";
import type { SocialLinks } from "@/types/content";

/** The in-feed ad is inserted after this many cards. */
const IN_FEED_AD_AFTER = 3;
const SKELETON_COUNT = 8;

const gridClass = "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 max-sm:grid-cols-1 max-sm:gap-1";

interface LatestVideosSectionProps {
  social: SocialLinks;
}

function LatestVideosShell({ social, children }: LatestVideosSectionProps & { children: ReactNode }) {
  return (
    <section id={SECTION_IDS.latest} className="mt-10 scroll-mt-40">
      <SectionHeader title="Latest Videos" link={{ label: "All videos on YouTube", href: social.youtubeVideos }} />
      <div className={gridClass}>{children}</div>
    </section>
  );
}

export async function LatestVideosSection({ social }: LatestVideosSectionProps) {
  const videos = await getLatestVideos();

  return (
    <LatestVideosShell social={social}>
      {videos.map((video, index) => (
        <Fragment key={video.id}>
          <VideoCard video={video} />
          {index === IN_FEED_AD_AFTER - 1 && <AdSlot slot="videoInFeed" />}
        </Fragment>
      ))}
    </LatestVideosShell>
  );
}

export function LatestVideosSkeleton({ social }: LatestVideosSectionProps) {
  return (
    <LatestVideosShell social={social}>
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
