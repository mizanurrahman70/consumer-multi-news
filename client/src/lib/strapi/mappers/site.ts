import "server-only";

import { AD_SLOT_KEYS, isAdSlotKey } from "@/config/ads";
import { FALLBACK_NAVIGATION, FALLBACK_SETTINGS } from "@/data/fallback/settings";
import { toMediaImage } from "@/lib/strapi/media";
import { text, toLink, toLinks, toSeo } from "@/lib/strapi/mappers/shared";
import type { StrapiAdSetting, StrapiLiveStream, StrapiNavigation, StrapiSiteSetting } from "@/lib/strapi/types";
import { extractYouTubeId } from "@/lib/utils/youtube";
import type { AdSettings, FooterColumn, Navigation, SiteSettings } from "@/types/cms";
import type { LiveStream, SocialLinks } from "@/types/content";

/** Merges CMS social URLs over the defaults, ignoring empty fields. */
function toSocial(raw: StrapiSiteSetting["social"]): SocialLinks {
  const social = { ...FALLBACK_SETTINGS.social };
  for (const key of Object.keys(social) as Array<keyof SocialLinks>) {
    social[key] = text(raw?.[key]) ?? social[key];
  }
  return social;
}

export function toSiteSettings(raw: StrapiSiteSetting): SiteSettings {
  const fallback = FALLBACK_SETTINGS;
  const name = text(raw.siteName) ?? fallback.name;
  const contact = raw.contact;
  const organization = raw.organizationSchema;
  const sameAs = (organization?.sameAs ?? []).map((link) => text(link.url)).filter((url): url is string => Boolean(url));

  return {
    name,
    tagline: text(raw.tagline) ?? fallback.tagline,
    description: text(raw.description) ?? fallback.description,
    instagramHandle: text(raw.instagramHandle) ?? fallback.instagramHandle,
    logo: toMediaImage(raw.logo, name),
    footerLogo: toMediaImage(raw.footerLogo, name),
    contact: {
      addressLines: text(contact?.addressLines)?.split("\n").map((line) => line.trim()).filter(Boolean)
        ?? fallback.contact.addressLines,
      phoneDisplay: text(contact?.phoneDisplay) ?? fallback.contact.phoneDisplay,
      phoneE164: text(contact?.phoneE164) ?? fallback.contact.phoneE164,
      email: text(contact?.email),
    },
    social: toSocial(raw.social),
    copyrightText: text(raw.copyrightText) ?? fallback.copyrightText,
    developerCredit: toLink(raw.developerCredit),
    defaultSeo: toSeo(raw.defaultSeo) ?? fallback.defaultSeo,
    organization: {
      name: text(organization?.name) ?? name,
      url: text(organization?.url) ?? fallback.organization.url,
      logo: toMediaImage(organization?.logo, name),
      sameAs: sameAs.length > 0 ? sameAs : fallback.organization.sameAs,
    },
  };
}

export function toNavigation(raw: StrapiNavigation): Navigation {
  const fallback = FALLBACK_NAVIGATION;
  const headerMenu = toLinks(raw.headerMenu);
  const drawerMenu = toLinks(raw.drawerMenu);
  const footerColumns: FooterColumn[] = (raw.footerColumns ?? []).flatMap((column) => {
    const title = text(column.title);
    return title ? [{ title, links: toLinks(column.links) }] : [];
  });

  return {
    headerMenu: headerMenu.length > 0 ? headerMenu : fallback.headerMenu,
    // An empty drawer menu reuses the header menu.
    drawerMenu: drawerMenu.length > 0 ? drawerMenu : headerMenu.length > 0 ? headerMenu : fallback.drawerMenu,
    footerColumns: footerColumns.length > 0 ? footerColumns : fallback.footerColumns,
  };
}

export function toAdSettings(raw: StrapiAdSetting): AdSettings {
  const slots: AdSettings["slots"] = {};
  for (const slot of raw.slots ?? []) {
    if (!isAdSlotKey(slot.slotKey)) continue;
    slots[slot.slotKey] = { slotId: text(slot.adsenseSlotId) ?? "", enabled: slot.enabled ?? true };
  }
  // Slots missing in the CMS stay enabled as placeholders.
  for (const key of AD_SLOT_KEYS) slots[key] ??= { slotId: "", enabled: true };

  return { enabled: raw.adsEnabled ?? true, clientId: text(raw.adsenseClientId) ?? "", slots };
}

export function toLiveStream(raw: StrapiLiveStream): LiveStream {
  const url = text(raw.url);
  const platform = raw.platform === "youtube" || raw.platform === "facebook" ? raw.platform : null;
  const title = text(raw.title) ?? "";
  // Only show a block the frontend can actually embed.
  const embeddable = platform === "facebook" || (platform === "youtube" && extractYouTubeId(url) !== null);
  return { isLive: Boolean(raw.isLive && url && embeddable), url, platform, title };
}
