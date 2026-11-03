import { loadHome } from "@/api/server/home";

/**
 * GET /api/home — every home-page section in one JSON response.
 * The browser hooks (`useSection`) refresh from here; data comes from cached,
 * tagged services, so Strapi's webhook refresh applies here too.
 */
export async function GET() {
  return Response.json(await loadHome(), {
    // A short shared-cache window takes load off the server; content edits
    // still reach readers within seconds.
    headers: { "Cache-Control": "public, max-age=0, s-maxage=15, stale-while-revalidate=60" },
  });
}
