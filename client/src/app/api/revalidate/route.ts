import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { serverEnv } from "@/config/env";
import { ALL_CACHE_TAGS, isCacheTag, type CacheTag } from "@/lib/api/endpoints";

/**
 * On-demand cache refresh, called by the backend after content changes.
 *
 *   POST /api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *   Body:   { "tags": ["featured", "latest-videos"] }   // or { "all": true }
 */

function isAuthorized(provided: string | null): boolean {
  const expected = serverEnv.revalidateSecret;
  if (!expected || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function parseTags(body: unknown): CacheTag[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { tags, all } = body as { tags?: unknown; all?: unknown };

  if (all === true) return [...ALL_CACHE_TAGS];
  if (!Array.isArray(tags) || tags.length === 0) return null;
  return tags.every(isCacheTag) ? tags : null;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const tags = parseTags(body);
  if (!tags) {
    return Response.json(
      { success: false, message: `Send "tags" (any of: ${ALL_CACHE_TAGS.join(", ")}) or "all": true` },
      { status: 400 },
    );
  }

  // Content changed outside a Server Action, so expire it immediately.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ success: true, data: { revalidated: tags } });
}
