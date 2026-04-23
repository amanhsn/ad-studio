"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      variant: {
        primary: "bg-surface-secondary",
        secondary: "bg-surface-secondary",
        "secondary-variant":
          "bg-surface-secondary-variant ring-1 ring-inset ring-border-primary",
        none: "bg-transparent",
      },
      size: {
        sm: "gap-[2px] p-[2px] rounded-full",
        md: "gap-1 p-1 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

export interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends VariantProps<typeof controlVariants> {
  options: SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

function SegmentedControl({
  className,
  variant,
  size = "sm",
  options,
  value,
  onValueChange,
}: SegmentedControlProps) {
  const id = useId();

  return (
    <Tabs.Root
      data-slot="segmented-control"
      value={value}
      onValueChange={onValueChange}
      className={cn(controlVariants({ variant, size }), className)}
    >
      <Tabs.List className="inline-flex items-center gap-inherit">
        {options.map((option) => {
          const isActive = option.value === value;
          const isPrimary = variant === "primary";
          return (
            <Tabs.Trigger
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                "relative z-10 inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer",
                size === "sm" && "h-7 px-3 text-label-sm rounded-full",
                size === "md" && "h-9 px-[14px] text-label-md rounded-full",
                isActive
                  ? isPrimary
                    ? "text-content-inverse"
                    : "text-content-primary"
                  : "text-content-secondary hover:text-content-primary",
                option.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={`segmented-indicator-${id}`}
                  className={cn(
                    "absolute inset-0",
                    size === "sm" && "rounded-full",
                    size === "md" && "rounded-full",
                    isPrimary
                      ? "bg-fill-inverse"
                      : "bg-surface-elevated shadow-xs"
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                {option.icon && (
                  <span className="shrink-0">{option.icon}</span>
                )}
                {option.label}
              </span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>
    </Tabs.Root>
  );
}

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl, controlVariants };
