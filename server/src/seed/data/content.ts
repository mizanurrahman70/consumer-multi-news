/** Default categories, videos, social embeds and company pages. */

export const CATEGORIES = [
  { name: 'Consumer Rights', slug: 'consumer-rights' },
  { name: 'Market Watch', slug: 'market-watch' },
  { name: 'Enforcement Drives', slug: 'enforcement-drives' },
];

export interface SeedVideo {
  youtubeId: string;
  title: string;
  publishedDate: string;
  category: string;
  pinOrder?: number;
}

/** Real Multiply News uploads. Pinned ones (pinOrder) show first in Latest Videos. */
export const VIDEOS: SeedVideo[] = [
  { youtubeId: 'DK_KlOVJ9hE', pinOrder: 1, category: 'enforcement-drives', publishedDate: '2026-10-26T15:17:40Z', title: "ভ/য়ং/কর এক আইসক্রিম ফ্যাক্টরির স'ন্ধান পেল বিএসটিআই! | Multiply News | BSTI" },
  { youtubeId: 'vD2oeEjQ-I4', pinOrder: 2, category: 'enforcement-drives', publishedDate: '2026-10-25T18:13:04Z', title: 'লাইসেন্স বিহীন প্রতিষ্ঠানে অ/ভিযানে বিএসটিআই ম্যাজিস্ট্রেট! | Multiply News | BSTI' },
  { youtubeId: 'iW59_Bzkq-g', pinOrder: 3, category: 'consumer-rights', publishedDate: '2026-10-24T15:07:05Z', title: "অবহেলা-বঞ্চনা পেরিয়ে বাঁচার ল'ড়া'ই, তৃতীয় লিঙ্গের এই মানুষটির! | Multiply News" },
  { youtubeId: 'lQf0Bmdlud0', pinOrder: 4, category: 'consumer-rights', publishedDate: '2026-10-23T15:23:24Z', title: "মহাসড়কে অটোরিকশার দা'পট, চ'রম ঝুঁ/কিতে যাত্রীদের জীবন! | Multiply News" },
  { youtubeId: 'X67XKAgwpxI', pinOrder: 5, category: 'consumer-rights', publishedDate: '2026-10-22T13:42:59Z', title: 'নাম্বার প্লেট নিয়ে বিআরটিএর নতুন নির্দেশনা, ক্ষু/ব্ধ মোটরসাইকেল চালকেরা! | Multiply News' },
  // Upload date not in the public feed; set to the day before the previous video.
  { youtubeId: '9MgS4tn54fQ', pinOrder: 6, category: 'consumer-rights', publishedDate: '2026-10-21T12:00:00Z', title: "বিদ্যুতের অতিরিক্ত বিলে না'জেহাল মানুষ, সুরাহা মিলবে কবে? | Multiply News" },
  { youtubeId: 'hkBu0OZq-E8', category: 'enforcement-drives', publishedDate: '2026-10-31T15:00:32Z', title: 'অ-বৈধ মশার কয়েল ফ্যাক্টরিতে অ-ভিযানে বিএসটিআই! | Multiply News | BSTI' },
  { youtubeId: 'VaLh9YnbugM', category: 'enforcement-drives', publishedDate: '2026-10-30T14:47:41Z', title: 'চকবাজারের ন,কল টুথব্রাশ, হাতে-নাতে ধ/রলেন BSTI ম্যাজিস্ট্রেট! | Multiply News | BSTI' },
  { youtubeId: 'x4nsw_yHNcs', category: 'market-watch', publishedDate: '2026-10-29T16:20:29Z', title: "শীতের সবজির দাম কমেছে, তবু বাজারে ক্রেতা কম—হ'তাশ ব্যবসায়ীরা! | Multiply News" },
  { youtubeId: 'JqKq5Ac3HZM', category: 'enforcement-drives', publishedDate: '2026-10-28T15:10:48Z', title: "বিরিয়ানিতে কি/ডনি ডায়ালাইসিসের কে'মিক্যাল, হাতে-নাতে ধ/রলেন ভোক্তা কর্মকর্তা | Multiply News" },
  { youtubeId: 'wHIIVgaDkuQ', category: 'enforcement-drives', publishedDate: '2026-10-27T17:38:23Z', title: '১০ লিটারে ৭১০ মিলি তেল কম, হাতে-নাতে ধ/রলো বিএসটিআই! | Multiply News | BSTI' },
];

export const FACEBOOK_VIDEOS = [
  'https://www.facebook.com/multiplynews/videos/1149601990904042/',
  'https://www.facebook.com/reel/1778868333373229/',
  'https://www.facebook.com/reel/1181920804158827/',
  'https://www.facebook.com/reel/983367474135084/',
  'https://www.facebook.com/reel/1642640540598646/',
  'https://www.facebook.com/reel/1632550061649199/',
].map((url, index) => ({ url, title: `Multiply News Facebook video ${index + 1}`, order: index + 1 }));

export const INSTAGRAM_POSTS = ['DemZvOtkuOr', 'Dc1ID2CD3dQ', 'DcvuQHvgda2', 'DctUA9ogfDA', 'Dcqvm_aiS82', 'DcoMhQeEoAb'].map(
  (code, index) => ({ url: `https://www.instagram.com/reel/${code}/`, order: index + 1 }),
);

const paragraph = (text: string) => ({ type: 'paragraph', children: [{ type: 'text', text }] });

/** Company pages are created as drafts with placeholder text for editors to complete. */
export const PAGES = [
  { title: 'About us', slug: 'about-us' },
  { title: 'Advertise with us', slug: 'advertise' },
  { title: 'Privacy policy', slug: 'privacy-policy' },
  { title: 'Contact', slug: 'contact' },
].map((page) => ({
  ...page,
  content: [paragraph('Content coming soon. Replace this text, then publish the page.')],
  seo: {
    metaTitle: `${page.title} — Multiply News`,
    metaDescription: `${page.title} — Multiply News, the consumer-focused news portal from Bangladesh.`,
    metaRobots: 'index_follow',
  },
}));
