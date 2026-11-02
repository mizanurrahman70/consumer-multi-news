import footerLogo from "@/assets/images/logo-footer.jpg";
import { FooterBanner } from "@/components/layout/FooterBanner";
import { CurrentYear } from "@/components/ui/ClientDate";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import type { FooterBannerContent, Navigation, SiteSettings } from "@/types/cms";

interface FooterProps {
  settings: SiteSettings;
  navigation: Navigation;
  banner: FooterBannerContent;
}

const columnClass = "flex flex-col gap-2 text-body-sm";

export function Footer({ settings, navigation, banner }: FooterProps) {
  const { contact, developerCredit } = settings;

  return (
    <footer className="mt-14 bg-ink text-on-dark-muted max-md:pb-[70px]">
      <FooterBanner content={banner} />

      <Container className="flex flex-wrap justify-between gap-8 pt-9 pb-6">
        <div className="flex max-w-[360px] flex-col gap-3 text-body-sm">
          <CmsImage
            image={settings.footerLogo}
            fallback={footerLogo}
            alt={settings.name}
            className="h-[72px] w-auto self-start rounded"
          />
          <span>{settings.description}</span>
        </div>

        <div className="flex flex-wrap gap-10">
          {navigation.footerColumns.map((column) => (
            <div key={column.title} className={columnClass}>
              <strong className="text-canvas">{column.title}</strong>
              {column.links.map((link) => (
                <ExternalLink
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  external={link.external}
                  className="hover:text-accent"
                >
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          ))}

          <div className={columnClass}>
            <strong className="text-canvas">Contact</strong>
            <div className="flex items-start gap-2">
              <MapPinIcon className="mt-[3px] shrink-0" />
              <address className="not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div className="flex items-start gap-2">
              <PhoneIcon className="mt-[3px] shrink-0" />
              <a href={`tel:${contact.phoneE164}`} className="hover:text-accent">
                {contact.phoneDisplay}
              </a>
            </div>
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="hover:text-accent">
                {contact.email}
              </a>
            )}
          </div>
        </div>
      </Container>

      <Container className="flex flex-wrap justify-between gap-2 border-t border-line-dark pt-3.5 pb-5 text-caption text-subtle">
        <span>
          © <CurrentYear /> {settings.name}. {settings.copyrightText}
        </span>
        {developerCredit && (
          <span>
            Developed by{" "}
            <ExternalLink
              href={developerCredit.href}
              external={developerCredit.external}
              className="font-semibold text-canvas hover:text-accent"
            >
              {developerCredit.label}
            </ExternalLink>
          </span>
        )}
      </Container>
    </footer>
  );
}
