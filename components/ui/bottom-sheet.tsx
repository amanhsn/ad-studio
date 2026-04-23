"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variants ── */

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-surface-elevated shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:duration-300 data-[state=closed]:duration-300",
  {
    variants: {
      side: {
        bottom:
          "inset-x-0 bottom-0 rounded-t-8 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        top:
          "inset-x-0 top-0 rounded-b-8 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        left:
          "inset-y-0 left-0 rounded-r-8 w-3/4 max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        right:
          "inset-y-0 right-0 rounded-l-8 w-3/4 max-w-sm data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
      },
      size: {
        sm: "max-h-[40vh]",
        md: "max-h-[60vh]",
        lg: "max-h-[85vh]",
        full: "max-h-[95vh]",
      },
    },
    compoundVariants: [
      // Size only applies to top/bottom; left/right are full height
      { side: "left", size: "sm", className: "max-h-none" },
      { side: "left", size: "md", className: "max-h-none" },
      { side: "left", size: "lg", className: "max-h-none" },
      { side: "left", size: "full", className: "max-h-none" },
      { side: "right", size: "sm", className: "max-h-none" },
      { side: "right", size: "md", className: "max-h-none" },
      { side: "right", size: "lg", className: "max-h-none" },
      { side: "right", size: "full", className: "max-h-none" },
    ],
    defaultVariants: {
      side: "bottom",
      size: "md",
    },
  }
);

/* ── Overlay ── */

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

/* ── Root ── */

type SheetProps = React.ComponentPropsWithoutRef<typeof Dialog.Root>;

const Sheet = Dialog.Root;
Sheet.displayName = "Sheet";

/* ── Trigger ── */

const SheetTrigger = Dialog.Trigger;
SheetTrigger.displayName = "SheetTrigger";

/* ── Content ── */

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className, side = "bottom", size, children, ...props }, ref) => (
  <Dialog.Portal>
    <SheetOverlay />
    <Dialog.Content
      ref={ref}
      data-slot="sheet"
      className={cn(sheetVariants({ side, size }), className)}
      {...props}
    >
      {/* Drag handle for bottom side */}
      {side === "bottom" && (
        <div className="h-[4px] w-[36px] rounded-full bg-border-secondary mx-auto mt-3" />
      )}
      {children}
    </Dialog.Content>
  </Dialog.Portal>
));
SheetContent.displayName = "SheetContent";

/* ── Header ── */

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 px-5 pt-4", className)}
    {...props}
  />
));
SheetHeader.displayName = "SheetHeader";

/* ── Title ── */

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn(
      "text-heading-xs font-semibold text-content-primary",
      className
    )}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

/* ── Description ── */

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-body-sm text-content-secondary", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

/* ── Footer ── */

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-5 pb-5",
      className
    )}
    {...props}
  />
));
SheetFooter.displayName = "SheetFooter";

/* ── Close Button ── */

const SheetCloseButton = React.forwardRef<
  React.ComponentRef<typeof Dialog.Close>,
  React.ComponentPropsWithoutRef<typeof Dialog.Close>
>(({ className, ...props }, ref) => (
  <Dialog.Close
    ref={ref}
    className={cn(
      "absolute right-4 top-4 flex items-center justify-center w-[28px] h-[28px] rounded-full text-content-secondary hover:bg-fill-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    aria-label="Close"
    {...props}
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M12 4L4 12M4 4L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </Dialog.Close>
));
SheetCloseButton.displayName = "SheetCloseButton";

/* ── Bottom Sheet Item (preserved) ── */

export interface BottomSheetItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
}

function BottomSheetItem({
  label,
  description,
  icon,
  selected,
  disabled,
  className,
  ...props
}: BottomSheetItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-3 rounded-4 px-4 py-3 text-left transition-colors",
        selected
          ? "bg-surface-brand text-content-brand"
          : "text-content-primary hover:bg-fill-primary",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
          {icon}
        </span>
      )}
      <div className="flex-1 flex flex-col">
        <span className="text-label-sm font-medium">{label}</span>
        {description && (
          <span className="text-body-xs text-content-secondary">
            {description}
          </span>
        )}
      </div>
    </button>
  );
}

/* ── Backward-compat aliases ── */

const BottomSheet = Sheet;
type BottomSheetProps = SheetProps;

/* ── Exports ── */

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetCloseButton,
  sheetVariants,
  BottomSheet,
  BottomSheetItem,
};

export type { SheetProps, SheetContentProps, BottomSheetProps };
