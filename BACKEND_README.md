# Multiply News — Backend Requirements

> **Superseded:** the project now uses **Strapi** (`server/`) instead of a custom backend.
> See [STRAPI_PLAN.md](STRAPI_PLAN.md) and [client/README.md](client/README.md). This file is kept for reference only.

This document specifies everything the backend must provide so the Next.js
frontend in [`client/`](client/) becomes fully dynamic. The frontend already
consumes these exact endpoints. Until the backend exists, it renders bundled
fallback content from `client/src/data/fallback/`.

> **Source of truth for shapes:** `client/src/types/content.ts`.
> If a field changes here, change it there too (and vice versa).

---

## 1. How the frontend talks to the backend

| Topic | Rule |
| --- | --- |
| Caller | **Only the Next.js server** calls the API (Server Components). Browsers never call it directly, so CORS is not required for the public endpoints. |
| Base URL | Set in the frontend as `API_BASE_URL`, e.g. `https://api.multiplynews.com/api/v1`. All paths below are relative to it. |
| Method | Public content endpoints are `GET`, no auth, JSON only. |
| Timeout | The frontend aborts after `API_TIMEOUT_MS` (default **5000 ms**). Keep p95 latency well under 1 s. |
| Failure handling | Any non-2xx status, timeout, invalid JSON or `success: false` makes the frontend silently use its fallback content. **An empty list (`[]`) also triggers the fallback.** |
| Caching | The frontend caches every response (minutes for videos/ticker, hours for settings/social) and refreshes on demand when the backend calls the revalidate webhook (§5). |

### 1.1 Response envelope (all endpoints)

```json
{ "success": true, "data": <payload>, "message": "optional" }
```

Errors:

```json
{ "success": false, "data": null, "message": "Human readable reason" }
```

### 1.2 Field conventions

- JSON keys are **camelCase**.
- Dates are **ISO-8601 UTC** strings (`"2026-10-26T15:17:40Z"`), or `null`.
- IDs are **strings** (UUID or stringified integers, your choice).
- Lists accept `?limit=<n>` (default and max are listed per endpoint) and return items **already sorted** in display order.
- Text is UTF-8 and can contain Bangla. Return titles **as stored**; do not HTML-escape (React escapes on render).

---

## 2. Public endpoints

### 2.1 `GET /settings` — site settings

Used by the top bar, header, footer, tip section and page metadata.
Missing fields fall back to defaults, but send the full object.

```json
{
  "success": true,
  "data": {
    "name": "Multiply News",
    "tagline": "Consumer news portal, Bangladesh",
    "description": "Consumer-focused news portal from Bangladesh: consumer rights, market watch and enforcement drives.",
    "instagramHandle": "@multiply_news",
    "contact": {
      "addressLines": ["383 Moghbazar, Razzak Plaza", "Dhaka 1217, Bangladesh"],
      "phoneDisplay": "01315-668822",
      "phoneE164": "+8801315668822"
    },
    "social": {
      "facebook": "https://www.facebook.com/multiplynews",
      "facebookReels": "https://www.facebook.com/multiplynews/reels/",
      "messenger": "https://m.me/multiplynews",
      "youtube": "https://www.youtube.com/@Multiply_News",
      "youtubeSubscribe": "https://www.youtube.com/@Multiply_News?sub_confirmation=1",
      "youtubeVideos": "https://www.youtube.com/@Multiply_News/videos",
      "youtubeShorts": "https://www.youtube.com/@Multiply_News/shorts",
      "youtubeLive": "https://www.youtube.com/@Multiply_News/streams",
      "instagram": "https://www.instagram.com/multiply_news/"
    }
  }
}
```

Validation: all `social.*` values must be absolute `https://` URLs; `phoneE164` must match `^\+[1-9]\d{6,14}$`.

### 2.2 `GET /videos/featured` — hero video ⭐

The big video at the top of the home page. **Chosen by an editor** in the admin
panel. If no video is featured, fall back to the newest published video.

