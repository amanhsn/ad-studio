"use client";

import { useState } from "react";
import { Discovery, Paper, Star, TimeCircle } from "react-iconly";
import { cn } from "@/lib/utils";

/**
 * CREATE TOP TABS — Ads Studio v2 creation-screen segmented control.
 * Left: Create / How it Works / Elements / Get Inspired.
 * Right: Assets button.
 * Matches Figma node 22582:60738 (segmented-group) as composed in 22585:61319.
 */

const TABS = [
  { id: "create", label: "Create", icon: <Discovery set="light" size="small" /> },
  { id: "how-it-works", label: "How it Works", icon: <Paper set="light" size="small" /> },
  { id: "elements", label: "Elements", icon: <Star set="light" size="small" /> },
  { id: "get-inspired", label: "Get Inspired", icon: <Discovery set="light" size="small" /> },
] as const;

type TabId = (typeof TABS)[number]["id"];

export type CreateTopTabsProps = {
  initialTab?: TabId;
  onTabChange?: (id: TabId) => void;
  onAssetsClick?: () => void;
};

export function CreateTopTabs({
  initialTab = "create",
  onTabChange,
  onAssetsClick,
}: CreateTopTabsProps) {
  const [active, setActive] = useState<TabId>(initialTab);
  return (
    <div className="flex items-center justify-between w-full">
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
              onClick={() => {
                setActive(tab.id);
                onTabChange?.(tab.id);
              }}
              className={cn(
                "h-[26px] px-[10px] rounded-5 inline-flex items-center gap-1 text-label-sm font-medium transition-colors",
                isActive
                  ? "bg-fill-tertiary text-content-primary"
                  : "text-content-tertiary hover:text-content-primary"
              )}
            >
              <span className="[&_svg]:h-[14px] [&_svg]:w-[14px]">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAssetsClick}
        className="h-7 px-2 rounded-5 border-2 border-border-tertiary inline-flex items-center gap-1 text-label-sm font-medium text-content-primary hover:bg-fill-primary-hover transition-colors"
      >
        <span className="[&_svg]:h-[14px] [&_svg]:w-[14px] text-content-primary">
          <TimeCircle set="light" size="small" />
        </span>
        Assets
      </button>
    </div>
  );
}
