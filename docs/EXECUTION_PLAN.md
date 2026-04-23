# Ads Studio — Execution Plan

A phased plan for delivering the v0 scaffold defined in [`ADS_STUDIO_BRIEF.md`](./ADS_STUDIO_BRIEF.md).

## 0. Working assumptions (revised after inspecting `/Users/vyro/imagine-mcp`)

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript.
- **Styling:** **Tailwind 3.4** — the Imagine DS is Tailwind-based. The brief's `gap-*` / `rounded-*` / `display-*` class names come from the DS's `tailwind.config.ts` (not stock Tailwind). We copy the DS's Tailwind config into ours.
- **Design system access:** `imagine-mcp` is `"private": true`, no published build, no `exports` field. Cleanest path: **copy source** — `src/components/ui/` → `components/ui/`, `src/design-tokens.css` → `styles/design-tokens.css`, relevant sections of `tailwind.config.ts`, and `public/brand/` → `public/brand/`. Real primitives: `Button`, `Textarea`, `Card`, `Tooltip`, `Avatar`, `TopNav`, `SideNav` are all available. Note: **no `IconButton`** primitive — the brief's `IconButton` references become `<Button variant="ghost" size="icon">` (or equivalent).
- **Icons:** `react-iconly` (DS's choice). Install as dep.
- **Dark-mode activation:** **`.dark` class** on the route wrapper (per `tailwind.config.ts: darkMode: "class"` + `:root / .dark` blocks in `design-tokens.css`). **Not** `data-theme="dark"` — revise brief-sourced guess.
- **Font:** Google Sans Flex via `<link>` in root `layout.tsx` (matches DS).
- **Viewport:** Desktop-first, `min-width: 1280px` target. No mobile breakpoints.
- **Rename:** Every literal occurrence of `marketing-studio` / `marketing_studio` / `Marketing Studio` / `MARKETING STUDIO` → `ads-studio` / `ads_studio` / `Ads Studio` / `ADS STUDIO`. Route path becomes `/ads-studio`.

## 1. Phase A — Project bootstrap (blocking; needs user confirmation before running)

| Step | Command / action | Output |
| --- | --- | --- |
| A1 | `npx create-next-app@latest . --typescript --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm` | Next.js skeleton with Tailwind |
| A2 | Copy `imagine-mcp/src/components/ui/` → `components/ui/` | 60+ DS primitives |
| A3 | Copy `imagine-mcp/src/design-tokens.css` → `styles/design-tokens.css`; import in `app/layout.tsx` | CSS vars |
| A4 | Copy `imagine-mcp/public/brand/` → `public/brand/` | Imagine logo assets |
| A5 | Merge `imagine-mcp/tailwind.config.ts` (colors / spacing / fontSize / borderRadius / boxShadow / borderWidth) into our `tailwind.config.ts`; set `darkMode: "class"` | Matching token classes |
| A6 | `npm i` deps the DS uses: `@radix-ui/*` (per imports), `react-iconly`, `class-variance-authority`, `clsx`, `tailwind-merge` | Runtime deps |
| A7 | Add Google Sans Flex `<link>` to `app/layout.tsx` | Font loaded |
| A8 | Replace `app/page.tsx` with a `redirect('/ads-studio')` | Dev lands on scaffold |
| A9 | `git init && git add -A && git commit -m "chore: bootstrap ads-studio + vendor imagine DS"` | Git baseline |

## 2. Phase B — Layout & chrome

1. `app/ads-studio/layout.tsx` — wraps children in `<div className="dark">`, imports `styles/design-tokens.css`.
2. `app/ads-studio/page.tsx` — composes real `<TopNav />` + `<SideNav />` from `@/components/ui`, plus `<PainterlyBackdrop />`, `<HeroBlock />`, `<PromptComposer />`, `<ProjectRail />`, `<InspirationsGrid />`. Pass minimal placeholder items to `TopNav` / `SideNav` for v0.
3. CSS grid shell constrains the backdrop to the central column only (per §3). Grid template: `[sidebar 64px] [central 1fr]` × `[navbar 56px] [content 1fr]`.

**Exit check:** Page renders at 1440×900; sidebar + navbar reserve their pixels; central column is empty and dark.

## 3. Phase C — Painterly backdrop (quarantine #1)

1. Create `components/ads-studio/painterly-backdrop.tsx`.
2. Implement the five-stack `radial-gradient` per §4.2, literal hexes allowed here only.
3. Add the `<!-- colors quarantined -->` comment block at the top of the file.
4. Accept `intensity: 'default' | 'muted'` prop, apply `opacity: 0.5` for muted.
5. `pointer-events: none`, absolutely positioned inside the central column, full-bleed to that column.

**Exit check:** No banding, no hard edges. Visual parity with Director Mode but warmer/purple. `grep -rn '#' components/ app/` returns this file only (so far).

## 4. Phase D — Hero block

1. `components/ads-studio/hero-block.tsx` — logo (placeholder SVG at ~28px), eyebrow `ADS STUDIO`, title, tagline.
2. Only token classes (`label-sm`, `display-sm`, `body-md`, `gap-2`, `gap-3`, `gap-4`, `--color-text-*`).
3. Max-width 640px, centered.
4. Placeholder `<ImagineLogo />` in `lib/brand/`.

**Exit check:** Type scale matches brief; no hex; no mid-sentence bolding.

## 5. Phase E — Prompt composer (quarantine #2)

1. `components/ads-studio/reference-tiles-row.tsx` — three tiles (Avatars / Products / Brands), visually-disabled, `console.log` on click.
2. `components/ads-studio/prompt-composer.tsx`:
   - Image/Video toggle pair (left, outside the composer surface).
   - Glass surface (noted-as-intentional rgba).
   - Top row: `+` ghost IconButton + borderless Textarea.
   - Bottom row: pill controls (`Mode ▾`, `9:16`, `720p`, `8s`) + Generate CTA.
   - Generate CTA gradient (§6.7) — literal hexes allowed here only, with quarantine comment.
3. Mode dropdown uses placeholder list `['Product', 'App', 'UGC', 'Brand']`; dropdown itself renders via a DS Popover stub.

**Exit check:** `grep -rn '#' components/ app/` returns only `painterly-backdrop.tsx` and `prompt-composer.tsx` (two files).

## 6. Phase F — Project rail

1. `components/ads-studio/project-rail.tsx` — floated right column, no background/panel.
2. Static array of 5 placeholder projects + a `[+]` head + overflow `[⋯]` tile.
3. Active state ring on the first project tile.
4. Tooltip on hover with project name (DS `Tooltip` stub).
5. Vertical scroll within the rail if it overflows.

**Exit check:** Tiles sit directly on the backdrop; no surface/border around the column.

## 7. Phase G — Inspirations grid

1. `components/ads-studio/inspirations-grid.tsx` — static 12 tiles.
2. `repeat(auto-fit, minmax(180px, 1fr))`, 9:16 aspect via `aspect-ratio`.
3. Label overlay at bottom; hover lift using `shadow-sm` token.
4. Begins `gap-12` below the composer.

**Exit check:** 12 tiles render; hover lift works; no infinite scroll logic.

## 8. Phase H — Acceptance audit

Run the acceptance checks from §12 as a reviewable script or manual pass:

1. `rg "#[0-9a-fA-F]{3,8}" components/ app/` — only the two quarantine files.
2. `rg "padding:|margin:|gap:" components/ app/ --type css` — no raw px values (rgba internals excepted).
3. `rg "rounded-\d+|rounded-full" components/ app/` — only from the named scale.
4. Typography grep for `font-size:|text-` raw values — none.
5. Manual: page renders at 1280×800 and 1440×900.
6. Manual: backdrop reads painterly, no banding.
7. Manual: CTA gradient purple → magenta, only gradient in the foreground.
8. Manual: rail thumbnails float on backdrop.
9. Manual: navbar + sidebar placeholders untouched.
10. Write a short `AUDIT_REPORT.md` capturing results.

## 9. Deliverables

At the end of Phase H, the repo contains:

- Working Next.js dev server: `npm run dev` → http://localhost:3000/ads-studio.
- All components per §11 (renamed to `ads-studio`).
- `docs/ADS_STUDIO_BRIEF.md` (renamed brief).
- `docs/EXECUTION_PLAN.md` (this file).
- `docs/AUDIT_REPORT.md` (after Phase H).
- Clean git history: one commit per phase.

## 10. Out of scope / explicit non-goals (mirrored from §10 of brief)

Existing-project view, picker modals, brand kit, remix flow, generation API, pricing UI, mobile, light mode. Any accidental foray adds a `// TODO:` and a line in `docs/FOLLOWUPS.md`.

## 11. Risks & open questions

| Risk | Mitigation |
| --- | --- |
| `@imagine/design-system` not published to this machine's registry | Stub primitives in `lib/ds-stubs/`; mark each with `// TODO: replace`. |
| Token utility classes (`gap-3`, `rounded-4`, `display-sm`) don't match a generic Tailwind mental model | Provide fallback stylesheet `styles/tokens.css` that implements them literally, documented as interim. |
| Google Sans Flex not locally available | The design system normally loads it; fall back to system `ui-sans-serif` until the package is wired. Flag in audit. |
| Brand assets (Imagine logo, icon set) absent | Use neutral placeholder SVGs; flag in `docs/FOLLOWUPS.md`. |
| Brief mentions `https://imagine-design-system.vercel.app` as source of truth | If the live docs contradict the brief at review time, stop and flag per brief §13. |

## 12. Rename audit checklist

Before merging, confirm every occurrence is updated:

- Route path: `/ads-studio` (not `/marketing-studio`)
- Folder names: `app/ads-studio/`, `components/ads-studio/`
- Eyebrow text: `ADS STUDIO`
- Display names in code comments + JSX strings
- `docs/ADS_STUDIO_BRIEF.md` (renamed from the original) — **done**
- Any references in CSS module class names

`rg -i "marketing.?studio"` should return zero hits after the audit (outside `docs/EXECUTION_PLAN.md`'s historical mention of the rename itself).