```json
{
  "success": true,
  "data": {
    "video": {
      "id": "b2f1c9e0-…",
      "youtubeId": "DK_KlOVJ9hE",
      "title": "ভ/য়ং/কর এক আইসক্রিম ফ্যাক্টরির স'ন্ধান পেল বিএসটিআই! | Multiply News | BSTI",
      "publishedAt": "2026-10-26T15:17:40Z",
      "viewCount": 6432,
      "thumbnailUrl": null
    },
    "kicker": "Latest on YouTube",
    "meta": "Multiply News · YouTube"
  }
}
```

**`Video` object (used by every video endpoint):**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | ✅ | Backend primary key. Must be unique within a list. |
| `youtubeId` | string | ✅ | Exactly 11 chars, `^[A-Za-z0-9_-]{11}$`. Used for thumbnails and embeds. |
| `title` | string | ✅ | 1–200 chars. |
| `publishedAt` | string \| null | ✅ | ISO-8601. Drives "3 days ago". |
| `viewCount` | number \| null | ✅ | Integer ≥ 0. Drives "6.4K views". `null` hides it. |
| `thumbnailUrl` | string \| null | optional | Custom thumbnail. When `null`, YouTube's thumbnail is used. **If you serve custom thumbnails, give the frontend team the image host** so it can be added to `images.remotePatterns` in `next.config.ts`. |

### 2.3 `GET /videos/trending?limit=5` — "Trending Now" list

Default `limit` 5, max 10. Returns `Video[]`. Rank by editor-pinned order
first, then by views in the last 7 days (or another ranking you choose).
**Exclude the currently featured video.**

### 2.4 `GET /videos/latest?limit=12` — "Latest Videos" grid

Default `limit` 12, max 50. Returns `Video[]` of published videos, newest
first. Editor-pinned videos may be placed first (the original site did this).
Hidden/unpublished videos must never appear.

### 2.5 `GET /ticker?limit=8` — "BREAKING" headline strip

Default `limit` 8, max 20.

```json
{
  "success": true,
  "data": [
    { "id": "t1", "text": "অ-বৈধ মশার কয়েল ফ্যাক্টরিতে অ-ভিযানে বিএসটিআই!", "href": null },
    { "id": "t2", "text": "Market prices update", "href": "https://www.youtube.com/watch?v=VaLh9YnbugM" }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Unique. |
| `text` | string | 1–200 chars. The frontend adds the "●" bullet itself. |
| `href` | string \| null | Optional absolute URL; `null` = plain text. |

Recommended: editors can create manual headlines. If there are none active, return
the titles of the latest videos (this is what the frontend fallback does).
Only return items whose schedule window (`startsAt`/`endsAt`) includes now.

### 2.6 `GET /social/facebook-videos?limit=6` — "Facebook Reels & Videos"

Default `limit` 6, max 12.

```json
{
  "success": true,
  "data": [
    { "id": "fb-1", "url": "https://www.facebook.com/reel/1778868333373229/", "title": "Multiply News Facebook video 1" }
  ]
}
```

`url` must be a **public** Facebook reel or video URL
(`https://www.facebook.com/reel/{id}/` or `https://www.facebook.com/{page}/videos/{id}/`).
The frontend builds the official embed itself. `title` is used as the iframe's
accessible title.

### 2.7 `GET /social/instagram-posts?limit=6` — "On Instagram"

Default `limit` 6, max 12.

```json
{
  "success": true,
  "data": [
    { "id": "ig-1", "shortcode": "DemZvOtkuOr", "kind": "reel" },
    { "id": "ig-2", "shortcode": "CxYz123AbCd", "kind": "post" }
  ]
}
```

| Field | Type | Notes |
| --- | --- | --- |
| `shortcode` | string | The code in `instagram.com/reel/{shortcode}/` or `/p/{shortcode}/`. `^[A-Za-z0-9_-]+$` |
| `kind` | `"reel"` \| `"post"` | Decides `/reel/` vs `/p/` in the permalink. |

