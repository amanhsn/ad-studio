"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// CVA variants
// ---------------------------------------------------------------------------

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-fill-tertiary-disabled",
  {
    variants: {
      size: {
        sm: "h-[4px]",
        md: "h-[6px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const sliderThumbVariants = cva(
  [
    "block rounded-full bg-fill-inverse border-2 border-border-primary shadow-xs",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "h-[16px] w-[16px]",
        md: "h-[20px] w-[20px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SliderProps
  extends Omit<
      ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      "asChild"
    >,
    VariantProps<typeof sliderTrackVariants> {
  /** When false the filled range indicator is hidden. @default true */
  includeRange?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Slider = forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      size = "md",
      includeRange = true,
      value,
      defaultValue,
      disabled,
      orientation,
      min,
      max,
      step,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const thumbCount = (value ?? defaultValue ?? [0]).length;

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[disabled]:opacity-50",
          className
        )}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        orientation={orientation}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
        {...props}
      >
        <SliderPrimitive.Track className={cn(sliderTrackVariants({ size }))}>
          {includeRange && (
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-fill-inverse" />
          )}
        </SliderPrimitive.Track>

        {Array.from({ length: thumbCount }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(sliderThumbVariants({ size }))}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);
Slider.displayName = "Slider";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { Slider, sliderThumbVariants, sliderTrackVariants };
