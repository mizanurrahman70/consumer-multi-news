import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must know our custom theme tokens (globals.css @theme).
 * Without this, a font size like `text-body-sm` is mistaken for a text
 * color and silently removes the real color class (e.g. `text-canvas`).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "micro",
        "kicker",
        "caption",
        "meta",
        "body-sm",
        "body",
        "lead",
        "card-heading",
        "side-heading",
        "section",
        "hero",
        "banner",
        "callout",
      ],
      radius: ["media", "card", "reel", "pill"],
      shadow: ["header", "play", "anchor", "embed"],
    },
  },
});

/** Joins class names and resolves conflicting Tailwind utilities (last one wins). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