Tip for the admin panel: let editors paste the full Instagram URL and extract the
shortcode and kind on the server.

---

## 3. Data model (suggested)

Any SQL or document database works. Suggested tables:

```
site_settings      (singleton row)
  id, name, tagline, description, instagram_handle,
  address_lines (json/text[]), phone_display, phone_e164,
  social (json: keys from §2.1), updated_at, updated_by

videos
  id (pk), youtube_id (unique), title, description, published_at,
  view_count, thumbnail_url (nullable),
  status ('published' | 'hidden'),
  is_featured (bool, at most ONE true — enforce with a partial unique index),
  featured_kicker, featured_meta,
  pin_order (nullable int — editor ordering for trending/latest),
  source ('youtube_sync' | 'manual'),
  synced_at, created_at, updated_at

ticker_items
  id, text, href (nullable), sort_order, is_active,
  starts_at (nullable), ends_at (nullable), created_at, updated_at

facebook_videos
  id, url (unique), title, sort_order, is_active, created_at, updated_at

instagram_posts
  id, shortcode (unique), kind ('reel' | 'post'), sort_order, is_active,
  created_at, updated_at

admin_users
  id, name, email (unique), password_hash, role ('admin' | 'editor'),
  is_active, last_login_at, created_at

audit_log (recommended)
  id, user_id, action, entity, entity_id, diff (json), created_at
```

---

## 4. YouTube sync job

The old static site fetched the YouTube RSS feed in the browser through public
CORS proxies. **That is now the backend's job.**

- Channel ID: `UC5Y6QjanSdLHvkST2PnmSYA`
- Run every **10–15 minutes** (cron/queue worker).
- Source options:
  1. **YouTube Data API v3** (recommended): `search.list`/`playlistItems.list` on the uploads playlist `UU5Y6QjanSdLHvkST2PnmSYA`, then `videos.list?part=snippet,statistics` for titles and view counts. Needs a `YOUTUBE_API_KEY` and quota awareness (~10,000 units/day).
  2. **RSS feed** (no key): `https://www.youtube.com/feeds/videos.xml?channel_id=UC5Y6QjanSdLHvkST2PnmSYA`. Gives the latest 15 uploads with `media:statistics views`.
- Upsert by `youtube_id`. **Never overwrite** editor-controlled fields (`status`, `is_featured`, `pin_order`, `featured_*`, a manually edited `title`, custom `thumbnail_url`).
- After a sync that inserts or changes rows, call the revalidate webhook with tags `latest-videos`, `trending`, `ticker` (and `featured` if the featured video changed).

---

## 5. Cache revalidation webhook (backend → frontend)

The frontend caches content. When an admin saves something, or the sync job
changes data, the backend **must** tell the frontend which content changed:

```
POST {FRONTEND_URL}/api/revalidate
Content-Type: application/json
x-revalidate-secret: {REVALIDATE_SECRET}

{ "tags": ["featured", "trending"] }      // or { "all": true }
```

Responses: `200 {"success":true,"data":{"revalidated":[…]}}`, `401` with a bad
secret, `400` with unknown or missing tags.

| Tag | Send when this changes |
| --- | --- |
| `settings` | site_settings |
| `featured` | which video is featured, or that video's title/thumbnail/kicker/meta |
| `trending` | pin order, status, or a title of a trending video |
| `latest-videos` | any video inserted, hidden, re-ordered or edited |
| `ticker` | ticker_items (and video titles, if the ticker falls back to them) |
| `facebook-videos` | facebook_videos |
| `instagram-posts` | instagram_posts |

Implementation notes:
- `REVALIDATE_SECRET` is a long random string (≥ 32 chars), shared through both apps' env vars. Never log it.
- Fire the webhook **after** the DB transaction commits; retry 3× with backoff on failure; don't block the admin's save response on it.
- Even without the webhook, content refreshes on its own within minutes (videos/ticker) or hours (settings/social).

