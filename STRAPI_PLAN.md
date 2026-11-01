# Multiply News — Strapi CMS Plan

The plan for the Strapi (v5) CMS behind the Next.js frontend in [`client/`](client/).
It lists every **collection type, single type and component** to create, built
from the current home-page design. It also covers SEO, roles, webhooks, and the
first entries to add.

> No code in this document. It describes what to build in the Strapi admin
> (Content-Type Builder) and how to configure it.

---

## 1. Design → Strapi map

Each part of the home page and the Strapi content that drives it:

| # | Design section | Strapi source | Type |
|---|---|---|---|
| 1 | Top bar (date, tagline, social icons) | **Site Settings** | Single type |
| 2 | Header (logo, Subscribe, Facebook icon) | **Site Settings** | Single type |
| 3 | Header menu + mobile drawer | **Navigation** | Single type |
| 4 | Ad slots (leaderboard, rectangle, in-feed, half page, anchor) | **Ad Settings** | Single type |
| 5 | "BREAKING" ticker | **Ticker Item** | Collection |
| 5b | "LIVE" banner above the hero (only while a stream is on) | **Live Stream** (editor pastes the live **YouTube/Facebook link** and switches it on) | Single type |
| 6 | Hero: featured video + kicker + meta | **Home Page** → `hero` (editor pastes a **YouTube link**, auto-embedded) | Single type |
| 7 | "Trending Now" list | **Home Page** → `trendingVideos` (editor pastes up to 5 **YouTube links**, auto-embedded) | Single type |
| 8 | "Latest Videos" grid | **Video** (each entry = a pasted **YouTube link**, auto-embedded) + **Home Page** section heading | Collection |
| 9 | "Facebook Reels & Videos" | **Facebook Video** (each entry = a pasted **Facebook link**, auto-embedded) + **Home Page** section heading | Collection |
| 10 | "From Our Facebook" + follow card | **Home Page** → `facebookBlock` | Single type |
| 11 | "On Instagram" + follow card | **Instagram Post** + **Home Page** → `instagramBlock` | Collection |
| 12 | "Cheated on price…" tip box | **Home Page** → `tipBlock` | Single type |
| 13 | Footer banner "Stay informed…" | **Home Page** → `footerBanner` | Single type |
| 14 | Footer about text, columns, contact, copyright | **Site Settings** + **Navigation** | Single types |
| 15 | Footer pages: About us, Advertise, Privacy, Contact | **Page** | Collection |
| 16 | SEO for every page / video | `shared.seo` component (§4) | Component |

### 1.1 Embed rule (applies to all video content)

**The site shows only what editors enter in Strapi.** There is no automatic
import from YouTube, Facebook or Instagram. To show a video, an editor creates
an entry and **pastes its public link**. The frontend shows it as an embedded
player (iframe) from YouTube, Facebook or Instagram. No video file is ever
uploaded to Strapi.

Where links are pasted:

| Design section | Field | Platform |
|---|---|---|
| Live banner (only while live) | Live Stream → `url` | YouTube or Facebook |
| Hero (featured video) | Home Page → `hero.video.youtubeUrl` | YouTube |
| Trending Now (max 5) | Home Page → `trendingVideos[].youtubeUrl` | YouTube |
| Latest Videos | Video → `youtubeUrl` | YouTube |
| Breaking ticker (optional click target) | Ticker Item → `youtubeUrl` | YouTube |
| Facebook Reels & Videos | Facebook Video → `url` | Facebook |
| On Instagram | Instagram Post → `url` | Instagram |

All YouTube fields use the same component, `embed.youtube-video` (§5), so
link checking and auto-fill work identically everywhere.

| Platform | Editor pastes (any of these) | Shown on the site as |
|---|---|---|
| YouTube | `https://www.youtube.com/watch?v=DK_KlOVJ9hE` · `https://youtu.be/DK_KlOVJ9hE` · `https://www.youtube.com/shorts/DK_KlOVJ9hE` · `https://www.youtube.com/embed/DK_KlOVJ9hE` | YouTube player (`youtube.com/embed/{id}`), thumbnail first, plays on click |
| Facebook | `https://www.facebook.com/reel/1778868333373229/` · `https://www.facebook.com/multiplynews/videos/1149601990904042/` | Facebook video plugin (`facebook.com/plugins/video.php?href={link}`) |
| Instagram | `https://www.instagram.com/reel/DemZvOtkuOr/` · `https://www.instagram.com/p/{code}/` | Instagram official embed |

