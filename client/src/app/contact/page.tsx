import type { Metadata } from "next";

import { CompanyPageLayout } from "@/components/page/CompanyPageLayout";
import { ButtonGroup, ButtonLink } from "@/components/ui/Button";
import { MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { companyPageMetadata } from "@/lib/seo/metadata";
import { getContactPage } from "@/services/pages.service";
import { getSiteSettings } from "@/services/settings.service";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  return companyPageMetadata(page, "/contact", settings);
}

/** /contact — Strapi → Contact Page; address, phone and email come from Site Settings. */
export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  const { contact } = settings;

  return (
    <CompanyPageLayout page={page}>
      {page.showContactDetails && (
        <div className="mt-8 grid gap-6 rounded-card bg-surface p-6 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <MapPinIcon size={20} className="mt-1 shrink-0 text-brand" />
            <div>
              <h2 className="text-body font-bold">Address</h2>
              <address className="not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              {page.mapLink && (
                <ButtonLink href={page.mapLink} variant="light" className="mt-3 border border-line">
                  Open in Google Maps
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <PhoneIcon size={20} className="mt-1 shrink-0 text-brand" />
            <div className="flex flex-col gap-1">
              <h2 className="text-body font-bold">Phone &amp; email</h2>
              <a href={`tel:${contact.phoneE164}`} className="font-semibold">
                {contact.phoneDisplay}
              </a>
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="font-semibold text-brand">
                  {contact.email}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      <ButtonGroup buttons={page.buttons} className="mt-6" />
    </CompanyPageLayout>
  );
}
