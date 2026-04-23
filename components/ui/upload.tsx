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
import { Upload as UploadIcon, Image2 } from "react-iconly";

const uploadVariants = cva(
  "relative flex flex-col items-center justify-center gap-3 rounded-8 border-2 border-dashed transition-all cursor-pointer",
  {
    variants: {
      state: {
        default:
          "border-border-primary bg-surface-primary-variant hover:border-border-brand hover:bg-surface-brand/50",
        dragging: "border-border-brand bg-surface-brand scale-[1.01]",
        error: "border-border-critical bg-surface-critical",
        disabled: "border-border-disabled bg-fill-primary-disabled text-content-primary-disabled cursor-not-allowed",
        loading: "border-border-brand bg-surface-brand pointer-events-none",
      },
      size: {
        sm: "p-6 min-h-[120px]",
        md: "p-8 min-h-[180px]",
        lg: "p-12 min-h-[240px]",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  }
);

export interface UploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDrop">,
    Omit<VariantProps<typeof uploadVariants>, "state"> {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  maxSize?: number;
  icon?: ReactNode;
  title?: string;
  description?: string;
  onFilesSelected?: (files: File[]) => void;
}

const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      className,
      size,
      accept,
      multiple = false,
      disabled = false,
      loading = false,
      error,
      maxSize,
      icon,
      title = "Drop files here or click to upload",
      description,
      onFilesSelected,
      ...props
    },
    ref
  ) => {
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const state = disabled
      ? "disabled"
      : loading
      ? "loading"
      : error
      ? "error"
      : dragging
      ? "dragging"
      : "default";

    const handleFiles = useCallback(
      (files: FileList | null) => {
        if (!files || disabled || loading) return;
        const fileArray = Array.from(files);
        if (maxSize) {
          const valid = fileArray.filter((f) => f.size <= maxSize);
          if (valid.length < fileArray.length) {
            // Some files were too large - still pass the valid ones
          }
          onFilesSelected?.(valid);
        } else {
          onFilesSelected?.(fileArray);
        }
      },
      [disabled, loading, maxSize, onFilesSelected]
    );

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (!disabled && !loading) setDragging(true);
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

    return (
      <div className="flex flex-col gap-2">
        <div
          ref={ref}
          data-slot="upload"
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && !loading && inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(uploadVariants({ state, size }), className)}
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

          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="animate-spin h-[24px] w-[24px] text-content-brand"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span className="text-label-sm text-content-brand font-medium">
                Uploading...
              </span>
            </div>
          ) : (
            <>
              <span className="text-content-tertiary">
                {icon ?? (
                  <UploadIcon
                    set="light"
                    primaryColor="currentColor"
                    style={{ width: 32, height: 32 }}
                  />
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
            </>
          )}
        </div>
        {error && (
          <p className="text-body-xs text-content-critical">{error}</p>
        )}
      </div>
    );
  }
);
Upload.displayName = "Upload";

/* ── Upload Preview Item ── */

export interface UploadPreviewProps extends HTMLAttributes<HTMLDivElement> {
  fileName: string;
  fileSize?: string;
  preview?: string;
  onRemove?: () => void;
  progress?: number;
}

function UploadPreview({
  fileName,
  fileSize,
  preview,
  onRemove,
  progress,
  className,
  ...props
}: UploadPreviewProps) {
  return (
    <div
      data-slot="upload-preview"
      className={cn(
        "flex items-center gap-3 rounded-4 border border-border-primary bg-surface-primary-variant px-3 py-2",
        className
      )}
      {...props}
    >
      <div className="shrink-0 w-[40px] h-[40px] rounded-2 overflow-hidden bg-fill-primary flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt={fileName}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image2
            set="light"
            primaryColor="currentColor"
            style={{ width: 20, height: 20 }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <span className="text-label-sm font-medium text-content-primary truncate">
          {fileName}
        </span>
        {fileSize && (
          <span className="text-body-xs text-content-tertiary">{fileSize}</span>
        )}
        {progress !== undefined && progress < 100 && (
          <div className="h-[3px] w-full rounded-full bg-fill-primary overflow-hidden">
            <div
              className="h-full rounded-full bg-fill-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 text-content-tertiary hover:text-content-critical transition-colors"
          aria-label={`Remove ${fileName}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Upload, UploadPreview, uploadVariants };
