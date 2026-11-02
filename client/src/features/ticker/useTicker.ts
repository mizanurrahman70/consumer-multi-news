"use client";

import useSWR from "swr";

import { TICKER_ENDPOINT, fetchTicker } from "./api";

/** BREAKING headlines: `{ data, error, isLoading }`. */
export function useTicker() {
  return useSWR(TICKER_ENDPOINT, fetchTicker);
}
