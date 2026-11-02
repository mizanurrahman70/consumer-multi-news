import { cacheLife, cacheTag } from "next/cache";

import { FALLBACK_HOME } from "@/data/fallback/home";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { strapiGet } from "@/lib/strapi/client";
import { toHomePage } from "@/lib/strapi/mappers/home";
import { HOME_PAGE_QUERY } from "@/lib/strapi/queries";
import type { StrapiHomePage } from "@/lib/strapi/types";
import type { HomePageContent } from "@/types/cms";

/**
 * The "Home Page" single type: hero, trending list and every section's
 * texts and buttons. Falls back to bundled content when Strapi is down
 * (or the Home Page has never been published).
 */
export async function getHomePage(): Promise<HomePageContent> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.home);

  const raw = await strapiGet<StrapiHomePage>("/home-page", HOME_PAGE_QUERY);
  return raw ? toHomePage(raw) : FALLBACK_HOME;
}
