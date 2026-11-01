import type { FacebookVideo, InstagramPost } from "@/types/content";

/** Bundled fallback social embeds (from the original site). */
const FACEBOOK_URLS = [
  "https://www.facebook.com/multiplynews/videos/1149601990904042/",
  "https://www.facebook.com/reel/1778868333373229/",
  "https://www.facebook.com/reel/1181920804158827/",
  "https://www.facebook.com/reel/983367474135084/",
  "https://www.facebook.com/reel/1642640540598646/",
  "https://www.facebook.com/reel/1632550061649199/",
];

export const FALLBACK_FACEBOOK_VIDEOS: FacebookVideo[] = FACEBOOK_URLS.map((url, index) => ({
  id: `fb-${index + 1}`,
  url,
  title: `Multiply News Facebook video ${index + 1}`,
}));

const INSTAGRAM_REEL_CODES = ["DemZvOtkuOr", "Dc1ID2CD3dQ", "DcvuQHvgda2", "DctUA9ogfDA", "Dcqvm_aiS82", "DcoMhQeEoAb"];

export const FALLBACK_INSTAGRAM_POSTS: InstagramPost[] = INSTAGRAM_REEL_CODES.map((shortcode) => ({
  id: shortcode,
  shortcode,
  kind: "reel",
}));
