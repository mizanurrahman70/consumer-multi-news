import { cacheLife, cacheTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-tags";
import { strapiGet } from "@/lib/strapi/client";
import { mapList, toPage } from "@/lib/strapi/mappers/content";
import { PAGE_SLUGS_QUERY, pageBySlugQuery } from "@/lib/strapi/queries";
import type { StrapiPage } from "@/lib/strapi/types";
import type { CmsPage } from "@/types/cms";

/** A published "Page" entry (About us, Privacy policy…), or null. */
export async function getPage(slug: string): Promise<CmsPage | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.pages);

  const raw = await strapiGet<StrapiPage[]>("/pages", pageBySlugQuery(slug));
  return raw?.[0] ? toPage(raw[0]) : null;
}

/** Slugs and last-updated dates of every published page (sitemap, prerendering). */
export async function getPublishedPages(): Promise<Array<Pick<CmsPage, "slug" | "updatedAt">>> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.pages);

  const raw = await strapiGet<StrapiPage[]>("/pages", PAGE_SLUGS_QUERY);
  return raw ? mapList(raw, (page) => (page.slug ? { slug: page.slug, updatedAt: page.updatedAt ?? null } : null)) : [];
}
