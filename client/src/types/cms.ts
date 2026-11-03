import type { AdSlotKey } from "@/config/ads";
import type { FeaturedVideo, SocialLinks, Video } from "@/types/content";

/**
 * Site-wide and page content managed in Strapi (single types, components).
 * Mapped from the CMS in `src/lib/strapi/mappers`.
 */

export interface MediaImage {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface LinkItem {
  label: string;
  href: string;
  external: boolean;
}

export type ButtonVariant = "yellow" | "dark" | "red" | "light";

export interface ButtonItem extends LinkItem {
  variant: ButtonVariant;
}

export interface SectionHeading {
  title: string;
  link: { label: string; href: string } | null;
}

export interface CtaCard {
  eyebrow: string | null;
  title: string;
  text: string | null;
  buttons: ButtonItem[];
}

export interface FooterBannerContent {
  title: string;
  image: MediaImage | null;
  buttons: ButtonItem[];
}

export interface SeoMeta {
  title: string;
  description: string;
  image: MediaImage | null;
  keywords: string | null;
  noIndex: boolean;
  noFollow: boolean;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogType: "website" | "article" | "video.other";
  structuredData: unknown;
}

export interface ContactInfo {
  addressLines: string[];
  phoneDisplay: string;
  /** E.164 phone number used for the tel: link. */
  phoneE164: string;
  email: string | null;
}

export interface OrganizationInfo {
  name: string;
  url: string;
  logo: MediaImage | null;
  sameAs: string[];
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  instagramHandle: string;
  logo: MediaImage | null;
  footerLogo: MediaImage | null;
  contact: ContactInfo;
  social: SocialLinks;
  copyrightText: string;
  developerCredit: LinkItem | null;
  defaultSeo: SeoMeta;
  organization: OrganizationInfo;
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

export interface Navigation {
  headerMenu: LinkItem[];
  drawerMenu: LinkItem[];
  footerColumns: FooterColumn[];
}

export interface AdSlotSetting {
  slotId: string;
  enabled: boolean;
}

export interface AdSettings {
  enabled: boolean;
  /** AdSense publisher id (ca-pub-…); empty = placeholders. */
  clientId: string;
  slots: Partial<Record<AdSlotKey, AdSlotSetting>>;
}

export interface HomePageContent {
  seo: SeoMeta | null;
  featured: FeaturedVideo;
  trendingTitle: string;
  trending: Video[];
  latestSection: SectionHeading;
  latestLimit: number;
  reelsSection: SectionHeading;
  facebookSection: SectionHeading;
  facebookBlock: CtaCard;
  instagramSection: SectionHeading;
  instagramBlock: CtaCard;
  tipBlock: CtaCard;
  footerBanner: FooterBannerContent;
}

/** Rich text from Strapi's "Blocks" field, rendered by @strapi/blocks-react-renderer. */
export type BlocksContent = Array<Record<string, unknown>>;

/** Fields shared by the footer "Company" pages (About, Advertise, Privacy, Contact). */
export interface CompanyPageBase {
  title: string;
  subtitle: string | null;
  content: BlocksContent;
  seo: SeoMeta | null;
}

export interface AboutPage extends CompanyPageBase {
  coverImage: MediaImage | null;
}

export interface AdvertisePage extends CompanyPageBase {
  contactEmail: string | null;
  contactPhone: string | null;
  buttons: ButtonItem[];
}

export interface PrivacyPolicyPage extends CompanyPageBase {
  /** ISO date (YYYY-MM-DD). */
  lastUpdated: string | null;
}

export interface ContactPage extends CompanyPageBase {
  showContactDetails: boolean;
  mapLink: string | null;
  buttons: ButtonItem[];
}
