"use client";

import { cn } from "@/lib/utils";
import { useEffect, useCallback, type HTMLAttributes } from "react";

export interface ErrorModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  variant?: "error" | "warning" | "default";
  title: string;
  description?: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

function ErrorModal({
  open,
  onClose,
  variant = "default",
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  ...props
}: ErrorModalProps) {
  const handleEscape = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  if (!open) return null;

  const iconByVariant = {
    error: (
      /* X circle */
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-content-error"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M15 9L9 15M9 9l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    warning: (
      /* Triangle exclamation */
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-content-warning"
      >
        <path
          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12"
          y1="9"
          x2="12"
          y2="13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    default: (
      /* Info circle */
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="text-content-brand"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <line
          x1="12"
          y1="16"
          x2="12"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
  };

  const iconBgByVariant = {
    error: "bg-error-50/15",
    warning: "bg-warning-50/15",
    default: "bg-fill-brand/15",
  };

  const primaryBtnByVariant = {
    error: "bg-fill-critical hover:bg-fill-critical-hover",
    warning: "bg-fill-warning hover:bg-fill-warning-hover",
    default: "bg-fill-brand hover:bg-fill-brand-hover",
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-slot="error-modal"
        role="alertdialog"
        aria-modal="true"
        className={cn(
          "rounded-8 border border-border-primary bg-surface-elevated shadow-xl p-6 max-w-[400px] w-full mx-4",
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div
            className={cn(
              "w-[56px] h-[56px] rounded-full flex items-center justify-center",
              iconBgByVariant[variant]
            )}
          >
            {iconByVariant[variant]}
          </div>

          {/* Title */}
          <h2 className="text-heading-sm font-semibold text-content-primary">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="text-body-sm text-content-secondary">{description}</p>
          )}

          {/* Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex items-center gap-3 w-full mt-2">
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="flex-1 rounded-full border border-border-primary py-[10px] text-label-sm font-medium text-content-primary hover:bg-fill-primary transition-colors"
                >
                  {secondaryAction.label}
                </button>
              )}
              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className={cn(
                    "flex-1 rounded-full py-[10px] text-label-sm font-semibold text-white transition-colors",
                    primaryBtnByVariant[variant]
                  )}
                >
                  {primaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { ErrorModal };
