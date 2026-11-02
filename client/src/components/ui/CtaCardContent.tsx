import { ButtonGroup, type ButtonSize } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import type { CtaCard } from "@/types/cms";

interface CtaCardContentProps {
  card: CtaCard;
  /** Typography for the card title, e.g. `heading-card` or `text-callout font-bold`. */
  titleClassName?: string;
  textClassName?: string;
  buttonSize?: ButtonSize;
}

/** Eyebrow, title, text and buttons of a CMS "CTA card" component. */
export function CtaCardContent({
  card,
  titleClassName = "heading-card",
  textClassName,
  buttonSize,
}: CtaCardContentProps) {
  return (
    <>
      {card.eyebrow && <span className="text-body font-bold text-brand">{card.eyebrow}</span>}
      <h3 className={cn("mb-1", titleClassName)}>{card.title}</h3>
      {card.text && <p className={textClassName}>{card.text}</p>}
      <ButtonGroup buttons={card.buttons} size={buttonSize} className="mt-3.5" />
    </>
  );
}
