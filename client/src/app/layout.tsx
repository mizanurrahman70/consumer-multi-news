import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Hind_Siliguri } from "next/font/google";
import Script from "next/script";

import { AdSlot, adsenseClientId, isAdSlotVisible } from "@/components/ads/AdSlot";
import { AnchorAd } from "@/components/ads/AnchorAd";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { VideoPlayerProvider } from "@/components/video/VideoPlayerProvider";
import { SECTION_IDS } from "@/config/navigation";
import { publicEnv } from "@/config/public-env";
import { organizationJsonLd, toMetadata } from "@/lib/seo/metadata";
import { getHomePage } from "@/services/home.service";
import { getAdSettings, getNavigation, getSiteSettings } from "@/services/settings.service";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#cb2229",
};

/** Site-wide defaults from Strapi → Site Settings → defaultSeo. Pages override these. */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(publicEnv.siteUrl),
    ...toMetadata(settings.defaultSeo, { path: "/", siteName: settings.name }),
    icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, navigation, home, ads] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getHomePage(),
    getAdSettings(),
  ]);
  const adClient = ads.enabled ? adsenseClientId(ads) : "";

  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${barlowCondensed.variable}`}>
      <body>
        <a
          href={`#${SECTION_IDS.main}`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-90 focus:bg-canvas focus:p-2"
        >
          Skip to content
        </a>

        <VideoPlayerProvider>
          <TopBar settings={settings} />
          <Header settings={settings} navigation={navigation} />
          <main id={SECTION_IDS.main}>{children}</main>
          <Footer settings={settings} navigation={navigation} banner={home.footerBanner} />
        </VideoPlayerProvider>

        {isAdSlotVisible(ads, "mobileAnchor") && (
          <AnchorAd>
            <AdSlot slot="mobileAnchor" />
          </AnchorAd>
        )}

        <JsonLd data={organizationJsonLd(settings)} />

        {adClient && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
