"use client";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
} from "react";

/* ── Types ── */

export interface AudioPlayerProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
}

/* ── Helpers ── */

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ── AudioPlayer ── */

const AudioPlayer = forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
      className,
      src,
      title,
      artist,
      autoPlay = false,
      onPlay,
      onPause,
      ...props
    },
    ref
  ) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    /* Toggle play/pause */
    const togglePlay = useCallback(() => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        audio.play();
        setPlaying(true);
        onPlay?.();
      } else {
        audio.pause();
        setPlaying(false);
        onPause?.();
      }
    }, [onPlay, onPause]);

    /* Seek on progress bar click */
    const handleSeek = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        const bar = progressRef.current;
        if (!audio || !bar || !duration) return;

        const rect = bar.getBoundingClientRect();
        const ratio = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );
        audio.currentTime = ratio * duration;
        setCurrentTime(audio.currentTime);
      },
      [duration]
    );

    /* Audio event listeners */
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const onTimeUpdate = () => setCurrentTime(audio.currentTime);
      const onLoaded = () => setDuration(audio.duration);
      const onEnded = () => {
        setPlaying(false);
        onPause?.();
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoaded);
      audio.addEventListener("ended", onEnded);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoaded);
        audio.removeEventListener("ended", onEnded);
      };
    }, [onPause]);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        data-slot="audio-player"
        className={cn(
          "rounded-6 border border-border-primary bg-surface-primary-variant p-4",
          className
        )}
        {...props}
      >
        {/* Hidden audio element */}
        <audio ref={audioRef} src={src} autoPlay={autoPlay} preload="metadata" />

        <div className="flex items-center gap-4">
          {/* Play / Pause button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className={cn(
              "shrink-0 w-[40px] h-[40px] rounded-full bg-fill-brand text-white flex items-center justify-center hover:bg-fill-brand-hover transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            )}
          >
            {playing ? (
              /* Pause icon – two vertical bars */
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentColor"
              >
                <rect x="4" y="3" width="3" height="12" rx="1" />
                <rect x="11" y="3" width="3" height="12" rx="1" />
              </svg>
            ) : (
              /* Play icon – triangle */
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="currentColor"
              >
                <path d="M6 3.5v11l8.5-5.5L6 3.5z" />
              </svg>
            )}
          </button>

          {/* Middle section */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            {/* Title / Artist */}
            {(title || artist) && (
              <div className="flex items-baseline gap-2 min-w-0">
                {title && (
                  <span className="text-label-sm font-medium text-content-primary truncate">
                    {title}
                  </span>
                )}
                {artist && (
                  <span className="text-body-xs text-content-tertiary truncate">
                    {artist}
                  </span>
                )}
              </div>
            )}

            {/* Progress bar */}
            <div
              ref={progressRef}
              role="progressbar"
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={duration}
              onClick={handleSeek}
              className="h-[4px] rounded-full bg-fill-primary overflow-hidden cursor-pointer"
            >
              <div
                className="h-full bg-fill-brand rounded-full transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time */}
            <div className="flex justify-between text-body-xs text-content-tertiary">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume icon (decorative) */}
          <button
            type="button"
            aria-label="Volume"
            className="shrink-0 text-content-secondary hover:text-content-primary transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8v4h3l4 4V4L6 8H3z" fill="currentColor" stroke="none" />
              <path d="M14 6.5a4.5 4.5 0 010 7" />
              <path d="M16 4a8 8 0 010 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);
AudioPlayer.displayName = "AudioPlayer";

export { AudioPlayer };
