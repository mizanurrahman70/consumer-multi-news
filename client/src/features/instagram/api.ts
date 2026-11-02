import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { CtaCard, SectionHeading } from "@/types/cms";
import type { InstagramPost } from "@/types/content";

export const INSTAGRAM_SECTION = "instagram";
export const INSTAGRAM_ENDPOINT = sectionEndpoint(INSTAGRAM_SECTION);

export interface InstagramData {
  heading: SectionHeading;
  card: CtaCard;
  posts: InstagramPost[];
}

export function fetchInstagram(): Promise<InstagramData> {
  return fetchJson<InstagramData>(INSTAGRAM_ENDPOINT);
}
