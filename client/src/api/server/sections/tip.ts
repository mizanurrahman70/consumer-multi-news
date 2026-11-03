import "server-only";

import { getHomePage } from "@/services/home.service";

import type { TipData } from "@/api/client/types";

/** Data for GET /api/home (Strapi → Home Page → tipBlock). */
export async function loadTip(): Promise<TipData> {
  return (await getHomePage()).tipBlock;
}
