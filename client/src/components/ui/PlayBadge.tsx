import { PlayIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

type PlayBadgeSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<PlayBadgeSize, string> = {
  sm: "size-[34px]",
  md: "size-[52px]",
  lg: "size-20",
};

const ICON_SIZE: Record<PlayBadgeSize, number> = { sm: 14, md: 20, lg: 32 };

interface PlayBadgeProps {
  size?: PlayBadgeSize;
  /** Use a smaller badge below the `sm` breakpoint (compact list cards). */
  compactOnMobile?: boolean;
  className?: string;
}

/** Red circular play button centered over a thumbnail. */
export function PlayBadge({ size = "md", compactOnMobile = false, className }: PlayBadgeProps) {
  return (
    <span
      className={cn(
        "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-canvas shadow-play",
        SIZE_CLASSES[size],
        compactOnMobile && "max-sm:size-[34px] max-sm:[&>svg]:size-3.5",
        className,
      )}
    >
      <PlayIcon size={ICON_SIZE[size]} />
    </span>
  );
}
