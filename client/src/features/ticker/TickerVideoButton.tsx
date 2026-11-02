"use client";

import { useVideoPlayer } from "@/components/video/VideoPlayerProvider";

interface TickerVideoButtonProps {
  youtubeId: string;
  text: string;
}

/** Ticker headline that opens its YouTube video in the site's player. */
export function TickerVideoButton({ youtubeId, text }: TickerVideoButtonProps) {
  const { openVideo } = useVideoPlayer();
  return (
    <button type="button" onClick={() => openVideo({ youtubeId, title: text })} className="hover:text-brand">
      ● {text}
    </button>
  );
}
