import "server-only";

import { FALLBACK_HOME } from "@/data/fallback/home";
import { toMediaImage } from "@/lib/strapi/media";
import { text, toButtons, toCtaCard, toEmbeddedVideo, toSectionHeading, toSeo } from "@/lib/strapi/mappers/shared";
import type { StrapiHomePage } from "@/lib/strapi/types";
import type { HomePageContent } from "@/types/cms";
import type { Video } from "@/types/content";

/** Strapi "Home Page" single type → home page content, filling gaps from the defaults. */
export function toHomePage(raw: StrapiHomePage): HomePageContent {
  const fallback = FALLBACK_HOME;
  const heroVideo = toEmbeddedVideo(raw.hero?.video, "hero");
  const trending = (raw.trendingVideos ?? [])
    .map((video, index) => toEmbeddedVideo(video, `trending-${index}`))
    .filter((video): video is Video => video !== null);
  const banner = raw.footerBanner;

  return {
    seo: toSeo(raw.seo),
    featured: heroVideo
      ? {
          video: heroVideo,
          kicker: text(raw.hero?.kicker) ?? "",
          meta: text(raw.hero?.meta) ?? "",
        }
      : fallback.featured,
    trendingTitle: text(raw.trendingTitle) ?? fallback.trendingTitle,
    trending,
    latestSection: toSectionHeading(raw.latestSection, fallback.latestSection),
    latestLimit: raw.latestLimit ?? fallback.latestLimit,
    reelsSection: toSectionHeading(raw.reelsSection, fallback.reelsSection),
    facebookSection: toSectionHeading(raw.facebookSection, fallback.facebookSection),
    facebookBlock: toCtaCard(raw.facebookBlock, fallback.facebookBlock),
    instagramSection: toSectionHeading(raw.instagramSection, fallback.instagramSection),
    instagramBlock: toCtaCard(raw.instagramBlock, fallback.instagramBlock),
    tipBlock: toCtaCard(raw.tipBlock, fallback.tipBlock),
    footerBanner: {
      title: text(banner?.title) ?? fallback.footerBanner.title,
      image: toMediaImage(banner?.backgroundImage),
      buttons: banner ? toButtons(banner.buttons) : fallback.footerBanner.buttons,
    },
  };
}
