# Ads Studio — Homepage Scaffold Brief

**Audience:** Claude Code
**Goal:** Build the first-run / new-project landing page for **Ads Studio**, a new sub-product inside ImagineArt. This is a v0 scaffold — get the structure, tokens, and gradient right. Polish comes later.

---

## 1. Non-negotiable design system constraints

Ads Studio must look, feel, and behave like a native Imagine surface. To prevent token leakage, follow these rules **strictly**:

### 1.1 Use semantic tokens — never raw hex

All colors must come from the Imagine Design System CSS variables:

- Surfaces → `var(--color-surface-primary)`, `var(--color-surface-secondary)`, `var(--color-surface-elevated)`, `var(--color-surface-brand)`
- Fills → `var(--color-fill-brand)`, `var(--color-fill-brand-hover)`, semantic fills (critical/success/warning)
- Text → `var(--color-text-primary)`, `var(--color-text-secondary)`, `var(--color-text-tertiary)`, `var(--color-text-brand)`
- Borders → `var(--color-border-primary)`, `var(--color-border-secondary)`, `var(--color-border-brand)`, `var(--color-border-focus)`

**The ONE exception** is the painterly gradient defined in §4. Hex values are allowed *only* inside the `<PainterlyBackdrop />` component file. Anywhere else, hex values are a bug.

### 1.2 Use design system primitives where they exist

Import `Button`, `Input`, `Textarea`, `Card`, `IconButton`, `Tooltip`, `Avatar`, etc. from the Imagine Design System package. Do not re-implement these. If a primitive doesn't exist for what you need, build it using the tokens above — never with ad-hoc styles.

### 1.3 Typography

Font family: **Google Sans Flex** (already loaded by the design system).
Use the named scale only:

- Display: `display-xs` (48/56), `display-sm` (60/72), `display-md` (72/84)
- Heading: `heading-xs` → `heading-2xl`
- Body: `body-xs` → `body-xl`
- Label: `label-xs` → `label-2xl`

Weights allowed: 400, 500, 600, 700. No mid-sentence bolding. Sentence case for body, ALL CAPS only for the eyebrow tagline above the title (per the sketch).

### 1.4 Spacing & radii

- Spacing must use the design system scale: `gap-1` (4px) through `gap-18` (120px). Do not introduce intermediate values.
- Border radius from the system scale: `rounded-1` through `rounded-12`. Cards and surfaces typically use `rounded-4` (8px) or `rounded-8` (16px). Pills use `rounded-full`.
- Borders use the named widths: `border-1` (0.5px), `border-2` (1px). Default to `border-1` for chrome divisions.

### 1.5 Out of bounds

- No new color introductions beyond the painterly gradient.
- No glow/blur/neon effects anywhere except inside `<PainterlyBackdrop />`.
- No drop shadows beyond the design system's `shadow-xs` → `shadow-lg` tokens.
- No external font imports.
- No third-party UI libraries (no shadcn outside what the Imagine system already vendors, no Radix wrappers, no headless UI).

---

## 2. Existing chrome (do NOT redesign)

The Imagine app already has a top **Navbar** and a left **Sidebar**. Treat these as immutable constraints. Ads Studio renders **inside** them — the page content sits in the area to the right of the sidebar and below the navbar.

If the project has these components available, import and use them. If not, leave a `<TopNavbar />` and `<LeftSidebar />` placeholder that respects the layout dimensions (sidebar ~64px wide, navbar ~56px tall). Do not style or theme them.

---

## 3. Page layout

```
┌─────────────────────────────────────────────────────────────┐
│  TOP NAVBAR (existing)                                      │
├──────┬──────────────────────────────────────────────┬───────┤
│      │                                              │       │
│ SIDE │           PAINTERLY BACKDROP                 │ PROJ  │
│ BAR  │  ┌──────────────────────────────────────┐    │ RAIL  │
│      │  │  Imagine logo (sm)                   │    │       │
│ (ex- │  │  ADS STUDIO  (eyebrow)               │    │  [+]  │
│ ist- │  │  Display title                       │    │       │
│ ing) │  │  Tagline body                        │    │  [▢]  │
│      │  │                                      │    │  [▢]  │
│      │  │  [Avatars][Products][Brands]         │    │  [▢]  │
│      │  │                                      │    │  [▢]  │
│      │  │  ┌──────────────────────────────┐    │    │  [⋯]  │
│      │  │  │ I │  Prompt composer    [GEN]│    │    │       │
│      │  │  │ V │                          │    │    │       │
│      │  │  └──────────────────────────────┘    │    │       │
│      │  └──────────────────────────────────────┘    │       │
│      │                                              │       │
│      │  ▒▒▒ Inspirations grid (infinite scroll) ▒▒▒│       │
│      │  [tile][tile][tile][tile][tile]              │       │
│      │  [tile][tile][tile][tile][tile]              │       │
│      │                                              │       │
└──────┴──────────────────────────────────────────────┴───────┘
```

