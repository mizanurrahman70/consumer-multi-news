import { cacheLife, cacheTag } from "next/cache";

import {
  FALLBACK_ABOUT_PAGE,
  FALLBACK_ADVERTISE_PAGE,
  FALLBACK_CONTACT_PAGE,
  FALLBACK_PRIVACY_POLICY_PAGE,
} from "@/data/fallback/pages";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { strapiGet } from "@/lib/strapi/client";
import { toAboutPage, toAdvertisePage, toContactPage, toPrivacyPolicyPage } from "@/lib/strapi/mappers/pages";
import {
  ABOUT_PAGE_QUERY,
  ADVERTISE_PAGE_QUERY,
  CONTACT_PAGE_QUERY,
  PRIVACY_POLICY_PAGE_QUERY,
} from "@/lib/strapi/queries";
import type {
  StrapiAboutPage,
  StrapiAdvertisePage,
  StrapiContactPage,
  StrapiPrivacyPolicyPage,
} from "@/lib/strapi/types";
import type { AboutPage, AdvertisePage, ContactPage, PrivacyPolicyPage } from "@/types/cms";

/*
 * The footer "Company" pages, one Strapi single type each. Cached and tagged;
 * the webhook refreshes them when an editor saves. Falls back to bundled
 * content when Strapi is unreachable or the page is unpublished.
 */

export async function getAboutPage(): Promise<AboutPage> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.pages);

  const raw = await strapiGet<StrapiAboutPage>("/about-page", ABOUT_PAGE_QUERY);
  return raw ? toAboutPage(raw, FALLBACK_ABOUT_PAGE) : FALLBACK_ABOUT_PAGE;
}

export async function getAdvertisePage(): Promise<AdvertisePage> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.pages);

  const raw = await strapiGet<StrapiAdvertisePage>("/advertise-page", ADVERTISE_PAGE_QUERY);
  return raw ? toAdvertisePage(raw, FALLBACK_ADVERTISE_PAGE) : FALLBACK_ADVERTISE_PAGE;
}

export async function getPrivacyPolicyPage(): Promise<PrivacyPolicyPage> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.pages);

  const raw = await strapiGet<StrapiPrivacyPolicyPage>("/privacy-policy-page", PRIVACY_POLICY_PAGE_QUERY);
  return raw ? toPrivacyPolicyPage(raw, FALLBACK_PRIVACY_POLICY_PAGE) : FALLBACK_PRIVACY_POLICY_PAGE;
}

export async function getContactPage(): Promise<ContactPage> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.pages);

  const raw = await strapiGet<StrapiContactPage>("/contact-page", CONTACT_PAGE_QUERY);
  return raw ? toContactPage(raw, FALLBACK_CONTACT_PAGE) : FALLBACK_CONTACT_PAGE;
}
