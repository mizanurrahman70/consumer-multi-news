"use client";

import Image from "next/image";

import { PlayBadge } from "@/components/ui/PlayBadge";
import { useVideoPlayer } from "@/components/video/VideoPlayerProvider";
import { useIsClient } from "@/hooks/useIsClient";
import { formatTimeAgo, formatViews, joinMeta } from "@/lib/utils/format";
import { videoThumbnail } from "@/lib/utils/youtube";
import type { Video } from "@/types/content";

interface VideoCardProps {
  video: Video;
}

/**
 * Thumbnail + title card that opens the video modal.
 * Grid card on wider screens, compact horizontal row below `sm`.
 */
export function VideoCard({ video }: VideoCardProps) {
  const { openVideo } = useVideoPlayer();
  const isClient = useIsClient();
  const meta = joinMeta(isClient ? formatTimeAgo(video.publishedAt) : "", formatViews(video.viewCount));

  return (
    <button
      type="button"
      onClick={() => openVideo({ youtubeId: video.youtubeId, title: video.title })}
      className="group flex min-w-0 flex-col gap-2 rounded-media text-left max-sm:flex-row max-sm:gap-3 max-sm:rounded-none max-sm:border-b max-sm:border-line max-sm:py-2.5"
    >
      <div className="relative aspect-video overflow-hidden rounded-media bg-media max-sm:w-[44%] max-sm:shrink-0">
        <Image
          src={videoThumbnail(video)}
          alt=""
          fill
          sizes="(max-width: 560px) 44vw, (max-width: 1240px) 50vw, 400px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <PlayBadge compactOnMobile />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-3 text-body font-semibold leading-[1.4] group-hover:text-brand group-focus-visible:text-brand max-sm:text-body-sm">
          {video.title}
        </p>
        {meta && <p className="text-meta-muted">{meta}</p>}
      </div>
    </button>
  );
}
