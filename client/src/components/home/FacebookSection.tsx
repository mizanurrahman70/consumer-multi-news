import { AdSlot } from "@/components/ads/AdSlot";
import { FacebookPagePlugin } from "@/components/home/FacebookPagePlugin";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";
import type { SiteSettings } from "@/types/content";

interface FacebookSectionProps {
  settings: SiteSettings;
}

/** Facebook timeline, a follow card, and a sticky half-page ad on desktop. */
export function FacebookSection({ settings }: FacebookSectionProps) {
  const { social } = settings;

  return (
    <section id={SECTION_IDS.facebook} className="mt-10 scroll-mt-40">
      <SectionHeader title="From Our Facebook" link={{ label: "Follow on Facebook", href: social.facebook }} />

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,500px)_minmax(0,1fr)]">
          <FacebookPagePlugin pageUrl={social.facebook} title={`${settings.name} on Facebook`} />

          <div className="flex flex-col gap-3 rounded-card bg-ink p-[22px] text-canvas">
            <h3 className="heading-card">Watch reports first on Facebook</h3>
            <p className="text-body-sm text-on-dark-muted">
              Live videos, reels and on-the-spot coverage of consumer rights drives and market prices.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink variant="red" href={social.facebook}>
                Follow page
              </ButtonLink>
              <ButtonLink variant="light" href={social.youtubeSubscribe}>
                Subscribe on YouTube
              </ButtonLink>
            </div>
          </div>
        </div>

        <aside className="flex justify-center">
          <div className="sticky top-[150px] self-start">
            <AdSlot slot="facebookHalfPage" />
          </div>
        </aside>
      </div>
    </section>
  );
}
