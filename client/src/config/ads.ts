/**
 * Ad positions in the design. Sizes and labels live here (they are part of
 * the layout); the AdSense ids and on/off switches come from Strapi's
 * "Ad Settings" single type.
 */
export type AdVariant = "leaderboard" | "rectangle" | "halfPage" | "inFeed" | "anchor";

export interface AdSlotConfig {
  variant: AdVariant;
  /** Text shown inside the placeholder. */
  label: string;
  adsenseFormat: "auto" | "horizontal" | "rectangle" | "fluid";
}

export const AD_SLOTS = {
  topLeaderboard: { variant: "leaderboard", label: "Leaderboard · 970×90 / 320×100", adsenseFormat: "horizontal" },
  heroRectangle: { variant: "rectangle", label: "Medium rectangle · 300×250", adsenseFormat: "rectangle" },
  videoInFeed: { variant: "inFeed", label: "In-feed native ad · responsive", adsenseFormat: "fluid" },
  midLeaderboard: { variant: "leaderboard", label: "Mid-page banner · 728×90 / 320×100", adsenseFormat: "horizontal" },
  reelsLeaderboard: { variant: "leaderboard", label: "Banner · 728×90 / 320×100", adsenseFormat: "horizontal" },
  facebookHalfPage: { variant: "halfPage", label: "Half page · 300×600", adsenseFormat: "auto" },
  instagramRectangle: { variant: "rectangle", label: "Rectangle · 300×250", adsenseFormat: "rectangle" },
  mobileAnchor: { variant: "anchor", label: "Anchor · 320×50", adsenseFormat: "horizontal" },
} as const satisfies Record<string, AdSlotConfig>;

export type AdSlotKey = keyof typeof AD_SLOTS;

export const AD_SLOT_KEYS = Object.keys(AD_SLOTS) as AdSlotKey[];

export function isAdSlotKey(value: unknown): value is AdSlotKey {
  return typeof value === "string" && value in AD_SLOTS;
}
