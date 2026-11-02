import type { Modules } from '@strapi/strapi';
import { errors } from '@strapi/utils';

import {
  detectLivePlatform,
  extractYouTubeId,
  fetchYouTubeTitle,
  isFacebookVideoUrl,
  looksLikeHtml,
  parseInstagramUrl,
} from '../utils/embed-links';

/*
 * Runs before every create/update (admin panel and API alike).
 * Checks pasted links and fills the derived fields (YouTube id, title,
 * Instagram shortcode/kind, live platform) so editors only paste links.
 */

type Data = Record<string, unknown>;

function fail(message: string): never {
  throw new errors.ValidationError(message);
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function checkNotHtml(label: string, value: string): void {
  if (looksLikeHtml(value)) fail(`${label}: paste the normal link, not the embed (iframe) code.`);
}

/** Validates `youtubeUrl`, then fills `youtubeId` and an empty `title`. */
async function normalizeYouTube(data: Data, label: string): Promise<void> {
  const youtubeUrl = asText(data.youtubeUrl);
  if (!youtubeUrl) return;
  checkNotHtml(label, youtubeUrl);

  const youtubeId = extractYouTubeId(youtubeUrl);
  if (!youtubeId) fail(`${label}: "${youtubeUrl}" is not a valid YouTube video link.`);

  data.youtubeUrl = youtubeUrl;
  data.youtubeId = youtubeId;
  if (!asText(data.title)) data.title = await fetchYouTubeTitle(youtubeId);
  if (!asText(data.title)) fail(`${label}: could not read the title from YouTube. Please type a title.`);
}

const handlers: Record<string, (data: Data) => Promise<void>> = {
  async 'api::video.video'(data) {
    await normalizeYouTube(data, 'Video');
    if (!asText(data.slug) && data.youtubeId) data.slug = data.youtubeId;
  },

  async 'api::home-page.home-page'(data) {
    const hero = data.hero as Data | undefined;
    if (hero?.video) await normalizeYouTube(hero.video as Data, 'Hero video');

    if (Array.isArray(data.trendingVideos)) {
      await Promise.all(
        (data.trendingVideos as Data[]).map((video, index) => normalizeYouTube(video, `Trending video ${index + 1}`)),
      );
    }
  },

  async 'api::ticker-item.ticker-item'(data) {
    const youtubeUrl = asText(data.youtubeUrl);
    if (youtubeUrl && asText(data.link)) fail('Ticker item: use either "link" or "youtubeUrl", not both.');
    if (youtubeUrl && !extractYouTubeId(youtubeUrl)) fail(`Ticker item: "${youtubeUrl}" is not a valid YouTube video link.`);
  },

  async 'api::facebook-video.facebook-video'(data) {
    const url = asText(data.url);
    if (!url) return;
    checkNotHtml('Facebook video', url);
    if (!isFacebookVideoUrl(url)) fail(`Facebook video: "${url}" must be a public facebook.com reel or video link.`);
    data.url = url;
  },

  async 'api::instagram-post.instagram-post'(data) {
    const url = asText(data.url);
    if (!url) return;
    checkNotHtml('Instagram post', url);
    const parsed = parseInstagramUrl(url);
    if (!parsed) fail(`Instagram post: "${url}" must be an instagram.com/reel/… or /p/… link.`);
    Object.assign(data, { url, ...parsed });
  },

  async 'api::live-stream.live-stream'(data) {
    const url = asText(data.url);
    if (url) {
      checkNotHtml('Live stream', url);
      const platform = detectLivePlatform(url);
      if (!platform) fail(`Live stream: "${url}" must be a YouTube or Facebook video link.`);
      Object.assign(data, { url, platform });
    }
    if (data.isLive === true && (!url || !asText(data.title))) {
      fail('Live stream: add the live link and a title before switching "isLive" on.');
    }
  },
};

export const embedLinksMiddleware: Modules.Documents.Middleware.Middleware = async (context, next) => {
  if (context.action === 'create' || context.action === 'update') {
    const handler = handlers[context.uid];
    const data = (context.params as { data?: Data }).data;
    if (handler && data) await handler(data);
  }
  return next();
};
