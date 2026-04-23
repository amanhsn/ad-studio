"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

const inputBaseVariants = cva(
  [
    "flex items-center ring-1 ring-inset bg-transparent transition-shadow",
    "focus-within:ring-2 focus-within:ring-border-inverse",
    "aria-[invalid=true]:ring-border-critical",
    "has-[input:disabled]:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "ring-border-secondary",
        secondary: "ring-border-secondary",
        none: "ring-0",
      },
      size: {
        sm: "h-9 px-3 text-label-sm gap-2 rounded-2.5",
        md: "h-10 px-4 text-label-md gap-3 rounded-3",
        lg: "h-[44px] px-4 text-label-md gap-3 rounded-4",
        xl: "h-12 px-5 text-label-lg gap-3 rounded-4.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const inputSlotVariants = cva(
  "text-content-tertiary shrink-0 flex items-center",
  {
    variants: {
      size: {
        sm: "[&_svg]:size-4",
        md: "[&_svg]:size-5",
        lg: "[&_svg]:size-5",
        xl: "[&_svg]:size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputBaseVariants> {
  start?: ReactNode;
  end?: ReactNode;
  /** @deprecated Use `start` instead */
  leftIcon?: ReactNode;
  /** @deprecated Use `end` instead */
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      start,
      end,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const startSlot = start ?? leftIcon;
    const endSlot = end ?? rightIcon;

    return (
      <div
        data-slot="input"
        className={cn(inputBaseVariants({ variant, size }), className)}
      >
        {startSlot && (
          <span className={cn(inputSlotVariants({ size }))}>
            {startSlot}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "bg-transparent outline-none w-full text-content-primary",
            "placeholder:text-content-tertiary",
            "disabled:text-content-primary-disabled disabled:cursor-not-allowed"
          )}
          {...props}
        />
        {endSlot && (
          <span className={cn(inputSlotVariants({ size }))}>
            {endSlot}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputBaseVariants, inputSlotVariants };
