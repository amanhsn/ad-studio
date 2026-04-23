/**
 * FLOATING COMPOSER — Ads Studio v2 prompt surface.
 *
 * Pixel-perfect port of Figma node 22582:57739 (prompt-box).
 * Outer shell is 972px wide: 56px segmented control overlapping on the left +
 * 908px composer surface. Heights: composer 136, segmented 108 (vertically
 * centered at top:14).
 *
 * Signature Create CTA uses the v2 brand radial gradient; hex values are
 * quarantined to this file and the v2 top bar's Upgrade pill.
 */
"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
  TimeCircle,
  Heart,
} from "react-iconly";
import { cn } from "@/lib/utils";

/* ── Quarantined brand gradient (Create CTA) ── */
const CTA_GRADIENT =
  "radial-gradient(ellipse at center, #8a3ffc 0%, #8a3ffc 63%, #6a2ec4 81%, #491d8b 100%)";
const CTA_INSET_EDGE = "inset 0 -4px 0 #491d8b";
const CTA_DROP_SHADOW = "0 6px 12px rgba(138,63,252,0.15)";

type MediaKind = "image" | "video";

export type FloatingComposerProps = {
  onCreate?: (payload: { kind: MediaKind; prompt: string }) => void;
};

export function FloatingComposer({ onCreate }: FloatingComposerProps = {}) {
  const [kind, setKind] = useState<MediaKind>("image");
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleCreate = () => {
    const payload = { kind, prompt: value };
    if (onCreate) {
      onCreate(payload);
      return;
    }
    router.push("/ads-studio/project/new");
  };

  return (
    <div className="relative w-full max-w-[972px]">
      {/* Image/Video segmented — absolute left edge, 56×108, vertically centered on the 136-tall composer via top:14 */}
      <div className="absolute top-[14px] left-0 z-10 w-[56px] bg-surface-primary-variant border-1 border-border-primary rounded-8 p-1 flex flex-col gap-1">
        <SegmentButton
          active={kind === "image"}
          onClick={() => setKind("image")}
          aria-label="Image"
        >
          <ImageIcon set="light" size="medium" />
        </SegmentButton>
        <SegmentButton
          active={kind === "video"}
          onClick={() => setKind("video")}
          aria-label="Video"
        >
          <VideoIcon set="light" size="medium" />
        </SegmentButton>
      </div>

      {/* Composer surface — 908px wide, offset 64px to clear the segmented control */}
      <div
        className="ml-[64px] h-[136px] w-[908px] max-w-[calc(100%-64px)] bg-fill-primary-variant border-1 border-border-primary rounded-[20px] flex items-end justify-center gap-1"
        style={{ boxShadow: "0 0 24px rgba(0, 0, 0, 0.35)" }}
      >
        {/* Left column — add-image (w 136, pl 12, pr 8, py 12) */}
        <div className="w-[136px] h-full shrink-0 flex flex-col items-start justify-center gap-3 pl-4 pr-3 py-4">
          <button
            type="button"
            aria-label="Number of images"
            className="w-full h-[72px] rounded-5 border-1 border-border-primary flex items-center justify-center hover:bg-fill-primary-hover transition-colors"
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
          <button
            type="button"
            className="h-8 w-[116px] rounded-full border-1 border-border-secondary px-[10px] text-label-md font-normal text-content-primary hover:bg-fill-primary-hover transition-colors whitespace-nowrap"
          >
            URL to Video
          </button>
        </div>

        {/* Separator */}
        <div
          aria-hidden
          className="self-stretch w-px bg-fill-secondary rounded-full"
        />

        {/* Right column — textarea + controls (flex-1, p 12) */}
        <div className="flex-1 min-w-0 h-full p-4 flex flex-col gap-5">
          {/* Textarea container — flex-1, overflow-clip, pr-16 */}
          <div className="flex-1 min-h-0 flex items-start pr-5 relative overflow-hidden">
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Describe your advertisment - use @ to add characters, products and brand kit"
              rows={1}
              className="flex-1 min-w-0 bg-transparent outline-none resize-none text-body-sm text-content-primary placeholder:text-content-tertiary leading-[20px] tracking-[0.28px] py-1"
            />
            {/* Dragger bottom-right */}
            <span
              aria-hidden
              className="absolute bottom-0 right-0 text-content-tertiary"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M10 2 2 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M10 6 6 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>

          {/* Bottom row — spec pills on the left, Create CTA on the right */}
          <div className="shrink-0 flex items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <SpecPill icon={<AspectIcon />}>9:16</SpecPill>
              <SpecPill icon={<TimeCircle set="light" size="small" />}>10s</SpecPill>
              <SpecPill icon={<Heart set="light" size="small" />}>720p</SpecPill>
            </div>

            <CreateCta onClick={handleCreate} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentButton({
  active,
  onClick,
  children,
  ...rest
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-12 w-12 rounded-7 flex items-center justify-center transition-colors",
        active
          ? "bg-fill-secondary text-content-primary"
          : "text-content-secondary hover:text-content-primary"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function SpecPill({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="h-8 px-[10px] rounded-6 border-1 border-border-secondary inline-flex items-center gap-2 text-label-md font-medium text-content-primary hover:bg-fill-primary-hover transition-colors"
    >
      <span className="[&_svg]:h-4 [&_svg]:w-4 text-content-primary">{icon}</span>
      {children}
    </button>
  );
}

function AspectIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="4.5"
        y="1.5"
        width="7"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

function CreateCta({ onClick }: { onClick: () => void }) {
  const style: CSSProperties = {
    background: CTA_GRADIENT,
    boxShadow: `${CTA_DROP_SHADOW}, ${CTA_INSET_EDGE}`,
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 px-6 pb-1 rounded-8 flex items-center justify-center text-white text-label-lg font-medium tracking-[0.16px] active:translate-y-[1px] transition-transform"
      style={style}
    >
      Create
    </button>
  );
}
