"use client";

/**
 * REFERENCE TRAY — Ads Studio v2 "Add references" popover.
 *
 * This is NOT a modal. It renders as an anchored popover above the composer
 * chips with NO backdrop — the rest of the page stays fully visible and
 * interactive. Positioning is handled by the parent (ComposerCluster), which
 * places this component in an absolute container aligned to the composer.
 *
 * Pixel port of Figma node 22582:57860 (Frame 2147233995).
 *
 * Left list (Brand Kits / Products / Character) is a controlled selection that
 * syncs with the chip clicked below — clicking Products in the chips row makes
 * the tray's left-list highlight Products and updates the body copy.
 */

import { useCallback, useEffect } from "react";
import {
  Plus,
  Search,
  Bookmark,
  Bag,
  People,
} from "react-iconly";
import { cn } from "@/lib/utils";

export type TrayCategory = "characters" | "products" | "brand-kits";

const UNSPLASH_FACE = (id: string, size = 480) =>
  `https://images.unsplash.com/${id}?w=${size}&h=${size}&fit=crop&crop=faces&auto=format&q=80`;
const UNSPLASH_IMG = (id: string, size = 480) =>
  `https://images.unsplash.com/${id}?w=${size}&h=${size}&fit=crop&auto=format&q=80`;

const CATEGORY_COPY: Record<
  TrayCategory,
  {
    title: string;
    searchPlaceholder: string;
    newButton: string;
    heading: string;
    description: string;
    newItemButton: string;
    heroImage: string;
    peerImages: [string, string, string, string];
  }
> = {
  characters: {
    title: "Add references",
    searchPlaceholder: "Search characters",
    newButton: "New Characters",
    heading: "Create your own characters",
    description:
      "Create a reusable character with a consistent face and expressions.",
    newItemButton: "New Character",
    heroImage: UNSPLASH_FACE("photo-1508214751196-bcfd4ca60f91"),
    peerImages: [
      UNSPLASH_FACE("photo-1544005313-94ddf0286df2", 120),
      UNSPLASH_FACE("photo-1438761681033-6461ffad8d80", 120),
      UNSPLASH_FACE("photo-1534528741775-53994a69daeb", 120),
      UNSPLASH_FACE("photo-1492562080023-ab3db95bfbce", 120),
    ],
  },
  products: {
    title: "Add references",
    searchPlaceholder: "Search products",
    newButton: "New Products",
    heading: "Add your products",
    description:
      "Upload product shots so Ads Studio can weave them into every generation.",
    newItemButton: "New Product",
    heroImage: UNSPLASH_IMG("photo-1542291026-7eec264c27ff"), // red sneaker
    peerImages: [
      UNSPLASH_IMG("photo-1505740420928-5e560c06d30e", 120), // headphones
      UNSPLASH_IMG("photo-1523275335684-37898b6baf30", 120), // watch
      UNSPLASH_IMG("photo-1556742049-0cfed4f6a45d", 120), // cosmetic
      UNSPLASH_IMG("photo-1523275335684-37898b6baf30", 120),
    ],
  },
  "brand-kits": {
    title: "Add references",
    searchPlaceholder: "Search brand kits",
    newButton: "New Brand Kit",
    heading: "Create a brand kit",
    description:
      "Lock in your brand's palette, fonts, and voice so every ad feels on-brand.",
    newItemButton: "New Brand Kit",
    heroImage: UNSPLASH_IMG("photo-1611926653458-09294b3142bf"), // Pantone color card
    peerImages: [
      UNSPLASH_IMG("photo-1626785774573-4b799315345d", 120), // paint swatches
      UNSPLASH_IMG("photo-1586953208448-b95a79798f07", 120), // design work
      UNSPLASH_IMG("photo-1558655146-9f40138edfeb", 120), // branding mockup
      UNSPLASH_IMG("photo-1634986666676-ec8fd927c23d", 120), // design layout
    ],
  },
};

const LEFT_LIST: Array<{
  id: TrayCategory;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}> = [
  {
    id: "characters",
    label: "Character",
    icon: <People set="light" size="small" />,
  },
  {
    id: "products",
    label: "Products",
    icon: <Bookmark set="light" size="small" />,
    badge: "01",
  },
  {
    id: "brand-kits",
    label: "Brand Kits",
    icon: <Bag set="light" size="small" />,
  },
];

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "saved", label: "Saved", icon: <Bookmark set="light" size="small" /> },
  {
    id: "my",
    label: "My characters",
    icon: <Bag set="light" size="small" />,
  },
  { id: "photo", label: "Photo" },
  { id: "illustration", label: "Illustration" },
  { id: "3d", label: "3d" },
  { id: "design", label: "Design" },
] as const;

export type ReferenceTrayProps = {
  category: TrayCategory;
  onCategoryChange?: (c: TrayCategory) => void;
  onClose: () => void;
};

