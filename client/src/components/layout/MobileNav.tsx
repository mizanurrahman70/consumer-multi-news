"use client";

import { useCallback, useState } from "react";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { MenuIcon } from "@/components/ui/icons";
import type { NavLink } from "@/config/navigation";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { cn } from "@/lib/utils/cn";

interface MobileNavProps {
  links: NavLink[];
}

const DRAWER_ID = "mobile-drawer";

/** Hamburger button and slide-in drawer, shown below the `nav` breakpoint. */
export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useBodyScrollLock(open);
  useEscapeKey(close, open);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={DRAWER_ID}
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center rounded-pill text-canvas nav:hidden"
      >
        <MenuIcon />
      </button>

      <div id={DRAWER_ID} className={cn("fixed inset-0 z-80", open ? "block" : "hidden")} aria-hidden={!open}>
        <div className="absolute inset-0 bg-scrim" onClick={close} />
        <nav
          aria-label="Menu"
          className="absolute inset-y-0 left-0 flex w-[min(300px,85vw)] flex-col gap-1 overflow-y-auto bg-canvas p-4 text-ink"
        >
          {links.map((link) => (
            <ExternalLink
              key={link.label}
              href={link.href}
              external={link.external}
              onClick={link.external ? undefined : close}
              className="border-b border-line px-2 py-3 text-lead font-semibold"
            >
              {link.label}
            </ExternalLink>
          ))}
        </nav>
      </div>
    </>
  );
}
