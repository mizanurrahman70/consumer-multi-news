/**
 * Raw Strapi v5 REST shapes (flattened `data`). Every field is optional:
 * editors can leave fields empty and populate may omit relations. Mappers
 * turn these into the site's own types with sensible defaults.
 */

type Maybe<T> = T | null | undefined;

export interface StrapiMedia {
  url: string;
  alternativeText?: Maybe<string>;
  width?: Maybe<number>;
  height?: Maybe<number>;
}

export interface StrapiLink {
  label?: Maybe<string>;
  url?: Maybe<string>;
  isExternal?: Maybe<boolean>;
}

export interface StrapiButton extends StrapiLink {
  variant?: Maybe<string>;
}

export interface StrapiSectionHeading {
  title?: Maybe<string>;
  linkLabel?: Maybe<string>;
  linkUrl?: Maybe<string>;
}

export interface StrapiCtaCard {
  eyebrow?: Maybe<string>;
  title?: Maybe<string>;
  text?: Maybe<string>;
  buttons?: Maybe<StrapiButton[]>;
}

export interface StrapiSeo {
  metaTitle?: Maybe<string>;
  metaDescription?: Maybe<string>;
  metaImage?: Maybe<StrapiMedia>;
  keywords?: Maybe<string>;
  metaRobots?: Maybe<string>;
  canonicalURL?: Maybe<string>;
  structuredData?: unknown;
  openGraph?: Maybe<{
    ogTitle?: Maybe<string>;
    ogDescription?: Maybe<string>;
    ogImage?: Maybe<StrapiMedia>;
    ogType?: Maybe<string>;
  }>;
}

export interface StrapiYouTubeVideo {
  id?: Maybe<number>;
  youtubeUrl?: Maybe<string>;
  youtubeId?: Maybe<string>;
  title?: Maybe<string>;
  customThumbnail?: Maybe<StrapiMedia>;
}

export interface StrapiSiteSetting {
  siteName?: Maybe<string>;
  tagline?: Maybe<string>;
  description?: Maybe<string>;
  instagramHandle?: Maybe<string>;
  logo?: Maybe<StrapiMedia>;
  footerLogo?: Maybe<StrapiMedia>;
  contact?: Maybe<{ addressLines?: Maybe<string>; phoneDisplay?: Maybe<string>; phoneE164?: Maybe<string>; email?: Maybe<string> }>;
  social?: Maybe<Record<string, Maybe<string>>>;
  copyrightText?: Maybe<string>;
  developerCredit?: Maybe<StrapiLink>;
  defaultSeo?: Maybe<StrapiSeo>;
  organizationSchema?: Maybe<{ name?: Maybe<string>; url?: Maybe<string>; logo?: Maybe<StrapiMedia>; sameAs?: Maybe<StrapiLink[]> }>;
}

export interface StrapiNavigation {
  headerMenu?: Maybe<StrapiLink[]>;
  drawerMenu?: Maybe<StrapiLink[]>;
  footerColumns?: Maybe<Array<{ title?: Maybe<string>; links?: Maybe<StrapiLink[]> }>>;
}

export interface StrapiAdSetting {
  adsEnabled?: Maybe<boolean>;
  adsenseClientId?: Maybe<string>;
  slots?: Maybe<Array<{ slotKey?: Maybe<string>; adsenseSlotId?: Maybe<string>; enabled?: Maybe<boolean> }>>;
}

export interface StrapiLiveStream {
  isLive?: Maybe<boolean>;
  url?: Maybe<string>;
  platform?: Maybe<string>;
  title?: Maybe<string>;
}

export interface StrapiHomePage {
  seo?: Maybe<StrapiSeo>;
  hero?: Maybe<{ video?: Maybe<StrapiYouTubeVideo>; kicker?: Maybe<string>; meta?: Maybe<string> }>;
  trendingTitle?: Maybe<string>;
  trendingVideos?: Maybe<StrapiYouTubeVideo[]>;
  latestSection?: Maybe<StrapiSectionHeading>;
  latestLimit?: Maybe<number>;
  reelsSection?: Maybe<StrapiSectionHeading>;
  facebookSection?: Maybe<StrapiSectionHeading>;
  facebookBlock?: Maybe<StrapiCtaCard>;
  instagramSection?: Maybe<StrapiSectionHeading>;
  instagramBlock?: Maybe<StrapiCtaCard>;
  tipBlock?: Maybe<StrapiCtaCard>;
  footerBanner?: Maybe<{ title?: Maybe<string>; backgroundImage?: Maybe<StrapiMedia>; buttons?: Maybe<StrapiButton[]> }>;
}

export interface StrapiVideo {
  documentId: string;
  youtubeUrl?: Maybe<string>;
  youtubeId?: Maybe<string>;
  title?: Maybe<string>;
  publishedDate?: Maybe<string>;
  customThumbnail?: Maybe<StrapiMedia>;
}

export interface StrapiTickerItem {
  documentId: string;
  text?: Maybe<string>;
  link?: Maybe<string>;
  youtubeUrl?: Maybe<string>;
}

export interface StrapiFacebookVideo {
  documentId: string;
  url?: Maybe<string>;
  title?: Maybe<string>;
}

export interface StrapiInstagramPost {
  documentId: string;
  url?: Maybe<string>;
  shortcode?: Maybe<string>;
  kind?: Maybe<string>;
}

export interface StrapiPage {
  title?: Maybe<string>;
  slug?: Maybe<string>;
  content?: Maybe<Array<Record<string, unknown>>>;
  seo?: Maybe<StrapiSeo>;
  updatedAt?: Maybe<string>;
}
