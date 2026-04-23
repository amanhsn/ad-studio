"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useEffect, type HTMLAttributes, type ReactNode } from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

/* ---------------------------------------------------------------------------
 * CVA variants (kept for backward compat)
 * --------------------------------------------------------------------------- */

const snackbarVariants = cva(
  "flex items-center gap-3 rounded-4 px-4 py-3 shadow-md transition-all",
  {
    variants: {
      variant: {
        success: "bg-fill-success text-white",
        critical: "bg-fill-critical text-white",
        warning: "bg-fill-warning text-neutral-100",
        neutral: "bg-surface-inverse text-content-inverse",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

/* ---------------------------------------------------------------------------
 * Toaster — drop-in sonner wrapper styled for the design system
 * --------------------------------------------------------------------------- */

interface ToasterProps {
  theme?: "light" | "dark" | "system";
}

function Toaster({ theme = "system" }: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-center"
      theme={theme}
      toastOptions={{
        classNames: {
          toast: cn(
            "rounded-4 shadow-md text-label-sm font-medium",
            "bg-surface-inverse text-content-inverse",
            "border-none"
          ),
          success: "!bg-fill-success !text-white",
          error: "!bg-fill-critical !text-white",
          warning: "!bg-fill-warning !text-neutral-100",
          actionButton:
            "text-label-sm font-semibold underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity",
          closeButton:
            "opacity-70 hover:opacity-100 transition-opacity",
          description: "text-body-sm opacity-80",
        },
      }}
    />
  );
}

/* ---------------------------------------------------------------------------
 * toast — convenience wrapper around sonnerToast
 * --------------------------------------------------------------------------- */

type ToastOptions = {
  action?: { label: string; onClick: () => void };
  duration?: number;
  description?: string;
  id?: string | number;
  onDismiss?: (t: unknown) => void;
  onAutoClose?: (t: unknown) => void;
};

function toast(message: ReactNode, options?: ToastOptions) {
  const mapped = options
    ? {
        ...options,
        action: options.action
          ? { label: options.action.label, onClick: options.action.onClick }
          : undefined,
      }
    : undefined;
  return sonnerToast(message, mapped);
}

toast.success = (message: ReactNode, options?: ToastOptions) => {
  const mapped = options
    ? {
        ...options,
        action: options.action
          ? { label: options.action.label, onClick: options.action.onClick }
          : undefined,
      }
    : undefined;
  return sonnerToast.success(message, mapped);
};

toast.error = (message: ReactNode, options?: ToastOptions) => {
  const mapped = options
    ? {
        ...options,
        action: options.action
          ? { label: options.action.label, onClick: options.action.onClick }
          : undefined,
      }
    : undefined;
  return sonnerToast.error(message, mapped);
};

toast.warning = (message: ReactNode, options?: ToastOptions) => {
  const mapped = options
    ? {
        ...options,
        action: options.action
          ? { label: options.action.label, onClick: options.action.onClick }
          : undefined,
      }
    : undefined;
  return sonnerToast.warning(message, mapped);
};

toast.custom = (jsx: (id: number | string) => React.ReactElement, options?: Omit<ToastOptions, "action">) => {
  return sonnerToast.custom(jsx, options);
};

toast.dismiss = sonnerToast.dismiss;

/* ---------------------------------------------------------------------------
 * Snackbar — deprecated backward-compat bridge
 * --------------------------------------------------------------------------- */

export interface SnackbarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof snackbarVariants> {
  icon?: ReactNode;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  duration?: number;
  open?: boolean;
}

const variantToToastMethod: Record<string, keyof Pick<typeof toast, "success" | "error" | "warning">> = {
  success: "success",
  critical: "error",
  warning: "warning",
};

/** @deprecated Use `toast()` instead */
function Snackbar({
  variant = "neutral",
  children,
  action,
  onDismiss,
  duration = 5000,
  open,
}: SnackbarProps) {
  useEffect(() => {
    if (!open) return;

    const method = variant ? variantToToastMethod[variant] : undefined;
    const opts: ToastOptions = {
      duration,
      action: action ? { label: action.label, onClick: action.onClick } : undefined,
      onDismiss: onDismiss ? () => onDismiss() : undefined,
    };

    if (method) {
      toast[method](children, opts);
    } else {
      toast(children, opts);
    }
  }, [open, variant, children, action, onDismiss, duration]);

  return null;
}

/* ---------------------------------------------------------------------------
 * Exports
 * --------------------------------------------------------------------------- */

export { Toaster, toast, Snackbar, snackbarVariants };