---

## 6. Admin API (for the admin panel)

Protected endpoints, e.g. under `/admin/*`. Required:

- **Auth:** `POST /admin/auth/login` → short-lived access token (JWT, 15 min) + refresh token in an `httpOnly`, `Secure`, `SameSite=Strict` cookie; `POST /admin/auth/refresh`; `POST /admin/auth/logout`. Hash passwords with bcrypt or argon2. Rate-limit login (e.g. 5 attempts / 15 min / IP).
- **Roles:** `admin` (everything, including users and settings), `editor` (content only).
- **CRUD:**
  - Settings: `GET` / `PUT /admin/settings`
  - Videos: `GET /admin/videos` (search, filter, paginate), `POST` (add by YouTube URL/ID; fetch title via oEmbed `https://www.youtube.com/oembed?format=json&url=…`), `PATCH /admin/videos/:id` (title, status, thumbnail, pin_order), `POST /admin/videos/:id/feature` (sets is_featured, kicker, meta; unsets the previous one in the same transaction), `DELETE`
  - Ticker: `GET` / `POST /admin/ticker`, `PATCH` / `DELETE /admin/ticker/:id`, `PUT /admin/ticker/order`
  - Facebook videos and Instagram posts: same CRUD + `PUT …/order` pattern
  - `POST /admin/sync/youtube`: trigger a sync manually
  - `POST /admin/cache/revalidate`: lets the admin force `{ "all": true }`
- Validate every input with a schema (zod / Joi / class-validator) using the rules in §2.
- Each successful write must trigger the matching revalidate tags (§5).
- CORS for `/admin/*`: allow only the admin panel's origin.

---

## 7. Non-functional requirements

- **Security:** HTTPS only; Helmet-style security headers; parameterised queries/ORM; rate-limit public endpoints (e.g. 300 req/min/IP); never expose stack traces in error responses.
- **Performance:** index `videos(status, published_at desc)`, `videos(is_featured)`, `videos(pin_order)`, and each list table on `(is_active, sort_order)`. Public responses can send `Cache-Control: public, max-age=60`.
- **Observability:** structured request logs, error tracking (e.g. Sentry), and a health check at `GET /health` → `{ "status": "ok" }`.
- **Versioning:** keep everything under `/api/v1`. Breaking changes go to `/api/v2`.

---

## 8. Backend environment variables (suggested)

```
PORT=4000
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=UC5Y6QjanSdLHvkST2PnmSYA
FRONTEND_URL=https://multiplynews.com
REVALIDATE_SECRET=                # same value as the frontend's REVALIDATE_SECRET
ADMIN_ORIGIN=https://admin.multiplynews.com
```

## 9. Frontend environment variables (already implemented)

| Variable | Purpose |
| --- | --- |
| `API_BASE_URL` | Backend base URL incl. `/api/v1`. Empty → fallback content. |
| `API_TIMEOUT_MS` | Backend request timeout (default 5000). |
| `REVALIDATE_SECRET` | Must equal the backend's value. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (metadata). |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id; slot ids go in `client/src/config/ads.ts`. |

---

## 10. Acceptance checklist

- [ ] All 7 public endpoints return the envelope and shapes above (check them against `client/src/types/content.ts`).
- [ ] Setting `API_BASE_URL` in `client/.env.local` makes the home page show backend data instead of fallback data.
- [ ] Featuring a video in the admin panel changes the hero within seconds (webhook works).
- [ ] Hiding a video removes it from featured, trending, latest and ticker.
- [ ] The YouTube sync adds a new upload within 15 minutes, without overwriting editor edits.
- [ ] Wrong `x-revalidate-secret` → 401. Unknown tag → 400.
- [ ] Admin endpoints reject missing, expired or editor-role tokens where appropriate.
- [ ] Out of scope for v1 but planned: About / Advertise / Privacy / Contact pages (footer links are placeholders) and ad-slot management.
