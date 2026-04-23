"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export interface DividerProps
  extends ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: string;
}

const Divider = forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  DividerProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    if (label && orientation === "horizontal") {
      return (
        <div
          data-slot="divider"
          role={decorative ? "none" : "separator"}
          aria-orientation={decorative ? undefined : orientation}
          className={cn("flex items-center gap-3", className)}
        >
          <SeparatorPrimitive.Root
            decorative
            orientation="horizontal"
            className="flex-1 h-px bg-fill-secondary"
          />
          <span className="text-label-sm text-content-tertiary shrink-0">
            {label}
          </span>
          <SeparatorPrimitive.Root
            decorative
            orientation="horizontal"
            className="flex-1 h-px bg-fill-secondary"
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        data-slot="divider"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          orientation === "horizontal"
            ? "h-px w-full bg-fill-secondary"
            : "w-px self-stretch bg-fill-secondary",
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

const Separator = Divider;

export { Divider, Separator };
export type { DividerProps as SeparatorProps };
