import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Centered page-width wrapper with responsive side gutters. */
export function Container<T extends ElementType = "div">({ as, className, ...props }: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("mx-auto w-full max-w-wrap px-4 md:px-6", className)} {...props} />;
}
