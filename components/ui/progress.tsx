"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const progressVariants = cva("w-full overflow-hidden rounded-full bg-fill-tertiary", {
  variants: {
    size: {
      sm: "h-[4px]",
      md: "h-[8px]",
      lg: "h-[12px]",
    },
    variant: {
      brand: "",
      success: "",
      warning: "",
      error: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "brand",
  },
});

const barColors = {
  brand: "bg-fill-brand",
  success: "bg-fill-success",
  warning: "bg-fill-warning",
  error: "bg-fill-critical",
};

export interface ProgressProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      variant = "brand",
      value = 0,
      max = 100,
      label,
      showValue,
      ...props
    },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div data-slot="progress" className="flex flex-col gap-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-label-sm font-medium text-content-primary">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-label-sm text-content-secondary">
                {Math.round(pct)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(progressVariants({ size, variant }), className)}
          {...props}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              barColors[variant ?? "brand"]
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress, progressVariants };
