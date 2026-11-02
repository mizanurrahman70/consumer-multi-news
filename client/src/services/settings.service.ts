import { cacheLife, cacheTag } from "next/cache";

import { FALLBACK_ADS, FALLBACK_LIVE, FALLBACK_NAVIGATION, FALLBACK_SETTINGS } from "@/data/fallback/settings";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { strapiGet } from "@/lib/strapi/client";
import { toAdSettings, toLiveStream, toNavigation, toSiteSettings } from "@/lib/strapi/mappers/site";
import { AD_SETTINGS_QUERY, NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from "@/lib/strapi/queries";
import type { StrapiAdSetting, StrapiLiveStream, StrapiNavigation, StrapiSiteSetting } from "@/lib/strapi/types";
import type { AdSettings, Navigation, SiteSettings } from "@/types/cms";
import type { LiveStream } from "@/types/content";

/*
 * Site-wide single types from Strapi. Each function is cached and tagged;
 * Strapi's webhook refreshes the matching tag right after an editor saves.
 * If Strapi is unreachable the bundled defaults are used.
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.settings);

  const raw = await strapiGet<StrapiSiteSetting>("/site-setting", SITE_SETTINGS_QUERY);
  return raw ? toSiteSettings(raw) : FALLBACK_SETTINGS;
}

export async function getNavigation(): Promise<Navigation> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.navigation);

  const raw = await strapiGet<StrapiNavigation>("/navigation", NAVIGATION_QUERY);
  return raw ? toNavigation(raw) : FALLBACK_NAVIGATION;
}

export async function getAdSettings(): Promise<AdSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.ads);

  const raw = await strapiGet<StrapiAdSetting>("/ad-setting", AD_SETTINGS_QUERY);
  return raw ? toAdSettings(raw) : FALLBACK_ADS;
}

export async function getLiveStream(): Promise<LiveStream> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.live);

  const raw = await strapiGet<StrapiLiveStream>("/live-stream");
  return raw ? toLiveStream(raw) : FALLBACK_LIVE;
}
