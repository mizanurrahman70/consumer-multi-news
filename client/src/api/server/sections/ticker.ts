import "server-only";

import { getTickerItems } from "@/services/video.service";

import type { TickerData } from "@/api/client/types";

/** Data for GET /api/home (Strapi → Ticker Item, or latest video titles). */
export function loadTicker(): Promise<TickerData> {
  return getTickerItems();
}
