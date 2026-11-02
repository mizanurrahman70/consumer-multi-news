import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { serverEnv } from "@/config/env";
import { ALL_CACHE_TAGS, MODEL_TAGS, isCacheTag, type CacheTag } from "@/lib/cache-tags";

/**
 * On-demand cache refresh, called by Strapi's webhook after content changes.
 *
 *   POST /api/revalidate
 *   Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * Accepted bodies:
 *   Strapi webhook  { "event": "entry.publish", "model": "video", … }
 *   Manual          { "tags": ["home", "latest-videos"] }  or  { "all": true }
 */

function isAuthorized(provided: string | null): boolean {
  const expected = serverEnv.revalidateSecret;
  if (!expected || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function tagsFromBody(body: unknown): CacheTag[] | null {
  if (typeof body !== "object" || body === null) return null;
  const { event, model, tags, all } = body as Record<string, unknown>;

  if (all === true) return [...ALL_CACHE_TAGS];
  // Images can be used anywhere, so any media change refreshes everything.
  if (typeof event === "string" && event.startsWith("media.")) return [...ALL_CACHE_TAGS];
  if (typeof model === "string") return MODEL_TAGS[model] ? [...MODEL_TAGS[model]] : [];
  if (Array.isArray(tags) && tags.length > 0 && tags.every(isCacheTag)) return tags;
  return null;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const tags = tagsFromBody(await request.json().catch(() => null));
  if (!tags) {
    return Response.json(
      { success: false, message: `Send a Strapi webhook payload, "tags" (${ALL_CACHE_TAGS.join(", ")}) or "all": true` },
      { status: 400 },
    );
  }

  // Content changed outside a Server Action, so expire it immediately.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ success: true, data: { revalidated: tags } });
}
