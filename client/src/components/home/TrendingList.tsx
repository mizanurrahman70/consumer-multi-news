"use client";

import { useVideoPlayer } from "@/components/video/VideoPlayerProvider";
import type { Video } from "@/types/content";

interface TrendingListProps {
  videos: Video[];
}

/** Numbered list of trending videos; each item opens the video modal. */
export function TrendingList({ videos }: TrendingListProps) {
  const { openVideo } = useVideoPlayer();

  return (
    <ol>
      {videos.map((video, index) => (
        <li key={video.id} className="border-b border-line">
          <button
            type="button"
            onClick={() => openVideo({ youtubeId: video.youtubeId, title: video.title })}
            className="group flex w-full gap-3 py-[11px] text-left"
          >
            <span className="w-[22px] shrink-0 font-display text-section leading-none font-bold text-brand">
              {index + 1}
            </span>
            <span className="line-clamp-3 text-body-sm leading-[1.4] font-semibold group-hover:text-brand group-focus-visible:text-brand">
              {video.title}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
