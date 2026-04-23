"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const fabVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold shadow-md transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:text-content-primary-disabled disabled:bg-fill-primary-disabled",
  {
    variants: {
      variant: {
        brand:
          "bg-fill-brand text-content-on-brand hover:bg-fill-brand-hover active:bg-fill-brand-active",
        primary:
          "bg-fill-inverse text-content-inverse hover:bg-fill-inverse-hover active:bg-fill-inverse-active",
        secondary:
          "bg-surface-elevated text-content-primary border border-border-primary hover:bg-fill-primary active:bg-fill-primary-active",
      },
      size: {
        sm: "h-[40px] min-w-[40px] text-label-sm",
        md: "h-[48px] min-w-[48px] text-label-md",
        lg: "h-[56px] min-w-[56px] text-label-lg",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-8",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
      shape: "circle",
    },
  }
);

export interface FABProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  icon: ReactNode;
  label?: string;
}

const FAB = forwardRef<HTMLButtonElement, FABProps>(
  ({ className, variant, size, shape, icon, label, ...props }, ref) => {
    const isExtended = !!label;

    return (
      <button
        ref={ref}
        data-slot="fab"
        type="button"
        className={cn(
          fabVariants({ variant, size, shape }),
          isExtended ? "px-5" : "px-0",
          className
        )}
        {...props}
      >
        <span className="shrink-0">{icon}</span>
        {label && <span>{label}</span>}
      </button>
    );
  }
);
FAB.displayName = "FAB";

export { FAB, fabVariants };
