"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

const bannerVariants = cva(
  "flex w-full items-center gap-3 rounded-4 border px-4 py-3",
  {
    variants: {
      variant: {
        info: "border-border-brand bg-surface-brand text-content-brand",
        success: "border-border-success bg-surface-success text-content-success",
        warning: "border-border-warning bg-surface-warning text-content-warning",
        error: "border-border-critical bg-surface-critical text-content-error",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export interface BannerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title?: string;
  description?: string;
  action?: ReactNode;
  onDismiss?: () => void;
  icon?: ReactNode;
}

const defaultIcons: Record<string, ReactNode> = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.5L9 13l4.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L1 18h18L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, title, description, action, onDismiss, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        data-slot="banner"
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <span className="shrink-0">
          {icon ?? defaultIcons[variant ?? "info"]}
        </span>
        <div className="flex flex-1 flex-col gap-0.5">
          {title && (
            <p className="text-label-sm font-semibold">{title}</p>
          )}
          {description && (
            <p className="text-body-sm opacity-90">{description}</p>
          )}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = "Banner";

export { Banner, bannerVariants };
