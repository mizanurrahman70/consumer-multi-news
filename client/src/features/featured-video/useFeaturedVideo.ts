"use client";

import useSWR from "swr";

import { FEATURED_VIDEO_ENDPOINT, fetchFeaturedVideo } from "./api";

/** The hero video: `{ data, error, isLoading }`. */
export function useFeaturedVideo() {
  return useSWR(FEATURED_VIDEO_ENDPOINT, fetchFeaturedVideo);
}
