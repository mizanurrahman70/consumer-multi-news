import "server-only";

import { strapiAssetUrl } from "@/lib/strapi/client";
import { toMediaImage } from "@/lib/strapi/media";
import { text, toButtons, toSeo } from "@/lib/strapi/mappers/shared";
import type {
  StrapiAboutPage,
  StrapiAdvertisePage,
  StrapiContactPage,
  StrapiPrivacyPolicyPage,
} from "@/lib/strapi/types";
import type {
  AboutPage,
  AdvertisePage,
  BlocksContent,
  CompanyPageBase,
  ContactPage,
  PrivacyPolicyPage,
} from "@/types/cms";

/* Mappers for the footer "Company" single types. Empty fields fall back to the defaults. */

/** Image blocks store Strapi-relative URLs ("/uploads/…"); make them absolute. */
function absolutizeBlockImages(blocks: BlocksContent): BlocksContent {
  return blocks.map((block) => {
    const image = block.image as { url?: unknown } | undefined;
    if (block.type !== "image" || typeof image?.url !== "string") return block;
    return { ...block, image: { ...image, url: strapiAssetUrl(image.url) } };
  });
}

type RawBase = Pick<StrapiAboutPage, "title" | "subtitle" | "content" | "seo">;

function toBase(raw: RawBase, fallback: CompanyPageBase): CompanyPageBase {
  const content = raw.content && raw.content.length > 0 ? absolutizeBlockImages(raw.content) : fallback.content;
  return {
    title: text(raw.title) ?? fallback.title,
    subtitle: text(raw.subtitle),
    content,
    seo: toSeo(raw.seo) ?? fallback.seo,
  };
}

export function toAboutPage(raw: StrapiAboutPage, fallback: AboutPage): AboutPage {
  return { ...toBase(raw, fallback), coverImage: toMediaImage(raw.coverImage) };
}

export function toAdvertisePage(raw: StrapiAdvertisePage, fallback: AdvertisePage): AdvertisePage {
  return {
    ...toBase(raw, fallback),
    contactEmail: text(raw.contactEmail),
    contactPhone: text(raw.contactPhone),
    buttons: toButtons(raw.buttons),
  };
}

export function toPrivacyPolicyPage(raw: StrapiPrivacyPolicyPage, fallback: PrivacyPolicyPage): PrivacyPolicyPage {
  return { ...toBase(raw, fallback), lastUpdated: text(raw.lastUpdated) };
}

export function toContactPage(raw: StrapiContactPage, fallback: ContactPage): ContactPage {
  return {
    ...toBase(raw, fallback),
    showContactDetails: raw.showContactDetails ?? true,
    mapLink: text(raw.mapLink),
    buttons: toButtons(raw.buttons),
  };
}
