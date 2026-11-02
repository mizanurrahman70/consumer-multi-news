import type { StrapiQuery } from "@/lib/strapi/client";

/*
 * Populate/sort definitions for each Strapi endpoint. Strapi v5 only returns
 * nested components and media that are explicitly populated.
 */

const SEO_POPULATE = {
  populate: { metaImage: true, openGraph: { populate: { ogImage: true } } },
};

const BUTTONS_POPULATE = { populate: { buttons: true } };

export const SITE_SETTINGS_QUERY: StrapiQuery = {
  populate: {
    logo: true,
    footerLogo: true,
    contact: true,
    social: true,
    developerCredit: true,
    defaultSeo: SEO_POPULATE,
    organizationSchema: { populate: { logo: true, sameAs: true } },
  },
};

export const NAVIGATION_QUERY: StrapiQuery = {
  populate: { headerMenu: true, drawerMenu: true, footerColumns: { populate: { links: true } } },
};

export const AD_SETTINGS_QUERY: StrapiQuery = { populate: { slots: true } };

export const HOME_PAGE_QUERY: StrapiQuery = {
  populate: {
    seo: SEO_POPULATE,
    hero: { populate: { video: { populate: { customThumbnail: true } } } },
    trendingVideos: { populate: { customThumbnail: true } },
    latestSection: true,
    reelsSection: true,
    facebookSection: true,
    facebookBlock: BUTTONS_POPULATE,
    instagramSection: true,
    instagramBlock: BUTTONS_POPULATE,
    tipBlock: BUTTONS_POPULATE,
    footerBanner: { populate: { backgroundImage: true, buttons: true } },
  },
};

export function latestVideosQuery(limit: number): StrapiQuery {
  return {
    fields: ["youtubeUrl", "youtubeId", "title", "publishedDate"],
    populate: { customThumbnail: true },
    sort: ["isPinned:desc", "pinOrder:asc", "publishedDate:desc"],
    pagination: { limit },
  };
}

/** Active ticker items: inside their optional start/end window. */
export function tickerQuery(limit: number, nowIso: string): StrapiQuery {
  return {
    fields: ["text", "link", "youtubeUrl"],
    filters: {
      $and: [
        { $or: [{ startsAt: { $null: true } }, { startsAt: { $lte: nowIso } }] },
        { $or: [{ endsAt: { $null: true } }, { endsAt: { $gte: nowIso } }] },
      ],
    },
    sort: ["order:asc", "createdAt:desc"],
    pagination: { limit },
  };
}

export function orderedListQuery(fields: string[], limit: number): StrapiQuery {
  return { fields, sort: ["order:asc", "createdAt:desc"], pagination: { limit } };
}

export function pageBySlugQuery(slug: string): StrapiQuery {
  return { filters: { slug: { $eq: slug } }, populate: { seo: SEO_POPULATE }, pagination: { limit: 1 } };
}

export const PAGE_SLUGS_QUERY: StrapiQuery = { fields: ["slug", "updatedAt"], pagination: { limit: 100 } };
