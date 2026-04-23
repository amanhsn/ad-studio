"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * CVA variants for TooltipContent sizing
 * -------------------------------------------------------------------------- */

const tooltipVariants = cva(
  [
    "z-50 rounded-4 bg-fill-inverse text-content-inverse shadow-md",
    "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
    "data-[side=top]:slide-in-from-bottom-2",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-3 py-1 text-label-xs",
        md: "px-4 py-2 text-label-sm",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

/* ---------------------------------------------------------------------------
 * TooltipProvider
 * -------------------------------------------------------------------------- */

const TooltipProvider = ({
  delayDuration = 300,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);
TooltipProvider.displayName = "TooltipProvider";

/* ---------------------------------------------------------------------------
 * Tooltip (Root)
 * -------------------------------------------------------------------------- */

const Tooltip = TooltipPrimitive.Root;

/* ---------------------------------------------------------------------------
 * TooltipTrigger
 * -------------------------------------------------------------------------- */

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ ...props }, ref) => (
  <TooltipPrimitive.Trigger ref={ref} asChild {...props} />
));
TooltipTrigger.displayName = "TooltipTrigger";

/* ---------------------------------------------------------------------------
 * TooltipContent
 * -------------------------------------------------------------------------- */

export interface TooltipContentProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
      "content"
    >,
    VariantProps<typeof tooltipVariants> {
  showArrow?: boolean;
}

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(
  (
    {
      className,
      size,
      showArrow = false,
      sideOffset = 8,
      side,
      align,
      children,
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip"
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(tooltipVariants({ size }), className)}
        {...props}
      >
        {children}
        {showArrow && (
          <TooltipPrimitive.Arrow className="fill-fill-inverse" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = "TooltipContent";

/* ---------------------------------------------------------------------------
 * Backward-compat legacy TooltipProps type
 * -------------------------------------------------------------------------- */

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delayMs?: number;
  children: React.ReactNode;
}

/* ---------------------------------------------------------------------------
 * Exports
 * -------------------------------------------------------------------------- */

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  tooltipVariants,
};
