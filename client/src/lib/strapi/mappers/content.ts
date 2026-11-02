import "server-only";

import { strapiAssetUrl } from "@/lib/strapi/client";
import { toMediaImage } from "@/lib/strapi/media";
import { text, toSeo } from "@/lib/strapi/mappers/shared";
import type {
  StrapiFacebookVideo,
  StrapiInstagramPost,
  StrapiPage,
  StrapiTickerItem,
  StrapiVideo,
} from "@/lib/strapi/types";
import { extractYouTubeId } from "@/lib/utils/youtube";
import type { BlocksContent, CmsPage } from "@/types/cms";
import type { FacebookVideo, InstagramPost, TickerItem, Video } from "@/types/content";

/* Mappers for Strapi collection entries. Each returns null for an unusable entry. */

export function toVideo(raw: StrapiVideo): Video | null {
  const youtubeId = text(raw.youtubeId) ?? extractYouTubeId(raw.youtubeUrl);
  if (!youtubeId) return null;
  return {
    id: raw.documentId,
    youtubeId,
    title: text(raw.title) ?? "Multiply News video",
    publishedAt: raw.publishedDate ?? null,
    viewCount: null,
    thumbnailUrl: toMediaImage(raw.customThumbnail)?.url ?? null,
  };
}

export function toTickerItem(raw: StrapiTickerItem): TickerItem | null {
  const itemText = text(raw.text);
  if (!itemText) return null;
  return {
    id: raw.documentId,
    text: itemText,
    href: text(raw.link),
    youtubeId: extractYouTubeId(raw.youtubeUrl),
  };
}

export function toFacebookVideo(raw: StrapiFacebookVideo): FacebookVideo | null {
  const url = text(raw.url);
  return url ? { id: raw.documentId, url, title: text(raw.title) ?? "Multiply News Facebook video" } : null;
}

export function toInstagramPost(raw: StrapiInstagramPost): InstagramPost | null {
  const shortcode = text(raw.shortcode);
  if (!shortcode) return null;
  return { id: raw.documentId, shortcode, kind: raw.kind === "post" ? "post" : "reel" };
}

/** Image blocks store Strapi-relative URLs ("/uploads/…"); make them absolute. */
function absolutizeBlockImages(blocks: BlocksContent): BlocksContent {
  return blocks.map((block) => {
    const image = block.image as { url?: unknown } | undefined;
    if (block.type !== "image" || typeof image?.url !== "string") return block;
    return { ...block, image: { ...image, url: strapiAssetUrl(image.url) } };
  });
}

export function toPage(raw: StrapiPage): CmsPage | null {
  const title = text(raw.title);
  const slug = text(raw.slug);
  if (!title || !slug) return null;
  return {
    title,
    slug,
    content: absolutizeBlockImages(raw.content ?? []),
    seo: toSeo(raw.seo),
    updatedAt: raw.updatedAt ?? null,
  };
}

/** Maps a list and drops entries the mapper rejected. */
export function mapList<Raw, Out>(items: Raw[], mapper: (item: Raw) => Out | null): Out[] {
  return items.map(mapper).filter((item): item is Out => item !== null);
}
