import { AdSlot } from "@/components/ads/AdSlot";
import { CtaCardContent } from "@/components/home/CtaCardContent";
import { InstagramEmbeds } from "@/components/home/InstagramEmbeds";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";
import { getInstagramPosts } from "@/services/social.service";
import type { CtaCard, SectionHeading } from "@/types/cms";

interface InstagramSectionProps {
  heading: SectionHeading;
  card: CtaCard;
}

/** Strapi "Instagram Post" entries followed by a follow card and an ad. */
export async function InstagramSection({ heading, card }: InstagramSectionProps) {
  const posts = await getInstagramPosts();

  return (
    <section id={SECTION_IDS.instagram} className="mt-10 scroll-mt-40">
      <SectionHeader heading={heading} />
      {posts.length > 0 && <InstagramEmbeds posts={posts} />}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-card bg-surface p-6">
        <div>
          <CtaCardContent card={card} textClassName="text-muted" />
        </div>
        <AdSlot slot="instagramRectangle" className="m-0" />
      </div>
    </section>
  );
}
