import { SOCIAL_LINKS as social } from './site';

/** Default Home Page entry — the content the site shows today. */

const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const button = (label: string, url: string, variant: 'yellow' | 'dark' | 'red' | 'light') => ({
  label,
  url,
  variant,
  isExternal: true,
});

export const HOME_PAGE = {
  seo: {
    metaTitle: 'Multiply News — Consumer News Portal, Bangladesh',
    metaDescription:
      'Consumer rights, market watch and enforcement drive video reports from Bangladesh, every day on Multiply News.',
    metaRobots: 'index_follow',
  },
  hero: {
    video: {
      youtubeUrl: watch('DK_KlOVJ9hE'),
      title: "ভ/য়ং/কর এক আইসক্রিম ফ্যাক্টরির স'ন্ধান পেল বিএসটিআই! | Multiply News | BSTI",
    },
    kicker: 'Latest on YouTube',
    meta: 'Multiply News · YouTube',
  },
  trendingTitle: 'Trending Now',
  trendingVideos: [
    { youtubeUrl: watch('vD2oeEjQ-I4'), title: 'লাইসেন্স বিহীন প্রতিষ্ঠানে অ/ভিযানে বিএসটিআই ম্যাজিস্ট্রেট! | Multiply News | BSTI' },
    { youtubeUrl: watch('iW59_Bzkq-g'), title: "অবহেলা-বঞ্চনা পেরিয়ে বাঁচার ল'ড়া'ই, তৃতীয় লিঙ্গের এই মানুষটির! | Multiply News" },
    { youtubeUrl: watch('lQf0Bmdlud0'), title: "মহাসড়কে অটোরিকশার দা'পট, চ'রম ঝুঁ/কিতে যাত্রীদের জীবন! | Multiply News" },
    { youtubeUrl: watch('X67XKAgwpxI'), title: 'নাম্বার প্লেট নিয়ে বিআরটিএর নতুন নির্দেশনা, ক্ষু/ব্ধ মোটরসাইকেল চালকেরা! | Multiply News' },
    { youtubeUrl: watch('9MgS4tn54fQ'), title: "বিদ্যুতের অতিরিক্ত বিলে না'জেহাল মানুষ, সুরাহা মিলবে কবে? | Multiply News" },
  ],
  latestSection: { title: 'Latest Videos', linkLabel: 'All videos on YouTube', linkUrl: social.youtubeVideos },
  latestLimit: 12,
  reelsSection: { title: 'Facebook Reels & Videos', linkLabel: 'More reels', linkUrl: social.facebookReels },
  facebookSection: { title: 'From Our Facebook', linkLabel: 'Follow on Facebook', linkUrl: social.facebook },
  facebookBlock: {
    title: 'Watch reports first on Facebook',
    text: 'Live videos, reels and on-the-spot coverage of consumer rights drives and market prices.',
    buttons: [button('Follow page', social.facebook, 'red'), button('Subscribe on YouTube', social.youtubeSubscribe, 'light')],
  },
  instagramSection: { title: 'On Instagram', linkLabel: 'Follow on Instagram', linkUrl: social.instagram },
  instagramBlock: {
    eyebrow: '@multiply_news',
    title: 'Short news reels, every day',
    text: 'Quick reels from the field and behind-the-scenes coverage.',
    buttons: [button('Follow on Instagram', social.instagram, 'dark')],
  },
  tipBlock: {
    title: 'Cheated on price, weight or quality?',
    text: 'Send us your consumer complaint or news tip. Our team may follow up and cover it.',
    buttons: [button('Send a tip on Messenger', social.messenger, 'dark')],
  },
  footerBanner: {
    title: 'Stay informed. Know your rights.',
    buttons: [
      button('YouTube', social.youtubeSubscribe, 'yellow'),
      button('Facebook', social.facebook, 'light'),
      button('Instagram', social.instagram, 'dark'),
    ],
  },
};
