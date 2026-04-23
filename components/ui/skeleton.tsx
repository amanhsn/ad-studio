"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", width, height, style, ...props }, ref) => {
    const variantClasses = {
      text: "rounded-2 h-[16px]",
      circular: "rounded-full",
      rectangular: "rounded-4",
    };

    return (
      <div
        ref={ref}
        data-slot="skeleton"
        className={cn(
          "animate-pulse bg-fill-tertiary",
          variantClasses[variant],
          className
        )}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...(variant === "circular" && !width && !height
            ? { width: "40px", height: "40px" }
            : {}),
          ...style,
        }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
