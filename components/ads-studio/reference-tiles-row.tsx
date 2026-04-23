"use client";

const TILES = ["Avatars", "Products", "Brands"] as const;

export function ReferenceTilesRow() {
  return (
    <div className="flex items-center justify-center gap-3">
      {TILES.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => {
            // TODO: open picker — out of scope for v0
            console.log(`[ads-studio] picker clicked: ${label}`);
          }}
          className="h-[56px] w-[88px] rounded-3 border-1 border-border-secondary bg-surface-elevated/[.06] flex flex-col items-center justify-center text-label-xs text-content-secondary hover:bg-surface-elevated/[.12] transition-colors"
          style={{ cursor: "pointer" }}
        >
          <span className="h-5 w-5 rounded-2 bg-fill-secondary/40 mb-1" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