Rules:
- Editors paste the **normal link** from the browser or the "Share → Copy link" button.
- **Never paste iframe HTML code** (`<iframe …>`). Strapi must reject it: raw HTML could inject scripts into the site. The frontend builds the iframe itself from the link.
- Strapi **checks the link** on save (correct platform and format) and **fills in the hidden ID fields automatically** (YouTube video ID, Instagram shortcode and type). Editors never type IDs.
- For YouTube links, Strapi also fills an empty **title** once, on save, from YouTube's public oEmbed lookup (no API key). This is not a sync: nothing changes afterwards unless the editor edits the entry.
- The link must be **public**. Private, friends-only or deleted posts show an empty player.
- Thumbnails come from the platform automatically. `customThumbnail` is optional.

---

## 2. Single types

### 2.1 Site Settings (`site-setting`)
Global brand and contact data. Draft & Publish: **off**.

| Field | Strapi type | Required | Notes / design use |
|---|---|---|---|
| siteName | Text (short) | ✅ | "Multiply News" — logo alt, copyright, titles |
| tagline | Text (short) | ✅ | Top bar: "Consumer news portal, Bangladesh" |
| description | Text (long) | ✅ | Footer about text, max 300 chars |
| logo | Media (single image) | ✅ | Header logo (PNG, transparent, ~407×189) |
| footerLogo | Media (single image) | ✅ | Footer logo (~440×230) |
| favicon | Media (single image) | | 512×512 PNG |
| instagramHandle | Text (short) | ✅ | "@multiply_news" |
| contact | Component `shared.contact` | ✅ | Footer contact column |
| social | Component `shared.social-links` | ✅ | All social URLs |
| copyrightText | Text (short) | | "All rights reserved." |
| developerCredit | Component `shared.link` | | "Developed by Traideas" |
| defaultSeo | Component `shared.seo` | ✅ | Fallback SEO for every page (§4) |
| organizationSchema | Component `seo.organization` | ✅ | Structured data for Google (§4.4) |

### 2.2 Home Page (`home-page`)
Everything the editor controls on the home page. Draft & Publish: **on** (lets editors prepare changes).

| Field | Strapi type | Required | Notes / design use |
|---|---|---|---|
| seo | Component `shared.seo` | ✅ | Home page title/description/OG image |
| hero | Component `home.hero` | ✅ | Featured video block: editor pastes a YouTube link; the site shows its thumbnail and plays the embedded YouTube player on click (§1.1) |
| trendingTitle | Text (short) | ✅ | "Trending Now" |
| trendingVideos | Component `embed.youtube-video` (repeatable) | ✅ | Editor pastes up to **5 YouTube links**; order = drag order in admin. Each opens in the embedded player |
| latestSection | Component `shared.section-heading` | ✅ | "Latest Videos" + "All videos on YouTube →" |
| latestLimit | Number (integer) | ✅ | Default 12, min 3, max 30 |
| reelsSection | Component `shared.section-heading` | ✅ | "Facebook Reels & Videos" + "More reels →" |
| facebookSection | Component `shared.section-heading` | ✅ | "From Our Facebook" + "Follow on Facebook →" |
| facebookBlock | Component `home.cta-card` | ✅ | "Watch reports first on Facebook" card |
| instagramSection | Component `shared.section-heading` | ✅ | "On Instagram" + "Follow on Instagram →" |
| instagramBlock | Component `home.cta-card` | ✅ | "Short news reels, every day" card |
| tipBlock | Component `home.cta-card` | ✅ | "Cheated on price, weight or quality?" |
| footerBanner | Component `home.footer-banner` | ✅ | "Stay informed. Know your rights." |

### 2.3 Navigation (`navigation`)
Draft & Publish: **off**.

| Field | Strapi type | Notes |
|---|---|---|
| headerMenu | Component `shared.link` (repeatable) | Home, Latest Videos, Reels, Facebook, Instagram, Live, Send a Tip |
| drawerMenu | Component `shared.link` (repeatable) | Same plus "Shorts" |
| footerColumns | Component `nav.footer-column` (repeatable) | Watch / Company / Follow |

