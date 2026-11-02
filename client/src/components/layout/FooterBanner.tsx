import banner from "@/assets/images/footer-banner.jpg";
import { ButtonGroup } from "@/components/ui/Button";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import type { FooterBannerContent } from "@/types/cms";

interface FooterBannerProps {
  content: FooterBannerContent;
}

/** Red photo banner at the top of the footer with social CTAs (Strapi → Home Page → footerBanner). */
export function FooterBanner({ content }: FooterBannerProps) {
  return (
    <div className="relative overflow-hidden bg-brand md:h-[280px]">
      <div className="relative h-[150px] md:absolute md:inset-0 md:h-full">
        <CmsImage
          image={content.image}
          fallback={banner}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[72%_center] md:object-right"
        />
      </div>
      <div className="relative flex items-center bg-brand py-5 md:absolute md:inset-0 md:bg-transparent md:py-0">
        <Container>
          <div className="flex max-w-[460px] flex-col gap-3.5 text-canvas">
            <h2 className="text-banner font-bold">{content.title}</h2>
            <ButtonGroup buttons={content.buttons} />
          </div>
        </Container>
      </div>
    </div>
  );
}
