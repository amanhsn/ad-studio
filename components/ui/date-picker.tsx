"use client";

import { cn } from "@/lib/utils";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type HTMLAttributes,
} from "react";

/* ── Helpers ── */

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDate(date: Date) {
  return `${MONTH_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/* ── Types ── */

export interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
  disabledDates?: Date[];
  futureOnly?: boolean;
  placeholder?: string;
}

/* ── Component ── */

function DatePicker({
  value,
  onChange,
  min,
  max,
  disabledDates = [],
  futureOnly = false,
  placeholder = "Select date",
  className,
  ...props
}: DatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(
    value?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    value?.getMonth() ?? today.getMonth()
  );
  const containerRef = useRef<HTMLDivElement>(null);

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

  /* sync view when value changes */
  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  const goToPrev = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const goToNext = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const isDisabled = useCallback(
    (date: Date) => {
      if (futureOnly && date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        return true;
      }
      if (min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) {
        return true;
      }
      if (max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate())) {
        return true;
      }
      return disabledDates.some((d) => isSameDay(d, date));
    },
    [futureOnly, min, max, disabledDates, today]
  );

  const handleSelect = useCallback(
    (date: Date) => {
      if (isDisabled(date)) return;
      onChange?.(date);
      setOpen(false);
    },
    [isDisabled, onChange]
  );

  /* build calendar grid */
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1
  );

  const cells: { date: Date; inMonth: boolean }[] = [];

  // previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    cells.push({ date: new Date(y, m, d), inMonth: false });
  }
  // current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(viewYear, viewMonth, d), inMonth: true });
  }
  // next month leading days (fill to 42)
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    cells.push({ date: new Date(y, m, d), inMonth: false });
  }

  return (
    <div ref={containerRef} data-slot="date-picker" className={cn("relative inline-block", className)} {...props}>
      {/* trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-4 ring-1 ring-inset ring-border-primary bg-surface-primary-variant px-4 py-[10px] text-body-sm transition-colors",
          "hover:ring-border-brand",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
          open && "ring-border-focus"
        )}
      >
        {/* calendar icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="shrink-0 text-content-tertiary"
        >
          <rect
            x="2"
            y="3"
            width="12"
            height="11"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <span
          className={cn(
            "flex-1 text-left",
            value ? "text-content-primary" : "text-content-placeholder"
          )}
        >
          {value ? formatDate(value) : placeholder}
        </span>

        {/* chevron */}
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

      {/* dropdown calendar */}
      {open && (
        <div className="absolute z-50 mt-1 w-[280px] rounded-6 border border-border-primary bg-surface-elevated p-4 shadow-lg">
          {/* header */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrev}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-content-secondary hover:bg-fill-primary transition-colors"
              aria-label="Previous month"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M8.5 3L4.5 7l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-label-sm font-semibold text-content-primary">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={goToNext}
              className="flex h-[28px] w-[28px] items-center justify-center rounded-full text-content-secondary hover:bg-fill-primary transition-colors"
              aria-label="Next month"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M5.5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* weekday labels */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="text-label-xs font-medium text-content-tertiary py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* day grid */}
          <div className="grid grid-cols-7">
            {cells.map(({ date, inMonth }, i) => {
              const disabled = isDisabled(date);
              const selected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelect(date)}
                  className={cn(
                    "flex h-[36px] w-[36px] items-center justify-center rounded-full text-body-sm transition-colors",
                    !inMonth && "text-content-tertiary opacity-50",
                    inMonth && !selected && !disabled && "text-content-primary hover:bg-fill-primary",
                    selected && "bg-fill-brand text-white",
                    !selected && isToday && inMonth && "border border-border-brand text-content-brand",
                    disabled && "cursor-not-allowed text-content-primary-disabled"
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
