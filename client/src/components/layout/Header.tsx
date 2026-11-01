import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { FacebookIcon } from "@/components/ui/icons";
import { getDrawerNav, getPrimaryNav } from "@/config/navigation";
import type { SiteSettings } from "@/types/content";

interface HeaderProps {
  settings: SiteSettings;
}

/** Sticky red site header with logo, actions and section navigation. */
export function Header({ settings }: HeaderProps) {
  const { social } = settings;

  return (
    <header className="sticky top-0 z-50 bg-brand text-canvas shadow-header">
      <Container className="flex items-center justify-between gap-3 py-2">
        <MobileNav links={getDrawerNav(social)} />
        <Logo siteName={settings.name} />
        <div className="flex items-center gap-2.5">
          <ButtonLink variant="yellow" href={social.youtubeSubscribe}>
            Subscribe
          </ButtonLink>
          <ExternalLink
            href={social.facebook}
            aria-label="Facebook"
            className="flex size-11 items-center justify-center rounded-pill border-[1.5px] border-canvas/90 text-canvas hover:text-canvas max-nav:hidden"
          >
            <FacebookIcon />
          </ExternalLink>
        </div>
      </Container>

      <nav aria-label="Sections" className="border-t border-line-on-brand max-nav:hidden">
        <Container as="ul" className="scrollbar-none flex overflow-x-auto px-2.5">
          {getPrimaryNav(social).map((link) => (
            <li key={link.label}>
              <ExternalLink
                href={link.href}
                external={link.external}
                className="block px-3.5 py-3 text-body-sm font-semibold whitespace-nowrap text-canvas hover:bg-black/15 hover:text-canvas"
              >
                {link.label}
              </ExternalLink>
            </li>
          ))}
        </Container>
      </nav>
    </header>
  );
}
