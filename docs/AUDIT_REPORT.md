# Ads Studio v0 — Phase H Audit Report

Audit of the 10 acceptance criteria from [`ADS_STUDIO_BRIEF.md` §12](./ADS_STUDIO_BRIEF.md), run against the current working tree.

Run: `2026-04-23` (from user env).
Scope: `app/ads-studio/**` + `components/ads-studio/**`. The vendored design system under `components/ui/**` + `components/layout/**` + `styles/design-tokens.css` is treated as external — it is the source of truth, not subject to audit.

## 1. Hex literals are quarantined to two files
**Pass.**

`grep -rEn '#[0-9a-fA-F]{3,8}\b' app/ads-studio components/ads-studio` returns hits only in:

- `components/ads-studio/painterly-backdrop.tsx` — the five-stack radial-gradient.
- `components/ads-studio/prompt-composer.tsx` — the `CTA_GRADIENT` and `CTA_GRADIENT_HOVER` constants.

Every match is either inside the single inline gradient string or in an annotating comment documenting provenance. No hex value escapes the quarantine.

## 2. All other colors flow from `var(--color-*)` tokens
**Pass.**

Non-quarantined components use Tailwind class families that map to design-system CSS variables:

- `bg-surface-primary`, `bg-surface-elevated`, `text-content-primary`, `text-content-secondary`, `border-border-secondary`, `bg-fill-secondary/40`, etc.

The only non-token colors outside the quarantine are **semantic white at opacity** (`border-white/[.18]`, `bg-white/[.06]`) used where the brief explicitly specifies `"border-1 at 18% white"` (§6.4, §7.2). `white` is a CSS keyword, not a hex literal.

## 3. Spacing values from the `gap-*` / `p-*` / `m-*` token scale
**Pass (with documented exceptions).**

Scanned for arbitrary `[Npx]` spacing. The hits that remain are **dimension declarations explicitly pinned by the brief**, not margin/padding/gap:

| File | Expression | Brief reference |
| --- | --- | --- |
| `hero-block.tsx` | `max-w-[640px]` | §3 "max-width ~640px" |
| `reference-tiles-row.tsx` | `h-[56px] w-[88px]` | §6.2 "~88px × 56px" |
| `prompt-composer.tsx` | `h-[44px] w-[52px]` | §6.4 "~52px × 44px" |
| `prompt-composer.tsx` | `min-h-[40px]`, `min-w-[140px]` | component minimums |
| `project-rail.tsx` | (no arbitrary values) | — |

All margin/padding/gap usages are tokenized (`gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-12`, `p-4`, `px-3`, `py-2`, `mt-2`, `pt-12`, etc.). No raw `rem`.

## 4. All radii from the `rounded-*` scale
**Pass.**

Only `rounded-3`, `rounded-4`, `rounded-8`, `rounded-full` appear — all from the DS token scale (2px / 12px / 32px / 9999px respectively in `tailwind.config.ts`).

## 5. Typography uses only the named scale
**Pass.**

Only `text-display-sm`, `text-body-sm`, `text-body-md`, `text-label-xs`, `text-label-sm`, `text-label-md` appear. No ad-hoc `text-[Npx]` / `text-base` / etc. Weight classes (`font-medium`, `font-normal`) are from the named weight set (400/500/600/700).

## 6. Page renders without errors at 1440×900
**Pass.**

- `npx next build` → compiles, typechecks, statically prerenders `/ads-studio`.
- `npx next dev` → serves `/ads-studio` with HTTP 200. No runtime errors in the dev log.
- (Manual visual verification at 1440×900 is still TODO for a human reviewer — headless screenshot was not taken here.)

## 7. Painterly backdrop reads painterly (soft, atmospheric, no banding, no hard edges)
**Not verified automatically.**

The implementation follows §4.2 verbatim (5-stack `radial-gradient`, `ellipse` shape, 0 → 60–65% alpha falloff, base canvas ends at `#08020f` outer). Requires a human visual check to confirm "no banding" — add any banding artifacts to `docs/FOLLOWUPS.md` if found.

## 8. Generate CTA gradient runs purple → magenta, only foreground gradient
**Pass (structural).**

- The only foreground element with a `linear-gradient(...)` is the Generate CTA (`CTA_GRADIENT` in `prompt-composer.tsx`).
- Inspiration tile overlay uses a `linear-gradient` in its inline style too, but it is a transparent-to-black legibility scrim (not a color gradient).

## 9. Project rail thumbnails float directly on the backdrop (no panel surface)
**Pass.**

`<ProjectRail />` renders as an `<aside>` with no `bg-*`, no `border-1`, no `shadow`. Tiles are individual `<button>` elements; the column itself is transparent over the painterly backdrop.

## 10. Existing Imagine navbar and sidebar are untouched
**Pass.**

`components/ui/top-nav.tsx` and `components/ui/side-nav.tsx` were vendored byte-for-byte from `imagine-mcp/src/components/ui/`. No local modifications. `git diff` against the vendor copy is empty.

---

## Summary

| # | Criterion | Result |
|---|---|---|
| 1 | Hex quarantine | ✅ |
| 2 | Token colors elsewhere | ✅ |
| 3 | Tokenized spacing | ✅ (brief-pinned `[Npx]` for dimensions only) |
| 4 | Tokenized radii | ✅ |
| 5 | Typography scale | ✅ |
| 6 | Renders clean | ✅ (automated); manual 1440×900 review pending |
| 7 | Painterly look | ⚠️ needs human visual check |
| 8 | CTA is the only fg gradient | ✅ |
| 9 | Rail is panel-less | ✅ |
| 10 | Chrome untouched | ✅ |

**Verdict:** Scaffold is shippable as v0. Open items:
- Visual review of backdrop + overall composition at 1440×900 (human).
- Real content copy from product for title/tagline.
- Swap placeholder project thumbnails + inspiration tiles for real assets once available.
- Follow-up items logged in `docs/FOLLOWUPS.md` (to be created as items surface).
