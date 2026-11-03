import type { Metadata } from "next";

import { publicEnv } from "@/config/public-env";
import type { CompanyPageBase, SeoMeta, SiteSettings } from "@/types/cms";

interface MetadataOptions {
  /** Path of the page, e.g. "/" or "/about-us" (used for canonical and og:url). */
  path: string;
  siteName: string;
}

/** Strapi "SEO" component → Next.js Metadata (title, description, robots, Open Graph, Twitter). */
export function toMetadata(seo: SeoMeta, { path, siteName }: MetadataOptions): Metadata {
  const images = seo.image
    ? [{ url: seo.image.url, alt: seo.image.alt || seo.title, ...(seo.image.width && seo.image.height ? { width: seo.image.width, height: seo.image.height } : {}) }]
    : undefined;
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.split(",").map((keyword) => keyword.trim()).filter(Boolean),
    alternates: { canonical: seo.canonicalUrl ?? path },
    robots: { index: !seo.noIndex, follow: !seo.noFollow },
    openGraph: {
      type: seo.ogType,
      title: ogTitle,
      description: ogDescription,
      siteName,
      url: path,
      locale: "bn_BD",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: images?.map((image) => image.url),
    },
  };
}

/** Metadata for a footer "Company" page: its own SEO, else the site default with the page title. */
export function companyPageMetadata(page: CompanyPageBase, path: string, settings: SiteSettings): Metadata {
  const seo = page.seo ?? {
    ...settings.defaultSeo,
    title: `${page.title} — ${settings.name}`,
    description: page.subtitle ?? settings.defaultSeo.description,
  };
  return toMetadata(seo, { path, siteName: settings.name });
}

/** NewsMediaOrganization + WebSite structured data for every page. */
export function organizationJsonLd(settings: SiteSettings): Record<string, unknown>[] {
  const { organization } = settings;
  return [
    {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: organization.name,
      url: organization.url,
      logo: organization.logo?.url ?? settings.logo?.url ?? `${publicEnv.siteUrl}/apple-touch-icon.png`,
      sameAs: organization.sameAs,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.name,
      url: publicEnv.siteUrl,
      inLanguage: "bn",
    },
  ];
}
