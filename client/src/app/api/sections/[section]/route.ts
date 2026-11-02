import type { NextRequest } from "next/server";

import { SECTION_LOADERS, isSectionName } from "@/features/section-loaders";

/**
 * GET /api/sections/{section} — JSON data for one home-page section
 * (ticker, live, featured-video, trending-videos, latest-videos,
 * facebook-reels, facebook-page, instagram, tip).
 *
 * Used by each feature's hook in the browser. Data comes from cached,
 * tagged services, so Strapi's webhook refresh applies here too.
 */
export async function GET(_request: NextRequest, context: RouteContext<"/api/sections/[section]">) {
  const { section } = await context.params;
  if (!isSectionName(section)) {
    return Response.json({ message: `Unknown section "${section}"` }, { status: 404 });
  }

  const data = await SECTION_LOADERS[section]();
  return Response.json(data);
}
