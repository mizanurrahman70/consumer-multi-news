import { AdSlot } from "@/components/ads/AdSlot";
import { InstagramEmbeds } from "@/components/home/InstagramEmbeds";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";
import { getInstagramPosts } from "@/services/social.service";
import type { SiteSettings } from "@/types/content";

interface InstagramSectionProps {
  settings: SiteSettings;
}

/** Instagram reels grid followed by a follow card and an ad. */
export async function InstagramSection({ settings }: InstagramSectionProps) {
  const posts = await getInstagramPosts();
  const { social } = settings;

  return (
    <section id={SECTION_IDS.instagram} className="mt-10 scroll-mt-40">
      <SectionHeader title="On Instagram" link={{ label: "Follow on Instagram", href: social.instagram }} />
      <InstagramEmbeds posts={posts} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-card bg-surface p-6">
        <div>
          <span className="text-body font-bold text-brand">{settings.instagramHandle}</span>
          <h3 className="heading-card mb-1">Short news reels, every day</h3>
          <p className="text-muted">Quick reels from the field and behind-the-scenes coverage.</p>
          <ButtonLink variant="dark" href={social.instagram} className="mt-3.5">
            Follow on Instagram
          </ButtonLink>
        </div>
        <AdSlot slot="instagramRectangle" className="m-0" />
      </div>
    </section>
  );
}
