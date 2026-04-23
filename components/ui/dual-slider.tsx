"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva } from "class-variance-authority";
import { forwardRef, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// CVA variants
// ---------------------------------------------------------------------------

const dualSliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full bg-fill-tertiary-disabled",
  {
    variants: {
      size: {
        sm: "",
        md: "",
      },
      orientation: {
        horizontal: "w-full",
        vertical: "h-full",
      },
    },
    compoundVariants: [
      { size: "sm", orientation: "horizontal", class: "h-[4px]" },
      { size: "md", orientation: "horizontal", class: "h-[6px]" },
      { size: "sm", orientation: "vertical", class: "w-[4px]" },
      { size: "md", orientation: "vertical", class: "w-[6px]" },
    ],
    defaultVariants: {
      size: "md",
      orientation: "horizontal",
    },
  }
);

const dualSliderThumbVariants = cva(
  [
    "block rounded-full bg-fill-primary-variant border-2 border-fill-inverse shadow-xs",
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

export interface DualSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  center?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  size?: "sm" | "md";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const DualSlider = forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  DualSliderProps
>(
  (
    {
      value: valueProp,
      defaultValue: defaultValueProp,
      min = -100,
      max = 100,
      step = 1,
      center = 0,
      disabled = false,
      onValueChange,
      size = "md",
      orientation = "horizontal",
      className,
    },
    ref
  ) => {
    // Determine the current value (controlled or uncontrolled handled by
    // Radix internally — we just need to build the 2-thumb array).
    const isControlled = valueProp !== undefined;
    const currentValue = valueProp ?? defaultValueProp ?? center;

    // Build the two-thumb value array: [lower, higher] with center and
    // currentValue arranged so the Range fills between them.
    const sliderValue = useMemo(() => {
      const lo = Math.min(center, currentValue);
      const hi = Math.max(center, currentValue);
      return [lo, hi] as [number, number];
    }, [center, currentValue]);

    // Determine which thumb index represents the "value" thumb.
    // Index 0 = value thumb when value <= center, index 1 otherwise.
    const valueThumbIndex = currentValue <= center ? 0 : 1;

    // Handle value changes from Radix — extract the value thumb's number.
    const handleValueChange = useCallback(
      (newValues: number[]) => {
        if (!onValueChange) return;

        // Radix may move either thumb. We only care about the one that
        // isn't the hidden center thumb. Determine which thumb moved:
        // the center thumb is pinned, so the other one is the real value.
        // However, Radix won't let thumbs cross by default (unless
        // minStepsBetweenThumbs is set). We allow crossing by picking the
        // thumb that ISN'T equal to center, or if both equal center, it
        // stays at center.
        if (currentValue <= center) {
          // value thumb is index 0
          onValueChange(newValues[0]);
        } else {
          // value thumb is index 1
          onValueChange(newValues[1]);
        }
      },
      [onValueChange, center, currentValue]
    );

    // For uncontrolled mode we need a wrapper that still reports changes.
    // Radix Slider handles uncontrolled state internally, but since we
    // derive a 2-thumb array from a single value we must always be
    // "controlled" from Radix's perspective.

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="dual-slider"
        className={cn(
          "relative flex touch-none select-none",
          orientation === "horizontal"
            ? "w-full items-center"
            : "h-full flex-col items-center",
          "data-[disabled]:opacity-50",
          className
        )}
        value={sliderValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        orientation={orientation}
        minStepsBetweenThumbs={0}
        onValueChange={handleValueChange}
      >
        <SliderPrimitive.Track
          className={cn(
            dualSliderTrackVariants({ size, orientation })
          )}
        >
          <SliderPrimitive.Range className={cn(
            "absolute rounded-full bg-fill-inverse",
            orientation === "horizontal" ? "h-full" : "w-full"
          )} />
        </SliderPrimitive.Track>

        {/* Thumb 0 */}
        <SliderPrimitive.Thumb
          className={cn(
            valueThumbIndex === 0
              ? dualSliderThumbVariants({ size })
              : "opacity-0 pointer-events-none w-0 h-0"
          )}
          tabIndex={valueThumbIndex === 0 ? 0 : -1}
          aria-hidden={valueThumbIndex !== 0}
        />

        {/* Thumb 1 */}
        <SliderPrimitive.Thumb
          className={cn(
            valueThumbIndex === 1
              ? dualSliderThumbVariants({ size })
              : "opacity-0 pointer-events-none w-0 h-0"
          )}
          tabIndex={valueThumbIndex === 1 ? 0 : -1}
          aria-hidden={valueThumbIndex !== 1}
        />
      </SliderPrimitive.Root>
    );
  }
);
DualSlider.displayName = "DualSlider";

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { DualSlider };
