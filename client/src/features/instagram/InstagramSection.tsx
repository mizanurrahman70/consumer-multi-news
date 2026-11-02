"use client";

import type { ReactNode } from "react";

import { CtaCardContent } from "@/components/ui/CtaCardContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/config/navigation";

import { InstagramEmbeds } from "./InstagramEmbeds";
import { useInstagram } from "./useInstagram";

interface InstagramSectionProps {
  /** Server-rendered rectangle ad shown beside the follow card. */
  ad?: ReactNode;
}

/** Strapi "Instagram Post" entries followed by a follow card and an ad. */
export function InstagramSection({ ad }: InstagramSectionProps) {
  const { data } = useInstagram();
  if (!data) return null;

  return (
    <section id={SECTION_IDS.instagram} className="mt-10 scroll-mt-40">
      <SectionHeader heading={data.heading} />
      {data.posts.length > 0 && <InstagramEmbeds posts={data.posts} />}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-card bg-surface p-6">
        <div>
          <CtaCardContent card={data.card} textClassName="text-muted" />
        </div>
        {ad}
      </div>
    </section>
  );
}
