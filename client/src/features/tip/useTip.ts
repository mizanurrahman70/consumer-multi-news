"use client";

import useSWR from "swr";

import { TIP_ENDPOINT, fetchTip } from "./api";

/** "Send a tip" call-to-action: `{ data, error, isLoading }`. */
export function useTip() {
  return useSWR(TIP_ENDPOINT, fetchTip);
}