### 2.4 Ad Settings (`ad-setting`)
Draft & Publish: **off**. Lets the team switch ads on without a deploy.

| Field | Strapi type | Notes |
|---|---|---|
| adsEnabled | Boolean | Master switch. Off = no ads and no placeholders |
| adsenseClientId | Text (short) | `ca-pub-…`. Regex `^ca-pub-\d{16}$` |
| slots | Component `ads.ad-slot` (repeatable) | One entry per slot (§6.8) |

### 2.5 Live Stream (`live-stream`)
Draft & Publish: **off**. The editor switches it on when Multiply News goes
live and off when the stream ends.

| Field | Strapi type | Required | Notes |
|---|---|---|---|
| isLive | Boolean | ✅ | Default **false**. When true, a red "LIVE" block with the embedded player appears above the hero |
| url | Text (short) | ✅ when live | The live link the editor pastes: YouTube (`youtube.com/watch?v=…`, `youtube.com/live/…`, `youtu.be/…`) or Facebook (`facebook.com/{page}/videos/…`) |
| platform | Enumeration: `youtube`, `facebook` | auto | **Filled automatically** from `url` |
| title | Text (short) | ✅ when live | e.g. "LIVE: Market price drive in Karwan Bazar" |

After the stream ends, the editor can also add the recording as a normal
**Video** entry (YouTube) or **Facebook Video** entry.

---

## 3. Collection types

### 3.1 Video (`video`) ⭐ core content
Draft & Publish: **on** (unpublished = hidden everywhere).

| Field | Strapi type | Required | Notes |
|---|---|---|---|
| youtubeUrl | Text (short) | ✅ | **The link the editor pastes** (any format in §1.1). Unique |
| youtubeId | Text (short) | auto | **Filled automatically** from `youtubeUrl`, read-only for editors. Unique, `^[A-Za-z0-9_-]{11}$`. Used to build the embed |
| title | Text (short) | ✅ | Max 200, Bangla allowed. Auto-filled from YouTube when left empty |
| slug | UID (from title) | ✅ | For a future `/videos/[slug]` page and the sitemap |
| description | Rich text (Blocks) | | Video summary; also used for SEO |
| publishedDate | Datetime | ✅ | Default: now. Sets the order of "Latest Videos" (newest first) and shows "3 days ago" |
| customThumbnail | Media (single image) | | Optional; otherwise the YouTube thumbnail is used |
| category | Relation: many-to-one **Category** | | Consumer rights / Market watch / Enforcement |
| tags | Relation: many-to-many **Tag** | | Optional, for search and SEO |
| isPinned | Boolean | | Pinned videos show first in "Latest Videos" |
| pinOrder | Number (integer) | | Lower = earlier |
| seo | Component `shared.seo` | | Per-video SEO (future video page) |

View counts are not stored: they would need an automatic YouTube sync. Video
cards show only "3 days ago".

### 3.2 Ticker Item (`ticker-item`)
Draft & Publish: **on**.

| Field | Strapi type | Required | Notes |
|---|---|---|---|
| text | Text (short) | ✅ | Max 200. The "●" bullet is added by the frontend |
| link | Text (short) | | Absolute URL, optional |
| youtubeUrl | Text (short) | | Optional pasted YouTube link: clicking the headline plays it in the embedded player. Use this **or** `link`, not both |
| order | Number (integer) | ✅ | Display order |
| startsAt | Datetime | | Show from |
| endsAt | Datetime | | Show until |

If no ticker item is active, the frontend uses the latest video titles.

### 3.3 Facebook Video (`facebook-video`)
Draft & Publish: **on**.

| Field | Strapi type | Required | Notes |
|---|---|---|---|
| url | Text (short) | ✅ | **The link the editor pastes.** Unique. Must be a public `facebook.com/reel/…` or `facebook.com/{page}/videos/…` link. Embedded with Facebook's video plugin |
| title | Text (short) | ✅ | Short description, used as the player's accessible title |
| order | Number (integer) | ✅ | Display order (max 6 shown) |

### 3.4 Instagram Post (`instagram-post`)
Draft & Publish: **on**.

