import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

/** Shimmering placeholder block; size it with utility classes. */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("skeleton h-3.5 rounded", className)} />;
}
