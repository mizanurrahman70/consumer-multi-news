"use client";

import useSWR from "swr";

import { HOME_ENDPOINT, fetchHome } from "@/api/client";

/** How often an open home page re-checks for new content (also catches going live). */
const REFRESH_INTERVAL_MS = 60_000;

/**
 * All home-page data from one request. The page provides the first data from
 * the server (HomeDataProvider), so nothing is fetched on load; SWR refreshes
 * it every minute and when the connection comes back.
 */
export function useHome() {
  return useSWR(HOME_ENDPOINT, fetchHome, {
    refreshInterval: REFRESH_INTERVAL_MS,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
}
