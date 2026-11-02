import "server-only";

import { getHomePage } from "@/services/home.service";
import { getInstagramPosts } from "@/services/social.service";

import type { InstagramData } from "./api";

/** Data for GET /api/sections/instagram (Strapi → Instagram Post, texts from Home Page). */
export async function loadInstagram(): Promise<InstagramData> {
  const [home, posts] = await Promise.all([getHomePage(), getInstagramPosts()]);
  return { heading: home.instagramSection, card: home.instagramBlock, posts };
}
