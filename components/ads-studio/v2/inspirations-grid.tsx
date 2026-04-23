"use client";

import { InspirationCard } from "./inspiration-card";

/**
 * INSPIRATIONS GRID — Ads Studio v2. 4-column rail of 9:16 inspirational cards
 * populated with stock imagery (Unsplash). Real video thumbnails will swap in
 * later from the product content pipeline.
 * Matches Figma frames 22577:57012 / 22577:57075 / 22577:57080.
 */

/* Hand-picked stable Unsplash photo IDs, cropped 9:16. */
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?w=540&h=720&fit=crop&auto=format&q=80`;

const ROWS: Array<Array<{ label: string; image: string }>> = [
  [
    { label: "Unboxing", image: UNSPLASH("photo-1542291026-7eec264c27ff") },
    { label: "Assembly", image: UNSPLASH("photo-1556742049-0cfed4f6a45d") },
    { label: "Inspection", image: UNSPLASH("photo-1581091226825-a6a2a5aee158") },
    { label: "Finalizing", image: UNSPLASH("photo-1494790108377-be9c29b29330") },
  ],
  [
    { label: "Hero shot", image: UNSPLASH("photo-1505740420928-5e560c06d30e") },
    {
      label: "Ingredient close-up",
      image: UNSPLASH("photo-1523275335684-37898b6baf30"),
    },
    { label: "Brand moment", image: UNSPLASH("photo-1558769132-cb1aea458c5e") },
    { label: "Call to action", image: UNSPLASH("photo-1549298916-b41d501d3772") },
  ],
  [
    { label: "App walkthrough", image: UNSPLASH("photo-1511367461989-f85a21fda167") },
    { label: "Testimonial", image: UNSPLASH("photo-1488426862026-3ee34a7d66df") },
    { label: "Before / after", image: UNSPLASH("photo-1487222477894-8943e31ef7b2") },
    { label: "Lookbook", image: UNSPLASH("photo-1492725764893-90b379c2b6e7") },
  ],
];

export function InspirationsGrid() {
  return (
    <div className="flex flex-col gap-[6px]">
      {ROWS.map((row, ri) => (
        <div
          key={ri}
          className="grid gap-[6px]"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {row.map((tile, ti) => (
            <InspirationCard
              key={`${ri}-${ti}`}
              label={tile.label}
              image={tile.image}
              onClick={() =>
                console.log(`[ads-studio v2] inspiration clicked: ${tile.label}`)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
