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
import { Play, VolumeUp, VolumeOff } from "react-iconly";

export interface VideoPlayerProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
}

const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
  (
    {
      className,
      src,
      poster,
      autoPlay = false,
      loop = false,
      muted: initialMuted = false,
      showControls = true,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(autoPlay);
    const [muted, setMuted] = useState(initialMuted);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showOverlay, setShowOverlay] = useState(true);
    const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const togglePlay = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    }, []);

    const toggleMute = useCallback(() => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
      setMuted(video.muted);
    }, []);

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current;
      if (!video) return;
      const time = parseFloat(e.target.value);
      video.currentTime = time;
      setCurrentTime(time);
    }, []);

    const handleVolumeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;
        const vol = parseFloat(e.target.value);
        video.volume = vol;
        setVolume(vol);
        if (vol === 0) {
          video.muted = true;
          setMuted(true);
        } else if (muted) {
          video.muted = false;
          setMuted(false);
        }
      },
      [muted]
    );

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const onTimeUpdate = () => setCurrentTime(video.currentTime);
      const onLoaded = () => setDuration(video.duration);
      const onEnded = () => setPlaying(false);

      video.addEventListener("timeupdate", onTimeUpdate);
      video.addEventListener("loadedmetadata", onLoaded);
      video.addEventListener("ended", onEnded);

      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate);
        video.removeEventListener("loadedmetadata", onLoaded);
        video.removeEventListener("ended", onEnded);
      };
    }, []);

    const handleMouseMove = () => {
      setShowOverlay(true);
      clearTimeout(hideTimer.current);
      if (playing) {
        hideTimer.current = setTimeout(() => setShowOverlay(false), 3000);
      }
    };

    const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
      <div
        ref={ref}
        data-slot="video-player"
        className={cn(
          "relative group rounded-8 overflow-hidden bg-neutral-black",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => playing && setShowOverlay(false)}
        {...props}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={initialMuted}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
        />

        {showControls && (
          <>
            {/* Play overlay */}
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
              >
                <div className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-white/90 text-neutral-black hover:bg-white transition-colors">
                  <Play
                    set="bold"
                    primaryColor="currentColor"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
              </button>
            )}

            {/* Controls bar */}
            <div
              className={cn(
                "absolute bottom-0 inset-x-0 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 transition-opacity",
                showOverlay || !playing ? "opacity-100" : "opacity-0"
              )}
            >
              {/* Seek bar */}
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-[3px] appearance-none rounded-full bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[12px] [&::-webkit-slider-thumb]:h-[12px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
              />

              {/* Bottom controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {playing ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <rect x="5" y="3" width="3.5" height="14" rx="1" />
                        <rect x="11.5" y="3" width="3.5" height="14" rx="1" />
                      </svg>
                    ) : (
                      <Play
                        set="bold"
                        primaryColor="currentColor"
                        style={{ width: 20, height: 20 }}
                      />
                    )}
                  </button>
                  <span className="text-label-xs text-white/70 font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {muted || volume === 0 ? (
                      <VolumeOff
                        set="bold"
                        primaryColor="currentColor"
                        style={{ width: 18, height: 18 }}
                      />
                    ) : (
                      <VolumeUp
                        set="bold"
                        primaryColor="currentColor"
                        style={{ width: 18, height: 18 }}
                      />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-[60px] h-[3px] appearance-none rounded-full bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };
