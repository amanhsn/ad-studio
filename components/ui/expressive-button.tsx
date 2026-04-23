"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const expressiveButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 font-semibold rounded-full bg-gradient-to-r from-primary-60 via-primary-70 to-primary-80 text-white shadow-lg hover:from-primary-70 hover:via-primary-80 hover:to-primary-90 active:from-primary-80 active:via-primary-90 active:to-primary-100 transition-all duration-200 disabled:text-content-primary-disabled disabled:bg-fill-primary-disabled disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        md: "h-[44px] px-6 text-label-md",
        lg: "h-[52px] px-8 text-label-lg",
        xl: "h-[60px] px-10 text-label-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ExpressiveButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof expressiveButtonVariants> {
  icon?: ReactNode;
  loading?: boolean;
}

const ExpressiveButton = forwardRef<HTMLButtonElement, ExpressiveButtonProps>(
  ({ className, size, icon, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="expressive-button"
        className={cn(expressiveButtonVariants({ size }), className)}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-[20px] w-[20px]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);
ExpressiveButton.displayName = "ExpressiveButton";

export { ExpressiveButton, expressiveButtonVariants };
