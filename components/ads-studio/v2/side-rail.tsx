"use client";

import {
  Home,
  Image as ImageIcon,
  Video,
  Edit,
  Document,
  Discovery,
  Category,
  Chat,
  People,
  Graph,
  MoreCircle,
} from "react-iconly";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SIDE RAIL — Ads Studio v2 left chrome. Matches Figma node 22577:56955
 * (side-navigation): 64px wide, icon-only rail with four grouped sections
 * separated by dividers, plus a bottom action cluster.
 */

type RailItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const GROUPS: RailItem[][] = [
  [
    { label: "Home", icon: <Home set="light" size="small" />, active: true },
    { label: "Assets", icon: <Document set="light" size="small" /> },
  ],
  [
    { label: "Image", icon: <ImageIcon set="light" size="small" /> },
    { label: "Video", icon: <Video set="light" size="small" /> },
    { label: "Edit", icon: <Edit set="light" size="small" /> },
    { label: "Upscale", icon: <Discovery set="light" size="small" /> },
  ],
  [
    { label: "All Tools", icon: <Category set="light" size="small" /> },
    { label: "Templates", icon: <Graph set="light" size="small" /> },
    { label: "Community", icon: <People set="light" size="small" /> },
  ],
  [{ label: "Chatly", icon: <Chat set="light" size="small" /> }],
];

export function SideRail() {
  return (
    <aside
      aria-label="Primary"
      className="w-[64px] shrink-0 h-full flex flex-col items-center py-3 bg-surface-primary border-r border-border-primary"
    >
      {/* Imagine logo slot (mirrors Figma "logo" frame inside the rail) */}
      <div className="h-10 w-10 rounded-4 flex items-center justify-center mb-3">
        <div className="h-5 w-5 rounded-3 bg-fill-brand" aria-hidden />
      </div>

      <div className="flex-1 w-full flex flex-col items-center gap-0">
        {GROUPS.map((group, gi) => (
          <div key={gi} className="w-full flex flex-col items-center">
            {group.map((item) => (
              <RailTab key={item.label} item={item} />
            ))}
            {gi < GROUPS.length - 1 && (
              <div
                aria-hidden
                className="h-px w-6 my-2 bg-border-primary"
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          aria-label="Mobile"
          className="h-8 w-8 rounded-3 flex items-center justify-center text-content-secondary hover:bg-fill-primary-hover hover:text-content-primary transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="4" y="2" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="8" cy="12" r="0.75" fill="currentColor" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="More"
          className="h-8 w-8 rounded-3 flex items-center justify-center text-content-secondary hover:bg-fill-primary-hover hover:text-content-primary transition-colors"
        >
          <MoreCircle set="light" size="small" />
        </button>
      </div>
    </aside>
  );
}

function RailTab({ item }: { item: RailItem }) {
  return (
    <button
      type="button"
      aria-label={item.label}
      aria-current={item.active ? "page" : undefined}
      className={cn(
        "h-[46px] w-[52px] rounded-3 flex flex-col items-center justify-center gap-[2px] transition-colors",
        item.active
          ? "bg-fill-secondary text-content-primary"
          : "text-content-secondary hover:bg-fill-primary-hover hover:text-content-primary"
      )}
    >
      <span className="h-4 w-4 flex items-center justify-center">
        {item.icon}
      </span>
      <span className="text-[9px] leading-[10px] font-medium tracking-[0.24px] mt-[1px]">
        {item.label}
      </span>
    </button>
  );
}
