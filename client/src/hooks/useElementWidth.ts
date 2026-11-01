"use client";

import { useEffect, useState, type RefObject } from "react";

export interface MeasuredWidth {
  element: number;
  viewport: number;
}

/**
 * Width of an element and of the viewport, updated only when the element
 * width changes by more than `threshold` px (avoids re-rendering heavy
 * embeds on tiny resizes such as mobile URL-bar show/hide).
 * Returns null until the first measurement in the browser.
 */
export function useElementWidth<T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold: number = 80,
): MeasuredWidth | null {
  const [size, setSize] = useState<MeasuredWidth | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.floor(entry.contentRect.width);
      setSize((previous) =>
        previous && Math.abs(previous.element - width) <= threshold
          ? previous
          : { element: width, viewport: window.innerWidth },
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return size;
}
