"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import { TrendingList } from "./TrendingList";
import { useTrendingVideos } from "./useTrendingVideos";

const headingClass = "heading-side mb-1.5 border-b-3 border-brand pb-1.5";
const SKELETON_WIDTHS = ["w-[90%]", "w-4/5", "w-[85%]", "w-3/4", "w-[88%]"];

function TrendingSkeleton() {
  return (
    <div aria-hidden="true">
      <Skeleton className="mb-3 h-6 w-40" />
      {SKELETON_WIDTHS.map((width) => (
        <div key={width} className="border-b border-line py-4">
          <Skeleton className={`h-4 ${width}`} />
        </div>
      ))}
    </div>
  );
}

/** "Trending Now" numbered list (Strapi → Home Page → trendingVideos). */
export function TrendingSection() {
  const { data, isLoading } = useTrendingVideos();
  if (isLoading) return <TrendingSkeleton />;
  if (!data || data.videos.length === 0) return null;

  return (
    <>
      <h2 className={headingClass}>{data.title}</h2>
      <TrendingList videos={data.videos} />
    </>
  );
}
