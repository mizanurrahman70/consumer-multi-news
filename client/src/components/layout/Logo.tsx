import Link from "next/link";

import logo from "@/assets/images/logo.png";
import { CmsImage } from "@/components/ui/CmsImage";
import type { MediaImage } from "@/types/cms";

interface LogoProps {
  siteName: string;
  image: MediaImage | null;
}

/** Header logo linking back to the top of the home page. */
export function Logo({ siteName, image }: LogoProps) {
  return (
    <Link href="/#top" aria-label={`${siteName} home`} className="shrink-0">
      <CmsImage image={image} fallback={logo} alt={siteName} preload className="h-[52px] w-auto nav:h-[68px]" />
    </Link>
  );
}
