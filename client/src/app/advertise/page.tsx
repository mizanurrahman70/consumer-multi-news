import type { Metadata } from "next";

import { CompanyPageLayout } from "@/components/page/CompanyPageLayout";
import { ButtonGroup } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/icons";
import { companyPageMetadata } from "@/lib/seo/metadata";
import { getAdvertisePage } from "@/services/pages.service";
import { getSiteSettings } from "@/services/settings.service";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAdvertisePage(), getSiteSettings()]);
  return companyPageMetadata(page, "/advertise", settings);
}

/** Digits and "+" only, for the tel: link. */
const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** /advertise — Strapi → Advertise Page. */
export default async function AdvertisePage() {
  const page = await getAdvertisePage();
  const hasContact = Boolean(page.contactEmail || page.contactPhone);

  return (
    <CompanyPageLayout page={page}>
      {(hasContact || page.buttons.length > 0) && (
        <div className="mt-8 flex flex-col gap-3 rounded-card bg-surface p-6">
          <h2 className="heading-card">Get in touch</h2>
          {page.contactPhone && (
            <a href={telHref(page.contactPhone)} className="flex items-center gap-2 font-semibold">
              <PhoneIcon /> {page.contactPhone}
            </a>
          )}
          {page.contactEmail && (
            <a href={`mailto:${page.contactEmail}`} className="font-semibold text-brand">
              {page.contactEmail}
            </a>
          )}
          <ButtonGroup buttons={page.buttons} className="mt-2" />
        </div>
      )}
    </CompanyPageLayout>
  );
}
