const TIME_UNITS: ReadonlyArray<readonly [seconds: number, unit: string]> = [
  [31_536_000, "year"],
  [2_592_000, "month"],
  [604_800, "week"],
  [86_400, "day"],
  [3_600, "hour"],
  [60, "minute"],
];

/** "3 days ago" style relative time. Returns "" for missing/invalid dates. */
export function formatTimeAgo(isoDate: string | null | undefined, now: number = Date.now()): string {
  if (!isoDate) return "";
  const timestamp = new Date(isoDate).getTime();
  if (Number.isNaN(timestamp)) return "";

  const elapsedSeconds = (now - timestamp) / 1000;
  for (const [seconds, unit] of TIME_UNITS) {
    const value = Math.floor(elapsedSeconds / seconds);
    if (value >= 1) return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

function compact(value: number, divisor: number, suffix: string): string {
  return `${(value / divisor).toFixed(1).replace(/\.0$/, "")}${suffix}`;
}

/** 6432 → "6.4K views". Returns "" when the count is missing or zero. */
export function formatViews(count: number | null | undefined): string {
  if (!count || count <= 0) return "";
  if (count >= 1_000_000) return `${compact(count, 1_000_000, "M")} views`;
  if (count >= 1_000) return `${compact(count, 1_000, "K")} views`;
  return `${count} ${count === 1 ? "view" : "views"}`;
}

/** "Sunday, 1 November 2026" */
export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Joins non-empty parts with a middle dot: "2 days ago · 6.4K views". */
export function joinMeta(...parts: Array<string | null | undefined>): string {
  return parts.filter(Boolean).join(" · ");
}
