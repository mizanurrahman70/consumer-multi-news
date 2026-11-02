/**
 * Cache tags for every cached data function. Strapi's webhook reports which
 * content type changed (its "model"); MODEL_TAGS maps that to the tags to
 * refresh. Media changes refresh everything (images can be used anywhere).
 */
export const CACHE_TAGS = {
  settings: "settings",
  navigation: "navigation",
  ads: "ads",
  live: "live",
  home: "home",
  latest: "latest-videos",
  ticker: "ticker",
  facebookVideos: "facebook-videos",
  instagramPosts: "instagram-posts",
  pages: "pages",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export const ALL_CACHE_TAGS: readonly CacheTag[] = Object.values(CACHE_TAGS);

/** Strapi content-type singularName → tags to refresh. */
export const MODEL_TAGS: Readonly<Record<string, readonly CacheTag[]>> = {
  "site-setting": [CACHE_TAGS.settings],
  navigation: [CACHE_TAGS.navigation],
  "ad-setting": [CACHE_TAGS.ads],
  "live-stream": [CACHE_TAGS.live],
  "home-page": [CACHE_TAGS.home],
  // The ticker falls back to the latest video titles.
  video: [CACHE_TAGS.latest, CACHE_TAGS.ticker],
  category: [CACHE_TAGS.latest],
  tag: [CACHE_TAGS.latest],
  "ticker-item": [CACHE_TAGS.ticker],
  "facebook-video": [CACHE_TAGS.facebookVideos],
  "instagram-post": [CACHE_TAGS.instagramPosts],
  page: [CACHE_TAGS.pages],
};

export function isCacheTag(value: unknown): value is CacheTag {
  return typeof value === "string" && (ALL_CACHE_TAGS as readonly string[]).includes(value);
}
