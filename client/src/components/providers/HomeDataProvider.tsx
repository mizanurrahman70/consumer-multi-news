"use client";

import type { ReactNode } from "react";
import { SWRConfig } from "swr";

import { HOME_ENDPOINT, type HomeData } from "@/api/client";

interface HomeDataProviderProps {
  /** Home data loaded on the server; becomes the hooks' first value. */
  data: HomeData;
  children: ReactNode;
}

/**
 * Seeds SWR with server-loaded home data, so every section renders in the
 * first HTML (no loading flash, visible to search engines) and then keeps
 * refreshing in the browser through `useSection`.
 */
export function HomeDataProvider({ data, children }: HomeDataProviderProps) {
  return <SWRConfig value={{ fallback: { [HOME_ENDPOINT]: data } }}>{children}</SWRConfig>;
}
