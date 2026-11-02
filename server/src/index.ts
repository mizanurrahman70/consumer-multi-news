import type { Core } from '@strapi/strapi';

import { syncFrontendWebhook } from './bootstrap/frontend-webhook';
import { embedLinksMiddleware } from './document-middlewares/embed-links';
import { seedDefaultContent } from './seed';

export default {
  /**
   * Runs before the app is initialized.
   * Registers the middleware that checks pasted video links and fills
   * the derived fields (YouTube id, title, Instagram shortcode…).
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(embedLinksMiddleware);
  },

  /**
   * Runs before the app starts.
   * Seeds the default website content into an empty database (once) and
   * keeps the "refresh the website" webhook in sync with the env.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedDefaultContent(strapi);
    await syncFrontendWebhook(strapi);
  },
};
