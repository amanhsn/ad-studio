"use client";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type FormEvent,
} from "react";

/* ── Comment ── */

export interface CommentProps extends HTMLAttributes<HTMLDivElement> {
  author: string;
  avatar?: ReactNode;
  content: string;
  timestamp: string;
  resolved?: boolean;
  actions?: ReactNode;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Comment = forwardRef<HTMLDivElement, CommentProps>(
  (
    {
      author,
      avatar,
      content,
      timestamp,
      resolved = false,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="comment"
        className={cn(
          "flex gap-3",
          resolved && "opacity-60",
          className
        )}
        {...props}
      >
        {/* avatar */}
        <span className="shrink-0">
          {avatar ?? (
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-fill-primary text-label-xs font-medium text-content-secondary">
              {getInitials(author)}
            </span>
          )}
        </span>

        {/* content */}
        <div className="flex flex-1 flex-col gap-1">
          {/* header */}
          <div className="flex items-center gap-2">
            <span className="text-label-sm font-semibold text-content-primary">
              {author}
            </span>
            <span className="text-body-xs text-content-tertiary">
              {timestamp}
            </span>
          </div>

          {/* body */}
          <p
            className={cn(
              "text-body-sm text-content-secondary",
              resolved && "line-through"
            )}
          >
            {content}
          </p>

          {/* actions */}
          {actions && <div className="mt-1">{actions}</div>}
        </div>
      </div>
    );
  }
);
Comment.displayName = "Comment";

/* ── CommentBox ── */

export interface CommentBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  avatar?: ReactNode;
}

const CommentBox = forwardRef<HTMLDivElement, CommentBoxProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      placeholder = "Add a comment...",
      avatar,
      className,
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (value.trim()) onSubmit?.();
    };

    return (
      <div
        ref={ref}
        data-slot="comment-box"
        className={cn("flex gap-3 items-start", className)}
        {...props}
      >
        {/* avatar */}
        <span className="shrink-0">
          {avatar ?? (
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-fill-primary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-content-secondary"
              >
                <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}
        </span>

        {/* input area */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "w-full resize-none rounded-4 ring-1 ring-inset ring-border-primary bg-surface-primary-variant px-3 py-2 text-body-sm text-content-primary transition-colors",
              "placeholder:text-content-placeholder",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
              "min-h-[40px]"
            )}
          />
          {value.trim() && (
            <button
              type="submit"
              className="self-end rounded-4 bg-fill-brand px-3 py-[6px] text-label-sm font-medium text-white transition-colors hover:opacity-90"
            >
              Post
            </button>
          )}
        </form>
      </div>
    );
  }
);
CommentBox.displayName = "CommentBox";

/* ── CommentThread ── */

export interface CommentThreadProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const CommentThread = forwardRef<HTMLDivElement, CommentThreadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="comment-thread"
        className={cn("flex flex-col gap-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommentThread.displayName = "CommentThread";

export { Comment, CommentBox, CommentThread };
