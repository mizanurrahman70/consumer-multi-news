import "server-only";

import { getHomePage } from "@/services/home.service";

import type { TipData } from "./api";

/** Data for GET /api/sections/tip (Strapi → Home Page → tipBlock). */
export async function loadTip(): Promise<TipData> {
  return (await getHomePage()).tipBlock;
}
