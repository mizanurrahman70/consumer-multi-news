"use client";

import { useRef, type ReactNode } from "react";

import { useInView } from "@/hooks/useInView";

interface LazyMountProps {
  children: ReactNode;
  /** Reserves space before mounting so the page does not jump. */
  className?: string;
}

/**
 * Renders its children only when the reader scrolls near it. Wrap heavy
 * third-party embeds (Facebook plugin, Instagram) so they don't slow the
 * first view or use mobile data for content nobody scrolled to.
 */
export function LazyMount({ children, className }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  );
}
