"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const chipVariants = cva(
  [
    "inline-flex items-center gap-2 font-medium transition-colors",
    "ring-inset ring-[1.5px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:text-content-primary-disabled disabled:ring-border-secondary-disabled disabled:cursor-not-allowed",
    "data-[state=selected]:ring-border-inverse data-[state=selected]:bg-fill-secondary data-[state=selected]:text-content-primary",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "ring-border-primary bg-surface-primary-variant text-content-primary hover:bg-fill-primary",
        error:
          "ring-border-critical bg-surface-critical text-content-error",
      },
      size: {
        sm: "h-7 px-3 text-label-xs rounded-full",
        md: "h-8 px-[10px] text-label-sm rounded-full",
        lg: "h-9 px-4 text-label-sm rounded-full",
        xl: "h-11 px-4 text-label-md rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    Omit<VariantProps<typeof chipVariants>, "variant"> {
  label: string;
  /** Slot rendered before the label */
  start?: ReactNode;
  /** Slot rendered after the label */
  end?: ReactNode;
  /** @deprecated Use `start` instead */
  leftIcon?: ReactNode;
  /** @deprecated Use `end` instead */
  rightIcon?: ReactNode;
  /** Visual variant. Passing `"selected"` is a backward-compat alias for `isActive`. */
  variant?: "default" | "error" | "selected";
  /** When true, renders the chip in its selected / active visual state. */
  isActive?: boolean;
  onRemove?: () => void;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant: variantProp,
      size,
      label,
      start,
      end,
      leftIcon,
      rightIcon,
      isActive: isActiveProp,
      onRemove,
      disabled,
      ...props
    },
    ref
  ) => {
    // Backward compat: variant="selected" sets isActive
    const isActive = isActiveProp || variantProp === "selected";
    const resolvedVariant =
      variantProp === "selected" || variantProp === undefined
        ? "default"
        : variantProp;

    // Slots with deprecated fallbacks
    const startSlot = start ?? leftIcon;
    const endSlot = end ?? rightIcon;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-slot="chip"
        data-state={isActive ? "selected" : undefined}
        className={cn(
          chipVariants({ variant: resolvedVariant, size }),
          className
        )}
        {...props}
      >
        {startSlot && (
          <span className="shrink-0 -ml-[2px]">{startSlot}</span>
        )}
        <span>{label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="shrink-0 -mr-[2px] opacity-60 hover:opacity-100 transition-opacity"
            aria-label={`Remove ${label}`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        {!onRemove && endSlot && (
          <span className="shrink-0 -mr-[2px]">{endSlot}</span>
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
