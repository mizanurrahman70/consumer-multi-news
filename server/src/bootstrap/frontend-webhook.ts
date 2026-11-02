import type { Core } from '@strapi/strapi';

/*
 * Keeps one webhook that tells the Next.js website to refresh its cache
 * whenever content changes. Configured from env, so every environment
 * (local, staging, production) gets the right URL and secret automatically:
 *
 *   FRONTEND_URL=http://localhost:3000
 *   REVALIDATE_SECRET=<same value as the website's REVALIDATE_SECRET>
 */

const WEBHOOK_NAME = 'Next.js website — refresh cache';

const EVENTS = [
  'entry.create',
  'entry.update',
  'entry.delete',
  'entry.publish',
  'entry.unpublish',
  'media.create',
  'media.update',
  'media.delete',
];

interface StoredWebhook {
  id: string | number;
  name: string;
}

interface WebhookStore {
  findWebhooks(): Promise<StoredWebhook[]>;
  createWebhook(data: Record<string, unknown>): Promise<StoredWebhook>;
  updateWebhook(id: StoredWebhook['id'], data: Record<string, unknown>): Promise<StoredWebhook | null>;
}

interface WebhookRunner {
  update(webhook: StoredWebhook): void;
}

export async function syncFrontendWebhook(strapi: Core.Strapi): Promise<void> {
  const frontendUrl = (process.env.FRONTEND_URL ?? '').replace(/\/+$/, '');
  const secret = process.env.REVALIDATE_SECRET ?? '';
  if (!frontendUrl || !secret) {
    strapi.log.warn('[webhook] FRONTEND_URL or REVALIDATE_SECRET not set — the website will not refresh instantly.');
    return;
  }

  const store = strapi.get('webhookStore') as WebhookStore;
  const data = {
    name: WEBHOOK_NAME,
    url: `${frontendUrl}/api/revalidate`,
    headers: { 'x-revalidate-secret': secret },
    events: EVENTS,
    isEnabled: true,
  };

  const existing = (await store.findWebhooks()).find((webhook) => webhook.name === WEBHOOK_NAME);
  const webhook = existing ? await store.updateWebhook(existing.id, data) : await store.createWebhook(data);

  // Register it with the running dispatcher so it works without a restart.
  if (webhook) (strapi.get('webhookRunner') as WebhookRunner).update(webhook);
  strapi.log.info(`[webhook] Website refresh webhook → ${data.url}`);
}
