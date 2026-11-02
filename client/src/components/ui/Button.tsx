import type { ComponentPropsWithoutRef } from "react";

import { ExternalLink } from "@/components/ui/ExternalLink";
import { cn } from "@/lib/utils/cn";
import type { ButtonItem, ButtonVariant } from "@/types/cms";

export type ButtonSize = "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  yellow: "bg-accent text-ink hover:text-ink hover:brightness-95",
  dark: "bg-ink text-canvas hover:bg-ink-soft hover:text-canvas",
  red: "bg-brand text-canvas hover:bg-brand-dark hover:text-canvas",
  light: "bg-canvas text-ink hover:text-ink hover:brightness-95",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "h-11 px-[18px] text-body-sm",
  lg: "h-13 px-[26px] text-body",
};

/** Class string for the pill button style, usable on <a> and <button>. */
export function buttonClasses(variant: ButtonVariant = "dark", size: ButtonSize = "md", className?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-bold whitespace-nowrap transition",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof ExternalLink> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/** Pill-shaped link button. Most CTAs on this site point to social platforms. */
export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <ExternalLink className={buttonClasses(variant, size, className)} {...props} />;
}

interface ButtonGroupProps {
  buttons: ButtonItem[];
  size?: ButtonSize;
  className?: string;
}

/** Row of CMS-managed buttons (label, link, colour variant). */
export function ButtonGroup({ buttons, size, className }: ButtonGroupProps) {
  if (buttons.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {buttons.map((button) => (
        <ButtonLink
          key={`${button.label}-${button.href}`}
          variant={button.variant}
          size={size}
          href={button.href}
          external={button.external}
        >
          {button.label}
        </ButtonLink>
      ))}
    </div>
  );
}
