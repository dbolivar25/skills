# Style Guide

**The single source of truth for colors, typography, and tokens.** Every diagram draws from this — not from hex values inlined in other reference files. If you want to change the visual skin of Diagram Design, change this file.

The active skin maps Diagram Design's semantic roles to the Augment design system:
warm bone paper, cool ink and neutrals, burgundy emphasis on light surfaces, and
mark pink emphasis on dark surfaces. The pristine Diagram Design skin remains
recoverable as the `default` profile described in [`profiles.md`](profiles.md).

To generate your own from a website URL, see [`onboarding.md`](onboarding.md).

---

## Tokens

### Semantic roles

Every token is referred to by **semantic role**, not by its hex value. Type references (`type-*.md`) and SKILL.md say `accent`, not `#f7591f`.

| Role | Purpose | Default (light) | Default (dark) |
|---|---|---|---|
| `paper` | Page background, default node fill | `#f6f1ef` (bone-100) | `#040919` (ink) |
| `paper-2` | Diagram container bg, secondary fill | `#e9e1e1` (bone-500) | `#2b2d39` (woodsmoke) |
| `ink` | Primary text, primary stroke | `#040919` (ink) | `#ffffff` (white) |
| `muted` | Secondary text, default arrow stroke | `#2b2d39` (woodsmoke) | `#e3e3e8` (neutral-85) |
| `soft` | Sublabels, boundary labels | `#6f7288` (cloud-burst) | `#afaeb1` (neutral-100) |
| `rule` | Hairline borders | `rgba(4,9,25,0.12)` | `rgba(255,255,255,0.16)` |
| `rule-solid` | Stronger borders, baselines | `#afaeb1` (neutral-100) | `rgba(255,255,255,0.24)` |
| `accent` | Focal / 1–2 max per diagram | `#660033` (burgundy-600) | `#cf0147` (mark-pink) |
| `accent-tint` | Fill for accent-bordered boxes | `rgba(102,0,51,0.08)` | `rgba(207,1,71,0.12)` |
| `link` | HTTP/API calls, external arrows | `#6f7288` (cloud-burst) | `#afaeb1` (neutral-100) |

> **Brand palette source:** [`augment-design`](../../augment-design/SKILL.md),
> specifically its packaged `tokens/colors.css`. Burgundy is the light-surface
> focal accent. Mark pink is the agreed dark-surface adaptation so Diagram
> Design retains a visible chromatic focal accent; this deliberately broadens
> Augment's usual identity/artwork-only use of mark pink. Arrows, rules, and
> links remain cool neutrals under Augment's color-role law.

> **Note:** The pre-baked example HTML files in `assets/` were built under an earlier skin. Regenerating them against the current `style-guide.md` is a v5.1 task. New diagrams the skill produces will use the tokens above.

### Inversion rule (light → dark)

Any `rgba(4,9,25, X)` in light becomes `rgba(255,255,255, X)` in dark. Preserve
the opacity. Burgundy accent values become mark pink on dark paper.

### Series palette (multi-series chart types only)

A small set of desaturated, editorial-tone colors for chart types that genuinely need to distinguish multiple overlapping entities (currently: **radar**). The "1-focal" rule still holds — `accent` is reserved for the focal series; the palette below covers the rest.

| Token | Light | Dark | Notes |
|---|---|---|---|
| `series-1` | `#7c8f6f` (sage) | `#9caf8f` | Non-focal series |
| `series-2` | `#5e7a9b` (dusty-blue) | `#82a0c0` | Non-focal series |
| `series-3` | `#b8915a` (mustard) | `#d3ad7a` | Non-focal series |
| `series-4` | `#9c6b50` (rust-brown) | `#b88670` | Non-focal series |
| `series-5` | `#6e6479` (slate) | `#8d8298` | Non-focal series |

Fills sit at `0.18` opacity light, `0.22` dark; strokes use the full color. **Don't backfill these tokens to non-chart types** — architecture, swimlane, etc. continue to use muted-ink variants. The series palette is opt-in for diagrams where overlapping shapes demand distinguishable color, not a license to add color elsewhere.

### Terminal skin (opt-in alternate)

A self-contained palette for the terminal-window primitive (see [primitive-terminal.md](primitive-terminal.md)) — a CLI-chrome register for dev-tool posts and technical social cards. It does not replace the default skin above and isn't affected by onboarding; it's a second, fixed skin you opt into per-diagram.

