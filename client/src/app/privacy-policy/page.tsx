import type { Metadata } from "next";

import { CompanyPageLayout } from "@/components/page/CompanyPageLayout";
import { companyPageMetadata } from "@/lib/seo/metadata";
import { getPrivacyPolicyPage } from "@/services/pages.service";
import { getSiteSettings } from "@/services/settings.service";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getPrivacyPolicyPage(), getSiteSettings()]);
  return companyPageMetadata(page, "/privacy-policy", settings);
}

/** "2026-11-03" → "3 November 2026" (fixed date from the CMS, so safe to render on the server). */
function formatPolicyDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** /privacy-policy — Strapi → Privacy Policy Page. */
export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicyPage();
  const meta = page.lastUpdated ? `Last updated: ${formatPolicyDate(page.lastUpdated)}` : null;

  return <CompanyPageLayout page={page} meta={meta} />;
}
