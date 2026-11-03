import type { Metadata } from "next";
import Image from "next/image";

import { CompanyPageLayout } from "@/components/page/CompanyPageLayout";
import { companyPageMetadata } from "@/lib/seo/metadata";
import { getAboutPage } from "@/services/pages.service";
import { getSiteSettings } from "@/services/settings.service";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAboutPage(), getSiteSettings()]);
  return companyPageMetadata(page, "/about-us", settings);
}

/** /about-us — Strapi → About Page. */
export default async function AboutUsPage() {
  const page = await getAboutPage();
  const cover = page.coverImage;

  return (
    <CompanyPageLayout
      page={page}
      before={
        cover && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-card bg-surface">
            <Image src={cover.url} alt={cover.alt || page.title} fill sizes="(max-width: 860px) 100vw, 820px" className="object-cover" />
          </div>
        )
      }
    />
  );
}
