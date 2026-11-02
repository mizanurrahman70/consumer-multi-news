"use client";

import useSWR from "swr";

import { INSTAGRAM_ENDPOINT, fetchInstagram } from "./api";

/** Instagram heading, follow card and posts: `{ data, error, isLoading }`. */
export function useInstagram() {
  return useSWR(INSTAGRAM_ENDPOINT, fetchInstagram);
}
