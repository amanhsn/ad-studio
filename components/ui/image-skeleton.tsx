"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const imageSkeletonVariants = cva(
  "relative overflow-hidden bg-fill-primary",
  {
    variants: {
      size: {
        sm: "h-[120px]",
        md: "h-[200px]",
        lg: "h-[300px]",
        custom: "",
      },
      shape: {
        square: "rounded-4",
        rounded: "rounded-8",
        circle: "rounded-full aspect-square",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "square",
    },
  }
);

export interface ImageSkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof imageSkeletonVariants> {
  aspectRatio?: string;
  icon?: boolean;
}

const ImageSkeleton = forwardRef<HTMLDivElement, ImageSkeletonProps>(
  (
    {
      className,
      size,
      shape,
      aspectRatio,
      icon = true,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="image-skeleton"
        className={cn(
          imageSkeletonVariants({ size, shape }),
          "animate-pulse",
          className
        )}
        style={{
          ...(aspectRatio ? { aspectRatio } : {}),
          ...style,
        }}
        {...props}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Centered image placeholder icon */}
        {icon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-content-tertiary opacity-30"
            >
              {/* Sun */}
              <circle cx="14" cy="13" r="3.5" fill="currentColor" />
              {/* Mountains */}
              <path
                d="M4 30l8-12 5 7 3-4 8 9H4z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }
);
ImageSkeleton.displayName = "ImageSkeleton";

export { ImageSkeleton, imageSkeletonVariants };
