"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

const toggleVariants = cva(
  "group/switch relative inline-flex items-center shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:cursor-not-allowed data-[state=checked]:bg-surface-inverse data-[state=unchecked]:bg-fill-tertiary disabled:data-[state=unchecked]:bg-fill-tertiary-disabled disabled:data-[state=checked]:bg-fill-inverse-disabled",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-[40px]",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const thumbSize = {
  sm: "h-[12px] w-[12px]",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const thumbTranslate = {
  sm: "data-[state=checked]:translate-x-5",
  md: "data-[state=checked]:translate-x-6",
  lg: "data-[state=checked]:translate-x-7",
};

export interface ToggleProps
  extends Omit<
      ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
      "size"
    >,
    VariantProps<typeof toggleVariants> {
  label?: string;
}

const Toggle = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ className, size = "md", label, ...props }, ref) => {
  const toggle = (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none inline-block rounded-full bg-fill-primary-variant border border-border-primary shadow-xs transition-all data-[state=unchecked]:translate-x-[2px] group-disabled/switch:bg-fill-primary-variant-disabled",
          thumbSize[size ?? "md"],
          thumbTranslate[size ?? "md"]
        )}
      />
    </SwitchPrimitive.Root>
  );

  if (label) {
    return (
      <label className="inline-flex items-center gap-3 cursor-pointer">
        {toggle}
        <span className="text-label-md text-content-primary">{label}</span>
      </label>
    );
  }

  return toggle;
});
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
