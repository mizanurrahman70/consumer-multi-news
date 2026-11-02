import "server-only";

import { getLiveStream } from "@/services/settings.service";

import type { LiveData } from "@/api/client/types";

/** Data for GET /api/home (Strapi → Live Stream). */
export function loadLiveStream(): Promise<LiveData> {
  return getLiveStream();
}
