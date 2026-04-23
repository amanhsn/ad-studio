"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const reactionChipVariants = cva(
  "inline-flex items-center rounded-full ring-1 ring-inset transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-[28px] px-2 text-label-xs gap-1",
        md: "h-[32px] px-3 text-label-sm gap-[6px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ReactionChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof reactionChipVariants> {
  emoji: string;
  count?: number;
  active?: boolean;
}

const ReactionChip = forwardRef<HTMLButtonElement, ReactionChipProps>(
  ({ className, size, emoji, count, active = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="reaction-chip"
        type="button"
        className={cn(
          reactionChipVariants({ size }),
          active
            ? "ring-border-brand bg-surface-brand text-content-brand"
            : "ring-border-primary bg-surface-primary-variant text-content-primary hover:bg-fill-primary",
          className
        )}
        {...props}
      >
        <span className={cn(size === "sm" ? "text-[14px]" : "text-[16px]")}>
          {emoji}
        </span>
        {count !== undefined && (
          <span className="font-medium">{count}</span>
        )}
      </button>
    );
  }
);
ReactionChip.displayName = "ReactionChip";

export { ReactionChip, reactionChipVariants };
