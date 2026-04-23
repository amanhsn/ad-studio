"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { InfoCircle, ShieldDone, Danger, CloseSquare } from "react-iconly";

const alertVariants = cva(
  "relative flex gap-3 rounded-4 border px-4 py-3",
  {
    variants: {
      variant: {
        info: "border-border-brand bg-surface-brand text-content-brand",
        success: "border-border-success bg-surface-success text-content-success",
        warning: "border-border-warning bg-surface-warning text-content-warning",
        error: "border-border-critical bg-surface-critical text-content-error",
        neutral: "border-border-primary bg-surface-secondary text-content-primary",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: ReactNode;
  title?: string;
  onDismiss?: () => void;
}

const iconStyle = { width: 16, height: 16 };

const defaultIcons: Record<string, ReactNode> = {
  info: <InfoCircle set="light" primaryColor="currentColor" style={iconStyle} />,
  success: <ShieldDone set="light" primaryColor="currentColor" style={iconStyle} />,
  warning: <Danger set="light" primaryColor="currentColor" style={iconStyle} />,
  error: <CloseSquare set="light" primaryColor="currentColor" style={iconStyle} />,
  neutral: <InfoCircle set="light" primaryColor="currentColor" style={iconStyle} />,
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, title, onDismiss, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        data-slot="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <span className="shrink-0 mt-[2px]">
          {icon ?? defaultIcons[variant ?? "info"]}
        </span>
        <div className="flex-1 flex flex-col gap-1">
          {title && (
            <p className="text-label-sm font-semibold">{title}</p>
          )}
          {children && (
            <div className="text-body-sm opacity-90">{children}</div>
          )}
        </div>
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
Alert.displayName = "Alert";

export { Alert, alertVariants };
