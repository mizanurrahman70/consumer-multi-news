import Image from "next/image";

import { FooterBanner } from "@/components/layout/FooterBanner";
import { CurrentYear } from "@/components/ui/ClientDate";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { getFooterColumns } from "@/config/navigation";
import type { SiteSettings } from "@/types/content";
import footerLogo from "@/assets/images/logo-footer.jpg";

interface FooterProps {
  settings: SiteSettings;
}

const columnClass = "flex flex-col gap-2 text-body-sm";

export function Footer({ settings }: FooterProps) {
  const { contact, social } = settings;

  return (
    <footer className="mt-14 bg-ink text-on-dark-muted max-md:pb-[70px]">
      <FooterBanner social={social} />

      <Container className="flex flex-wrap justify-between gap-8 pt-9 pb-6">
        <div className="flex max-w-[360px] flex-col gap-3 text-body-sm">
          <Image src={footerLogo} alt={settings.name} className="h-[72px] w-auto self-start rounded" />
          <span>{settings.description}</span>
        </div>

        <div className="flex flex-wrap gap-10">
          {getFooterColumns(social).map((column) => (
            <div key={column.title} className={columnClass}>
              <strong className="text-canvas">{column.title}</strong>
              {column.links.map((link) => (
                <ExternalLink key={link.label} href={link.href} external={link.external} className="hover:text-accent">
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
          </div>
        </div>
      </Container>

      <Container className="flex flex-wrap justify-between gap-2 border-t border-line-dark pt-3.5 pb-5 text-caption text-subtle">
        <span>
          © <CurrentYear /> {settings.name}. All rights reserved.
        </span>
        <span>
          Developed by{" "}
          <a href="#" className="font-semibold text-canvas hover:text-accent">
            Traideas
          </a>
        </span>
      </Container>
    </footer>
  );
}
