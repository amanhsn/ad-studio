"use client";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  useMemo,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Search, ChevronDown } from "react-iconly";

export interface ComboboxOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md";
  variant?: "primary" | "secondary";
  emptyMessage?: string;
}

const sizeClasses = {
  sm: "h-[32px] px-[12px] text-label-sm",
  md: "h-[36px] px-[16px] text-label-md",
};

const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      label,
      helperText,
      error,
      disabled,
      className,
      size = "md",
      variant = "primary",
      emptyMessage = "No results found.",
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const autoId = useId();
    const listId = `${autoId}-list`;

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolled;
    const selectedOption = options.find((o) => o.value === currentValue);
    const hasError = !!error;

    const filtered = useMemo(
      () =>
        query
          ? options.filter((o) =>
              o.label.toLowerCase().includes(query.toLowerCase())
            )
          : options,
      [options, query]
    );

    const selectValue = useCallback(
      (val: string) => {
        if (!isControlled) setUncontrolled(val);
        onValueChange?.(val);
        setOpen(false);
        setQuery("");
      },
      [isControlled, onValueChange]
    );

    useEffect(() => {
      if (!open) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
          setQuery("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
      if (open) {
        setHighlightIndex(0);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, [open]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setHighlightIndex((prev) => {
              let next = prev + 1;
              while (next < filtered.length && filtered[next].disabled) next++;
              return next < filtered.length ? next : prev;
            });
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && filtered[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        case "Enter":
          e.preventDefault();
          if (
            open &&
            highlightIndex >= 0 &&
            highlightIndex < filtered.length &&
            !filtered[highlightIndex].disabled
          ) {
            selectValue(filtered[highlightIndex].value);
          } else if (!open) {
            setOpen(true);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setQuery("");
          break;
      }
    };

    return (
      <div data-slot="combobox" className="flex flex-col gap-2" ref={containerRef}>
        {label && (
          <label className="text-label-sm font-medium text-content-primary">
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listId}
            disabled={disabled}
            onClick={() => !disabled && setOpen(!open)}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex w-full items-center justify-between rounded-4 ring-1 ring-inset bg-surface-primary-variant transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
              hasError
                ? "ring-border-critical"
                : open
                ? "ring-border-focus"
                : "ring-border-primary",
              disabled && "text-content-primary-disabled bg-fill-primary-disabled cursor-not-allowed",
              variant === "secondary" && "bg-surface-secondary",
              sizeClasses[size],
              className
            )}
          >
            <span
              className={cn(
                selectedOption
                  ? "text-content-primary"
                  : "text-content-placeholder"
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span
              className={cn(
                "shrink-0 text-content-tertiary transition-transform inline-flex",
                open && "rotate-180"
              )}
            >
              <ChevronDown
                set="light"
                primaryColor="currentColor"
                style={{ width: 16, height: 16 }}
              />
            </span>
          </button>

          {open && (
            <div className="absolute z-50 mt-1 w-full rounded-4 border border-border-primary bg-surface-elevated shadow-md overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-2 border-b border-border-secondary px-3 py-2">
                <Search
                  set="light"
                  primaryColor="currentColor"
                  style={{ width: 16, height: 16 }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHighlightIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={searchPlaceholder}
                  className="flex-1 bg-transparent text-body-sm text-content-primary placeholder:text-content-placeholder outline-none"
                />
              </div>
              {/* Options */}
              <ul
                id={listId}
                role="listbox"
                className="max-h-[200px] overflow-auto py-1"
              >
                {filtered.length === 0 ? (
                  <li className="px-4 py-3 text-body-sm text-content-tertiary text-center">
                    {emptyMessage}
                  </li>
                ) : (
                  filtered.map((option, i) => (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={option.value === currentValue}
                      aria-disabled={option.disabled}
                      data-highlighted={i === highlightIndex}
                      onMouseEnter={() =>
                        !option.disabled && setHighlightIndex(i)
                      }
                      onClick={() =>
                        !option.disabled && selectValue(option.value)
                      }
                      className={cn(
                        "flex cursor-pointer items-center gap-2 px-4 py-[8px] text-body-sm transition-colors",
                        option.disabled && "cursor-not-allowed text-content-primary-disabled",
                        i === highlightIndex && "bg-fill-primary",
                        option.value === currentValue &&
                          "text-content-brand font-medium"
                      )}
                    >
                      {option.icon && (
                        <span className="shrink-0">{option.icon}</span>
                      )}
                      {option.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        {hasError && (
          <p className="text-body-xs text-content-critical">{error}</p>
        )}
        {!hasError && helperText && (
          <p className="text-body-xs text-content-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);
Combobox.displayName = "Combobox";

export { Combobox };
