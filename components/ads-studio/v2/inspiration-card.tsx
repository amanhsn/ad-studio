"use client";

import { VolumeUp } from "react-iconly";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * INSPIRATION CARD — Ads Studio v2. 9:16 video thumbnail with hover-reveal
 * volume toggle top-right, social platform badges bottom-right, hover-reveal
 * "Use template" CTA center, and label below the card.
 * Matches Figma node 22577:57013 (_test).
 */

export type Platform = "instagram" | "facebook" | "youtube" | "tiktok";

export type InspirationCardProps = {
  label: string;
  image?: string;
  platforms?: Platform[];
  onClick?: () => void;
};

export function InspirationCard({
  label,
  image,
  platforms = ["instagram", "facebook", "youtube", "tiktok"],
  onClick,
}: InspirationCardProps) {
  return (
    <article className="p-1 rounded-8">
      <div
        className={cn(
          "group relative w-full rounded-6 overflow-hidden cursor-pointer",
          "bg-fill-primary"
        )}
        style={{ aspectRatio: "264 / 352" }}
        onClick={onClick}
      >
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Always-subtle bottom gradient for label legibility (optional per card) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Volume button — hover-only */}
        <button
          type="button"
          aria-label="Toggle sound"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "absolute top-2 right-2 h-8 w-8 rounded-6 flex items-center justify-center text-white backdrop-blur-[6px]",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          )}
          style={{ background: "rgba(0, 0, 0, 0.4)" }}
        >
          <VolumeUp set="light" size="small" />
        </button>

        {/* Use template CTA — hover-only */}
        <div
          aria-hidden
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "h-10 px-7 pb-1 rounded-8 flex items-center justify-center text-white text-label-lg font-medium whitespace-nowrap",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          )}
          style={{
            background:
              "radial-gradient(ellipse at center, #8a3ffc 0%, #8a3ffc 63%, #6a2ec4 81%, #491d8b 100%)",
            boxShadow:
              "0 6px 12px rgba(138,63,252,0.15), inset 0 -4px 0 #491d8b",
          }}
        >
          Use template
        </div>

        {/* Platform badges — always visible */}
        <div
          className="absolute bottom-2 right-2 rounded-full flex items-center pr-1 backdrop-blur-[6px]"
          style={{ background: "rgba(0, 0, 0, 0.4)", padding: "6px" }}
        >
          {platforms.map((p) => (
            <SocialBadge key={p} platform={p} />
          ))}
        </div>
      </div>

      <div className="pl-1 pt-2 pb-1">
        <span className="text-label-md font-medium text-content-primary tracking-[0.42px]">
          {label}
        </span>
      </div>
    </article>
  );
}

function SocialBadge({ platform }: { platform: Platform }) {
  return (
    <span
      className="relative inline-flex items-center justify-center h-[20px] w-[20px] rounded-full bg-white -mr-1 first:mr-[-4px] ring-1 ring-black/6"
      aria-label={platform}
    >
      <PlatformIcon platform={platform} />
    </span>
  );
}

function PlatformIcon({ platform }: { platform: Platform }): ReactNode {
  switch (platform) {
    case "instagram":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="1" y="1" width="8" height="8" rx="2" stroke="#E4405F" strokeWidth="1" />
          <circle cx="5" cy="5" r="2" stroke="#E4405F" strokeWidth="1" />
          <circle cx="7.2" cy="2.8" r="0.5" fill="#E4405F" />
        </svg>
      );
    case "facebook":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M6 10V5.5h1.3l.2-1.6H6V3c0-.45.15-.75.8-.75H7.6V.8A11 11 0 006.5.75c-1.1 0-1.9.65-1.9 1.9V3.9H3.4v1.6h1.2V10H6z"
            fill="#1877F2"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="0.5" y="2" width="9" height="6" rx="1.5" fill="#FF0000" />
          <path d="M4.2 4 6.4 5l-2.2 1V4z" fill="white" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M6.5 1v4.3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1v-1a2 2 0 102 2V3.4A2.3 2.3 0 008 3.8v-1A1.3 1.3 0 016.8 1.7 1.2 1.2 0 016.5 1z"
            fill="#000"
          />
        </svg>
      );
  }
}
