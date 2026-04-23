"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes } from "react";

const textareaVariants = cva(
  [
    "flex w-full bg-transparent text-content-primary resize-y",
    "ring-1 ring-inset",
    "transition-shadow",
    "placeholder:text-content-tertiary",
    "focus-visible:ring-2 focus-visible:ring-border-inverse focus-visible:outline-none",
    "aria-[invalid=true]:ring-border-critical",
    "disabled:text-content-primary-disabled disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "ring-border-secondary",
        secondary: "ring-border-secondary",
        none: "ring-0",
      },
      size: {
        sm: "px-3 py-2 text-body-sm min-h-[80px] rounded-3",
        md: "px-4 py-3 text-body-md min-h-[120px] rounded-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        data-slot="textarea"
        ref={ref}
        className={cn(textareaVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
