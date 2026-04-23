/**
 * PROMPT COMPOSER
 * Ads Studio signature gradient (GENERATE CTA) — hex values quarantined to this file.
 * Also contains the composer's localized glass surface color (rgba).
 * See docs/ADS_STUDIO_BRIEF.md §6 for provenance.
 */
"use client";

import { useState, type CSSProperties } from "react";
import { Image as ImageIcon, Video as VideoIcon, Plus, ChevronDown } from "react-iconly";
import { Textarea } from "@/components/ui/textarea";

/* ── Quarantined colors — DO NOT export or reuse. ── */
// Glass surface background over the painterly backdrop (intentional localized rgba).
const COMPOSER_SURFACE_BG = "rgba(15, 8, 30, 0.55)";
const COMPOSER_SURFACE_BORDER = "rgba(255, 255, 255, 0.14)";
// Signature gradient — purple → magenta.
const CTA_GRADIENT = "linear-gradient(135deg, #8a3ffc 0%, #c1397a 100%)";
const CTA_GRADIENT_HOVER = "linear-gradient(135deg, #6929c4 0%, #a02a64 100%)";

type Mode = "Product" | "App" | "UGC" | "Brand";
const MODES: Mode[] = ["Product", "App", "UGC", "Brand"];

type MediaKind = "image" | "video";

export function PromptComposer() {
  const [kind, setKind] = useState<MediaKind>("image");
  const [mode, setMode] = useState<Mode>("Product");
  const [modeOpen, setModeOpen] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);

  const composerSurfaceStyle: CSSProperties = {
    background: COMPOSER_SURFACE_BG,
    border: `1px solid ${COMPOSER_SURFACE_BORDER}`,
  };

  const ctaStyle: CSSProperties = {
    background: ctaHover ? CTA_GRADIENT_HOVER : CTA_GRADIENT,
    transform: ctaActive ? "scale(0.98)" : "scale(1)",
    transition: "background 150ms ease, transform 80ms ease",
  };

  return (
    <div className="flex items-stretch gap-2 justify-center">
      {/* Image / Video toggle pair */}
      <div className="flex flex-col gap-2">
        <MediaToggle
          active={kind === "image"}
          onClick={() => setKind("image")}
          icon={<ImageIcon set="light" size="small" />}
          label="Image"
        />
        <MediaToggle
          active={kind === "video"}
          onClick={() => setKind("video")}
          icon={<VideoIcon set="light" size="small" />}
          label="Video"
        />
      </div>

      {/* Composer surface */}
      <div className="flex-1 rounded-8 p-4 flex flex-col gap-4" style={composerSurfaceStyle}>
        {/* Top row */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            aria-label="Add reference"
            onClick={() => console.log("[ads-studio] add reference clicked")}
            className="shrink-0 h-9 w-9 rounded-3 flex items-center justify-center text-content-secondary hover:bg-fill-primary transition-colors"
          >
            <Plus set="light" size="small" />
          </button>
          <Textarea
            variant="none"
            size="sm"
            placeholder="Describe what happens in the ad..."
            rows={1}
            className="min-h-[40px] ring-0 bg-transparent resize-none px-0 py-2 text-body-sm"
          />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Mode pill (dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setModeOpen((v) => !v)}
                className="rounded-full border-1 border-white/[.08] bg-transparent px-3 py-2 text-label-sm text-content-secondary flex items-center gap-1 hover:text-content-primary transition-colors"
              >
                {mode}
                <ChevronDown set="light" size="small" />
              </button>
              {modeOpen && (
                <ul
                  className="absolute z-30 top-full mt-2 left-0 min-w-[140px] rounded-4 border-1 border-white/[.08] bg-surface-elevated overflow-hidden"
                  role="listbox"
                >
                  {MODES.map((m) => (
                    <li
                      key={m}
                      role="option"
                      aria-selected={mode === m}
                      onClick={() => {
                        setMode(m);
                        setModeOpen(false);
                      }}
                      className="px-3 py-2 text-label-sm text-content-primary hover:bg-fill-primary cursor-pointer"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <StaticPill>9:16</StaticPill>
            <StaticPill>720p</StaticPill>
            <StaticPill>8s</StaticPill>
          </div>

          {/* Generate CTA */}
          <button
            type="button"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => {
              setCtaHover(false);
              setCtaActive(false);
            }}
            onMouseDown={() => setCtaActive(true)}
            onMouseUp={() => setCtaActive(false)}
            onClick={() => console.log("[ads-studio] generate clicked", { kind, mode })}
            className="rounded-full px-6 py-2 text-label-md font-medium text-white uppercase"
            style={{ ...ctaStyle, letterSpacing: "0.04em" }}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

function MediaToggle({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={
        "h-[44px] w-[52px] rounded-3 flex items-center justify-center transition-colors border-1 " +
        (active
          ? "bg-surface-elevated/10 border-white/[.18] text-content-primary"
          : "bg-surface-elevated/[.05] border-white/[.10] text-content-secondary hover:text-content-primary")
      }
    >
      {icon}
    </button>
  );
}

function StaticPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border-1 border-white/[.08] bg-transparent px-3 py-2 text-label-sm text-content-secondary">
      {children}
    </span>
  );
}
