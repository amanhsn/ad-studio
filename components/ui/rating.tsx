"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState, type HTMLAttributes } from "react";

export interface RatingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  allowHalf?: boolean;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

/* ─── Star SVGs ─── */

function FilledStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function EmptyStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function HalfStar({ size }: { size: number }) {
  const clipId = `half-star-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="none"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      {/* Filled left half */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="currentColor"
        clipPath={`url(#${clipId})`}
      />
      {/* Outlined full star */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Rating component ─── */

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value = 0,
      onChange,
      max = 5,
      size = "md",
      readOnly = false,
      allowHalf = false,
      className,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const iconSize = sizeMap[size];

    const displayValue = hoverValue ?? value;

    const handleMouseMove = (
      starIndex: number,
      e: React.MouseEvent<HTMLSpanElement>
    ) => {
      if (readOnly) return;

      if (allowHalf) {
        const rect = e.currentTarget.getBoundingClientRect();
        const isLeftHalf = e.clientX - rect.left < rect.width / 2;
        setHoverValue(isLeftHalf ? starIndex + 0.5 : starIndex + 1);
      } else {
        setHoverValue(starIndex + 1);
      }
    };

    const handleClick = (
      starIndex: number,
      e: React.MouseEvent<HTMLSpanElement>
    ) => {
      if (readOnly || !onChange) return;

      if (allowHalf) {
        const rect = e.currentTarget.getBoundingClientRect();
        const isLeftHalf = e.clientX - rect.left < rect.width / 2;
        onChange(isLeftHalf ? starIndex + 0.5 : starIndex + 1);
      } else {
        onChange(starIndex + 1);
      }
    };

    return (
      <div
        ref={ref}
        data-slot="rating"
        className={cn(
          "flex items-center gap-1",
          readOnly ? "cursor-default" : "cursor-pointer",
          className
        )}
        onMouseLeave={() => !readOnly && setHoverValue(null)}
        role="radiogroup"
        aria-label="Rating"
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isFilled = displayValue >= starValue;
          const isHalf = !isFilled && displayValue >= starValue - 0.5;

          return (
            <span
              key={i}
              className={cn(
                "inline-flex transition-colors",
                isFilled || isHalf
                  ? "text-warning-50"
                  : "text-content-tertiary"
              )}
              onMouseMove={(e) => handleMouseMove(i, e)}
              onClick={(e) => handleClick(i, e)}
              role="radio"
              aria-checked={value >= starValue}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            >
              {isFilled ? (
                <FilledStar size={iconSize} />
              ) : isHalf ? (
                <HalfStar size={iconSize} />
              ) : (
                <EmptyStar size={iconSize} />
              )}
            </span>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export { Rating };
