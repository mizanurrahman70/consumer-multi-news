"use client";

import { useRef } from "react";

import { useElementWidth } from "@/hooks/useElementWidth";
import {
  FACEBOOK_IFRAME_ALLOW,
  FACEBOOK_PAGE_PLUGIN,
  clampPagePluginWidth,
  facebookPagePluginUrl,
} from "@/lib/utils/social-embeds";

interface FacebookPagePluginProps {
  pageUrl: string;
  title: string;
}

/**
 * Facebook's official Page Plugin (real timeline posts). The plugin has a
 * fixed pixel size, so we measure the container and re-mount it only when
 * the available width changes noticeably.
 */
export function FacebookPagePlugin({ pageUrl, title }: FacebookPagePluginProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measured = useElementWidth(containerRef);

  const width = measured ? clampPagePluginWidth(measured.element) : null;
  const height =
    measured && measured.viewport < FACEBOOK_PAGE_PLUGIN.mobileBreakpoint
      ? FACEBOOK_PAGE_PLUGIN.mobileHeight
      : FACEBOOK_PAGE_PLUGIN.desktopHeight;

  return (
    <div ref={containerRef} className="mx-auto min-h-[400px] w-full max-w-[500px] overflow-hidden rounded-card bg-surface">
      {width && (
        <iframe
          // A new key forces a fresh plugin render at the new size.
          key={`${width}x${height}`}
          src={facebookPagePluginUrl(pageUrl, width, height)}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          allow={FACEBOOK_IFRAME_ALLOW}
          className="block w-full border-0"
        />
      )}
    </div>
  );
}