**Key spatial rules:**
- The painterly backdrop is the canvas behind everything in the central column. It does NOT extend behind the sidebar or navbar.
- The project rail is `~64px` wide, floats at the right edge, has no panel/border surface — thumbnails sit directly on the backdrop.
- The hero block (logo → title → tagline → reference tiles → prompt composer) is centered horizontally, max-width `~640px`.
- The inspirations grid begins ~`gap-12` (48px) below the prompt composer, with subtle indication that it scrolls infinitely.

---

## 4. Painterly backdrop (the special asset)

This is the single piece of the page that introduces non-tokenized colors. Build it as **one component** at `components/ads-studio/painterly-backdrop.tsx` so the hex values are quarantined to one file.

### 4.1 Visual intent

A full-bleed atmospheric gradient — purple-dominant, with a magenta bloom and one warm amber accent. The reference is Imagine's **Director Mode** background, but tuned warmer toward purple (less teal, no green). It should feel painterly, not synthetic — soft radial blooms layered on a deep plum base, no hard edges, no banding.

### 4.2 Implementation

Use a stack of CSS `radial-gradient` layers on a single absolutely-positioned div behind the page content. Use `pointer-events: none` so it doesn't interfere with input. Document each color with a comment so future contributors don't reuse them elsewhere.

```css
/* PAINTERLY BACKDROP — colors quarantined to this file only.
   Do not export, do not reference these hex values from other components. */
background:
  radial-gradient(ellipse 55% 45% at 25% 30%, rgba(105, 41, 196, 0.55) 0%, rgba(105, 41, 196, 0) 60%),
  radial-gradient(ellipse 50% 45% at 75% 35%, rgba(138, 63, 252, 0.45) 0%, rgba(138, 63, 252, 0) 65%),
  radial-gradient(ellipse 60% 50% at 55% 80%, rgba(193, 57, 122, 0.40) 0%, rgba(193, 57, 122, 0) 60%),
  radial-gradient(ellipse 30% 28% at 85% 75%, rgba(232, 163, 70, 0.25) 0%, rgba(232, 163, 70, 0) 65%),
  radial-gradient(ellipse at 50% 50%, #16092e 0%, #0c0420 70%, #08020f 100%);
```

### 4.3 Component contract

```tsx
<PainterlyBackdrop
  intensity="default" | "muted"  // 'muted' fades opacity to ~50% — used when content is loaded
/>
```

The default state is for the empty / new-project landing. The `muted` variant exists for the future existing-project state where generated assets should dominate.

### 4.4 Allowed gradient palette (this file ONLY)

| Role | Hex | Notes |
|---|---|---|
| Base deep | `#08020f` | Outer edges of canvas |
| Base plum | `#0c0420` | Mid-canvas base |
| Base warm-plum | `#16092e` | Canvas center |
| Violet bloom | `#6929c4` | Primary 70 — main bloom, upper-left |
| Brand bloom | `#8a3ffc` | Primary 60 — secondary bloom, upper-right |
| Magenta bloom | `#c1397a` | Lower-center, behind prompt composer |
| Amber accent | `#e8a346` | Single warm bloom, lower-right corner only |

**Do not:** use these in buttons, borders, text, or anywhere outside this file. The CTA gradient (§6.4) is defined separately and is the only other place where compound color is permitted.

---

## 5. Hero block

A vertically stacked, center-aligned content group. From top to bottom:

1. **Imagine logo** — small, ~28px, full-color from brand assets.
2. **Eyebrow** — `label-sm`, weight 500, ALL CAPS, letter-spacing `0.18em`, color `var(--color-text-secondary)`. Text: `ADS STUDIO`.
3. **Title** — `display-sm` or `display-xs` (responsive), weight 500, color `var(--color-text-primary)`. Placeholder copy: `Turn anything into a campaign`. Final copy will come from product.
4. **Tagline** — `body-md`, weight 400, color `var(--color-text-secondary)`. Placeholder: `Lorem ipsum dolor sit amet consectetur adipiscing elit.`

