import "server-only";

import { getTickerItems } from "@/services/video.service";

import type { TickerData } from "./api";

/** Data for GET /api/sections/ticker (Strapi → Ticker Item, or latest video titles). */
export function loadTicker(): Promise<TickerData> {
  return getTickerItems();
}
