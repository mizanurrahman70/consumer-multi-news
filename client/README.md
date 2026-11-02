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
browser ◄── page ◄── component ◄── service ("use cache" + tag) ◄── lib/strapi (client + mapper)
```

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
  app/                 layout, home, [slug] pages, sitemap, robots, error/404, /api/revalidate
  components/
    ui/                primitives: Button(Group), Container, SectionHeader, CmsImage, icons…
    layout/            TopBar, Header, MobileNav, Footer, FooterBanner, Logo
    home/              one component per home-page section
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
