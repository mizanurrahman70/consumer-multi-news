"use client";

import useSWR from "swr";

import { LATEST_VIDEOS_ENDPOINT, fetchLatestVideos } from "./api";

/** "Latest Videos" heading and videos: `{ data, error, isLoading }`. */
export function useLatestVideos() {
  return useSWR(LATEST_VIDEOS_ENDPOINT, fetchLatestVideos);
}
