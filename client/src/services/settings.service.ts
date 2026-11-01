import { cacheLife, cacheTag } from "next/cache";

import { apiGet } from "@/lib/api/client";
import { API_ENDPOINTS, CACHE_TAGS } from "@/lib/api/endpoints";
import { FALLBACK_SETTINGS } from "@/data/fallback/settings";
import type { SiteSettings } from "@/types/content";

/**
 * Site-wide settings (contact details, social links, tagline).
 * Missing groups from the backend are filled from the bundled defaults.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.settings);

  const settings = await apiGet<Partial<SiteSettings>>(API_ENDPOINTS.settings);
  if (!settings) return FALLBACK_SETTINGS;

  return {
    ...FALLBACK_SETTINGS,
    ...settings,
    contact: { ...FALLBACK_SETTINGS.contact, ...settings.contact },
    social: { ...FALLBACK_SETTINGS.social, ...settings.social },
  };
}
