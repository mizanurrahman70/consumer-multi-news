# Multiply News — Website (Next.js + Tailwind CSS + Strapi)

The Multiply News website: Next.js 16 (App Router, Cache Components), React 19,
TypeScript and Tailwind CSS v4. All content comes from the Strapi CMS in [`../server`](../server).

## Getting started

```bash
# 1. Start Strapi (separate terminal)
cd ../server && npm run develop          # http://localhost:1337/admin

# 2. First time only: create the website's read-only API token
cd ../server && npm run website:token    # writes STRAPI_URL, STRAPI_API_TOKEN, REVALIDATE_SECRET to .env.local

# 3. Start the website
npm install
npm run dev                              # http://localhost:3000
```

Production: `npm run build && npm start`. See `.env.example` for every variable.
Without `STRAPI_URL` (or when Strapi is down) the site renders the bundled fallback
content from `src/data/fallback/`, so it never shows a blank page.

## How content flows

```
Strapi entry saved ──► Strapi webhook ──► POST /api/revalidate ──► cache tag expired
                                                                       │
Home page (server)  loadHome() ──► HTML already contains every section (SEO, no loading flash)
                          │
                          ▼  first data for SWR (HomeDataProvider)
features/<name>/Section.tsx ── useSection("<name>") ── useHome() ──► GET /api/home (1 request, every minute)
                                                                       └► api/server/home.ts → api/server/sections/*.ts
                                                                          └► service ("use cache" + tag) → lib/strapi
```

- **`src/api/`** holds every data call:
  - `api/client/types.ts`: the data type of each section; `api/client/home.ts`: `fetchHome()` for the browser.
  - `api/server/sections/<name>.ts`: one loader per section (server-only, reads Strapi via services).
  - `api/server/home.ts`: `loadHome()` runs all loaders in parallel; used by the page and by `/api/home`.
- **`src/hooks/useHome.ts` / `useSection.ts`**: one SWR request shared by all sections;
  `useSection("tip")` returns just that part. Refreshes every minute (also catches going live).
- **`src/features/<name>/`**: UI only (components + `index.ts`).
- Heavy embeds (Facebook Page Plugin, Instagram) mount only when the reader scrolls near them (`LazyMount`).
- Ads stay server-rendered and are passed into sections as props (`inFeedAd`, `ad`).
- Header, footer, metadata and CMS pages (`/[slug]`) are rendered on the server.

To add a section: add its type to `api/client/types.ts`, a loader in `api/server/sections/`,
include it in `api/server/home.ts`, then build the UI in `features/<name>/` with `useSection`.

- **Services** (`src/services/`) are the only place components get data. Each is cached with
  `"use cache"`, `cacheLife` and a tag from `src/lib/cache-tags.ts`.
- **Mappers** (`src/lib/strapi/mappers/`) convert Strapi responses into the site's own types
  (`src/types/`), filling empty fields with sensible defaults. Components never see Strapi shapes.
- **Webhook**: Strapi creates it automatically from `FRONTEND_URL` + `REVALIDATE_SECRET` in
  `../server/.env`. `MODEL_TAGS` maps each Strapi content type to the tags it refreshes.

| Strapi content | Where it shows |
|---|---|
| Site Settings | Top bar, header logo, footer, default SEO, Organization JSON-LD |
| Navigation | Header menu, mobile drawer, footer columns |
| Home Page | Hero, Trending, every section title/link, Facebook/Instagram/tip cards, footer banner, home SEO |
| Video | Latest Videos grid (pinned first, then newest) |
| Ticker Item | BREAKING strip (falls back to latest video titles) |
| Live Stream | Red LIVE block above the hero while `isLive` is on |
| Facebook Video / Instagram Post | Reels row / Instagram grid |
| Ad Settings | Every ad slot (on/off, AdSense ids) and the AdSense script |
| Page | `/about-us`, `/privacy-policy`, … (`src/app/[slug]`) and the sitemap |

## Project structure

```
src/
  app/                 layout, home, [slug] pages, sitemap, robots, error/404,
                       /api/revalidate, /api/home
  api/client/          section types + fetchHome() (browser)
  api/server/          loadHome() + one loader per section (server-only)
  hooks/               useHome, useSection, useInView, useIsClient…
  features/            UI only, one folder per home-page section: ticker, live, featured-video,
                       trending-videos, latest-videos, facebook-reels, facebook-page, instagram, tip
  components/
    ui/                primitives: Button(Group), Container, SectionHeader, CmsImage, CtaCardContent, icons…
    layout/            TopBar, Header, MobileNav, Footer, FooterBanner, Logo
    video/             VideoCard, YouTubeEmbed, site-wide VideoPlayerProvider/modal
    ads/               AdSlot (CMS-controlled), AnchorAd
    cms/ seo/          RichText (Strapi Blocks), JsonLd
  config/              env, ad slot sizes, section anchors
  data/fallback/       content used when Strapi is unreachable
  lib/strapi/          server-only client, queries, raw types, mappers
  lib/seo/ lib/utils/  metadata builders, formatting, link/embed helpers
  services/            cached data functions
  types/               content.ts (videos, social) and cms.ts (settings, home, SEO…)
```

## Conventions

- **Design tokens live only in `src/app/globals.css`** (`@theme`). Don't hard-code hex values.
  When adding a font-size token, also add it to `src/lib/utils/cn.ts`.
- Server Components by default; `"use client"` only for interactivity.
- Time-based text renders in the browser only (`useIsClient`), so cached HTML is never stale.
- Keep every file under 350 lines; move reusable logic into `lib/utils` or `hooks`.
