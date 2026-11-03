import type { ReactNode } from "react";

import { RichText } from "@/components/cms/RichText";
import { Container } from "@/components/ui/Container";
import type { CompanyPageBase } from "@/types/cms";

interface CompanyPageLayoutProps {
  page: CompanyPageBase;
  /** Small line under the title, e.g. "Last updated: …". */
  meta?: ReactNode;
  /** Shown between the header and the rich text (e.g. a cover image). */
  before?: ReactNode;
  /** Shown after the rich text (e.g. contact details, buttons). */
  children?: ReactNode;
}

/** Shared layout for About, Advertise, Privacy policy and Contact. */
export function CompanyPageLayout({ page, meta, before, children }: CompanyPageLayoutProps) {
  return (
    <Container as="article" className="py-10">
      <div className="max-w-[820px]">
        <header className="mb-8 border-b-3 border-brand pb-4">
          <h1 className="text-hero font-bold">{page.title}</h1>
          {page.subtitle && <p className="mt-2 text-lead text-muted">{page.subtitle}</p>}
          {meta && <p className="text-meta-muted mt-2">{meta}</p>}
        </header>
        {before}
        {page.content.length > 0 && <RichText content={page.content} />}
        {children}
      </div>
    </Container>
  );
}
