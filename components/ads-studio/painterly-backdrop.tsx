/**
 * PAINTERLY BACKDROP — hex values are quarantined to this file only.
 * Do NOT export, re-use, or reference these colors from any other component.
 * See docs/ADS_STUDIO_BRIEF.md §4 for provenance.
 */
import type { CSSProperties } from "react";

export type PainterlyBackdropProps = {
  intensity?: "default" | "muted";
  className?: string;
};

const backdropStyle: CSSProperties = {
  background: [
    // Violet bloom — upper left (Primary 70 #6929c4)
    "radial-gradient(ellipse 55% 45% at 25% 30%, rgba(105, 41, 196, 0.55) 0%, rgba(105, 41, 196, 0) 60%)",
    // Brand bloom — upper right (Primary 60 #8a3ffc)
    "radial-gradient(ellipse 50% 45% at 75% 35%, rgba(138, 63, 252, 0.45) 0%, rgba(138, 63, 252, 0) 65%)",
    // Magenta bloom — lower center (#c1397a)
    "radial-gradient(ellipse 60% 50% at 55% 80%, rgba(193, 57, 122, 0.40) 0%, rgba(193, 57, 122, 0) 60%)",
    // Amber accent — lower right (#e8a346)
    "radial-gradient(ellipse 30% 28% at 85% 75%, rgba(232, 163, 70, 0.25) 0%, rgba(232, 163, 70, 0) 65%)",
    // Base plum canvas — #16092e → #0c0420 → #08020f
    "radial-gradient(ellipse at 50% 50%, #16092e 0%, #0c0420 70%, #08020f 100%)",
  ].join(", "),
};

export function PainterlyBackdrop({
  intensity = "default",
  className,
}: PainterlyBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        ...backdropStyle,
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: intensity === "muted" ? 0.5 : 1,
        transition: "opacity 400ms ease",
      }}
    />
  );
}
