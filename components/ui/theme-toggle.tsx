"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const themeToggleVariants = cva(
  "rounded-full ring-1 ring-inset ring-border-primary bg-surface-primary-variant hover:bg-fill-primary transition-all flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "h-[32px] w-[32px]",
        md: "h-[40px] w-[40px]",
        lg: "h-[48px] w-[48px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export interface ThemeToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof themeToggleVariants> {
  mode?: "light" | "dark" | "system";
  onModeChange?: (mode: "light" | "dark") => void;
}

/* ─── Sun icon ─── */

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-content-primary transition-transform duration-300"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/* ─── Moon icon ─── */

function MoonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-content-primary transition-transform duration-300"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

/* ─── ThemeToggle ─── */

const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ mode = "light", onModeChange, size = "md", className, ...props }, ref) => {
    const iconSize = iconSizeMap[size ?? "md"];
    const isDark = mode === "dark";

    const handleClick = () => {
      const next = isDark ? "light" : "dark";
      onModeChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        data-slot="theme-toggle"
        onClick={handleClick}
        className={cn(themeToggleVariants({ size }), className)}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        {...props}
      >
        <span
          className={cn(
            "inline-flex transition-transform duration-300",
            isDark ? "rotate-0" : "rotate-[360deg]"
          )}
        >
          {isDark ? (
            <MoonIcon size={iconSize} />
          ) : (
            <SunIcon size={iconSize} />
          )}
        </span>
      </button>
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle, themeToggleVariants };
