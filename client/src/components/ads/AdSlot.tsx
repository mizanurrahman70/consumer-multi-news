import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { AD_SLOTS, type AdSlotKey, type AdVariant } from "@/config/ads";
import { publicEnv } from "@/config/public-env";
import { cn } from "@/lib/utils/cn";

const VARIANT_SIZES: Record<AdVariant, string> = {
  leaderboard: "h-[90px] w-[970px] max-lg:w-[728px] max-md:h-[100px] max-md:w-[320px]",
  rectangle: "h-[250px] w-[300px]",
  halfPage: "h-[600px] w-[300px]",
  inFeed: "col-span-full h-[120px] w-full",
  anchor: "h-[50px] w-[320px]",
};

interface AdSlotProps {
  slot: AdSlotKey;
  className?: string;
}

/**
 * Reserved ad space. Renders a live AdSense unit when the publisher id and the
 * slot id are configured, otherwise a labelled placeholder of the same size
 * (so the layout never shifts when real ads are switched on).
 */
export function AdSlot({ slot, className }: AdSlotProps) {
  const config = AD_SLOTS[slot];
  const live = Boolean(publicEnv.adsenseClient && config.adsenseSlotId);

  return (
    <div
      className={cn(
        "mx-auto flex max-w-full flex-col items-center justify-center gap-0.5 text-center",
        !live && "border border-dashed border-line-dashed bg-surface text-ink-muted",
        VARIANT_SIZES[config.variant],
        className,
      )}
    >
      {live ? (
        <AdSenseUnit client={publicEnv.adsenseClient} slotId={config.adsenseSlotId} format={config.adsenseFormat} />
      ) : (
        <>
          <small className="text-micro text-muted uppercase">Advertisement</small>
          <span className="text-caption font-semibold">{config.label}</span>
        </>
      )}
    </div>
  );
}

/** Leaderboard with the vertical breathing room used between sections. */
export function LeaderboardAd({ slot, className }: AdSlotProps) {
  return (
    <div className={cn("py-4", className)}>
      <AdSlot slot={slot} />
    </div>
  );
}
