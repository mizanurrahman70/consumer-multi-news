import { cacheLife, cacheTag } from "next/cache";

import { FALLBACK_FACEBOOK_VIDEOS, FALLBACK_INSTAGRAM_POSTS } from "@/data/fallback/social";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { strapiGet } from "@/lib/strapi/client";
import { mapList, toFacebookVideo, toInstagramPost } from "@/lib/strapi/mappers/content";
import { orderedListQuery } from "@/lib/strapi/queries";
import type { StrapiFacebookVideo, StrapiInstagramPost } from "@/lib/strapi/types";
import type { FacebookVideo, InstagramPost } from "@/types/content";

const SOCIAL_LIMIT = 6;

export async function getFacebookVideos(): Promise<FacebookVideo[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.facebookVideos);

  const raw = await strapiGet<StrapiFacebookVideo[]>("/facebook-videos", orderedListQuery(["url", "title"], SOCIAL_LIMIT));
  return raw ? mapList(raw, toFacebookVideo) : FALLBACK_FACEBOOK_VIDEOS;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.instagramPosts);

  const raw = await strapiGet<StrapiInstagramPost[]>(
    "/instagram-posts",
    orderedListQuery(["url", "shortcode", "kind"], SOCIAL_LIMIT),
  );
  return raw ? mapList(raw, toInstagramPost) : FALLBACK_INSTAGRAM_POSTS;
}