Vertical rhythm between elements: `gap-3` between logo and eyebrow, `gap-2` between eyebrow and title, `gap-4` between title and tagline.

---

## 6. Prompt composer

This is the most structurally complex component on the page. Build it at `components/ads-studio/prompt-composer.tsx`.

### 6.1 Anatomy

```
┌──┬─────────────────────────────────────────────────┐
│ I│  [+]  Describe what happens in the ad...        │
│ ──│                                                 │
│ V│  [Mode▾] [9:16] [720p] [8s]            [GENERATE]│
└──┴─────────────────────────────────────────────────┘
  ▲                                             ▲
  Image/Video toggle pair                      CTA gradient pill
  (left of the composer)
```

### 6.2 Above the composer (reference tiles row)

Three small tiles in a horizontal row, sitting `gap-3` above the composer. Each is `~88px × 56px`, `rounded-3`, `border-1`, surface = `var(--color-surface-elevated)` with low opacity (~6% white over the backdrop).

Labels: `Avatars`, `Products`, `Brands`. Each is interactive — clicking opens a picker (out of scope for v0; render as visually-disabled buttons that log on click).

### 6.3 Composer surface

A glass surface that sits over the painterly backdrop:

- Background: `rgba(15, 8, 30, 0.55)` — explicitly defined ONLY in this component file, treated as a localized value (note in a comment that this is intentional and isolated)
- Border: `border-1` solid, `rgba(255, 255, 255, 0.14)`
- Radius: `rounded-7` (14px) or `rounded-8` (16px)
- Padding: `gap-4` vertical, `gap-4` horizontal
- Width: fills its parent (max-width `640px`)

### 6.4 Image/Video toggle pair

Two stacked tiles to the LEFT of the composer (outside its surface, with `gap-2` between them and `gap-2` from the composer). Each is `~52px × 44px`, `rounded-3`. Active tile: `var(--color-surface-elevated)` at 10% opacity with `border-1` at 18% white. Inactive: 5% / 10%. Use the icon assets the user will provide — for v0, render an `<ImageIcon />` and `<VideoIcon />` placeholder.

### 6.5 Composer interior

- **Top row:** A 32×32 add-reference button (`+` icon, `IconButton` variant `ghost`) on the left, then a textarea filling the rest. Textarea is borderless, transparent background, placeholder color `var(--color-text-tertiary)`, body-sm.
- **Bottom row:** Left-aligned cluster of pill controls (mode selector, aspect ratio, resolution, duration), right-aligned Generate CTA.

### 6.6 Pill controls (bottom-left of composer)

Each pill: `rounded-full`, `border-1` at 8% white, transparent fill, padding `gap-2` vertical / `gap-3` horizontal, `label-sm` text at `var(--color-text-secondary)`. The mode pill has a chevron indicating it opens a dropdown. The mode dropdown contents (Product ad, App ad, UGC, etc.) come from product spec — for v0, populate with `Product`, `App`, `UGC`, `Brand`.

### 6.7 Generate CTA (the signature button)

A pill button that uses Ads Studio's signature gradient. This is the **second and final** place compound color is allowed — quarantine the hex values inside this component file only.

```css
/* GENERATE CTA — Ads Studio signature gradient.
   Quarantined to this component. Do not reuse these hex values. */
background: linear-gradient(135deg, #8a3ffc 0%, #c1397a 100%);
```

- Text: `label-md`, weight 500, white, letter-spacing `0.04em`, ALL CAPS — `GENERATE`
- Padding: `gap-2` vertical, `gap-5` horizontal
- Radius: `rounded-full`
- Hover: shift gradient to `linear-gradient(135deg, #6929c4 0%, #a02a64 100%)` (Primary 70 → darker magenta)
- Active: scale(0.98)
- Disabled: 40% opacity, no gradient transition

---

## 7. Project rail (right edge)

A floating column at the right edge of the central area. **No background panel, no border.** Thumbnails sit directly on the painterly backdrop.

### 7.1 Structure

```
[+]    ← New project tile, always at top
[▢]    ← Most recent project (active state if currently selected)
[▢]
[▢]
[▢]
[⋯]    ← Overflow tile if there are more than 8 projects
```

### 7.2 Tile specs

- Size: `40px × 40px`
- Radius: `rounded-3` (6px)
- Vertical gap between tiles: `gap-2` (6px)
- "+" tile: `border-1` at 18% white, transparent fill, plus icon at `var(--color-text-secondary)`
- Project tile (default): no border, fills with the project's hero asset thumbnail (via `<img />`)
- Project tile (active): `border-2` solid white at 60% opacity, surrounding the tile
- Overflow tile: `border-1` at 12% white, ellipsis icon

