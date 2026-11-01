/**
 * Content contracts shared by the UI and the backend API.
 * The backend README documents the exact JSON for each of these types —
 * keep the two in sync whenever a field changes.
 */

/** Standard response envelope returned by every backend endpoint. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Video {
  /** Backend primary key. */
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
  /** Optional link; when absent the headline is plain text. */
  href?: string | null;
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

export interface ContactInfo {
  addressLines: string[];
  phoneDisplay: string;
  /** E.164 phone number used for the tel: link. */
  phoneE164: string;
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  instagramHandle: string;
  contact: ContactInfo;
  social: SocialLinks;
}
