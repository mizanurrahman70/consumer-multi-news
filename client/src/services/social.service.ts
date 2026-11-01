import { cacheLife, cacheTag } from "next/cache";

import { apiGetList } from "@/lib/api/client";
import { API_ENDPOINTS, CACHE_TAGS, LIST_LIMITS } from "@/lib/api/endpoints";
import { FALLBACK_FACEBOOK_VIDEOS, FALLBACK_INSTAGRAM_POSTS } from "@/data/fallback/social";
import type { FacebookVideo, InstagramPost } from "@/types/content";

export async function getFacebookVideos(limit: number = LIST_LIMITS.facebookVideos): Promise<FacebookVideo[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.facebookVideos);

  const videos = await apiGetList<FacebookVideo>(API_ENDPOINTS.facebookVideos, { limit });
  return (videos ?? FALLBACK_FACEBOOK_VIDEOS).slice(0, limit);
}

export async function getInstagramPosts(limit: number = LIST_LIMITS.instagramPosts): Promise<InstagramPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.instagramPosts);

  const posts = await apiGetList<InstagramPost>(API_ENDPOINTS.instagramPosts, { limit });
  return (posts ?? FALLBACK_INSTAGRAM_POSTS).slice(0, limit);
}
