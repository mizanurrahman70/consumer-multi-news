import "server-only";

import { strapiAssetUrl } from "@/lib/strapi/client";
import type { StrapiMedia } from "@/lib/strapi/types";
import type { MediaImage } from "@/types/cms";

/** Strapi media → absolute-URL image, or null when the field is empty. */
export function toMediaImage(media: StrapiMedia | null | undefined, fallbackAlt = ""): MediaImage | null {
  if (!media?.url) return null;
  return {
    url: strapiAssetUrl(media.url),
    alt: media.alternativeText || fallbackAlt,
    width: media.width ?? null,
    height: media.height ?? null,
  };
}
