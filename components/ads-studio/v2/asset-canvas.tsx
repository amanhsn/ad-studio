"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { Play, VolumeUp, VolumeOff } from "react-iconly";
import { cn } from "@/lib/utils";

/**
 * ASSET CANVAS — Ads Studio v2. Full-view media surface for the user's most
 * recent generation (video or image) plus a native-looking video player chrome.
 * Matches Figma node 22585:61321 (asset-view) and 22585:61325 (video-player).
 *
 * Accepts a `videoSrc` prop; when omitted, the canvas stays black (matches the
 * Figma empty state) while still showing the player chrome.
 */

export type AssetCanvasProps = {
  /** Video URL to play. Pass an MP4 to fill the canvas. */
  videoSrc?: string;
  /** Static poster image URL, used before the video plays or when videoSrc is absent. */
  posterSrc?: string;
  /** Still-image result (used when the generation is an image instead of a video). */
  imageSrc?: string;
  className?: string;
};

export function AssetCanvas({
  videoSrc,
  posterSrc,
  imageSrc,
  className,
}: AssetCanvasProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (v) v.muted = next;
  };

  const onTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    if (!Number.isFinite(v.duration) || v.duration === 0) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = Math.max(0, Math.min(1, ratio)) * v.duration;
  };

  return (
    <div
      className={cn(
        "relative w-full flex-1 min-h-0 rounded-8 overflow-hidden border-1 border-border-primary bg-black",
        className
      )}
    >
      {/* Media */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted={muted}
          autoPlay
          loop
          playsInline
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt="Generated asset"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : posterSrc ? (
        <img
          src={posterSrc}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      ) : null}

      {/* Scrim for bottom player chrome legibility */}
      {!imageSrc && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      )}

      {/* Player chrome — anchored to the bottom of the canvas */}
      {!imageSrc && (
        <div className="absolute inset-x-0 bottom-0 h-[64px] px-4 pt-6 pb-2 flex items-center gap-3 text-white">
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className="h-8 w-8 rounded-6 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {playing ? <PauseIcon /> : <Play set="bold" size="small" />}
          </button>

          {/* Scrubber */}
          <div
            onClick={onSeek}
            className="flex-1 h-[6px] rounded-full bg-white/20 relative cursor-pointer"
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[14px] w-[14px] rounded-full bg-white"
              style={{ left: `calc(${progress}% - 7px)` }}
            />
          </div>

          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="h-8 w-8 rounded-6 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            {muted ? <VolumeOff set="light" size="small" /> : <VolumeUp set="light" size="small" />}
          </button>
          <button
            type="button"
            aria-label="Fullscreen"
            className="h-8 w-8 rounded-6 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ExpandIcon />
          </button>
        </div>
      )}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="4" y="3" width="3" height="10" rx="0.5" />
      <rect x="9" y="3" width="3" height="10" rx="0.5" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 6V3h3M13 6V3h-3M3 10v3h3M13 10v3h-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