| Token | Hex | Purpose |
|---|---|---|
| `terminal-page` | `#0a0a0a` | Page background behind the window |
| `terminal-paper` | `#141414` | Window body, node fill |
| `terminal-bar` | `#1b1b1b` | Titlebar strip |
| `terminal-border` | `#2b2b2b` | Window border, hairlines |
| `terminal-ink` | `#f5f5f5` | Primary text, primary stroke (same white-smoke as default `ink`) |
| `terminal-muted` | `#9a9a9a` | Secondary text, sublabels, ring stroke |
| `terminal-soft` | `#5c5c5c` | Tertiary — inactive dots, spokes |
| `terminal-accent` | `#ff5a36` | The one accent — focal station, prompt sign, active dot |
| `terminal-accent-tint` | `rgba(255,90,54,0.12)` | Fill for accent-bordered boxes |

**1-accent rule still holds.** Everything that isn't `terminal-ink` or `terminal-muted`/`terminal-soft` should be `terminal-accent` — never introduce a second hue.

---

## Typography

| Role | Family | Size | Weight | Usage |
|---|---|---|---|---|
| `title` | Matter SQ | 1.75rem | 400 | Page H1 |
| `node-name` | Matter SQ | 12px | 600 | Human-readable labels |
| `sublabel` | SF Mono / Menlo / monospace | 9px | 400 | Port, protocol, URL, field type |
| `eyebrow` | Matter SQ | 12px | 500, tracked 0.04em, sentence case | Type tags, axis labels |
| `arrow-label` | Matter SQ | 12px | 400 | Human-readable arrow annotations; technical values use mono |
| `callout` | Matter SQ *italic* | 14px | 400 | Editorial asides only |

### Font sources

```html
<style>
@font-face {
  font-family: "Matter SQ";
  src: url("assets/fonts/MatterSQ-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Matter SQ";
  src: url("assets/fonts/MatterSQ-RegularItalic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
}
@font-face {
  font-family: "Matter SQ";
  src: url("assets/fonts/MatterSQ-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Matter SQ";
  src: url("assets/fonts/MatterSQ-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
}
</style>
```

The complete official Matter SQ family is packaged under `assets/fonts/`. A
generated standalone file must copy the weights it uses beside the HTML or embed
the WOFF2 data; a cross-skill filesystem reference is not a shipped font. Use
`"Matter SQ", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif`
for authored text and `ui-monospace, "SF Mono", Menlo, monospace` only for
technical values.

### Korean labels

Matter SQ carries no Hangul. A Korean `<text>` element extends its own family — never swap the skin:

```svg
<text font-family="'Matter SQ', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif">결제 서비스</text>
```

Package Noto Sans KR when a diagram contains Hangul; otherwise the local families
provide the fallback. Page titles use the same sans stack as labels so mixed
Matter SQ and Hangul remain in one register.

**Width budget.** Measure per character, not per script: **every Unicode wide or full-width character costs 1em, every other character costs its face's Latin advance** (0.60em sans, 0.62em mono), and nonspacing/enclosing marks cost nothing. Sum over the string and multiply by the font size for the text width, then add padding and round the box up to the next multiple of 4. `verify-treemap.py` enforces exactly this text width for treemap cell labels; the padding and rounding are authoring convention, and no other type carries an automatic check, so on those the budget is yours to hold.

Counting by script is the trap. `주문 v2.1` is two full-width syllables and five narrow characters; a formula that tallies Hangul, Latin letters, and spaces silently drops `2`, `.`, and `1` and sizes the box for four of its seven characters. Every rendered character costs something — measure per character, never per script.

Three rules follow from Hangul metrics:

- **Sublabels stay Latin.** Ports, protocols, field types, and URLs are Latin anyway — keep `Geist Mono` there and don't translate them. Hangul in a 9px mono sublabel is unreadable and has no mono face to fall back to.
- **Floor of 12px.** Hangul goes muddy below 12px. If a Korean name doesn't fit at 12px, cut the name — don't shrink the type.
- **Arrow labels, eyebrows, and legend text switch register.** Those slots are 7–8px Geist Mono, uppercase and tracked, which Hangul has neither a face nor legibility for. A Korean label in one of those slots becomes 12px sans at weight 500 with no tracking and no uppercase transform, and its mask rect grows to match (16px tall, width from the budget above, still rounded to a multiple of 4). Latin labels in the same diagram keep the mono treatment.

**Load-bearing rule:** Mono is for *technical* content (ports, commands, URLs,
field types). Names, page titles, labels, and callouts use Matter SQ. **Never
JetBrains Mono** as a blanket "dev" font.

### Traditional Chinese labels

Matter SQ carries no Han. A Traditional Chinese `<text>` element extends its own family — never swap the skin:

```svg
<text font-family="'Matter SQ', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif">請求項比對</text>
```

Package Noto Sans TC when a diagram contains Traditional Chinese; otherwise the
local families provide the fallback. Page titles use the same sans stack as
labels so mixed Matter SQ and Han remain in one register.

