import type { Core, UID } from '@strapi/strapi';

import { CATEGORIES, FACEBOOK_VIDEOS, INSTAGRAM_POSTS, VIDEOS } from './data/content';
import { HOME_PAGE } from './data/home';
import { ABOUT_PAGE, ADVERTISE_PAGE, CONTACT_PAGE, PRIVACY_POLICY_PAGE } from './data/pages';
import { AD_SETTINGS, LIVE_STREAM, NAVIGATION, SITE_SETTINGS } from './data/site';

/*
 * Fills an empty database with the content the website shows today, so
 * editors start from the current design and only change or add entries.
 *
 * Runs once (tracked in the core store). Each content type is seeded only
 * when it is still empty, so existing editor content is never overwritten.
 * Set SEED_DEFAULT_CONTENT=false to skip it.
 */

// Bump when new default content is added; only empty content types are filled.
const SEED_VERSION = 2;
const SEED_STORE = { type: 'core', name: 'multiply-news', key: 'default-content-seed-version' };

type SeedData = Record<string, unknown>;

async function isEmpty(strapi: Core.Strapi, uid: UID.ContentType): Promise<boolean> {
  return (await strapi.documents(uid).count({})) === 0;
}

async function createEntry(strapi: Core.Strapi, uid: UID.ContentType, data: SeedData, publish: boolean) {
  // Seed data is plain JSON validated by Strapi itself on create.
  return strapi.documents(uid).create({ data, ...(publish ? { status: 'published' } : {}) } as never);
}

async function seedMany(strapi: Core.Strapi, uid: UID.ContentType, items: SeedData[], publish = true) {
  if (!(await isEmpty(strapi, uid))) return;
  for (const item of items) await createEntry(strapi, uid, item, publish);
  strapi.log.info(`[seed] ${uid}: ${items.length} entries`);
}

async function seedSingle(strapi: Core.Strapi, uid: UID.ContentType, data: SeedData) {
  if (!(await isEmpty(strapi, uid))) return;
  await createEntry(strapi, uid, data, true);
  strapi.log.info(`[seed] ${uid}`);
}

async function seedVideos(strapi: Core.Strapi) {
  if (!(await isEmpty(strapi, 'api::video.video'))) return;

  const categories = await strapi.documents('api::category.category').findMany({ fields: ['slug'] });
  const categoryIdBySlug = new Map(categories.map((category) => [category.slug, category.documentId]));

  for (const { youtubeId, pinOrder, category, ...video } of VIDEOS) {
    const categoryId = categoryIdBySlug.get(category);
    await createEntry(
      strapi,
      'api::video.video',
      {
        ...video,
        youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
        isPinned: pinOrder !== undefined,
        pinOrder: pinOrder ?? null,
        ...(categoryId ? { category: { connect: [{ documentId: categoryId }] } } : {}),
      },
      true,
    );
  }
  strapi.log.info(`[seed] api::video.video: ${VIDEOS.length} entries`);
}

export async function seedDefaultContent(strapi: Core.Strapi): Promise<void> {
  if (process.env.SEED_DEFAULT_CONTENT === 'false') return;

  const store = strapi.store(SEED_STORE);
  if ((await store.get()) === SEED_VERSION) return;

  try {
    await seedSingle(strapi, 'api::site-setting.site-setting', SITE_SETTINGS);
    await seedSingle(strapi, 'api::navigation.navigation', NAVIGATION);
    await seedSingle(strapi, 'api::ad-setting.ad-setting', AD_SETTINGS);
    await seedSingle(strapi, 'api::live-stream.live-stream', LIVE_STREAM);
    await seedSingle(strapi, 'api::home-page.home-page', HOME_PAGE);
    await seedMany(strapi, 'api::category.category', CATEGORIES);
    await seedVideos(strapi);
    await seedMany(strapi, 'api::facebook-video.facebook-video', FACEBOOK_VIDEOS);
    await seedMany(strapi, 'api::instagram-post.instagram-post', INSTAGRAM_POSTS);
    await seedSingle(strapi, 'api::about-page.about-page', ABOUT_PAGE);
    await seedSingle(strapi, 'api::advertise-page.advertise-page', ADVERTISE_PAGE);
    await seedSingle(strapi, 'api::privacy-policy-page.privacy-policy-page', PRIVACY_POLICY_PAGE);
    await seedSingle(strapi, 'api::contact-page.contact-page', CONTACT_PAGE);

    await store.set({ value: SEED_VERSION });
    strapi.log.info('[seed] Default content ready.');
  } catch (error) {
    strapi.log.error('[seed] Default content seeding failed; it will retry on next start.', error);
  }
}
