import Image from "next/image";

import logo from "@/assets/images/logo.png";

interface LogoProps {
  siteName: string;
}

/** Header logo linking back to the top of the home page. */
export function Logo({ siteName }: LogoProps) {
  return (
    <a href="#top" aria-label={`${siteName} home`} className="shrink-0">
      <Image src={logo} alt={siteName} preload className="h-[52px] w-auto nav:h-[68px]" />
    </a>
  );
}
