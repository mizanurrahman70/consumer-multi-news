import type { CtaCard, SectionHeading } from "@/types/cms";
import type { FacebookVideo, FeaturedVideo, InstagramPost, LiveStream, TickerItem, Video } from "@/types/content";

/*
 * Data shape of every home-page section. `HomeData` is what GET /api/home
 * returns; each feature reads its own part with `useSection("<name>")`.
 */

export type TickerData = TickerItem[];

export type LiveData = LiveStream;

export type FeaturedVideoData = FeaturedVideo;

export interface TrendingVideosData {
  title: string;
  videos: Video[];
}

export interface LatestVideosData {
  heading: SectionHeading;
  videos: Video[];
}

export interface FacebookReelsData {
  heading: SectionHeading;
  videos: FacebookVideo[];
}

export interface FacebookPageData {
  heading: SectionHeading;
  card: CtaCard;
  pageUrl: string;
  siteName: string;
}

export interface InstagramData {
  heading: SectionHeading;
  card: CtaCard;
  posts: InstagramPost[];
}

export type TipData = CtaCard;

export interface HomeData {
  ticker: TickerData;
  live: LiveData;
  featuredVideo: FeaturedVideoData;
  trendingVideos: TrendingVideosData;
  latestVideos: LatestVideosData;
  facebookReels: FacebookReelsData;
  facebookPage: FacebookPageData;
  instagram: InstagramData;
  tip: TipData;
}

export type SectionName = keyof HomeData;
