"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { VideoModal } from "@/components/video/VideoModal";

export interface PlayableVideo {
  youtubeId: string;
  title: string;
}

interface VideoPlayerContextValue {
  openVideo: (video: PlayableVideo) => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

/** Hosts the single site-wide video modal and exposes `openVideo`. */
export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<PlayableVideo | null>(null);

  const openVideo = useCallback((video: PlayableVideo) => setActiveVideo(video), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);
  const value = useMemo(() => ({ openVideo }), [openVideo]);

  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
      <VideoModal video={activeVideo} onClose={closeVideo} />
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayer(): VideoPlayerContextValue {
  const context = useContext(VideoPlayerContext);
  if (!context) throw new Error("useVideoPlayer must be used inside <VideoPlayerProvider>");
  return context;
}
