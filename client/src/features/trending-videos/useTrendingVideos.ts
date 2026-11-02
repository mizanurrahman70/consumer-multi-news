"use client";

import useSWR from "swr";

import { TRENDING_VIDEOS_ENDPOINT, fetchTrendingVideos } from "./api";

/** "Trending Now" title and videos: `{ data, error, isLoading }`. */
export function useTrendingVideos() {
  return useSWR(TRENDING_VIDEOS_ENDPOINT, fetchTrendingVideos);
}