| Field | Strapi type | Required | Notes |
|---|---|---|---|
| url | Text (short) | ✅ | **The link the editor pastes** (`instagram.com/reel/…` or `instagram.com/p/…`). Unique |
| shortcode | Text (short) | auto | **Filled automatically** from `url`, read-only. `^[A-Za-z0-9_-]+$` |
| kind | Enumeration: `reel`, `post` | auto | **Filled automatically** from `url` (`/reel/` → reel, `/p/` → post) |
| order | Number (integer) | ✅ | Display order (max 6 shown) |

### 3.5 Category (`category`)
Draft & Publish: **off**. Gives meaning to "Consumer rights · Market watch · Enforcement drives".

| Field | Strapi type | Required |
|---|---|---|
| name | Text (short) | ✅ |
| slug | UID (from name) | ✅ |
| description | Text (long) | |
| seo | Component `shared.seo` | |

### 3.6 Tag (`tag`) — optional
`name` (Text, unique), `slug` (UID).

### 3.7 Page (`page`)
For the footer "Company" links. Draft & Publish: **on**.

| Field | Strapi type | Required | Notes |
|---|---|---|---|
| title | Text (short) | ✅ | |
| slug | UID (from title) | ✅ | `about-us`, `advertise`, `privacy-policy`, `contact` |
| content | Rich text (Blocks) | ✅ | Page body |
| seo | Component `shared.seo` | ✅ | |

---

## 4. SEO plan

### 4.1 Component `shared.seo`
Attach it to Home Page, Video, Category, Page, and Site Settings (as `defaultSeo`).

| Field | Strapi type | Required | Rule |
|---|---|---|---|
| metaTitle | Text (short) | ✅ | Max **60** chars |
| metaDescription | Text (long) | ✅ | **50–160** chars |
| metaImage | Media (single image) | | OG/share image, **1200×630**, < 1 MB |
| keywords | Text (long) | | Comma separated |
| metaRobots | Enumeration: `index,follow`, `noindex,follow`, `noindex,nofollow` | ✅ | Default `index,follow` |
| canonicalURL | Text (short) | | Only when the content also lives elsewhere |
| structuredData | JSON | | Extra JSON-LD override (advanced) |
| openGraph | Component `seo.open-graph` | | Optional overrides for social sharing |

### 4.2 Component `seo.open-graph`
`ogTitle` (Text, max 70), `ogDescription` (Text, max 200), `ogImage` (Media),
`ogType` (Enumeration: `website`, `article`, `video.other`).

### 4.3 Fallback order (frontend rule)
1. The entry's own `seo` →
2. Generated from the entry (video title, description, thumbnail) →
3. `Site Settings.defaultSeo`.

### 4.4 Component `seo.organization` (structured data)
`name`, `url`, `logo` (Media), `sameAs` (Component `shared.link`, repeatable: Facebook / YouTube / Instagram).
The frontend turns this into **NewsMediaOrganization** JSON-LD. Each Video becomes **VideoObject** JSON-LD (name, description, thumbnailUrl, uploadDate, embedUrl).

### 4.5 Other SEO work
- **Sitemap:** the frontend generates `sitemap.xml` from Pages, Categories and Videos (slug + `updatedAt`).
- **robots.txt:** stays in the frontend; honours `metaRobots`.
- **Language:** content is Bangla (`lang="bn"`). Keep the Strapi i18n plugin **off** for v1. Turn it on later if an English version is needed.
- **Media:** fill in the **Alternative text** on every upload (Media Library). Required for logos and OG images.

---

## 5. Components (create these first)

