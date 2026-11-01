"use client";

import { useEffect, useRef, type MouseEvent } from "react";

import { CloseIcon } from "@/components/ui/icons";
import { YouTubeEmbed } from "@/components/video/YouTubeEmbed";
import type { PlayableVideo } from "@/components/video/VideoPlayerProvider";

interface VideoModalProps {
  video: PlayableVideo | null;
  onClose: () => void;
}

/**
 * Native <dialog> video player. The iframe only exists while a video is
 * open, so playback stops as soon as the modal closes.
 */
export function VideoModal({ video, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (video && !dialog.open) dialog.showModal();
    if (!video && dialog.open) dialog.close();
  }, [video]);

  // Clicks on the backdrop land on the <dialog> element itself.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Video player"
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto w-[min(1000px,94vw)] max-w-none border-0 bg-transparent p-0 backdrop:bg-backdrop"
    >
      {video && (
        <>
          <div className="flex items-center justify-between gap-3 py-2.5 text-canvas">
            <h3 className="text-lead font-semibold">{video.title}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="flex size-11 shrink-0 items-center justify-center rounded-pill bg-canvas text-ink"
            >
              <CloseIcon size={22} />
            </button>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-media bg-media-deep">
            <YouTubeEmbed youtubeId={video.youtubeId} title={video.title} autoplay />
          </div>
        </>
      )}
    </dialog>
  );
}
