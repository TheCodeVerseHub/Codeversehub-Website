# The CodeVerse Hub — Complete Typography Audit Report

**Date:** August 2026
**Status:** ✅ **Root cause found and fixed**
**Scope:** Binary-level investigation of every font file loaded by the site, plus the `@font-face` CSS produced by `next/font` and the styles that consume each font.

---

## TL;DR — Root cause

**`public/fonts/GeistVF.woff2` was actually the Geist *Italic* variable font, misnamed as if it were the upright variable font.**

- The site loads this file as its default sans-serif (`--font-sans` / body font) with `weight: "100 900"`.
- Because the *file itself* is the italic face, every element that inherits the body font — navbar links, hero description, paragraph text, footer text, secondary labels, form text — rendered **slanted**, even though no CSS anywhere declared `font-style: italic`.
- The large hero heading uses Space Grotesk (`--font-heading`), which is a genuine upright font — which is exactly why it looked straight while everything around it looked slanted.
- Font inspection is required to catch this: a source-code search for `italic`, `<em>`, or `<i>` finds **zero** hits, because the italics came from the binary font file, not from CSS.

**Fix:** Replaced `public/fonts/GeistVF.woff2` with the correct upright variable font **`Geist-Variable.woff2`** (from the installed `geist` npm package). Same weight range (100–900), same filename, so `src/app/layout.tsx` needed **no code changes**. Original (italic) file preserved at `/tmp/GeistVF-original-backup.woff2`.

---

## 1. Binary inspection of every font file

Font files were decompressed (`woff2_decompress`) and parsed directly (head `macStyle`, OS/2 `fsSelection`, `name` table, `fvar` axes).

| File | Internal name | macStyle | fsSelection | Axes | Verdict |
|---|---|---|---|---|---|
| `public/fonts/GeistVF.woff2` (**before fix**) | **Geist Italic** / `Geist-Italic` | **ITALIC (2)** | **ITALIC (0x81)** | wght 100–900 | ❌ **Italic face** |
| `public/fonts/GeistVF.woff2` (**after fix**) | Geist Regular / `Geist-Regular` | upright (0) | REGULAR (0xC0) | wght 100–900 | ✅ Upright |
| `public/fonts/GeistPixel-Square.woff2` | Geist Pixel Square / Regular | upright (0) | REGULAR (0xC0) | — | ✅ Upright |
| `public/fonts/vendor/SpaceGrotesk-400..700.ttf` | Space Grotesk Regular/Medium/SemiBold/Bold | upright (700 = BOLD bit only) | REGULAR / BOLD | — | ✅ Upright |
| `public/fonts/vendor/JetBrainsMono-100..800.ttf` | JetBrains Mono Thin..ExtraBold | upright (700 = BOLD bit only) | REGULAR / BOLD | — | ✅ Upright |

No **oblique** (`fsSelection & 0x200`), no `slnt` / `ital` / `opsz` variable axes anywhere. The **only** italic presence in the entire font set was the misnamed GeistVF file.

## 2. `@font-face` CSS emitted by `next/font`

From the compiled bundle (`src_app_geist_*.module.css`):

```css
@font-face {
  font-family: geist;
  src: url("../media/GeistVF-….woff2") format("woff2");
  font-display: swap;
  font-weight: 100 900;
}
```

- No `font-style` declared → **normal** (upright) is implied.
- No `font-variation-settings` / `font-synthesis` overrides anywhere in the codebase.
- The italic rendering was therefore **impossible to see in CSS** — it lived entirely inside the referenced binary.

## 3. Every text style on the site → actual rendered font

| Text style | `font-family` (CSS) | Actual file | style | weight |
|---|---|---|---|---|
| Navbar links / logo text | `Geist` (`--font-sans`, `font-medium`) | GeistVF.woff2 | **fixed: normal** (was italic) | 500 |
| Hero heading | `Space Grotesk` (`--font-heading`, `heading-xl`) | SpaceGrotesk-700 | normal | 700 |
| Hero description / body paragraphs | `Geist` | GeistVF.woff2 | **fixed: normal** (was italic) | 400 |
| Footer text / footer links | `Geist` | GeistVF.woff2 | **fixed: normal** (was italic) | 400 |
| Section labels (`section-label`) | `JetBrains Mono` (`--font-mono`) | JetBrainsMono-500 | normal | 500 |
| Card / feature / FAQ titles | `Geist` (default) or `Space Grotesk` | GeistVF / SpaceGrotesk-600 | **fixed: normal** | 600 |
| Buttons (`btn-*`) | `Geist` | GeistVF.woff2 | **fixed: normal** (was italic) | 500–600 |
| Statistics | `Geist` | GeistVF.woff2 | **fixed: normal** (was italic) | — |
| Form labels / inputs | `Geist` | GeistVF.woff2 | **fixed: normal** (was italic) | — |
| Code / inline code | `JetBrains Mono` | JetBrainsMono-400 | normal | 400 |
| Markdown `<em>` (6 spots in content pages) | `Geist` italic via browser default | — | intentional italic | 400 |

## 4. Was anything else slanting text?

Checked and ruled out:
- CSS transforms (`skew`, `rotate`): none applied to text elements
- `font-synthesis`: not set anywhere (browsers only synthesize italics when `font-style: italic` is requested — it never was)
- Variable axes: only `wght` exists on the Geist font; no `slnt`/`ital` axis to trip

## 5. Changes made

| File | Change |
|---|---|
| `public/fonts/GeistVF.woff2` | Replaced italic binary with upright `Geist-Variable.woff2` (69,652 bytes) |
| `src/app/layout.tsx` | **No change needed** (filename & weight range unchanged) |
| Any component CSS | **None** — no `font-style` was ever set |

## 6. Verification

- Decompressed the fixed file → `head.macStyle: 0`, name **"Geist Regular"**, wght 100–900 ✅
- Rebuilt (`npm run build`) → compiled `.next/static/media/GeistVF-*.woff2` inspected → **upright** ✅
- Deployed site (`thecodeversehub.tech`) serves the old italic build until the next deploy — **push + redeploy is required** for the live fix to take effect.

## 7. Action required

1. Commit `public/fonts/GeistVF.woff2`
2. Deploy to Netlify (auto-deploy on push to `master`)
3. Hard-refresh (`Ctrl/Cmd + Shift + R`) — the slanted navbar, body, and footer text will render upright