### 7.3 Position

`position: absolute` (or fixed within the page region), `right: gap-3`, `top: gap-7` from the navbar bottom edge. Vertical scroll the rail itself if it overflows the viewport — don't push the page.

### 7.4 Hover states

On hover, show a tooltip with the project name to the left of the tile (use the design system `Tooltip` primitive).

---

## 8. Inspirations grid (below the fold)

Below the hero block by `gap-12` (48px), render a horizontally-scrolling or grid-laid set of inspiration tiles. Each tile is a remixable template (poster, ad, video still).

### 8.1 v0 scope

For this scaffold, render a static grid of 12 placeholder tiles in a `repeat(auto-fit, minmax(180px, 1fr))` grid with `gap-3` between tiles. Each tile:

- Aspect ratio: 9:16 (vertical, since most ad templates are vertical)
- Background: `var(--color-surface-elevated)` placeholder, `rounded-4`
- Label overlay at bottom: `label-sm`, white, with a subtle dark gradient overlay for legibility

Wire up basic hover state (slight lift via `shadow-sm`) but do not implement remix flow, infinite scroll, or category filtering — those are out of scope.

---

## 9. Light vs dark mode

Ads Studio is **dark mode only** for v0. The painterly backdrop fundamentally requires a dark base to read correctly. Light mode support will come later as a separate workstream. Force dark mode on the page using the design system's mechanism (likely a `data-theme="dark"` wrapper or equivalent — check the design system docs).

---

## 10. Out of scope (do NOT build)

- Existing-project view (the screen shown when clicking an existing project tile)
- Avatars / Products / Brands picker modals
- Brand kit setup
- Inspirations remix flow
- Generation pipeline / API wiring
- Pricing/upgrade UI
- Mobile responsive (desktop-first; min viewport 1280px is fine)
- Light mode

If you find yourself reaching into any of these, stop and add a placeholder + a `// TODO:` comment.

---

## 11. File structure (suggested)

```
app/ads-studio/
  page.tsx                           # Route entry, composes the layout
  layout.tsx                         # Forces dark mode wrapper
components/ads-studio/
  painterly-backdrop.tsx             # §4 — gradient quarantine
  hero-block.tsx                     # §5
  reference-tiles-row.tsx            # §6.2
  prompt-composer.tsx                # §6 — CTA gradient quarantine
  project-rail.tsx                   # §7
  inspirations-grid.tsx              # §8
```

Co-locate any component-specific styles in CSS modules next to each component. No global stylesheet additions.

---

## 12. Acceptance criteria

A reviewer should be able to confirm all of the following without running a linter:

1. Searching the codebase for `#` (hex color literals) returns hits ONLY in `painterly-backdrop.tsx` and `prompt-composer.tsx` (the two quarantine files). Nowhere else.
2. All other colors flow from `var(--color-*)` tokens.
3. All spacing values are from the `gap-*` scale; no raw `px` / `rem` for margin, padding, or gap (exception: glass surface / gradient internals where opacity-based color requires raw rgba).
4. All radii are from the `rounded-*` scale.
5. Typography uses only the named scale (`display-*`, `heading-*`, `body-*`, `label-*`).
6. The page renders without errors at 1440×900 viewport.
7. The painterly backdrop is visually painterly — soft, atmospheric, no banding, no hard radial edges.
8. The Generate CTA gradient runs purple → magenta and is the only gradient in the foreground.
9. The project rail thumbnails float directly on the backdrop with no panel surface behind them.
10. Existing Imagine navbar and sidebar are untouched and still render correctly.

---

## 13. Notes for future iterations (not v0)

- The painterly backdrop should fade to `intensity="muted"` once a user opens an existing project — separate state hookup.
- The CTA gradient is a per-product signature; Director Mode uses cyan→blue, Ads Studio uses purple→magenta. Future sub-products should each get their own gradient defined the same way.
- The Image/Video toggle to the left of the composer is the canonical Imagine pattern (lifted from Director Mode). Reuse the same component if/when extracted.
- The right rail's "scale to many projects" pattern is unresolved — likely needs a `[⋯]` overflow into a full project library view. Worth designing before users hit 10+ projects.

---

**End of brief.** If anything here conflicts with the latest Imagine Design System docs at `https://imagine-design-system.vercel.app`, the design system wins — flag the conflict and stop.
