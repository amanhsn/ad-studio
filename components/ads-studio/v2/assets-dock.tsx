"use client";

import { Plus } from "react-iconly";

/**
 * ASSETS DOCK — Ads Studio v2 right-edge floating dock. 68×136.
 * Matches Figma node 22577:57090.
 */

export function AssetsDock({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Assets"
      className={
        "w-[68px] h-[136px] bg-surface-primary-variant border-1 border-border-primary rounded-8 p-3 flex flex-col items-center gap-3 " +
        (className ?? "")
      }
    >
      {/* Upload slot */}
      <button
        type="button"
        aria-label="Upload asset"
        className="relative h-[52px] w-[52px] rounded-4 border-1 border-border-secondary border-dashed bg-fill-primary-variant hover:bg-fill-primary-hover transition-colors flex items-center justify-center"
      >
        <span
          className="h-6 w-6 rounded-full border-1 border-border-primary flex items-center justify-center text-content-primary"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,15,15,0.0) 0%, rgba(46,46,46,0.8) 100%)",
          }}
        >
          <Plus set="light" size="small" />
        </span>
      </button>

      {/* Connector */}
      <div aria-hidden className="w-[11px] h-px bg-border-primary" />

      {/* Selected asset */}
      <div
        className="h-[52px] w-[52px] rounded-4 border-3 border-content-primary overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #3a1b2e 0%, #6b2a4d 50%, #1f0f18 100%)",
        }}
      />
    </aside>
  );
}
