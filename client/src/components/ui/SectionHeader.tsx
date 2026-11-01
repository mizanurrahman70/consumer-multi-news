import { ExternalLink } from "@/components/ui/ExternalLink";

interface SectionHeaderProps {
  title: string;
  /** Optional "see more" link on the right. */
  link?: { label: string; href: string };
  headingId?: string;
}

/** Section title with the red underline rule and an optional link. */
export function SectionHeader({ title, link, headingId }: SectionHeaderProps) {
  return (
    <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3 border-b-3 border-brand pb-1.5">
      <h2 id={headingId} className="heading-section">
        {title}
      </h2>
      {link && (
        <ExternalLink href={link.href} className="text-body-sm font-semibold text-brand hover:underline">
          {link.label} →
        </ExternalLink>
      )}
    </div>
  );
}