export function ReferenceTray({
  category,
  onCategoryChange,
  onClose,
}: ReferenceTrayProps) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const copy = CATEGORY_COPY[category];

  return (
    <section
      role="region"
      aria-label={copy.title}
      className={cn(
        "w-[908px] h-[490px]",
        "bg-surface-primary-variant border-1 border-border-primary",
        "rounded-8 overflow-hidden flex flex-col"
      )}
      style={{ boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)" }}
    >
      {/* Header */}
      <header className="shrink-0 h-14 w-full flex items-center gap-2 pl-5 pr-4 py-4">
        <h2
          className="flex-1 text-heading-sm font-semibold text-content-primary"
          style={{ letterSpacing: "0" }}
        >
          {copy.title}
        </h2>

        <div className="w-[225px] h-8 rounded-6 border-2 border-border-tertiary bg-transparent flex items-center gap-2 px-[10px]">
          <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4 text-content-tertiary">
            <Search set="light" size="small" />
          </span>
          <input
            type="text"
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchPlaceholder}
            className="flex-1 min-w-0 bg-transparent outline-none text-label-md text-content-primary placeholder:text-content-tertiary"
          />
        </div>

        <button
          type="button"
          className="h-8 px-[10px] rounded-6 bg-fill-inverse text-content-inverse inline-flex items-center gap-2 text-label-md font-medium hover:bg-fill-inverse-hover transition-colors"
        >
          <Plus set="light" size="small" />
          {copy.newButton}
        </button>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="h-8 w-8 rounded-6 flex items-center justify-center text-content-primary hover:bg-fill-primary-hover transition-colors"
        >
          <CloseIcon />
        </button>
      </header>

      {/* Body — left 200px list / right content */}
      <div className="flex-1 min-h-0 flex">
        <div className="w-[200px] shrink-0 h-full flex flex-col items-start gap-1 pl-5 pr-3 py-5 overflow-y-auto">
          {LEFT_LIST.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCategoryChange?.(item.id)}
                className={cn(
                  "w-full h-8 rounded-6 px-[10px] flex items-center justify-between gap-2 transition-colors",
                  active
                    ? "bg-fill-secondary text-content-primary"
                    : "text-content-primary hover:bg-fill-primary-hover"
                )}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="[&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>
                  <span className="text-label-md truncate">{item.label}</span>
                </span>
                {item.badge && (
                  <span className="h-5 min-w-5 px-1 rounded-2 bg-fill-brand-secondary text-content-brand text-label-sm font-medium flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex-1 min-w-0 h-full flex flex-col gap-4 pl-3 pr-5 py-5 overflow-hidden">
          <div className="shrink-0 flex items-center gap-3 flex-wrap">
            {FILTER_TABS.map((t, i) => {
              const active = i === 1;
              return (
                <button
                  key={t.id}
                  type="button"
                  className={cn(
                    "h-8 px-3 rounded-6 border-1 inline-flex items-center gap-2 text-label-md font-medium transition-colors",
                    active
                      ? "bg-fill-secondary border-transparent text-content-primary"
                      : "border-border-secondary text-content-secondary hover:text-content-primary"
                  )}
                >
                  {"icon" in t && t.icon && (
                    <span className="[&_svg]:h-4 [&_svg]:w-4">{t.icon}</span>
                  )}
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 min-h-0 flex items-center justify-center gap-7">
            <div className="relative w-[226px] h-[279px] shrink-0">
              <div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  top: 2,
                  left: 34,
                  width: 173,
                  height: 169,
                  background: "#73b6c4",
                  filter: "blur(24px)",
                }}
              />
              <div
                aria-hidden
                className="absolute rounded-full"
                style={{
                  top: 2,
                  left: 2,
                  width: 191,
                  height: 188,
                  background: "rgba(123,196,115,0.3)",
                }}
              />
              <img
                src={copy.heroImage}
                alt=""
                aria-hidden
                className="absolute top-0 left-0 w-[226px] h-[226px] rounded-full object-cover shadow-md"
              />
              <div className="absolute left-[19px] top-[238px] w-[188px] h-[42px]">
                <Avatar src={copy.peerImages[0]} size={22} left={0} top={-26} opacity={0.3} />
                <Avatar src={copy.peerImages[1]} size={28} left={34} top={-4} opacity={0.5} />
                <Avatar src={copy.heroImage} size={42} left={73} top={0} opacity={1} />
                <Avatar src={copy.peerImages[2]} size={28} left={127} top={-4} opacity={0.5} />
                <Avatar src={copy.peerImages[3]} size={22} left={166} top={-26} opacity={0.3} />
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-[330px]">
              <div className="flex flex-col gap-1">
                <h3 className="text-label-lg font-medium text-content-primary">
                  {copy.heading}
                </h3>
                <p className="text-label-md font-normal text-content-secondary">
                  {copy.description}
                </p>
              </div>
              <button
                type="button"
                className="self-start h-8 px-[10px] rounded-6 bg-fill-secondary text-content-primary inline-flex items-center gap-2 text-label-md font-medium hover:bg-fill-secondary-hover transition-colors"
              >
                <Plus set="light" size="small" />
                {copy.newItemButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Avatar({
  src,
  size,
  left,
  top,
  opacity,
}: {
  src: string;
  size: number;
  left: number;
  top: number;
  opacity: number;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className="absolute rounded-full object-cover"
      style={{ width: size, height: size, left, top, opacity }}
    />
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4l8 8M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
