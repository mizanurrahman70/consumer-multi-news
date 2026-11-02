import "server-only";

import { getLiveStream } from "@/services/settings.service";

import type { LiveData } from "./api";

/** Data for GET /api/sections/live (Strapi → Live Stream). */
export function loadLiveStream(): Promise<LiveData> {
  return getLiveStream();
}
