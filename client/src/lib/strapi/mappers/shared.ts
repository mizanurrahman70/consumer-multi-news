import "server-only";

import { toMediaImage } from "@/lib/strapi/media";
import type {
  StrapiButton,
  StrapiCtaCard,
  StrapiLink,
  StrapiSectionHeading,
  StrapiSeo,
  StrapiYouTubeVideo,
} from "@/lib/strapi/types";
import { extractYouTubeId } from "@/lib/utils/youtube";
import type { ButtonItem, ButtonVariant, CtaCard, LinkItem, SectionHeading, SeoMeta } from "@/types/cms";
import type { Video } from "@/types/content";

/* Mappers for Strapi components that are reused across content types. */

const BUTTON_VARIANTS: readonly ButtonVariant[] = ["yellow", "dark", "red", "light"];
const OG_TYPES: Record<string, SeoMeta["ogType"]> = { website: "website", article: "article", video_other: "video.other" };

/** Trimmed string, or null when empty. */
export function text(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

/** "#latest" only works on the home page; "/#latest" works from every page. */
export function resolveHref(href: string): string {
  return href.startsWith("#") && href.length > 1 ? `/${href}` : href;
}

export function toLink(raw: StrapiLink | null | undefined): LinkItem | null {
  const label = text(raw?.label);
  const href = text(raw?.url);
  return label && href ? { label, href: resolveHref(href), external: Boolean(raw?.isExternal) } : null;
}

export function toLinks(raw: StrapiLink[] | null | undefined): LinkItem[] {
  return (raw ?? []).map(toLink).filter((link): link is LinkItem => link !== null);
}

export function toButtons(raw: StrapiButton[] | null | undefined): ButtonItem[] {
  return (raw ?? []).flatMap((button) => {
    const link = toLink(button);
    if (!link) return [];
    const variant = BUTTON_VARIANTS.find((value) => value === button.variant) ?? "dark";
    return [{ ...link, external: button.isExternal ?? true, variant }];
  });
}

export function toSectionHeading(raw: StrapiSectionHeading | null | undefined, fallback: SectionHeading): SectionHeading {
  const title = text(raw?.title);
  if (!title) return fallback;
  const label = text(raw?.linkLabel);
  const href = text(raw?.linkUrl);
  return { title, link: label && href ? { label, href: resolveHref(href) } : null };
}

export function toCtaCard(raw: StrapiCtaCard | null | undefined, fallback: CtaCard): CtaCard {
  const title = text(raw?.title);
  if (!raw || !title) return fallback;
  return { eyebrow: text(raw.eyebrow), title, text: text(raw.text), buttons: toButtons(raw.buttons) };
}

export function toSeo(raw: StrapiSeo | null | undefined): SeoMeta | null {
  const title = text(raw?.metaTitle);
  const description = text(raw?.metaDescription);
  if (!raw || !title || !description) return null;

  const robots = raw.metaRobots ?? "index_follow";
  const og = raw.openGraph;
  return {
    title,
    description,
    image: toMediaImage(og?.ogImage) ?? toMediaImage(raw.metaImage),
    keywords: text(raw.keywords),
    noIndex: robots.startsWith("noindex"),
    noFollow: robots.endsWith("nofollow"),
    canonicalUrl: text(raw.canonicalURL),
    ogTitle: text(og?.ogTitle),
    ogDescription: text(og?.ogDescription),
    ogType: OG_TYPES[og?.ogType ?? "website"] ?? "website",
    structuredData: raw.structuredData ?? null,
  };
}

/** The "YouTube video" component (hero, trending) → Video. */
export function toEmbeddedVideo(raw: StrapiYouTubeVideo | null | undefined, key: string): Video | null {
  const youtubeId = text(raw?.youtubeId) ?? extractYouTubeId(raw?.youtubeUrl);
  if (!raw || !youtubeId) return null;
  return {
    id: `${key}-${raw.id ?? youtubeId}`,
    youtubeId,
    title: text(raw.title) ?? "Multiply News video",
    publishedAt: null,
    viewCount: null,
    thumbnailUrl: toMediaImage(raw.customThumbnail)?.url ?? null,
  };
}
