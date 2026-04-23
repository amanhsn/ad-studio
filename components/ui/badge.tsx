import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "font-medium whitespace-nowrap inline-flex items-center",
  {
    variants: {
      variant: {
        "neutral-subtle": "bg-fill-primary text-content-secondary",
        "neutral-strong": "bg-fill-tertiary text-content-primary",
        "neutral-on-image": "bg-black/50 text-white backdrop-blur-sm",
        "brand-on-surface": "bg-fill-brand-secondary text-content-brand",
        "brand-on-image": "bg-primary-60/80 text-white backdrop-blur-sm",
        primary: "bg-fill-inverse text-content-inverse",
        success: "bg-surface-success text-content-success",
        warning: "bg-surface-warning text-content-warning",
        error: "bg-surface-critical text-content-error",
      },
      size: {
        sm: "rounded-1.5 px-3 py-px text-label-xs",
        md: "rounded-2 px-3 py-1 text-label-sm",
      },
    },
    defaultVariants: {
      variant: "neutral-subtle",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, asChild, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
