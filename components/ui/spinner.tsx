"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-[16px] w-[16px]",
      md: "h-[24px] w-[24px]",
      lg: "h-[32px] w-[32px]",
      xl: "h-[40px] w-[40px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SpinnerProps
  extends HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, label = "Loading", ...props }, ref) => (
    <svg
      ref={ref}
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), "text-fill-brand", className)}
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
