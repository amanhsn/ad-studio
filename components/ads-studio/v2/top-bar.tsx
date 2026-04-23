"use client";

import Image from "next/image";
import { Search, ChevronDown, Chat, Notification } from "react-iconly";

/**
 * TOP BAR — Ads Studio v2 global chrome (workspace switcher + actions).
 * Height: 64px. Matches Figma node 22577:56957 (top-nav-imagine).
 */
export function TopBar() {
  return (
    <header className="h-[64px] shrink-0 flex items-center justify-between pl-4 pr-6 bg-surface-primary border-b border-border-primary">
      {/* Left: logo + workspace switcher */}
      <div className="flex items-center gap-4">
        <Image
          src="/brand/logo-color.png"
          alt="Imagine"
          width={28}
          height={28}
          priority
        />
        <button
          type="button"
          className="h-8 px-3 rounded-6 bg-surface-secondary-variant border-1 border-border-primary flex items-center gap-2 text-label-sm font-medium text-content-primary hover:bg-fill-primary-hover transition-colors"
        >
          All creations
          <ChevronDown set="light" size="small" />
        </button>
      </div>

      {/* Right: actions cluster */}
      <div className="flex items-center gap-3">
        <IconButton label="Search">
          <Search set="light" size="small" />
        </IconButton>
        <UpgradeButton />
        <button
          type="button"
          className="h-8 px-3 rounded-6 bg-surface-secondary-variant border-1 border-border-primary flex items-center gap-2 text-label-sm font-medium text-content-primary hover:bg-fill-primary-hover transition-colors"
        >
          <span className="h-4 w-4 rounded-full bg-fill-brand" aria-hidden />
          Personal
          <ChevronDown set="light" size="small" />
        </button>
        <IconButton label="Messages">
          <Chat set="light" size="small" />
        </IconButton>
        <IconButton label="Notifications">
          <Notification set="light" size="small" />
        </IconButton>
        <div
          aria-label="Account"
          className="h-8 w-8 rounded-full bg-fill-brand-secondary ring-1 ring-border-primary"
        />
      </div>
    </header>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="h-8 w-8 rounded-full flex items-center justify-center text-content-secondary hover:text-content-primary hover:bg-fill-primary-hover transition-colors"
    >
      {children}
    </button>
  );
}

/* Brand upgrade pill — uses the quarantined v2 brand gradient. */
function UpgradeButton() {
  return (
    <button
      type="button"
      className="relative h-8 px-3 rounded-full flex items-center gap-2 text-label-sm font-medium text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #8a3ffc 0%, #8a3ffc 63%, #6a2ec4 81%, #491d8b 100%)",
        boxShadow:
          "0 6px 12px rgba(138,63,252,0.15), inset 0 -2px 0 rgba(73,29,139,0.8)",
      }}
    >
      <span
        className="inline-block h-3 w-3 rounded-sm"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #e8daff 100%)",
          clipPath: "polygon(50% 0, 100% 38%, 80% 100%, 20% 100%, 0 38%)",
        }}
        aria-hidden
      />
      Upgrade
    </button>
  );
}
