"use client";

import type { ReactNode } from "react";

import { CtaCardContent } from "@/components/ui/CtaCardContent";
import { LazyMount } from "@/components/ui/LazyMount";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";
import { useSection } from "@/hooks/useSection";

import { FacebookPagePlugin } from "./FacebookPagePlugin";

interface FacebookPageSectionProps {
  /** Server-rendered half-page ad shown beside the timeline on desktop. */
  ad?: ReactNode;
}

/** Facebook timeline, a follow card, and a sticky half-page ad on desktop. */
export function FacebookPageSection({ ad }: FacebookPageSectionProps) {
  const data = useSection("facebookPage");
  if (!data) return null;

  return (
    <section id={SECTION_IDS.facebook} className="mt-10 scroll-mt-40">
      <SectionHeader heading={data.heading} />

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,500px)_minmax(0,1fr)]">
          {/* The Page Plugin is a heavy iframe: mount it only when the reader gets close. */}
          <LazyMount className="mx-auto min-h-[400px] w-full max-w-[500px] rounded-card bg-surface">
            <FacebookPagePlugin pageUrl={data.pageUrl} title={`${data.siteName} on Facebook`} />
          </LazyMount>

          <div className="flex flex-col gap-2 rounded-card bg-ink p-[22px] text-canvas">
            <CtaCardContent card={data.card} textClassName="text-body-sm text-on-dark-muted" />
          </div>
        </div>

        <aside className="flex justify-center">
          <div className="sticky top-[150px] self-start">{ad}</div>
        </aside>
      </div>
    </section>
  );
}
