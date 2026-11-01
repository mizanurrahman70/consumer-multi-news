import type { SocialLinks } from "@/types/content";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Section anchors used by the header, drawer and footer. */
export const SECTION_IDS = {
  top: "top",
  main: "main",
  latest: "latest",
  reels: "reels",
  facebook: "facebook",
  instagram: "instagram",
  tip: "tip",
} as const;

const hash = (id: string) => `#${id}`;

export function getPrimaryNav(social: SocialLinks): NavLink[] {
  return [
    { label: "Home", href: hash(SECTION_IDS.top) },
    { label: "Latest Videos", href: hash(SECTION_IDS.latest) },
    { label: "Reels", href: hash(SECTION_IDS.reels) },
    { label: "Facebook", href: hash(SECTION_IDS.facebook) },
    { label: "Instagram", href: hash(SECTION_IDS.instagram) },
    { label: "Live", href: social.youtubeLive, external: true },
    { label: "Send a Tip", href: hash(SECTION_IDS.tip) },
  ];
}

/** The mobile drawer also links to YouTube Shorts. */
export function getDrawerNav(social: SocialLinks): NavLink[] {
  const nav = getPrimaryNav(social);
  const liveIndex = nav.findIndex((link) => link.label === "Live");
  nav.splice(liveIndex, 0, { label: "Shorts", href: social.youtubeShorts, external: true });
  return nav;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export function getFooterColumns(social: SocialLinks): FooterColumn[] {
  return [
    {
      title: "Watch",
      links: [
        { label: "Latest videos", href: hash(SECTION_IDS.latest) },
        { label: "Shorts", href: social.youtubeShorts, external: true },
        { label: "Live", href: social.youtubeLive, external: true },
      ],
    },
    {
      // Company pages are not built yet; these stay as placeholders.
      title: "Company",
      links: [
        { label: "About us", href: "#" },
        { label: "Advertise with us", href: "#" },
        { label: "Privacy policy", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Follow",
      links: [
        { label: "Facebook", href: social.facebook, external: true },
        { label: "YouTube", href: social.youtube, external: true },
        { label: "Instagram", href: social.instagram, external: true },
      ],
    },
  ];
}
