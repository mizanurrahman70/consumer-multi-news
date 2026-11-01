/**
 * Public environment values. These are inlined into the browser bundle,
 * so only put non-secret values here.
 */
export const publicEnv = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, ""),
  /** Google AdSense publisher id (ca-pub-…). Empty = show ad placeholders. */
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
} as const;
