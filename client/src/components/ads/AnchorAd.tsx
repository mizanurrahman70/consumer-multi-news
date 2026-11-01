"use client";

import { useState, type ReactNode } from "react";

import { CloseIcon } from "@/components/ui/icons";

interface AnchorAdProps {
  /** The ad itself, rendered on the server and passed through. */
  children: ReactNode;
}

/** Mobile-only sticky ad pinned to the bottom of the screen; can be dismissed. */
export function AnchorAd({ children }: AnchorAdProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 flex justify-center border-t border-line-strong bg-canvas py-[5px] shadow-anchor md:hidden">
      <button
        type="button"
        aria-label="Close ad"
        onClick={() => setDismissed(true)}
        className="absolute -top-[22px] right-1 flex h-[22px] w-7 items-center justify-center rounded-t-media border border-b-0 border-line-strong bg-canvas"
      >
        <CloseIcon size={14} />
      </button>
      {children}
    </div>
  );
}
