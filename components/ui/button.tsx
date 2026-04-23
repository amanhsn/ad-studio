"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-fill-inverse text-content-inverse hover:bg-fill-inverse-hover active:bg-fill-inverse-active",
        secondary:
          "bg-fill-secondary text-content-primary hover:bg-fill-secondary-hover active:bg-fill-secondary-active",
        outline:
          "border border-border-primary bg-transparent text-content-primary hover:bg-fill-primary active:bg-fill-primary-active",
        ghost:
          "bg-transparent text-content-primary hover:bg-fill-primary active:bg-fill-primary-active",
        brand:
          "bg-fill-brand text-content-on-brand hover:bg-fill-brand-hover active:bg-fill-brand-active",
        error:
          "bg-fill-critical text-content-on-critical hover:bg-fill-critical-hover active:bg-fill-critical-active",
        success:
          "bg-fill-success text-[white] hover:bg-fill-success-hover active:bg-fill-success-active",
        warning:
          "bg-fill-warning text-neutral-100 hover:bg-fill-warning-hover",
        link: "bg-transparent text-content-brand underline-offset-4 hover:underline p-0 h-auto",
        "brand-tonal":
          "bg-fill-brand-secondary text-content-brand hover:bg-fill-brand-secondary-hover active:bg-fill-brand-secondary-active",
        "brand-ghost":
          "bg-transparent text-content-brand hover:bg-fill-brand-secondary active:bg-fill-brand-secondary-active",
        "ghost-variant":
          "bg-transparent text-content-secondary hover:bg-fill-primary hover:text-content-primary active:bg-fill-primary-active",
        "secondary-variant":
          "bg-fill-secondary-variant text-content-primary hover:bg-fill-secondary-variant-hover active:bg-fill-secondary-variant-active",
        "link-primary":
          "bg-transparent text-content-primary underline-offset-4 hover:underline p-0 h-auto",
        "link-secondary":
          "bg-transparent text-content-secondary underline-offset-4 hover:underline p-0 h-auto",
        "link-brand":
          "bg-transparent text-content-brand underline-offset-4 hover:underline p-0 h-auto",
        "on-image":
          "bg-black/50 text-white hover:bg-black/60 active:bg-black/70 backdrop-blur-sm",
        "on-image-variant":
          "bg-white/20 text-white hover:bg-white/30 active:bg-white/40 backdrop-blur-sm",
      },
      size: {
        xs: "h-8 px-[10px] text-label-xs",
        sm: "h-9 px-4 text-label-sm",
        md: "h-10 px-[14px] text-label-md",
        lg: "h-[44px] px-5 text-label-lg",
        xl: "h-12 px-6 text-label-xl",
        "icon-xs": "h-8 w-8 p-0",
        "icon-sm": "h-9 w-9 p-0",
        "icon-md": "h-10 w-10 p-0",
        "icon-lg": "h-[44px] w-[44px] p-0",
        "icon-xl": "h-12 w-12 p-0",
        "link-xs": "text-label-xs p-0 h-auto",
        "link-sm": "text-label-sm p-0 h-auto",
        "link-md": "text-label-md p-0 h-auto",
        "link-lg": "text-label-lg p-0 h-auto",
      },
      shape: {
        pill: "rounded-full",
        rect: "rounded-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      shape: "pill",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconOnly?: boolean;
  start?: ReactNode;
  end?: ReactNode;
  /** @deprecated Use `start` instead */
  leftIcon?: ReactNode;
  /** @deprecated Use `end` instead */
  rightIcon?: ReactNode;
  loading?: boolean;
  translateOnActive?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      iconOnly,
      start,
      end,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      translateOnActive = true,
      children,
      ...props
    },
    ref
  ) => {
    const startSlot = start ?? leftIcon;
    const endSlot = end ?? rightIcon;

    const Comp = asChild ? Slot : "button";

    const iconOnlySize: Record<string, string> = {
      xs: "w-8",
      sm: "w-9",
      md: "w-10",
      lg: "w-[44px]",
      xl: "w-12",
    };

    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, shape }),
          iconOnly && iconOnlySize[size ?? "md"] && iconOnlySize[size ?? "md"] + " px-0",
          translateOnActive && "active:translate-y-px",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          startSlot
        )}
        {!iconOnly && children}
        {!loading && endSlot}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
