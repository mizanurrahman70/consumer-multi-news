import Image, { type StaticImageData } from "next/image";

import type { MediaImage } from "@/types/cms";

type CmsImageProps = {
  /** Image uploaded in Strapi; when null the bundled fallback is shown. */
  image: MediaImage | null;
  fallback: StaticImageData;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
  fill?: boolean;
};

/** next/image for a CMS image with a bundled fallback (logos, banners). */
export function CmsImage({ image, fallback, alt, fill, ...props }: CmsImageProps) {
  if (!image) return <Image src={fallback} alt={alt} fill={fill} {...props} />;
  if (fill || !image.width || !image.height) {
    return <Image src={image.url} alt={image.alt || alt} fill={fill ?? true} {...props} />;
  }
  return <Image src={image.url} alt={image.alt || alt} width={image.width} height={image.height} {...props} />;
}