| Component | Fields |
|---|---|
| `shared.link` | label (Text ✅), url (Text ✅), isExternal (Boolean, default false) |
| `shared.button` | label (Text ✅), url (Text ✅), variant (Enumeration: `yellow`, `dark`, `red`, `light`), isExternal (Boolean, default true) |
| `shared.section-heading` | title (Text ✅), linkLabel (Text), linkUrl (Text) |
| `shared.contact` | addressLines (Text long, one line per row ✅), phoneDisplay (Text ✅), phoneE164 (Text ✅, regex `^\+[1-9]\d{6,14}$`), email (Email) |
| `shared.social-links` | facebook, facebookReels, messenger, youtube, youtubeSubscribe, youtubeVideos, youtubeShorts, youtubeLive, instagram — all Text, absolute `https://` URLs |
| `shared.seo` | see §4.1 |
| `seo.open-graph` | see §4.2 |
| `seo.organization` | see §4.4 |
| `embed.youtube-video` | youtubeUrl (Text ✅, **the YouTube link the editor pastes**, any format in §1.1), youtubeId (Text, **auto-filled** from the link, read-only), title (Text, auto-filled from YouTube when empty, editable), customThumbnail (Media, optional). Used by `home.hero` and `trendingVideos` |
| `home.hero` | video (Component `embed.youtube-video` ✅), kicker (Text, "Latest on YouTube"), meta (Text, "Multiply News · YouTube") |
| `home.cta-card` | eyebrow (Text, e.g. "@multiply_news"), title (Text ✅), text (Text long), buttons (`shared.button`, repeatable, max 2) |
| `home.footer-banner` | title (Text ✅), backgroundImage (Media ✅, 1400×614), buttons (`shared.button`, repeatable, max 3) |
| `nav.footer-column` | title (Text ✅), links (`shared.link`, repeatable) |
| `ads.ad-slot` | slotKey (Enumeration: `topLeaderboard`, `heroRectangle`, `videoInFeed`, `midLeaderboard`, `reelsLeaderboard`, `facebookHalfPage`, `instagramRectangle`, `mobileAnchor` ✅), adsenseSlotId (Text), enabled (Boolean) |

> Recommended build order: components → Category/Tag → Video → other collections → single types.

---

## 6. First entries to add

These match the content the site shows today (`client/src/data/fallback/`).

### 6.1 Site Settings
- siteName: **Multiply News**
- tagline: **Consumer news portal, Bangladesh**
- description: **Consumer-focused news portal from Bangladesh: consumer rights, market watch and enforcement drives.**
- instagramHandle: **@multiply_news**
- logo / footerLogo: upload `client/src/assets/images/logo.png` and `logo-footer.jpg`
- contact: `383 Moghbazar, Razzak Plaza` / `Dhaka 1217, Bangladesh`, phone **01315-668822**, E.164 **+8801315668822**
- social:
  - facebook `https://www.facebook.com/multiplynews`
  - facebookReels `https://www.facebook.com/multiplynews/reels/`
  - messenger `https://m.me/multiplynews`
  - youtube `https://www.youtube.com/@Multiply_News`
  - youtubeSubscribe `https://www.youtube.com/@Multiply_News?sub_confirmation=1`
  - youtubeVideos `…/@Multiply_News/videos`, youtubeShorts `…/shorts`, youtubeLive `…/streams`
  - instagram `https://www.instagram.com/multiply_news/`
- defaultSeo: title **Multiply News — Consumer News Portal, Bangladesh**; description **Consumer-focused news portal from Bangladesh: consumer rights, market watch, enforcement drives and video reports.**

### 6.2 Categories
Consumer Rights · Market Watch · Enforcement Drives

### 6.3 Videos (11) — paste these links into `youtubeUrl`
| youtubeUrl | Category | Pinned |
|---|---|---|
| https://www.youtube.com/watch?v=DK_KlOVJ9hE | Enforcement Drives | ✅ 1 |
| https://www.youtube.com/watch?v=vD2oeEjQ-I4 | Enforcement Drives | ✅ 2 |
| https://www.youtube.com/watch?v=iW59_Bzkq-g | Consumer Rights | ✅ 3 |
| https://www.youtube.com/watch?v=lQf0Bmdlud0 | Consumer Rights | ✅ 4 |
| https://www.youtube.com/watch?v=X67XKAgwpxI | Consumer Rights | ✅ 5 |
| https://www.youtube.com/watch?v=9MgS4tn54fQ | Consumer Rights | ✅ 6 |
| https://www.youtube.com/watch?v=hkBu0OZq-E8 | Enforcement Drives | |
| https://www.youtube.com/watch?v=VaLh9YnbugM | Enforcement Drives | |
| https://www.youtube.com/watch?v=x4nsw_yHNcs | Market Watch | |
| https://www.youtube.com/watch?v=JqKq5Ac3HZM | Enforcement Drives | |
| https://www.youtube.com/watch?v=wHIIVgaDkuQ | Enforcement Drives | |

Titles fill in automatically from YouTube when left empty. Set `publishedDate` to the YouTube upload date; titles and dates are also listed in `client/src/data/fallback/videos.ts`.

