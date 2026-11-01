import { Container } from "@/components/ui/Container";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { TodayDate } from "@/components/ui/ClientDate";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import type { SiteSettings } from "@/types/content";

interface TopBarProps {
  settings: SiteSettings;
}

/** Thin dark strip above the header: date, tagline and social links. */
export function TopBar({ settings }: TopBarProps) {
  const links = [
    { label: "Facebook", href: settings.social.facebook, Icon: FacebookIcon },
    { label: "YouTube", href: settings.social.youtubeVideos, Icon: YouTubeIcon },
    { label: "Instagram", href: settings.social.instagram, Icon: InstagramIcon },
  ];

  return (
    <div className="bg-ink text-caption text-on-dark">
      <Container className="flex min-h-9 items-center justify-between gap-3">
        <span className="max-sm:hidden">
          <TodayDate /> · {settings.tagline}
        </span>
        <div className="flex gap-4 max-sm:ml-auto">
          {links.map(({ label, href, Icon }) => (
            <ExternalLink
              key={label}
              href={href}
              className="flex items-center gap-1.5 text-on-dark hover:text-accent"
            >
              <Icon size={15} />
              {label}
            </ExternalLink>
          ))}
        </div>
      </Container>
    </div>
  );
}
