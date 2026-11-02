import "server-only";

import { getHomePage } from "@/services/home.service";
import { getSiteSettings } from "@/services/settings.service";

import type { FacebookPageData } from "@/api/client/types";

/** Data for GET /api/home (Home Page texts + Site Settings page URL). */
export async function loadFacebookPage(): Promise<FacebookPageData> {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);
  return {
    heading: home.facebookSection,
    card: home.facebookBlock,
    pageUrl: settings.social.facebook,
    siteName: settings.name,
  };
}
