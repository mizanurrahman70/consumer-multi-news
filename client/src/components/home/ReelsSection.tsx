import type { ReactNode } from "react";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";
import { FACEBOOK_IFRAME_ALLOW, FACEBOOK_REEL_SIZE, facebookVideoPluginUrl } from "@/lib/utils/social-embeds";
import { getFacebookVideos } from "@/services/social.service";
import type { SectionHeading } from "@/types/cms";

const rowClass =
  "grid grid-cols-[repeat(auto-fill,267px)] justify-center gap-5 max-sm:-mx-4 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:justify-start max-sm:gap-3 max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-2";
const reelClass = "relative h-[476px] w-[267px] shrink-0 snap-center overflow-hidden rounded-reel bg-media";

interface ReelsSectionProps {
  heading: SectionHeading;
}

function ReelsShell({ heading, children }: ReelsSectionProps & { children: ReactNode }) {
  return (
    <section id={SECTION_IDS.reels} className="mt-10 scroll-mt-40">
      <SectionHeader heading={heading} />
      <div className={rowClass}>{children}</div>
    </section>
  );
}

/** Row of Strapi "Facebook Video" entries via the official video plugin (lazy-loaded iframes). */
export async function ReelsSection({ heading }: ReelsSectionProps) {
  const videos = await getFacebookVideos();
  if (videos.length === 0) return null;

  return (
    <ReelsShell heading={heading}>
      {videos.map((video) => (
        <div key={video.id} className={reelClass}>
          <div className="absolute inset-0 flex items-center justify-center text-meta text-subtle">Loading video…</div>
          <iframe
            src={facebookVideoPluginUrl(video.url)}
            title={video.title}
            width={FACEBOOK_REEL_SIZE.width}
            height={FACEBOOK_REEL_SIZE.height}
            loading="lazy"
            allow={FACEBOOK_IFRAME_ALLOW}
            allowFullScreen
            className="relative block border-0"
          />
        </div>
      ))}
    </ReelsShell>
  );
}

export function ReelsSkeleton({ heading }: ReelsSectionProps) {
  return (
    <ReelsShell heading={heading}>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className={cn("skeleton", reelClass)} aria-hidden="true" />
      ))}
    </ReelsShell>
  );
}
