import type { Video } from "@/types/content";

export type YouTubeThumbQuality = "hqdefault" | "maxresdefault";

/** Permissions YouTube needs inside an iframe. */
export const YOUTUBE_IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export function youtubeThumbnailUrl(youtubeId: string, quality: YouTubeThumbQuality = "hqdefault"): string {
  return `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`;
}

/** Custom thumbnail from the backend when present, otherwise YouTube's. */
export function videoThumbnail(video: Pick<Video, "youtubeId" | "thumbnailUrl">): string {
  return video.thumbnailUrl || youtubeThumbnailUrl(video.youtubeId);
}

export function youtubeEmbedUrl(youtubeId: string, { autoplay = false } = {}): string {
  const params = new URLSearchParams({ rel: "0", playsinline: "1" });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}
