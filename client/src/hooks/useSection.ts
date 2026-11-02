"use client";

import type { HomeData, SectionName } from "@/api/client";

import { useHome } from "./useHome";

/**
 * One home-page section's data, e.g. `useSection("tip")`.
 * Every section shares the single /api/home request through SWR.
 */
export function useSection<Name extends SectionName>(name: Name): HomeData[Name] | undefined {
  const { data } = useHome();
  return data?.[name];
}
