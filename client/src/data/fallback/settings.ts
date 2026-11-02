import type { AdSettings, Navigation, SeoMeta, SiteSettings } from "@/types/cms";
import type { LiveStream, SocialLinks } from "@/types/content";

/** Bundled fallback site settings, navigation and ads (mirrors the Strapi seed). */

const social: SocialLinks = {
  facebook: "https://www.facebook.com/multiplynews",
  facebookReels: "https://www.facebook.com/multiplynews/reels/",
  messenger: "https://m.me/multiplynews",
  youtube: "https://www.youtube.com/@Multiply_News",
  youtubeSubscribe: "https://www.youtube.com/@Multiply_News?sub_confirmation=1",
  youtubeVideos: "https://www.youtube.com/@Multiply_News/videos",
  youtubeShorts: "https://www.youtube.com/@Multiply_News/shorts",
  youtubeLive: "https://www.youtube.com/@Multiply_News/streams",
  instagram: "https://www.instagram.com/multiply_news/",
};

export const FALLBACK_SEO: SeoMeta = {
  title: "Multiply News — Consumer News Portal, Bangladesh",
  description:
    "Multiply News — consumer-focused news portal from Bangladesh: consumer rights, market watch, enforcement drives and video reports.",
  image: null,
  keywords: null,
  noIndex: false,
  noFollow: false,
  canonicalUrl: null,
  ogTitle: "Multiply News",
  ogDescription: "Consumer-focused news portal from Bangladesh.",
  ogType: "website",
  structuredData: null,
};

export const FALLBACK_SETTINGS: SiteSettings = {
  name: "Multiply News",
  tagline: "Consumer news portal, Bangladesh",
  description:
    "Consumer-focused news portal from Bangladesh: consumer rights, market watch and enforcement drives.",
  instagramHandle: "@multiply_news",
  logo: null,
  footerLogo: null,
  contact: {
    addressLines: ["383 Moghbazar, Razzak Plaza", "Dhaka 1217, Bangladesh"],
    phoneDisplay: "01315-668822",
    phoneE164: "+8801315668822",
    email: null,
  },
  social,
  copyrightText: "All rights reserved.",
  developerCredit: { label: "Traideas", href: "#", external: false },
  defaultSeo: FALLBACK_SEO,
  organization: {
    name: "Multiply News",
    url: "https://multiplynews.com",
    logo: null,
    sameAs: [social.facebook, social.youtube, social.instagram],
  },
};

const link = (label: string, href: string, external = false) => ({ label, href, external });

const headerMenu = [
  link("Home", "/#top"),
  link("Latest Videos", "/#latest"),
  link("Reels", "/#reels"),
  link("Facebook", "/#facebook"),
  link("Instagram", "/#instagram"),
  link("Live", social.youtubeLive, true),
  link("Send a Tip", "/#tip"),
];

export const FALLBACK_NAVIGATION: Navigation = {
  headerMenu,
  drawerMenu: [...headerMenu.slice(0, 5), link("Shorts", social.youtubeShorts, true), ...headerMenu.slice(5)],
  footerColumns: [
    {
      title: "Watch",
      links: [link("Latest videos", "/#latest"), link("Shorts", social.youtubeShorts, true), link("Live", social.youtubeLive, true)],
    },
    {
      title: "Company",
      links: [
        link("About us", "/about-us"),
        link("Advertise with us", "/advertise"),
        link("Privacy policy", "/privacy-policy"),
        link("Contact", "/contact"),
      ],
    },
    {
      title: "Follow",
      links: [link("Facebook", social.facebook, true), link("YouTube", social.youtube, true), link("Instagram", social.instagram, true)],
    },
  ],
};

/** Placeholders everywhere until AdSense ids are entered in Strapi. */
export const FALLBACK_ADS: AdSettings = { enabled: true, clientId: "", slots: {} };

export const FALLBACK_LIVE: LiveStream = { isLive: false, url: null, platform: null, title: "" };
