import { fetchJson } from "@/lib/fetch-json";

import type { HomeData } from "./types";

/** One endpoint for every home-page section (src/app/api/home/route.ts). */
export const HOME_ENDPOINT = "/api/home";

export function fetchHome(): Promise<HomeData> {
  return fetchJson<HomeData>(HOME_ENDPOINT);
}
