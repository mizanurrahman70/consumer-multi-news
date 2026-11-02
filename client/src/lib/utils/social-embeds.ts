import type { InstagramPost } from "@/types/content";

/** Permissions the Facebook plugins need inside an iframe. */
export const FACEBOOK_IFRAME_ALLOW = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";

export const FACEBOOK_REEL_SIZE = { width: 267, height: 476 } as const;

export const FACEBOOK_PAGE_PLUGIN = {
  minWidth: 280,
  maxWidth: 500,
  mobileHeight: 640,
  desktopHeight: 900,
  /** Viewport width below which the mobile height is used. */
  mobileBreakpoint: 760,
} as const;

/** 16:9 size used for Facebook live streams. */
export const FACEBOOK_LANDSCAPE_SIZE = { width: 1280, height: 720 } as const;

/** URL for Facebook's embedded video/reel plugin (portrait reel size by default). */
export function facebookVideoPluginUrl(
  videoUrl: string,
  size: { width: number; height: number } = FACEBOOK_REEL_SIZE,
): string {
  const params = new URLSearchParams({
    href: videoUrl,
    width: String(size.width),
    height: String(size.height),
    show_text: "false",
    t: "0",
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

/** URL for Facebook's Page Plugin (timeline of real posts). */
export function facebookPagePluginUrl(pageUrl: string, width: number, height: number): string {
  const params = new URLSearchParams({
    href: pageUrl,
    tabs: "timeline",
    width: String(width),
    height: String(height),
    small_header: "false",
    adapt_container_width: "true",
    hide_cover: "false",
    show_facepile: "true",
  });
  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
}

/** Clamps a container width to what the Page Plugin supports. */
export function clampPagePluginWidth(containerWidth: number): number {
  const { minWidth, maxWidth } = FACEBOOK_PAGE_PLUGIN;
  return Math.max(minWidth, Math.min(maxWidth, Math.floor(containerWidth || 340)));
}

export function instagramPermalink(post: Pick<InstagramPost, "shortcode" | "kind">): string {
  const segment = post.kind === "reel" ? "reel" : "p";
  return `https://www.instagram.com/${segment}/${post.shortcode}/?utm_source=ig_embed&utm_campaign=loading`;
}

export const INSTAGRAM_EMBED_SCRIPT = "https://www.instagram.com/embed.js";
