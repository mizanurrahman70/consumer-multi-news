"use client";

import useSWR from "swr";

import { FACEBOOK_REELS_ENDPOINT, fetchFacebookReels } from "./api";

/** Facebook reels heading and videos: `{ data, error, isLoading }`. */
export function useFacebookReels() {
  return useSWR(FACEBOOK_REELS_ENDPOINT, fetchFacebookReels);
}
