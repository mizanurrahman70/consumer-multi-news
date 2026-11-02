import type { FeaturedVideo, TickerItem, Video } from "@/types/content";

/**
 * Bundled fallback content: shown when API_BASE_URL is not set or the backend
 * is unreachable. Snapshot of the real Multiply News YouTube channel.
 */
const video = (
  youtubeId: string,
  title: string,
  publishedAt: string | null = null,
  viewCount: number | null = null,
): Video => ({ id: youtubeId, youtubeId, title, publishedAt, viewCount });

/** Videos pinned by the editorial team (original site's PINNED_IDS). */
const PINNED_VIDEOS: Video[] = [
  video("DK_KlOVJ9hE", "ভ/য়ং/কর এক আইসক্রিম ফ্যাক্টরির স'ন্ধান পেল বিএসটিআই! | Multiply News | BSTI", "2026-10-26T15:17:40Z", 6432),
  video("vD2oeEjQ-I4", "লাইসেন্স বিহীন প্রতিষ্ঠানে অ/ভিযানে বিএসটিআই ম্যাজিস্ট্রেট! | Multiply News | BSTI", "2026-10-25T18:13:04Z", 392),
  video("iW59_Bzkq-g", "অবহেলা-বঞ্চনা পেরিয়ে বাঁচার ল'ড়া'ই, তৃতীয় লিঙ্গের এই মানুষটির! | Multiply News", "2026-10-24T15:07:05Z", 171),
  video("lQf0Bmdlud0", "মহাসড়কে অটোরিকশার দা'পট, চ'রম ঝুঁ/কিতে যাত্রীদের জীবন! | Multiply News", "2026-10-23T15:23:24Z", 25),
  video("X67XKAgwpxI", "নাম্বার প্লেট নিয়ে বিআরটিএর নতুন নির্দেশনা, ক্ষু/ব্ধ মোটরসাইকেল চালকেরা! | Multiply News", "2026-10-22T13:42:59Z", 60),
  video("9MgS4tn54fQ", "বিদ্যুতের অতিরিক্ত বিলে না'জেহাল মানুষ, সুরাহা মিলবে কবে? | Multiply News"),
];

/** Newest channel uploads that are not pinned. */
const RECENT_UPLOADS: Video[] = [
  video("hkBu0OZq-E8", "অ-বৈধ মশার কয়েল ফ্যাক্টরিতে অ-ভিযানে বিএসটিআই! | Multiply News | BSTI", "2026-10-31T15:00:32Z", 4),
  video("VaLh9YnbugM", "চকবাজারের ন,কল টুথব্রাশ, হাতে-নাতে ধ/রলেন BSTI ম্যাজিস্ট্রেট! | Multiply News | BSTI", "2026-10-30T14:47:41Z", 23),
  video("x4nsw_yHNcs", "শীতের সবজির দাম কমেছে, তবু বাজারে ক্রেতা কম—হ'তাশ ব্যবসায়ীরা! | Multiply News", "2026-10-29T16:20:29Z", 696),
  video("JqKq5Ac3HZM", "বিরিয়ানিতে কি/ডনি ডায়ালাইসিসের কে'মিক্যাল, হাতে-নাতে ধ/রলেন ভোক্তা কর্মকর্তা | Multiply News", "2026-10-28T15:10:48Z", 445),
  video("wHIIVgaDkuQ", "১০ লিটারে ৭১০ মিলি তেল কম, হাতে-নাতে ধ/রলো বিএসটিআই! | Multiply News | BSTI", "2026-10-27T17:38:23Z", 6309),
];

export const FALLBACK_FEATURED: FeaturedVideo = {
  video: PINNED_VIDEOS[0],
  kicker: "Latest on YouTube",
  meta: "Multiply News · YouTube",
};

export const FALLBACK_TRENDING: Video[] = PINNED_VIDEOS.slice(1, 6);

export const FALLBACK_LATEST: Video[] = [...PINNED_VIDEOS, ...RECENT_UPLOADS];

export const FALLBACK_TICKER: TickerItem[] = FALLBACK_LATEST.slice(0, 8).map((item) => ({
  id: item.id,
  text: item.title,
  href: null,
  youtubeId: item.youtubeId,
}));
