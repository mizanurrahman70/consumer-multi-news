"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element comes within `rootMargin` of the viewport, and stays
 * true afterwards. Used to start heavy third-party embeds only when needed.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = "600px"): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}
