/**
 * Ad slot registry. Each slot renders a sized placeholder until
 * NEXT_PUBLIC_ADSENSE_CLIENT is set AND the slot has an AdSense slot id.
 */
export type AdVariant = "leaderboard" | "rectangle" | "halfPage" | "inFeed" | "anchor";

export interface AdSlotConfig {
  variant: AdVariant;
  /** Text shown inside the placeholder. */
  label: string;
  /** AdSense data-ad-slot value; leave empty until AdSense approves the slot. */
  adsenseSlotId: string;
  adsenseFormat?: "auto" | "horizontal" | "rectangle" | "fluid";
}

export const AD_SLOTS = {
  topLeaderboard: {
    variant: "leaderboard",
    label: "Leaderboard · 970×90 / 320×100",
    adsenseSlotId: "",
    adsenseFormat: "horizontal",
  },
  heroRectangle: {
    variant: "rectangle",
    label: "Medium rectangle · 300×250",
    adsenseSlotId: "",
    adsenseFormat: "rectangle",
  },
  videoInFeed: {
    variant: "inFeed",
    label: "In-feed native ad · responsive",
    adsenseSlotId: "",
    adsenseFormat: "fluid",
  },
  midLeaderboard: {
    variant: "leaderboard",
    label: "Mid-page banner · 728×90 / 320×100",
    adsenseSlotId: "",
    adsenseFormat: "horizontal",
  },
  reelsLeaderboard: {
    variant: "leaderboard",
    label: "Banner · 728×90 / 320×100",
    adsenseSlotId: "",
    adsenseFormat: "horizontal",
  },
  facebookHalfPage: {
    variant: "halfPage",
    label: "Half page · 300×600",
    adsenseSlotId: "",
    adsenseFormat: "auto",
  },
  instagramRectangle: {
    variant: "rectangle",
    label: "Rectangle · 300×250",
    adsenseSlotId: "",
    adsenseFormat: "rectangle",
  },
  mobileAnchor: {
    variant: "anchor",
    label: "Anchor · 320×50",
    adsenseSlotId: "",
    adsenseFormat: "horizontal",
  },
} as const satisfies Record<string, AdSlotConfig>;

export type AdSlotKey = keyof typeof AD_SLOTS;
