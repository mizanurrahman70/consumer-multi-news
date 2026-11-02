import { ButtonGroup } from "@/components/ui/Button";
import { SECTION_IDS } from "@/config/navigation";
import type { CtaCard } from "@/types/cms";

interface TipSectionProps {
  card: CtaCard;
}

/** Yellow call-to-action asking readers to send consumer complaints (Strapi → Home Page → tipBlock). */
export function TipSection({ card }: TipSectionProps) {
  return (
    <section
      id={SECTION_IDS.tip}
      className="mt-12 flex scroll-mt-40 flex-wrap items-center justify-between gap-4 rounded-card bg-accent p-6"
    >
      <div>
        <h2 className="mb-1 text-callout font-bold">{card.title}</h2>
        {card.text && <p className="text-body">{card.text}</p>}
      </div>
      <ButtonGroup buttons={card.buttons} size="lg" />
    </section>
  );
}
