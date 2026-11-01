import "server-only";

/**
 * Server-only environment. Never import this from a Client Component —
 * the `server-only` import above turns that mistake into a build error.
 */
const DEFAULT_TIMEOUT_MS = 5000;

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const serverEnv = {
  /** Base URL of the backend API, e.g. https://api.multiplynews.com/api/v1 */
  apiBaseUrl: (process.env.API_BASE_URL ?? "").replace(/\/+$/, ""),
  apiTimeoutMs: readNumber(process.env.API_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  /** Shared secret the backend sends when asking us to refresh cached content. */
  revalidateSecret: process.env.REVALIDATE_SECRET ?? "",
} as const;
