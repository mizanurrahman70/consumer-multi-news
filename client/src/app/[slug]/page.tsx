import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RichText } from "@/components/cms/RichText";
import { Container } from "@/components/ui/Container";
import { toMetadata } from "@/lib/seo/metadata";
import { getPage, getPublishedPages } from "@/services/page.service";
import { getSiteSettings } from "@/services/settings.service";

/**
 * Pages published after the build are rendered on first request. Blocking
 * (instead of streaming) keeps a real 404 status for unknown slugs; the
 * data is cached, so this only costs one Strapi call per page.
 */
export const instant = false;

/** Prerenders every published Strapi page. At least one slug is required by Cache Components. */
export async function generateStaticParams() {
  const pages = await getPublishedPages();
  return pages.length > 0 ? pages.map(({ slug }) => ({ slug })) : [{ slug: "about-us" }];
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [page, settings] = await Promise.all([getPage(slug), getSiteSettings()]);
  if (!page) return {};

  const seo = page.seo ?? { ...settings.defaultSeo, title: `${page.title} — ${settings.name}` };
  return toMetadata(seo, { path: `/${slug}`, siteName: settings.name });
}

/** Simple CMS pages: About us, Advertise, Privacy policy, Contact (Strapi → Page). */
export default async function CmsPageRoute({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <Container as="article" className="py-10">
      <div className="max-w-[820px]">
        <h1 className="mb-6 text-hero font-bold">{page.title}</h1>
        <RichText content={page.content} />
      </div>
    </Container>
  );
}
