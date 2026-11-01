"use client";

import Image from "next/image";
import { useState } from "react";

import { PlayBadge } from "@/components/ui/PlayBadge";
import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import { youtubeThumbnailUrl } from "@/lib/utils/youtube";
import type { Video } from "@/types/content";

interface FeaturedPlayerProps {
  video: Video;
}

/**
 * Shows a large thumbnail first (fast, no YouTube JS) and swaps in the
 * player only when the visitor clicks play.
 */
export function FeaturedPlayer({ video }: FeaturedPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(
    video.thumbnailUrl || youtubeThumbnailUrl(video.youtubeId, "maxresdefault"),
  );

  return (
    <div className="relative aspect-video overflow-hidden rounded-media bg-media-deep">
      {playing ? (
        <YouTubeEmbed youtubeId={video.youtubeId} title={video.title} autoplay />
      ) : (
        <button
          type="button"
          aria-label="Play featured video"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 block"
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            preload
            sizes="(max-width: 1000px) 100vw, 860px"
            // Not every video has a max-resolution thumbnail.
            onError={() => setThumbnail(youtubeThumbnailUrl(video.youtubeId, "hqdefault"))}
            className="object-cover"
          />
          <PlayBadge size="lg" className="transition-transform group-hover:scale-105" />
        </button>
      )}
    </div>
  );
}
