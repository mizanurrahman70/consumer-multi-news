import type { Video } from "@/types/content";

export type YouTubeThumbQuality = "hqdefault" | "maxresdefault";

/** Permissions YouTube needs inside an iframe. */
export const YOUTUBE_IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_PATH_SECTIONS = new Set(["shorts", "embed", "live"]);

/**
 * Extracts the 11-character video id from any common YouTube link:
 * watch?v=, youtu.be/, /shorts/, /embed/, /live/. Mirrors the CMS check.
 */
export function extractYouTubeId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www|m)\./, "");
  const [, section = "", pathId = ""] = url.pathname.split("/");
  let candidate: string | null = null;

  if (host === "youtu.be") candidate = section;
  else if (host === "youtube.com" && section === "watch") candidate = url.searchParams.get("v");
  else if (host === "youtube.com" && YOUTUBE_PATH_SECTIONS.has(section)) candidate = pathId;

  return candidate && YOUTUBE_ID.test(candidate) ? candidate : null;
}

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
