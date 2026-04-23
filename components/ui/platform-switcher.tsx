"use client";

import { cn } from "@/lib/utils";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";

/* ── Types ── */

export interface PlatformOption {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
}

export interface PlatformSwitcherProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  platforms: PlatformOption[];
  value?: string;
  onChange?: (id: string) => void;
}

/* ── PlatformSwitcher ── */

function PlatformSwitcher({
  className,
  platforms,
  value,
  onChange,
  ...props
}: PlatformSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(
    value ?? platforms[0]?.id ?? ""
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = value ?? internalValue;
  const selectedPlatform = platforms.find((p) => p.id === selected);

  /* Sync controlled value */
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  /* Close on click outside & Escape */
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = useCallback(
    (id: string) => {
      setInternalValue(id);
      onChange?.(id);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div ref={containerRef} data-slot="platform-switcher" className={cn("relative", className)} {...props}>
      {/* Trigger */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-3 rounded-4 ring-1 ring-inset ring-border-primary bg-surface-primary-variant px-3 py-2 hover:bg-fill-primary transition-colors cursor-pointer w-full",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
        )}
      >
        {selectedPlatform?.icon && (
          <span className="shrink-0">{selectedPlatform.icon}</span>
        )}
        <span className="flex-1 text-left text-label-sm font-medium text-content-primary truncate">
          {selectedPlatform?.label ?? "Select platform"}
        </span>
        {/* Chevron down */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={cn(
            "shrink-0 text-content-tertiary transition-transform",
            open && "rotate-180"
          )}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-4 border border-border-primary bg-surface-elevated shadow-md py-1"
        >
          {platforms.map((platform) => {
            const isSelected = platform.id === selected;
            return (
              <div
                key={platform.id}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => handleSelect(platform.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(platform.id);
                  }
                }}
                className="flex items-center gap-3 px-3 py-2 hover:bg-fill-primary cursor-pointer transition-colors outline-none"
              >
                {platform.icon && (
                  <span className="shrink-0">{platform.icon}</span>
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-label-sm font-medium text-content-primary truncate">
                    {platform.label}
                  </span>
                  {platform.description && (
                    <span className="text-body-xs text-content-tertiary truncate">
                      {platform.description}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-auto shrink-0 text-content-brand"
                  >
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

PlatformSwitcher.displayName = "PlatformSwitcher";

export { PlatformSwitcher };
