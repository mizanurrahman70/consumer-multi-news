"use client";

import { useEffect, useRef } from "react";

import type { AdSlotConfig } from "@/config/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseUnitProps {
  client: string;
  slotId: string;
  format: NonNullable<AdSlotConfig["adsenseFormat"]>;
}

/** A single AdSense <ins> unit. Requests an ad once when mounted. */
export function AdSenseUnit({ client, slotId, format }: AdSenseUnitProps) {
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch (error) {
      console.error("[ads] AdSense push failed", error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block size-full"
      data-ad-client={client}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
