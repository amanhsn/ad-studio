"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";
import { ChevronLeft, ChevronRight } from "react-iconly";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    { currentPage, totalPages, onPageChange, siblingCount = 1, className, ...props },
    ref
  ) => {
    const pages = getPageRange(currentPage, totalPages, siblingCount);

    return (
      <nav ref={ref} data-slot="pagination" aria-label="Pagination" className={className} {...props}>
        <ul className="flex items-center gap-1">
          {/* Previous */}
          <li>
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={cn(pageButtonBase, "px-2")}
              aria-label="Previous page"
            >
              <ChevronLeft set="light" primaryColor="currentColor" style={{ width: 16, height: 16 }} />
            </button>
          </li>

          {pages.map((page, i) =>
            page === "..." ? (
              <li key={`ellipsis-${i}`}>
                <span className="flex h-[32px] w-[32px] items-center justify-center text-body-sm text-content-tertiary">
                  ...
                </span>
              </li>
            ) : (
              <li key={page}>
                <button
                  type="button"
                  onClick={() => onPageChange(page as number)}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={cn(
                    pageButtonBase,
                    page === currentPage
                      ? "bg-fill-brand text-content-on-brand"
                      : "text-content-primary hover:bg-fill-primary"
                  )}
                >
                  {page}
                </button>
              </li>
            )
          )}

          {/* Next */}
          <li>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className={cn(pageButtonBase, "px-2")}
              aria-label="Next page"
            >
              <ChevronRight set="light" primaryColor="currentColor" style={{ width: 16, height: 16 }} />
            </button>
          </li>
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

const pageButtonBase =
  "inline-flex h-[32px] min-w-[32px] items-center justify-center rounded-4 text-label-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:text-content-primary-disabled disabled:cursor-not-allowed";

function getPageRange(
  current: number,
  total: number,
  siblings: number
): (number | "...")[] {
  const totalSlots = siblings * 2 + 5;
  if (total <= totalSlots) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(current - siblings, 2);
  const rightSibling = Math.min(current + siblings, total - 1);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  const pages: (number | "...")[] = [1];

  if (showLeftDots) {
    pages.push("...");
  } else {
    for (let i = 2; i < leftSibling; i++) pages.push(i);
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    pages.push(i);
  }

  if (showRightDots) {
    pages.push("...");
  } else {
    for (let i = rightSibling + 1; i < total; i++) pages.push(i);
  }

  pages.push(total);

  return pages;
}

export { Pagination };
