import { AdSlot } from "@/components/ads/AdSlot";
import { CtaCardContent } from "@/components/home/CtaCardContent";
import { FacebookPagePlugin } from "@/components/home/FacebookPagePlugin";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";
import type { CtaCard, SectionHeading } from "@/types/cms";

interface FacebookSectionProps {
  heading: SectionHeading;
  card: CtaCard;
  pageUrl: string;
  siteName: string;
}

/** Facebook timeline, a follow card, and a sticky half-page ad on desktop. */
export function FacebookSection({ heading, card, pageUrl, siteName }: FacebookSectionProps) {
  return (
    <section id={SECTION_IDS.facebook} className="mt-10 scroll-mt-40">
      <SectionHeader heading={heading} />

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,500px)_minmax(0,1fr)]">
          <FacebookPagePlugin pageUrl={pageUrl} title={`${siteName} on Facebook`} />

          <div className="flex flex-col gap-2 rounded-card bg-ink p-[22px] text-canvas">
            <CtaCardContent card={card} textClassName="text-body-sm text-on-dark-muted" />
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