**Width budget.** The per-character contract above is unchanged: every Unicode wide or full-width character costs 1em, every other character costs its face's Latin advance, and nonspacing marks cost nothing. Full-width punctuation — `（）「」，。：` — is wide and costs 1em as well, which is the part most often dropped.

Counting by script is the trap. `請求項 v2.1` is three full-width characters and five narrow ones; a formula that tallies Han and Latin letters silently drops `2`, `.`, and `1` and sizes the box for six of its nine characters.

Three rules follow from Han metrics, mirroring the Hangul ones:

- **Sublabels stay Latin.** Ports, protocols, field types, and URLs are Latin anyway — keep `Geist Mono` there and don't translate them. Han in a 9px mono sublabel is unreadable and has no mono face to fall back to. A sublabel that is prose rather than a value may be Chinese, but it then switches register by the third rule below.
- **Floor of 12px.** Han packs more strokes than Hangul into the same em box, so the 12px floor binds at least as hard here. If a Chinese name doesn't fit at 12px, cut the name — don't shrink the type.
- **Arrow labels, eyebrows, and legend text switch register.** Those slots are 7–8px Geist Mono, uppercase and tracked, which Han has neither a face nor legibility for. A Chinese label in one of those slots becomes 12px sans at weight 500 with no tracking and no uppercase transform, and its mask rect grows to match (16px tall, width from the budget above, still rounded to a multiple of 4). Latin labels in the same diagram keep the mono treatment.

Simplified Chinese takes the same three rules with the Simplified stack (`'Noto Sans SC'`, `'PingFang SC'`, `'Microsoft YaHei'`). That face does not ship in the link, so Simplified labels still resolve through whatever the viewer has locally.

---

## Stroke, radius, spacing

| Token | Value | Use |
|---|---|---|
| `stroke-thin` | `0.8` | Tag-box outlines, leaf nodes |
| `stroke-default` | `1` | Most strokes |
| `stroke-strong` | `1.2` | Emphasis strokes |
| `radius-sm` | `4` | Small tags |
| `radius-md` | `6` | Node boxes |
| `radius-lg` | `8` | Containers, rings |
| `grid` | `4` | Every coord, size, and gap is divisible by 4 (hard rule) |

---

## Node type → treatment

Semantic role combinations — reference these by name in type specs.

| Type | Fill | Stroke |
|---|---|---|
| `focal` (1–2 max) | `accent-tint` | `accent` |
| `backend` | `#ffffff` (white) | `ink` |
| `store` | `ink @ 0.05` | `muted` |
| `external` | `ink @ 0.03` | `ink @ 0.30` |
| `input` | `muted @ 0.10` | `soft` |
| `optional` | `ink @ 0.02` | `ink @ 0.20` dashed `4,3` |
| `security` | `accent @ 0.05` | `accent @ 0.50` dashed `4,4` |

---

## Customizing the skin

Four options:

1. **Run onboarding** — see [`onboarding.md`](onboarding.md). Drop a URL; the skill extracts the palette + fonts and rewrites this file.
2. **Edit by hand** — change the hex values in the tables above. Run the pre-output taste gate afterward to verify the accent still reads as "focal" against the new paper color.
3. **Brand handoff** — paste your existing design-token JSON into a new section here and map its tokens to the semantic roles above.
4. **Client profiles** — save and switch named skins, or bind one to a project, using [`profiles.md`](profiles.md).

### Constraints (don't break these)

- **Contrast**: `ink` must hit WCAG AA on `paper`. `muted` must hit AA on `paper` for 11px+ text.
- **One accent**: pick one color for `accent`. Two accents erases the focal signal.
- **No rainbow palette**: if your brand ships 8 colors, pick 3 (paper, ink, accent). The rest become `muted` variants.
- **Serif + sans + mono**: three families, not more. If brand typography is all sans, keep Instrument Serif for `title` and `callout` anyway — the contrast is load-bearing.
- **Paper is warm-neutral, not pure white**: pure white turns the design sterile. Pick a cream, bone, or light grey with a hint of warmth.
- **Dot pattern is optional, not default**: the 22×22 dot pattern is an opt-in "dotted paper" variant (good for long-form editorial hero diagrams). The default background is a clean `paper` fill, no pattern. When the pattern is enabled, it should sit at ~10% opacity of `ink` on `paper` — visible but quiet.
- **Container is clean by default**: the diagram sits directly on the page paper, no secondary container background or border. A framed variant (`paper-2` bg + `rule` border + 8px radius + padding) is available as an opt-in for card-heavy layouts, but don't reach for it by default — the extra chrome fights the figure.
