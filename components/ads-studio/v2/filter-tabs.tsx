"use client";

import { useState } from "react";
import { Discovery, People, Bag, Bookmark, TimeCircle } from "react-iconly";
import { cn } from "@/lib/utils";

/**
 * FILTER TABS — Ads Studio v2. Get Inspired / Characters / Products / Brand Kits
 * segmented control on the left, and My Projects button on the right.
 * Matches Figma node 22577:57003.
 */

const TABS = [
  { id: "get-inspired", label: "Get Inspired", icon: <Discovery set="light" size="small" /> },
  { id: "characters", label: "Characters", icon: <People set="light" size="small" /> },
  { id: "products", label: "Products", icon: <Bag set="light" size="small" /> },
  { id: "brand-kits", label: "Brand Kits", icon: <Bookmark set="light" size="small" /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function FilterTabs() {
  const [active, setActive] = useState<TabId>("get-inspired");

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Segmented control */}
      <div
        role="tablist"
        className="bg-surface-primary-variant border-1 border-border-primary rounded-6 p-[3px] flex items-center gap-1"
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                "h-[26px] px-[10px] rounded-5 inline-flex items-center gap-1 text-label-sm font-medium transition-colors",
                isActive
                  ? "bg-fill-tertiary text-content-primary"
                  : "text-content-tertiary hover:text-content-primary"
              )}
            >
              <span className="[&_svg]:h-[14px] [&_svg]:w-[14px]">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* My Projects */}
      <button
        type="button"
        className="h-7 px-2 rounded-5 border-2 border-border-tertiary inline-flex items-center gap-1 text-label-sm font-medium text-content-primary hover:bg-fill-primary-hover transition-colors"
      >
        <span className="[&_svg]:h-[14px] [&_svg]:w-[14px] text-content-primary">
          <TimeCircle set="light" size="small" />
        </span>
        My Projects
      </button>
    </div>
  );
}
