"use client";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { cn } from "@/lib/utils/cn";
import { isExternalUrl } from "@/lib/utils/links";
import type { TickerItem } from "@/types/content";

import { TickerVideoButton } from "./TickerVideoButton";
import { useTicker } from "./useTicker";

const tickerClass = "mt-4 flex overflow-hidden border border-line";
const labelClass =
  "flex shrink-0 items-center bg-brand px-3.5 py-[9px] font-display text-body-sm font-bold tracking-[0.06em] text-canvas";

function TickerHeadline({ item }: { item: TickerItem }) {
  if (item.youtubeId) return <TickerVideoButton youtubeId={item.youtubeId} text={item.text} />;

  const text = `● ${item.text}`;
  if (!item.href) return <span>{text}</span>;
  return (
    <ExternalLink href={item.href} external={isExternalUrl(item.href)} className="hover:text-brand">
      {text}
    </ExternalLink>
  );
}

function TickerSkeleton() {
  return (
    <div className={tickerClass} aria-hidden="true">
      <b className={labelClass}>BREAKING</b>
      <div className="flex flex-1 items-center px-3.5">
        <span className="text-body-sm text-muted">Loading latest headlines…</span>
      </div>
    </div>
  );
}

/** Scrolling "BREAKING" headline strip. Pauses on hover; static for reduced motion. */
export function Ticker() {
  const { data: items, isLoading } = useTicker();
  if (isLoading) return <TickerSkeleton />;
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("group", tickerClass)} aria-label="Latest headlines">
      <b className={labelClass}>BREAKING</b>
      <div className="flex flex-1 items-center overflow-hidden">
        <div className="inline-flex animate-ticker gap-10 pl-[100%] text-body-sm whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:pl-3.5">
          {items.map((item) => (
            <TickerHeadline key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
