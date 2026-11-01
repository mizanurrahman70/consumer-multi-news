# Multiply News — Frontend (Next.js + Tailwind CSS)

The Multiply News home page, rebuilt from the static `multiply-news-netlify/index.html`
with Next.js 16 (App Router, Cache Components), React 19, TypeScript and Tailwind CSS v4.

## Getting started

```bash
cp .env.example .env.local   # optional: works without a backend
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
```

Without `API_BASE_URL` the site shows bundled fallback content from `src/data/fallback/`.
The backend contract is in [`../BACKEND_README.md`](../BACKEND_README.md).

## Project structure

```
src/
  app/                 routes: layout, home page, error/404, /api/revalidate
  assets/images/       logos and footer banner (optimized by next/image)
  components/
    ui/                primitives: Button, Container, SectionHeader, icons, Skeleton…
    layout/            TopBar, Header, MobileNav, Footer, FooterBanner, Logo
    home/              one component per home-page section (+ its skeleton)
    video/             VideoCard, YouTubeEmbed, site-wide VideoPlayerProvider/modal
    ads/               AdSlot (placeholder or AdSense), AnchorAd
  config/              env, navigation, ad-slot registry
  data/fallback/       content used until the backend is live
  hooks/               useIsClient, useBodyScrollLock, useEscapeKey, useElementWidth
  lib/api/             server-only fetch client, endpoints, cache tags
  lib/utils/           cn, formatting, YouTube/Facebook/Instagram URL helpers
  services/            cached data functions — the only place the UI gets content from
  types/               content types shared with the backend
```

## Conventions

- **Design tokens live only in `src/app/globals.css`** (`@theme`): colors, border colors,
  radii, shadows, fonts, a semantic type scale (`text-meta`, `text-hero`…), breakpoints and
  animations. Semantic typography utilities: `heading-section`, `heading-side`,
  `heading-card`, `text-kicker-label`, `text-meta-muted`. Do not hard-code hex values in components.
- Server Components by default; `"use client"` only for interactivity (modal, drawer,
  featured player, embeds, anchor ad).
- Data flow: `services/*` (`"use cache"` + `cacheLife` + `cacheTag`) → `lib/api/client.ts` → backend,
  with a fallback to `data/fallback`. Each home section streams in its own `<Suspense>`.
- Time-based text (dates, "3 days ago") renders in the browser only (`useIsClient`), so cached
  HTML never shows stale values.
- Keep every file under 350 lines; move reusable logic into `lib/utils` or `hooks`.

## Ads

Slots are declared in `src/config/ads.ts`. They show sized placeholders until
`NEXT_PUBLIC_ADSENSE_CLIENT` is set **and** the slot has an `adsenseSlotId`.
Update `public/ads.txt` after AdSense approval.
