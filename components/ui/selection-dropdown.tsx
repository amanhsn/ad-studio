"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type HTMLAttributes,
} from "react";

const selectionDropdownVariants = cva(
  "flex items-center gap-2 rounded-4 ring-1 ring-inset px-4 transition-colors cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-[32px] text-label-xs",
        md: "h-[36px] text-label-sm",
        lg: "h-[40px] text-label-md",
        xl: "h-[44px] text-label-lg",
      },
      variant: {
        primary: "ring-border-primary bg-surface-primary-variant",
        secondary: "ring-border-secondary bg-surface-secondary",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

export interface SelectionDropdownOption {
  value: string;
  label: string;
}

export interface SelectionDropdownProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof selectionDropdownVariants> {
  options: SelectionDropdownOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
}

function SelectionDropdown({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  size,
  variant,
  searchable = false,
  className,
  ...props
}: SelectionDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  /* close on outside click / escape */
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

  /* focus search input when opening */
  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
    if (!open) setSearch("");
  }, [open, searchable]);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(lower));
  }, [options, search]);

  const toggleValue = useCallback(
    (optionValue: string) => {
      const next = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange?.(next);
    },
    [value, onChange]
  );

  const selectedLabels = useMemo(() => {
    return options
      .filter((o) => value.includes(o.value))
      .map((o) => o.label)
      .join(", ");
  }, [options, value]);

  return (
    <div ref={containerRef} data-slot="selection-dropdown" className={cn("relative", className)} {...props}>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          selectionDropdownVariants({ size, variant }),
          "w-full justify-between",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          "hover:ring-border-brand",
          open && "ring-border-focus"
        )}
      >
        <span
          className={cn(
            "flex-1 truncate text-left",
            value.length > 0 ? "text-content-primary" : "text-content-placeholder"
          )}
        >
          {value.length > 0 ? selectedLabels : placeholder}
        </span>

        <span className="flex shrink-0 items-center gap-2">
          {value.length > 0 && (
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-fill-brand px-1 text-[10px] font-semibold text-white">
              {value.length}
            </span>
          )}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              "text-content-tertiary transition-transform",
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
        </span>
      </button>

      {/* dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-4 border border-border-primary bg-surface-elevated shadow-md">
          {/* search input */}
          {searchable && (
            <div className="border-b border-border-secondary px-3 py-2">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-body-sm text-content-primary outline-none placeholder:text-content-placeholder"
              />
            </div>
          )}

          {/* option list */}
          <div className="max-h-[240px] overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-body-sm text-content-tertiary">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const checked = value.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleValue(option.value)}
                    className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-fill-primary"
                  >
                    {/* checkbox */}
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-2 ring-2 ring-inset transition-colors",
                        checked
                          ? "ring-fill-brand bg-fill-brand"
                          : "ring-border-primary bg-surface-primary-variant"
                      )}
                    >
                      {checked && (
                        <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M11.5 3.5L5.5 10L2.5 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-body-sm text-content-primary">
                      {option.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

SelectionDropdown.displayName = "SelectionDropdown";

export { SelectionDropdown, selectionDropdownVariants };
