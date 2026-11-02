/**
 * Video and social content shown on the site. Strapi entries are mapped
 * into these shapes in `src/lib/strapi/mappers`, so components never
 * depend on the CMS response format.
 */

export interface Video {
  /** Stable key for lists. */
  id: string;
  /** 11-character YouTube video id, used for thumbnails and embeds. */
  youtubeId: string;
  title: string;
  /** ISO-8601 publish date, or null when unknown. */
  publishedAt: string | null;
  viewCount: number | null;
  /** Optional custom thumbnail; falls back to the YouTube thumbnail. */
  thumbnailUrl?: string | null;
}

/** The big video at the top of the home page. */
export interface FeaturedVideo {
  video: Video;
  /** Small red label above the title, e.g. "Latest on YouTube". */
  kicker: string;
  /** Muted line under the title, e.g. "Multiply News · YouTube". */
  meta: string;
}

export interface TickerItem {
  id: string;
  text: string;
  /** Optional external link. */
  href?: string | null;
  /** Optional YouTube video that opens in the site's player. */
  youtubeId?: string | null;
}

/** A Facebook reel or video shown through the official video plugin. */
export interface FacebookVideo {
  id: string;
  /** Public Facebook URL of the reel or video. */
  url: string;
  title: string;
}

export type InstagramPostKind = "reel" | "post";

export interface InstagramPost {
  id: string;
  /** The code in instagram.com/reel/{shortcode}/ */
  shortcode: string;
  kind: InstagramPostKind;
}

export type LivePlatform = "youtube" | "facebook";

export interface LiveStream {
  isLive: boolean;
  url: string | null;
  platform: LivePlatform | null;
  title: string;
}

export interface SocialLinks {
  facebook: string;
  facebookReels: string;
  messenger: string;
  youtube: string;
  youtubeSubscribe: string;
  youtubeVideos: string;
  youtubeShorts: string;
  youtubeLive: string;
  instagram: string;
}
