"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { ChevronRight } from "react-iconly";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  onNavigate?: (href: string) => void;
}

const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ items, separator, onNavigate, className, ...props }, ref) => {
    const sep = separator ?? (
      <ChevronRight set="light" primaryColor="currentColor" style={{ width: 16, height: 16 }} />
    );

    return (
      <nav ref={ref} aria-label="Breadcrumb" data-slot="breadcrumbs" className={className} {...props}>
        <ol className="flex items-center gap-2">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate(item.href!);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-label-sm text-content-secondary hover:text-content-primary transition-colors"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-label-sm",
                      isLast
                        ? "text-content-primary font-medium"
                        : "text-content-secondary"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className="text-content-tertiary inline-flex" aria-hidden="true">
                    {sep}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
