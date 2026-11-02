import { FALLBACK_SETTINGS } from "@/data/fallback/settings";
import { FALLBACK_FEATURED, FALLBACK_TRENDING } from "@/data/fallback/videos";
import type { ButtonItem, ButtonVariant, HomePageContent } from "@/types/cms";

/** Bundled fallback Home Page content (mirrors the Strapi seed). */

const { social } = FALLBACK_SETTINGS;

const button = (label: string, href: string, variant: ButtonVariant): ButtonItem => ({
  label,
  href,
  variant,
  external: true,
});

export const FALLBACK_HOME: HomePageContent = {
  seo: null,
  featured: FALLBACK_FEATURED,
  trendingTitle: "Trending Now",
  trending: FALLBACK_TRENDING,
  latestSection: { title: "Latest Videos", link: { label: "All videos on YouTube", href: social.youtubeVideos } },
  latestLimit: 12,
  reelsSection: { title: "Facebook Reels & Videos", link: { label: "More reels", href: social.facebookReels } },
  facebookSection: { title: "From Our Facebook", link: { label: "Follow on Facebook", href: social.facebook } },
  facebookBlock: {
    eyebrow: null,
    title: "Watch reports first on Facebook",
    text: "Live videos, reels and on-the-spot coverage of consumer rights drives and market prices.",
    buttons: [button("Follow page", social.facebook, "red"), button("Subscribe on YouTube", social.youtubeSubscribe, "light")],
  },
  instagramSection: { title: "On Instagram", link: { label: "Follow on Instagram", href: social.instagram } },
  instagramBlock: {
    eyebrow: "@multiply_news",
    title: "Short news reels, every day",
    text: "Quick reels from the field and behind-the-scenes coverage.",
    buttons: [button("Follow on Instagram", social.instagram, "dark")],
  },
  tipBlock: {
    eyebrow: null,
    title: "Cheated on price, weight or quality?",
    text: "Send us your consumer complaint or news tip. Our team may follow up and cover it.",
    buttons: [button("Send a tip on Messenger", social.messenger, "dark")],
  },
  footerBanner: {
    title: "Stay informed. Know your rights.",
    image: null,
    buttons: [
      button("YouTube", social.youtubeSubscribe, "yellow"),
      button("Facebook", social.facebook, "light"),
      button("Instagram", social.instagram, "dark"),
    ],
  },
};
