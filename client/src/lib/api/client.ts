import "server-only";

import { serverEnv } from "@/config/env";
import type { ApiResponse } from "@/types/content";

type QueryParams = Record<string, string | number | undefined>;

function buildUrl(path: string, query?: QueryParams): string {
  const url = new URL(`${serverEnv.apiBaseUrl}${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

function isApiResponse<T>(body: unknown): body is ApiResponse<T> {
  return typeof body === "object" && body !== null && "success" in body && "data" in body;
}

/**
 * GET a backend endpoint and unwrap the `{ success, data }` envelope.
 *
 * Never throws: returns `null` when the API is not configured, times out,
 * answers with an error status or an unexpected shape. Callers fall back to
 * bundled content so the site keeps rendering while the backend is down.
 */
export async function apiGet<T>(path: string, query?: QueryParams): Promise<T | null> {
  if (!serverEnv.apiBaseUrl) return null;

  const url = buildUrl(path, query);
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(serverEnv.apiTimeoutMs),
    });
    if (!response.ok) {
      console.error(`[api] GET ${url} → HTTP ${response.status}`);
      return null;
    }

    const body: unknown = await response.json();
    if (!isApiResponse<T>(body) || !body.success) {
      console.error(`[api] GET ${url} → unexpected response shape`);
      return null;
    }
    return body.data;
  } catch (error) {
    console.error(`[api] GET ${url} failed`, error);
    return null;
  }
}

/** Like apiGet, but treats an empty list as "no data" so fallbacks apply. */
export async function apiGetList<T>(path: string, query?: QueryParams): Promise<T[] | null> {
  const data = await apiGet<T[]>(path, query);
  return Array.isArray(data) && data.length > 0 ? data : null;
}
