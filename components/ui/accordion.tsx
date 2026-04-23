"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/* ─── Types ─── */

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
}

export interface AccordionItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  value: string;
  title: string | ReactNode;
  disabled?: boolean;
}

/* ─── Context ─── */

interface AccordionContextValue {
  expandedItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedItems: [],
  toggle: () => {},
});

/* ─── Accordion root ─── */

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    { type = "single", defaultValue = [], className, children, ...props },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = useState<string[]>(defaultValue);

    const toggle = useCallback(
      (value: string) => {
        setExpandedItems((prev) => {
          if (prev.includes(value)) {
            return prev.filter((v) => v !== value);
          }
          if (type === "single") {
            return [value];
          }
          return [...prev, value];
        });
      },
      [type]
    );

    return (
      <AccordionContext.Provider value={{ expandedItems, toggle }}>
        <div ref={ref} data-slot="accordion" className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

/* ─── Accordion Item ─── */

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, title, disabled = false, className, children, ...props }, ref) => {
    const { expandedItems, toggle } = useContext(AccordionContext);
    const isExpanded = expandedItems.includes(value);

    return (
      <div
        ref={ref}
        data-slot="accordion-item"
        className={cn(
          "border-b border-border-secondary last:border-b-0",
          className
        )}
        {...props}
      >
        {/* Trigger */}
        <button
          type="button"
          onClick={() => !disabled && toggle(value)}
          disabled={disabled}
          aria-expanded={isExpanded}
          className={cn(
            "flex items-center justify-between w-full py-3 text-left text-label-sm font-medium text-content-primary transition-colors",
            disabled
              ? "text-content-primary-disabled cursor-not-allowed"
              : "hover:text-content-brand cursor-pointer"
          )}
        >
          <span className="flex-1">{title}</span>

          {/* Chevron */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "shrink-0 ml-2 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Content */}
        <div
          className={cn(
            "overflow-hidden transition-[max-height] duration-200",
            isExpanded ? "max-h-[500px]" : "max-h-0"
          )}
        >
          <div className="pb-3 text-body-sm text-content-secondary">
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem };
