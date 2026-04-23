const TILES = [
  "Product spotlight",
  "App launch",
  "Skincare story",
  "UGC testimonial",
  "Brand anthem",
  "Sale push",
  "Unboxing",
  "Before / after",
  "Feature reel",
  "Creator talk",
  "Lookbook",
  "Teaser",
];

export function InspirationsGrid() {
  return (
    <div className="w-full">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {TILES.map((label, i) => (
          <article
            key={i}
            className="relative rounded-4 overflow-hidden bg-surface-elevated transition-shadow hover:shadow-sm cursor-pointer"
            style={{ aspectRatio: "9 / 16" }}
            onClick={() => console.log(`[ads-studio] inspiration clicked: ${label}`)}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.65) 100%)",
              }}
            />
            <span className="absolute left-3 right-3 bottom-3 text-label-sm text-white">
              {label}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
