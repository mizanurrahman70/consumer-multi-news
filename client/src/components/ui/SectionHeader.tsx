import { ExternalLink } from "@/components/ui/ExternalLink";
import { isExternalUrl } from "@/lib/utils/links";
import type { SectionHeading } from "@/types/cms";

interface SectionHeaderProps {
  heading: SectionHeading;
  headingId?: string;
}

/** Section title with the red underline rule and an optional "see more" link. */
export function SectionHeader({ heading, headingId }: SectionHeaderProps) {
  const { title, link } = heading;
  return (
    <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3 border-b-3 border-brand pb-1.5">
      <h2 id={headingId} className="heading-section">
        {title}
      </h2>
      {link && (
        <ExternalLink
          href={link.href}
          external={isExternalUrl(link.href)}
          className="text-body-sm font-semibold text-brand hover:underline"
        >
          {link.label} →
        </ExternalLink>
      )}
    </div>
  );
}
