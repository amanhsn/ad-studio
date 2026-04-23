"use client";

import { People, Bag, Bookmark } from "react-iconly";
import { cn } from "@/lib/utils";
import type { TrayCategory } from "./reference-tray";

/**
 * REFERENCE CHIPS — Ads Studio v2. Characters / Products / Brand Kits pills
 * sitting above the floating composer. Matches Figma node 22577:56968.
 *
 * When a chip is the active tray category, it renders in its selected state
 * so the user can see which category the tray is currently showing.
 */

const CHIPS: Array<{ label: string; category: TrayCategory; icon: React.ReactNode }> = [
  { label: "Characters", category: "characters", icon: <People set="light" size="small" /> },
  { label: "Products", category: "products", icon: <Bag set="light" size="small" /> },
  { label: "Brand Kits", category: "brand-kits", icon: <Bookmark set="light" size="small" /> },
];

export type ReferenceChipsProps = {
  activeCategory?: TrayCategory;
  onChipClick?: (category: TrayCategory) => void;
};

export function ReferenceChips({
  activeCategory,
  onChipClick,
}: ReferenceChipsProps = {}) {
  return (
    <div className="bg-surface-primary-variant rounded-8 p-1 flex gap-3 items-center justify-center shadow-xs">
      {CHIPS.map((chip) => {
        const active = activeCategory === chip.category;
        return (
          <button
            key={chip.label}
            type="button"
            onClick={() => onChipClick?.(chip.category)}
            aria-pressed={active}
            className={cn(
              "h-8 px-[10px] rounded-6 inline-flex items-center gap-2 text-label-md font-medium text-content-primary transition-colors",
              active
                ? "bg-fill-secondary"
                : "bg-surface-secondary-variant hover:bg-fill-secondary"
            )}
            style={{ boxShadow: "0 0 4px rgba(0,0,0,0.16)" }}
          >
            <span className="[&_svg]:h-4 [&_svg]:w-4 text-content-primary">
              {chip.icon}
            </span>
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
