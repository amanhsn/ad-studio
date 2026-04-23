"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

const videoSkeletonVariants = cva(
  "relative overflow-hidden bg-fill-primary rounded-6",
  {
    variants: {
      size: {
        sm: "h-[160px]",
        md: "h-[240px]",
        lg: "h-[360px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface VideoSkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof videoSkeletonVariants> {
  aspectRatio?: string;
  showControls?: boolean;
}

const VideoSkeleton = forwardRef<HTMLDivElement, VideoSkeletonProps>(
  (
    {
      className,
      size,
      aspectRatio = "16/9",
      showControls = true,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="video-skeleton"
        className={cn(
          videoSkeletonVariants({ size }),
          "animate-pulse",
          className
        )}
        style={{
          aspectRatio,
          ...style,
        }}
        {...props}
      >
        {/* Center play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[48px] h-[48px] rounded-full bg-white/20 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white/40 ml-0.5"
            >
              <path
                d="M5 3l12 7-12 7V3z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Bottom control bar */}
        {showControls && (
          <div className="absolute bottom-0 inset-x-0 h-[32px] bg-gradient-to-t from-black/20 flex items-center gap-2 px-3">
            {/* Small play button */}
            <div className="w-[12px] h-[12px] bg-white/30 rounded-full flex-shrink-0" />
            {/* Progress bar */}
            <div className="h-[3px] flex-1 rounded-full bg-white/20" />
            {/* Time placeholder */}
            <div className="w-[40px] h-[8px] rounded-full bg-white/15 flex-shrink-0" />
          </div>
        )}
      </div>
    );
  }
);
VideoSkeleton.displayName = "VideoSkeleton";

export { VideoSkeleton, videoSkeletonVariants };
