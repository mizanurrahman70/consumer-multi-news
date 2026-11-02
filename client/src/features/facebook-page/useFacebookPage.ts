"use client";

import useSWR from "swr";

import { FACEBOOK_PAGE_ENDPOINT, fetchFacebookPage } from "./api";

/** "From Our Facebook" texts and page URL: `{ data, error, isLoading }`. */
export function useFacebookPage() {
  return useSWR(FACEBOOK_PAGE_ENDPOINT, fetchFacebookPage);
}
