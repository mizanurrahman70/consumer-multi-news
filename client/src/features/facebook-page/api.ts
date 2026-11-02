import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { CtaCard, SectionHeading } from "@/types/cms";

export const FACEBOOK_PAGE_SECTION = "facebook-page";
export const FACEBOOK_PAGE_ENDPOINT = sectionEndpoint(FACEBOOK_PAGE_SECTION);

export interface FacebookPageData {
  heading: SectionHeading;
  card: CtaCard;
  pageUrl: string;
  siteName: string;
}

export function fetchFacebookPage(): Promise<FacebookPageData> {
  return fetchJson<FacebookPageData>(FACEBOOK_PAGE_ENDPOINT);
}
