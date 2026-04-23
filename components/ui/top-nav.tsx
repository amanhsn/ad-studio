"use client";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";

/* ── Types ── */

export interface TopNavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface TopNavProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode;
  items?: TopNavItem[];
  actions?: ReactNode;
  sticky?: boolean;
}

/* ── TopNav ── */

const TopNav = forwardRef<HTMLElement, TopNavProps>(
  ({ className, brand, items, actions, sticky = false, ...props }, ref) => {
    return (
      <header
        ref={ref}
        data-slot="top-nav"
        className={cn(
          "flex items-center gap-6 border-b border-border-secondary bg-surface-primary px-6 h-[56px]",
          sticky && "sticky top-0 z-40",
          className
        )}
        {...props}
      >
        {/* Brand */}
        {brand && <div className="shrink-0">{brand}</div>}

        {/* Nav items */}
        <nav className="flex-1 flex items-center gap-1">
          {items?.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-label-sm font-medium rounded-4 transition-colors",
                item.active
                  ? "text-content-brand bg-surface-brand"
                  : "text-content-secondary hover:text-content-primary hover:bg-fill-primary"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        {actions && (
          <div className="shrink-0 flex items-center gap-2">{actions}</div>
        )}
      </header>
    );
  }
);
TopNav.displayName = "TopNav";

export { TopNav };
