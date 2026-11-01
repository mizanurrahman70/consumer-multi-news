import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { SocialLinks } from "@/types/content";
import banner from "@/assets/images/footer-banner.jpg";

interface FooterBannerProps {
  social: SocialLinks;
}

/** Red photo banner at the top of the footer with social CTAs. */
export function FooterBanner({ social }: FooterBannerProps) {
  return (
    <div className="relative overflow-hidden bg-brand md:h-[280px]">
      <Image
        src={banner}
        alt=""
        sizes="100vw"
        className="h-[150px] w-full object-cover object-[72%_center] md:h-full md:object-right"
      />
      <div className="flex items-center bg-brand py-5 md:absolute md:inset-0 md:bg-transparent md:py-0">
        <Container>
          <div className="flex max-w-[460px] flex-col gap-3.5 text-canvas">
            <h2 className="text-banner font-bold">Stay informed. Know your rights.</h2>
            <div className="flex flex-wrap gap-2.5">
              <ButtonLink variant="yellow" href={social.youtubeSubscribe}>
                YouTube
              </ButtonLink>
              <ButtonLink variant="light" href={social.facebook}>
                Facebook
              </ButtonLink>
              <ButtonLink variant="dark" href={social.instagram}>
                Instagram
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
