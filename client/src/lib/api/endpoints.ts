/**
 * Backend endpoint paths (relative to API_BASE_URL) and the cache tag each
 * one is stored under. The backend calls POST /api/revalidate with these
 * tag names after an admin changes content — see BACKEND_README.md.
 */
export const API_ENDPOINTS = {
  settings: "/settings",
  featured: "/videos/featured",
  trending: "/videos/trending",
  latest: "/videos/latest",
  ticker: "/ticker",
  facebookVideos: "/social/facebook-videos",
  instagramPosts: "/social/instagram-posts",
} as const;

export const CACHE_TAGS = {
  settings: "settings",
  featured: "featured",
  trending: "trending",
  latest: "latest-videos",
  ticker: "ticker",
  facebookVideos: "facebook-videos",
  instagramPosts: "instagram-posts",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export const ALL_CACHE_TAGS: readonly CacheTag[] = Object.values(CACHE_TAGS);

export function isCacheTag(value: unknown): value is CacheTag {
  return typeof value === "string" && (ALL_CACHE_TAGS as readonly string[]).includes(value);
}

/** Default item counts requested from list endpoints. */
export const LIST_LIMITS = {
  trending: 5,
  latest: 12,
  ticker: 8,
  facebookVideos: 6,
  instagramPosts: 6,
} as const;
