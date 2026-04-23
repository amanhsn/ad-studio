"use client";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type KeyboardEvent,
} from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-[32px] px-[12px] text-label-sm",
  md: "h-[36px] px-[16px] text-label-md",
  lg: "h-[44px] px-[16px] text-label-lg",
};

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      placeholder = "Select...",
      label,
      helperText,
      error,
      disabled,
      className,
      size = "md",
    },
    ref
  ) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const autoId = useId();
    const listId = `${autoId}-list`;

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolled;
    const selectedOption = options.find((o) => o.value === currentValue);
    const hasError = !!error;

    const selectValue = useCallback(
      (val: string) => {
        if (!isControlled) setUncontrolled(val);
        onValueChange?.(val);
        setOpen(false);
      },
      [isControlled, onValueChange]
    );

    useEffect(() => {
      if (!open) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    useEffect(() => {
      if (open) {
        const idx = options.findIndex((o) => o.value === currentValue);
        setHighlightIndex(idx >= 0 ? idx : 0);
      }
    }, [open, options, currentValue]);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (!open) {
        if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : prev;
          });
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) => {
            let next = prev - 1;
            while (next >= 0 && options[next].disabled) next--;
            return next >= 0 ? next : prev;
          });
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightIndex >= 0 && !options[highlightIndex].disabled) {
            selectValue(options[highlightIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
        case "Home":
          e.preventDefault();
          setHighlightIndex(0);
          break;
        case "End":
          e.preventDefault();
          setHighlightIndex(options.length - 1);
          break;
      }
    };

    return (
      <div className="flex flex-col gap-2" ref={containerRef}>
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
            data-slot="select"
            className={cn(
              "flex w-full items-center justify-between rounded-4 ring-1 ring-inset ring-border-primary bg-transparent transition-shadow",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
              hasError ? "ring-border-critical" : open ? "ring-border-focus" : "",
              "disabled:text-content-primary-disabled disabled:cursor-not-allowed",
              sizeClasses[size],
              className
            )}
          >
            <span
              className={cn(
                selectedOption ? "text-content-primary" : "text-content-placeholder"
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {open && (
            <ul
              id={listId}
              ref={listRef}
              role="listbox"
              className="absolute z-50 mt-1 max-h-[240px] w-full overflow-auto rounded-4 border border-border-primary bg-surface-elevated shadow-md"
            >
              {options.map((option, i) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === currentValue}
                  aria-disabled={option.disabled}
                  data-highlighted={i === highlightIndex}
                  onMouseEnter={() => !option.disabled && setHighlightIndex(i)}
                  onClick={() => !option.disabled && selectValue(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center px-[16px] py-[8px] text-body-sm transition-colors",
                    option.disabled && "cursor-not-allowed opacity-50",
                    i === highlightIndex && "bg-fill-primary",
                    option.value === currentValue && "text-content-brand font-medium"
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {hasError && (
          <p className="text-body-xs text-content-error">{error}</p>
        )}
        {!hasError && helperText && (
          <p className="text-body-xs text-content-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
