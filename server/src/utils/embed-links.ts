/**
 * Helpers that understand the public links editors paste into Strapi.
 * The frontend builds every iframe from these values, so Strapi never
 * stores raw embed HTML.
 */

const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_PATH_SECTIONS = new Set(['shorts', 'embed', 'live']);
const INSTAGRAM_SECTIONS: Record<string, InstagramKind> = { reel: 'reel', reels: 'reel', tv: 'reel', p: 'post' };
const FACEBOOK_VIDEO_PATH = /\/(reel|videos|watch|share\/(v|r))\b/;

export type InstagramKind = 'reel' | 'post';
export type LivePlatform = 'youtube' | 'facebook';

function parseUrl(raw: string): URL | null {
  try {
    const url = new URL(raw.trim());
    return url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

/** "www.youtube.com" → "youtube.com" */
function bareHost(url: URL): string {
  return url.hostname.replace(/^(www|m|web)\./, '');
}

/** True when the editor pasted embed code (e.g. `<iframe …>`) instead of a link. */
export function looksLikeHtml(value: string): boolean {
  return /<\s*[a-z]/i.test(value);
}

/**
 * Extracts the 11-character video id from any common YouTube link:
 * watch?v=, youtu.be/, /shorts/, /embed/, /live/.
 */
export function extractYouTubeId(raw: string): string | null {
  const url = parseUrl(raw);
  if (!url) return null;

  const host = bareHost(url);
  const [, section = '', pathId = ''] = url.pathname.split('/');
  let candidate: string | null = null;

  if (host === 'youtu.be') candidate = section;
  else if (host === 'youtube.com' && section === 'watch') candidate = url.searchParams.get('v');
  else if (host === 'youtube.com' && YOUTUBE_PATH_SECTIONS.has(section)) candidate = pathId;

  return candidate && YOUTUBE_ID.test(candidate) ? candidate : null;
}

export function parseInstagramUrl(raw: string): { shortcode: string; kind: InstagramKind } | null {
  const url = parseUrl(raw);
  if (!url || bareHost(url) !== 'instagram.com') return null;

  const [, section = '', shortcode = ''] = url.pathname.split('/');
  const kind = INSTAGRAM_SECTIONS[section];
  return kind && /^[A-Za-z0-9_-]+$/.test(shortcode) ? { shortcode, kind } : null;
}

export function isFacebookVideoUrl(raw: string): boolean {
  const url = parseUrl(raw);
  return Boolean(url && bareHost(url) === 'facebook.com' && FACEBOOK_VIDEO_PATH.test(url.pathname));
}

export function detectLivePlatform(raw: string): LivePlatform | null {
  if (extractYouTubeId(raw)) return 'youtube';
  if (isFacebookVideoUrl(raw)) return 'facebook';
  return null;
}

/** Looks up a video's title through YouTube's public oEmbed endpoint (no API key). */
export async function fetchYouTubeTitle(youtubeId: string): Promise<string | null> {
  const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (!response.ok) return null;
    const body = (await response.json()) as { title?: unknown };
    return typeof body.title === 'string' ? body.title.slice(0, 200) : null;
  } catch {
    return null;
  }
}
