import "server-only";

import qs from "qs";

import { serverEnv } from "@/config/env";

export type StrapiQuery = Record<string, unknown>;

function isStrapiResponse(body: unknown): body is { data: unknown } {
  return typeof body === "object" && body !== null && "data" in body;
}

/**
 * GET a Strapi REST endpoint (`/api{path}`) and return its `data`.
 *
 * Never throws. Returns `null` when Strapi is not configured, unreachable,
 * times out, answers with an error, or a single type has no entry yet —
 * callers then use bundled fallback content so the site keeps rendering.
 * An empty list (`[]`) is a valid answer: the editor removed every entry.
 */
export async function strapiGet<T>(path: string, query?: StrapiQuery): Promise<T | null> {
  if (!serverEnv.strapiUrl) return null;

  const search = query ? `?${qs.stringify(query, { encodeValuesOnly: true })}` : "";
  const url = `${serverEnv.strapiUrl}/api${path}${search}`;
  const headers: HeadersInit = { Accept: "application/json" };
  if (serverEnv.strapiToken) headers.Authorization = `Bearer ${serverEnv.strapiToken}`;

  try {
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(serverEnv.apiTimeoutMs) });
    if (response.status === 404) return null;
    if (!response.ok) {
      console.error(`[strapi] GET ${path} → HTTP ${response.status}`);
      return null;
    }

    const body: unknown = await response.json();
    if (!isStrapiResponse(body)) {
      console.error(`[strapi] GET ${path} → unexpected response shape`);
      return null;
    }
    return body.data as T;
  } catch (error) {
    console.error(`[strapi] GET ${path} failed`, error);
    return null;
  }
}

/** Strapi's local upload provider returns "/uploads/…" — make it absolute. */
export function strapiAssetUrl(url: string): string {
  return /^https?:\/\//.test(url) ? url : `${serverEnv.strapiUrl}${url}`;
}
