import { FALLBACK_SETTINGS } from "@/data/fallback/settings";
import type { AboutPage, AdvertisePage, BlocksContent, ContactPage, PrivacyPolicyPage } from "@/types/cms";

/** Bundled fallback content for the footer "Company" pages (mirrors the Strapi seed). */

const { social } = FALLBACK_SETTINGS;

const paragraphs = (...texts: string[]): BlocksContent =>
  texts.map((text) => ({ type: "paragraph", children: [{ type: "text", text }] }));

export const FALLBACK_ABOUT_PAGE: AboutPage = {
  title: "About us",
  subtitle: "Consumer-focused news from Bangladesh: consumer rights, market watch and enforcement drives.",
  content: paragraphs(
    "Multiply News is a consumer news portal from Bangladesh. We report from markets, factories and shops to show readers what they pay for, and what they really get.",
  ),
  seo: null,
  coverImage: null,
};

export const FALLBACK_ADVERTISE_PAGE: AdvertisePage = {
  title: "Advertise with us",
  subtitle: "Reach consumers across Bangladesh on our website, YouTube, Facebook and Instagram.",
  content: paragraphs("Contact our team for rates and a media kit."),
  seo: null,
  contactEmail: null,
  contactPhone: FALLBACK_SETTINGS.contact.phoneDisplay,
  buttons: [{ label: "Message us on Messenger", href: social.messenger, variant: "red", external: true }],
};

export const FALLBACK_PRIVACY_POLICY_PAGE: PrivacyPolicyPage = {
  title: "Privacy policy",
  subtitle: null,
  content: paragraphs(
    "This page explains what information Multiply News collects when you visit our website and how it is used.",
  ),
  seo: null,
  lastUpdated: null,
};

export const FALLBACK_CONTACT_PAGE: ContactPage = {
  title: "Contact",
  subtitle: "Send us a news tip, a consumer complaint or a business enquiry.",
  content: [],
  seo: null,
  showContactDetails: true,
  mapLink: null,
  buttons: [{ label: "Send a tip on Messenger", href: social.messenger, variant: "red", external: true }],
};
