"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

const tokenDisplayVariants = cva(
  "inline-flex items-center gap-[6px] rounded-full font-mono font-medium",
  {
    variants: {
      variant: {
        default:
          "ring-1 ring-inset ring-border-primary bg-surface-primary-variant text-content-primary",
        filled: "bg-fill-brand text-white",
      },
      size: {
        sm: "h-[24px] px-2 text-label-xs",
        md: "h-[28px] px-3 text-label-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TokenDisplayProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tokenDisplayVariants> {
  value: string;
  copyable?: boolean;
  onCopy?: () => void;
  truncate?: number;
  icon?: ReactNode;
}

const TokenDisplay = forwardRef<HTMLSpanElement, TokenDisplayProps>(
  (
    {
      className,
      variant,
      size,
      value,
      copyable = false,
      onCopy,
      truncate,
      icon,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const displayValue =
      truncate && value.length > truncate
        ? `${value.slice(0, Math.ceil(truncate / 2))}...${value.slice(-Math.floor(truncate / 2))}`
        : value;

    const handleCopy = useCallback(() => {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        onCopy?.();
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
      });
    }, [value, onCopy]);

    return (
      <span
        ref={ref}
        data-slot="token-display"
        className={cn(tokenDisplayVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{displayValue}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 inline-flex items-center justify-center rounded-sm hover:opacity-70 transition-opacity"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              /* Checkmark icon */
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              /* Clipboard icon */
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
          </button>
        )}
      </span>
    );
  }
);
TokenDisplay.displayName = "TokenDisplay";

export { TokenDisplay, tokenDisplayVariants };
