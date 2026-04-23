/**
 * TOP GLOW — Ads Studio v2 atmospheric backdrop.
 *
 * Teal blobs with subtle flowing motion (aurora-drift). Base hex is #01C3A0
 * (rgb 1, 195, 160) per Figma node 22577:57549. Hex values are quarantined to
 * this file only — do not export or reference them from any other component.
 */
import type { CSSProperties } from "react";

export type TopGlowVariant = "home" | "creation";

type BlobSpec = {
  top: string;
  left: string;
  size: string;
  intensity: number;
  animation: "aurora-drift-1" | "aurora-drift-2";
};

/* Teal gradient — #01C3A0 bleeding into the page background. */
const TEAL_GLOW = (intensity = 1) =>
  `radial-gradient(closest-side,
    rgba(1, 195, 160, ${0.38 * intensity}) 0%,
    rgba(1, 195, 160, ${0.18 * intensity}) 32%,
    rgba(1, 195, 160, ${0.07 * intensity}) 58%,
    rgba(1, 195, 160, 0) 76%)`;

const VARIANTS: Record<TopGlowVariant, BlobSpec[]> = {
  home: [
    {
      top: "-260px",
      left: "50%",
      size: "820px",
      intensity: 1,
      animation: "aurora-drift-1",
    },
  ],
  creation: [
    // Ellipse 15: (189, 63) 515×515 within 1440-wide canvas → left-top warm bloom
    {
      top: "-180px",
      left: "26%",
      size: "720px",
      intensity: 0.95,
      animation: "aurora-drift-1",
    },
    // Ellipse 16: (830, 189) 515×515 → right-mid copper bloom
    {
      top: "40px",
      left: "74%",
      size: "720px",
      intensity: 0.9,
      animation: "aurora-drift-2",
    },
  ],
};

export function TopGlow({
  variant = "home",
  className,
}: {
  variant?: TopGlowVariant;
  className?: string;
}) {
  const blobs = VARIANTS[variant];
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {blobs.map((b, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: b.top,
          left: b.left,
          width: b.size,
          height: b.size,
          transform: "translateX(-50%)",
          background: TEAL_GLOW(b.intensity),
          filter: "blur(6px)",
          willChange: "transform",
        };
        return (
          <div
            key={i}
            style={style}
            className={`animate-${b.animation}`}
          />
        );
      })}
    </div>
  );
}
