import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { AD_SLOTS, type AdSlotKey, type AdVariant } from "@/config/ads";
import { publicEnv } from "@/config/public-env";
import { cn } from "@/lib/utils/cn";
import { getAdSettings } from "@/services/settings.service";
import type { AdSettings } from "@/types/cms";

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

/** Whether a slot should render at all (ads on, slot enabled in Strapi). */
export function isAdSlotVisible(ads: AdSettings, slot: AdSlotKey): boolean {
  return ads.enabled && ads.slots[slot]?.enabled !== false;
}

/** AdSense publisher id from Strapi, else the env fallback. */
export function adsenseClientId(ads: AdSettings): string {
  return ads.clientId || publicEnv.adsenseClient;
}

/**
 * Reserved ad space, controlled from Strapi → Ad Settings. Renders nothing
 * when ads or the slot are switched off, a live AdSense unit when the
 * publisher id and slot id are set, otherwise a same-size placeholder (so the
 * layout never shifts when real ads are switched on).
 */
export async function AdSlot({ slot, className }: AdSlotProps) {
  const ads = await getAdSettings();
  if (!isAdSlotVisible(ads, slot)) return null;

  const config = AD_SLOTS[slot];
  const clientId = adsenseClientId(ads);
  const slotId = ads.slots[slot]?.slotId ?? "";
  const live = Boolean(clientId && slotId);

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
        <AdSenseUnit client={clientId} slotId={slotId} format={config.adsenseFormat} />
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
export async function LeaderboardAd({ slot, className }: AdSlotProps) {
  const ads = await getAdSettings();
  if (!isAdSlotVisible(ads, slot)) return null;
  return (
    <div className={cn("py-4", className)}>
      <AdSlot slot={slot} />
    </div>
  );
}
