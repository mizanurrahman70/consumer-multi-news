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
  /** Strapi base URL without /api, e.g. http://localhost:1337 */
  strapiUrl: (process.env.STRAPI_URL ?? "").replace(/\/+$/, ""),
  /** Read-only Strapi API token (Settings → API Tokens). */
  strapiToken: process.env.STRAPI_API_TOKEN ?? "",
  apiTimeoutMs: readNumber(process.env.API_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
  /** Shared secret Strapi's webhook sends when asking us to refresh cached content. */
  revalidateSecret: process.env.REVALIDATE_SECRET ?? "",
} as const;
