"use client";

import { cn } from "@/lib/utils";

/**
 * GENERATION THUMBNAILS — Ads Studio v2. Row of recent generations beneath
 * the asset canvas. Each thumbnail is 40×40, rounded-4, 16px gap between.
 * Matches Figma node 22585:61326.
 */

export type GenerationThumb = {
  id: string;
  image: string;
};

export type GenerationThumbnailsProps = {
  thumbs: GenerationThumb[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
};

export function GenerationThumbnails({
  thumbs,
  activeId,
  onSelect,
  className,
}: GenerationThumbnailsProps) {
  return (
    <div className={cn("flex items-center gap-5", className)}>
      {thumbs.map((t) => {
        const isActive = activeId === t.id;
        return (
          <button
            key={t.id}
            type="button"
            aria-label={`Generation ${t.id}`}
            onClick={() => onSelect?.(t.id)}
            className={cn(
              "h-10 w-10 rounded-4 overflow-hidden shrink-0 transition-all",
              isActive
                ? "ring-2 ring-border-inverse"
                : "ring-1 ring-border-primary hover:ring-border-secondary"
            )}
          >
            <img
              src={t.image}
              alt=""
              aria-hidden
              className="w-full h-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
