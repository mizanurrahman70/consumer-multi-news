import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { LiveStream } from "@/types/content";

export const LIVE_SECTION = "live";
export const LIVE_ENDPOINT = sectionEndpoint(LIVE_SECTION);

export type LiveData = LiveStream;

export function fetchLiveStream(): Promise<LiveData> {
  return fetchJson<LiveData>(LIVE_ENDPOINT);
}
