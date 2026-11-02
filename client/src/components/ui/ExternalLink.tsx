import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  /** When false the link opens in the same tab (in-page anchors, site pages). */
  external?: boolean;
};

/**
 * Link for CMS-provided URLs: external ones open in a new tab with safe rel
 * attributes, site paths ("/about-us", "/#latest") use client-side navigation.
 */
export function ExternalLink({ external = true, href, ...props }: ExternalLinkProps) {
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
