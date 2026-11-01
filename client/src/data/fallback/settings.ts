import type { SiteSettings } from "@/types/content";

/** Bundled fallback site settings (from the original site). */
export const FALLBACK_SETTINGS: SiteSettings = {
  name: "Multiply News",
  tagline: "Consumer news portal, Bangladesh",
  description:
    "Consumer-focused news portal from Bangladesh: consumer rights, market watch and enforcement drives.",
  instagramHandle: "@multiply_news",
  contact: {
    addressLines: ["383 Moghbazar, Razzak Plaza", "Dhaka 1217, Bangladesh"],
    phoneDisplay: "01315-668822",
    phoneE164: "+8801315668822",
  },
  social: {
    facebook: "https://www.facebook.com/multiplynews",
    facebookReels: "https://www.facebook.com/multiplynews/reels/",
    messenger: "https://m.me/multiplynews",
    youtube: "https://www.youtube.com/@Multiply_News",
    youtubeSubscribe: "https://www.youtube.com/@Multiply_News?sub_confirmation=1",
    youtubeVideos: "https://www.youtube.com/@Multiply_News/videos",
    youtubeShorts: "https://www.youtube.com/@Multiply_News/shorts",
    youtubeLive: "https://www.youtube.com/@Multiply_News/streams",
    instagram: "https://www.instagram.com/multiply_news/",
  },
};
