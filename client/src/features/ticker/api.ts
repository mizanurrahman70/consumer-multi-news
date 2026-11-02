import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { TickerItem } from "@/types/content";

export const TICKER_SECTION = "ticker";
export const TICKER_ENDPOINT = sectionEndpoint(TICKER_SECTION);

export type TickerData = TickerItem[];

export function fetchTicker(): Promise<TickerData> {
  return fetchJson<TickerData>(TICKER_ENDPOINT);
}
