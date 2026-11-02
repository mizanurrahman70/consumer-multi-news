/** Browser fetch for the site's own JSON endpoints; throws so SWR can expose `error`. */
export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Request failed: ${url} (HTTP ${response.status})`);
  return (await response.json()) as T;
}

/** URL of a home-page section's data endpoint (src/app/api/sections/[section]). */
export function sectionEndpoint(section: string): string {
  return `/api/sections/${section}`;
}