### 6.3b Live Stream
isLive **false** (switch on only during a live broadcast).

### 6.4 Home Page
- hero → video → youtubeUrl **https://www.youtube.com/watch?v=DK_KlOVJ9hE** (title fills in automatically), kicker **Latest on YouTube**, meta **Multiply News · YouTube**
- trendingTitle **Trending Now**; trendingVideos (paste in this order):
  1. https://www.youtube.com/watch?v=vD2oeEjQ-I4
  2. https://www.youtube.com/watch?v=iW59_Bzkq-g
  3. https://www.youtube.com/watch?v=lQf0Bmdlud0
  4. https://www.youtube.com/watch?v=X67XKAgwpxI
  5. https://www.youtube.com/watch?v=9MgS4tn54fQ
- latestSection: **Latest Videos** / **All videos on YouTube** → youtubeVideos URL; latestLimit **12**
- reelsSection: **Facebook Reels & Videos** / **More reels** → facebookReels URL
- facebookSection: **From Our Facebook** / **Follow on Facebook**
- facebookBlock: **Watch reports first on Facebook** — "Live videos, reels and on-the-spot coverage of consumer rights drives and market prices." Buttons: *Follow page* (red), *Subscribe on YouTube* (light)
- instagramSection: **On Instagram** / **Follow on Instagram**
- instagramBlock: eyebrow **@multiply_news**, **Short news reels, every day** — "Quick reels from the field and behind-the-scenes coverage." Button: *Follow on Instagram* (dark)
- tipBlock: **Cheated on price, weight or quality?** — "Send us your consumer complaint or news tip. Our team may follow up and cover it." Button: *Send a tip on Messenger* (dark) → messenger URL
- footerBanner: **Stay informed. Know your rights.**, image `footer-banner.jpg`, buttons YouTube (yellow), Facebook (light), Instagram (dark)

### 6.5 Ticker Items
Leave empty at first (the latest video titles are used automatically), or add real breaking headlines.

### 6.6 Facebook Videos (6) — paste into `url`
1. https://www.facebook.com/multiplynews/videos/1149601990904042/
2. https://www.facebook.com/reel/1778868333373229/
3. https://www.facebook.com/reel/1181920804158827/
4. https://www.facebook.com/reel/983367474135084/
5. https://www.facebook.com/reel/1642640540598646/
6. https://www.facebook.com/reel/1632550061649199/

### 6.7 Instagram Posts (6) — paste into `url` (shortcode and kind fill in automatically)
1. https://www.instagram.com/reel/DemZvOtkuOr/
2. https://www.instagram.com/reel/Dc1ID2CD3dQ/
3. https://www.instagram.com/reel/DcvuQHvgda2/
4. https://www.instagram.com/reel/DctUA9ogfDA/
5. https://www.instagram.com/reel/Dcqvm_aiS82/
6. https://www.instagram.com/reel/DcoMhQeEoAb/

### 6.8 Navigation, Pages, Ad Settings
- headerMenu: Home `#top`, Latest Videos `#latest`, Reels `#reels`, Facebook `#facebook`, Instagram `#instagram`, Live (external), Send a Tip `#tip`
- footerColumns: **Watch** (Latest videos, Shorts, Live) · **Company** (About us, Advertise with us, Privacy policy, Contact → `/about-us`, `/advertise`, `/privacy-policy`, `/contact`) · **Follow** (Facebook, YouTube, Instagram)
- Pages: create the 4 company pages above, each with its own SEO
- Ad Settings: adsEnabled **true**, adsenseClientId empty, one `ads.ad-slot` per slotKey with an empty adsenseSlotId (placeholders show until AdSense approves)

---

## 7. Configuration

### 7.1 Roles and access
- **Public role:** grant **nothing**. The Next.js server is the only reader.
- **API Token** (Settings → API Tokens): type **Read-only**, used by the frontend as a server-only env var. Never expose it in the browser.
- **Admin roles:**
  - **Super Admin** — everything.
  - **Editor** — create/update/publish all content types, Media Library.
  - **Author** (optional) — create drafts only, cannot publish.

### 7.2 Webhook → instant updates
Settings → Webhooks → new webhook:
- URL: `{FRONTEND_URL}/api/revalidate`
- Header: `x-revalidate-secret: {REVALIDATE_SECRET}`
- Events: entry **create, update, delete, publish, unpublish**; media **update, delete**

