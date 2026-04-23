"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

const tagVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-2 border",
  {
    variants: {
      variant: {
        default:
          "border-border-primary bg-fill-primary text-content-primary",
        brand:
          "border-border-brand bg-surface-brand text-content-brand",
        success:
          "border-border-success bg-surface-success text-content-success",
        warning:
          "border-border-warning bg-surface-warning text-content-warning",
        error:
          "border-border-critical bg-surface-critical text-content-critical",
      },
      size: {
        sm: "h-[20px] px-[6px] text-label-xs",
        md: "h-[24px] px-[8px] text-label-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  label: string;
  onRemove?: () => void;
  icon?: ReactNode;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, label, onRemove, icon, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="tag"
        className={cn(tagVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity ml-0.5"
            aria-label={`Remove ${label}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
