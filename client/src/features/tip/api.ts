import { fetchJson, sectionEndpoint } from "@/lib/fetch-json";
import type { CtaCard } from "@/types/cms";

export const TIP_SECTION = "tip";
export const TIP_ENDPOINT = sectionEndpoint(TIP_SECTION);

export type TipData = CtaCard;

export function fetchTip(): Promise<TipData> {
  return fetchJson<TipData>(TIP_ENDPOINT);
}
