"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

const checkboxVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center border-2 transition-colors",
    "border-border-tertiary bg-transparent",
    "hover:border-border-tertiary-hover",
    "data-[state=checked]:bg-fill-inverse data-[state=checked]:border-fill-inverse data-[state=checked]:text-content-inverse",
    "data-[state=checked]:hover:bg-fill-inverse-hover",
    "data-[state=indeterminate]:bg-fill-inverse data-[state=indeterminate]:border-fill-inverse data-[state=indeterminate]:text-content-inverse",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:border-border-tertiary-disabled disabled:bg-fill-primary-disabled",
    "disabled:data-[state=checked]:bg-fill-inverse-disabled",
  ],
  {
    variants: {
      size: {
        sm: "h-[16px] w-[16px] rounded-1",
        md: "h-[20px] w-[20px] rounded-1",
        lg: "h-[24px] w-[24px] rounded-1",
        xl: "h-[28px] w-[28px] rounded-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const iconSize: Record<string, number> = { sm: 10, md: 12, lg: 14, xl: 16 };

function CheckIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M11.5 3.5L5.5 10L2.5 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface CheckboxProps
  extends Omit<
      ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
      "size"
    >,
    VariantProps<typeof checkboxVariants> {
  label?: string;
}

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = "md", label, ...props }, ref) => {
  const s = iconSize[size ?? "md"];

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {props.checked === "indeterminate" ? (
          <MinusIcon size={s} />
        ) : (
          <CheckIcon size={s} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label) {
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        {checkbox}
        <span className="text-label-md text-content-primary">{label}</span>
      </label>
    );
  }

  return checkbox;
});
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
