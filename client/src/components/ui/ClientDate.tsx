"use client";

import { useIsClient } from "@/hooks/useIsClient";
import { formatLongDate } from "@/lib/utils/format";

/** Today's date, e.g. "Sunday, 1 November 2026" — rendered in the browser only. */
export function TodayDate() {
  const isClient = useIsClient();
  return <span>{isClient ? formatLongDate(new Date()) : ""}</span>;
}

/** The current year for the copyright line — rendered in the browser only. */
export function CurrentYear() {
  const isClient = useIsClient();
  return <span>{isClient ? new Date().getFullYear() : ""}</span>;
}
