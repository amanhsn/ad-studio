"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type DragEvent,
  type ChangeEvent,
} from "react";

const dropZoneVariants = cva(
  "relative flex flex-col items-center justify-center gap-3 rounded-8 border-2 border-dashed transition-all cursor-pointer",
  {
    variants: {
      variant: {
        default: "",
        colored: "",
      },
      size: {
        sm: "p-6 min-h-[100px]",
        md: "p-8 min-h-[160px]",
        lg: "p-12 min-h-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface DropZoneProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDrop">,
    VariantProps<typeof dropZoneVariants> {
  onDrop?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  icon?: ReactNode;
  title?: string;
  description?: string;
}

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  (
    {
      className,
      variant = "default",
      size,
      onDrop,
      accept,
      multiple = true,
      maxSize,
      disabled = false,
      icon,
      title = "Drop files here or click to browse",
      description,
      ...props
    },
    ref
  ) => {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
      (files: FileList | null) => {
        if (!files || disabled) return;
        let fileArray = Array.from(files);
        if (maxSize) {
          fileArray = fileArray.filter((f) => f.size <= maxSize);
        }
        onDrop?.(fileArray);
      },
      [disabled, maxSize, onDrop]
    );

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (!disabled) setDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    };

    const stateClasses = disabled
      ? "border-border-disabled text-content-primary-disabled bg-fill-primary-disabled cursor-not-allowed"
      : dragging
      ? variant === "colored"
        ? "border-border-brand bg-primary-10/20 scale-[1.01]"
        : "border-border-brand bg-surface-brand scale-[1.01]"
      : "border-border-primary bg-surface-primary-variant hover:border-border-brand";

    return (
      <div
        ref={ref}
        data-slot="drop-zone"
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) inputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          dropZoneVariants({ variant, size }),
          stateClasses,
          className
        )}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
          aria-label={title}
        />

        <span className="text-content-tertiary">
          {icon ?? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="text-content-tertiary"
            >
              <path
                d="M16 21V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 12l6-6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 22c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>

        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-label-sm font-medium text-content-primary">
            {title}
          </span>
          {description && (
            <span className="text-body-xs text-content-tertiary">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);
DropZone.displayName = "DropZone";

export { DropZone, dropZoneVariants };
