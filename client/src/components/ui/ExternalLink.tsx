import type { ComponentPropsWithoutRef } from "react";

type ExternalLinkProps = ComponentPropsWithoutRef<"a"> & {
  /** When false the link opens in the same tab (e.g. in-page anchors). */
  external?: boolean;
};

/** Anchor that opens external URLs in a new tab with safe rel attributes. */
export function ExternalLink({ external = true, ...props }: ExternalLinkProps) {
  if (!external) return <a {...props} />;
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
