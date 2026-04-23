"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, useContext, forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ── Size Context ── */

type RadioSize = "sm" | "md";

const RadioSizeContext = createContext<RadioSize>("md");

/* ── CVA Variants ── */

const radioVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center rounded-full",
    "border-2 border-border-primary",
    "transition-all",
    "hover:border-border-tertiary-hover",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:border-border-tertiary-disabled",
  ],
  {
    variants: {
      size: {
        sm: "h-[16px] w-[16px]",
        md: "h-[20px] w-[20px]",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        checked: true,
        className: "border-[5px] border-surface-inverse",
      },
      {
        size: "md",
        checked: true,
        className: "border-[6px] border-surface-inverse",
      },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

/* ── RadioGroup ── */

export interface RadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "asChild"
  > {
  size?: RadioSize;
}

const RadioGroup = forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ size = "md", className, orientation = "vertical", ...props }, ref) => (
  <RadioSizeContext.Provider value={size}>
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col gap-3" : "flex-row gap-5",
        className
      )}
      orientation={orientation}
      {...props}
    />
  </RadioSizeContext.Provider>
));
RadioGroup.displayName = "RadioGroup";

/* ── RadioGroupItem ── */

export interface RadioGroupItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    "asChild"
  > {
  label?: string;
}

const RadioGroupItem = forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ value, label, disabled, className, ...props }, ref) => {
  const size = useContext(RadioSizeContext);

  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        disabled={disabled}
        data-slot="radio-group-item"
        className={cn(
          radioVariants({ size, checked: false }),
          "data-[state=checked]:border-surface-inverse",
          size === "sm"
            ? "data-[state=checked]:border-[5px]"
            : "data-[state=checked]:border-[6px]",
          className
        )}
        {...props}
      />
      {label && (
        <span className="text-label-md text-content-primary">{label}</span>
      )}
    </label>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem, radioVariants };
export type { RadioSize };