Strapi sends the content type name (`model`). Which cache tag each model refreshes:

| Strapi model | Frontend cache tags |
|---|---|
| site-setting, navigation, ad-setting | `settings` |
| live-stream | `live` (new tag, see §8) |
| home-page | `featured`, `trending` |
| video | `latest-videos`, `ticker` |
| ticker-item | `ticker` |
| facebook-video | `facebook-videos` |
| instagram-post | `instagram-posts` |
| page, category | (future page tags) |

### 7.3 Editor workflow (everything is manual)
No cron jobs and no platform API keys. Each new piece of content is one entry:

| Editor wants to… | Do this in Strapi | Appears on the site |
|---|---|---|
| Add a new YouTube video | Video → Create → paste link → pick category → Publish | Top of "Latest Videos" |
| Change the big hero video | Home Page → hero → paste new link → Publish | Hero |
| Change Trending | Home Page → trendingVideos → add/remove/drag links → Publish | Trending Now |
| Add a Facebook reel | Facebook Video → Create → paste link → set order → Publish | Facebook Reels row |
| Add an Instagram reel | Instagram Post → Create → paste link → set order → Publish | On Instagram |
| Go live | Live Stream → paste live link, title, isLive on → Save | LIVE block above the hero |
| End live | Live Stream → isLive off → Save | LIVE block disappears |
| Hide anything | Unpublish the entry | Removed everywhere |

The webhook (§7.2) makes each change visible on the site within seconds.

### 7.4 Media
- Use an upload provider (Cloudinary or AWS S3) in production, not local disk.
- Enable responsive image formats (Settings → Media Library).
- The media host must be added to `images.remotePatterns` in `client/next.config.ts`.

### 7.5 Strapi environment variables
`HOST`, `PORT`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`, `DATABASE_CLIENT=postgres`, `DATABASE_URL`, `FRONTEND_URL`, `REVALIDATE_SECRET`, plus the upload provider keys.

---

## 8. Frontend work needed to switch to Strapi (later)

The frontend currently expects the custom API in `BACKEND_README.md`. To use Strapi:

1. **API client:** read Strapi's `{ data, meta }` response (instead of `{ success, data }`) and send the read-only API token.
2. **Mappers:** convert Strapi entries to the existing types in `client/src/types/content.ts`, so no UI component changes (e.g. `publishedDate → publishedAt`, `customThumbnail.url → thumbnailUrl`).
3. **Endpoints:** point the services at `/api/site-setting`, `/api/home-page`, `/api/videos`, `/api/ticker-items`, `/api/facebook-videos`, `/api/instagram-posts`, `/api/navigation`, `/api/ad-setting`.
4. **Revalidate route:** accept Strapi's webhook payload and use the model → tag table in §7.2.
5. **New UI data:** use the Home Page section texts, Navigation and Ad Settings instead of the hard-coded values in `client/src/config/`.
6. **SEO:** `generateMetadata` from `shared.seo`, JSON-LD (§4.4), `sitemap.ts`, and new routes for `Page` (`/[slug]`).
7. **Live block:** new `live` cache tag and a LIVE section above the hero, rendered only when `isLive` is true (YouTube or Facebook player).
8. **Embeds from links:** a shared helper turns every pasted link into its embed (YouTube ID, Facebook plugin URL, Instagram permalink), so the UI never trusts raw HTML.
9. **Env:** `STRAPI_URL`, `STRAPI_API_TOKEN` (server-only), `REVALIDATE_SECRET`.

---

## 9. Checklist

- [ ] Strapi v5 project + PostgreSQL created
- [ ] All components from §5 created
- [ ] All collection types (§3) and single types (§2) created with validations
- [ ] Link checking + automatic ID fill for YouTube / Instagram links works (§1.1); iframe HTML is rejected
- [ ] Public role has no permissions; read-only API token created
- [ ] Editor role configured
- [ ] Initial entries from §6 added and published
- [ ] Webhook (§7.2) set and tested
- [ ] Editors trained on the manual workflow (§7.3); a test entry of each type shows on the site
- [ ] Live Stream on/off tested with a YouTube and a Facebook live link
- [ ] Upload provider configured, alt text filled in for all media
- [ ] Frontend switched to Strapi (§8)
