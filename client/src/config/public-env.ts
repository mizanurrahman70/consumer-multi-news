/**
 * Public environment values. These are inlined into the browser bundle,
 * so only put non-secret values here.
 */
export const publicEnv = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  /**
   * Fallback AdSense publisher id (ca-pub-…), used only when Strapi's
   * Ad Settings has none. Empty = ad placeholders.
   */
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
} as const;
