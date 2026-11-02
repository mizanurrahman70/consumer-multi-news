"use client";

import useSWR from "swr";

import { LIVE_ENDPOINT, fetchLiveStream } from "./api";

/** Current live stream: `{ data, error, isLoading }`. Re-checks every minute while the page is open. */
export function useLiveStream() {
  return useSWR(LIVE_ENDPOINT, fetchLiveStream, { refreshInterval: 60_000 });
}
