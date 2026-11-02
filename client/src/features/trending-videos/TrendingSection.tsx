"use client";

import { useSection } from "@/hooks/useSection";

import { TrendingList } from "./TrendingList";

const headingClass = "heading-side mb-1.5 border-b-3 border-brand pb-1.5";

/** "Trending Now" numbered list (Strapi → Home Page → trendingVideos). */
export function TrendingSection() {
  const data = useSection("trendingVideos");
  if (!data || data.videos.length === 0) return null;

  return (
    <>
      <h2 className={headingClass}>{data.title}</h2>
      <TrendingList videos={data.videos} />
    </>
  );
}
