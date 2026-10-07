# Augment diagram skin

Use this only for actual Augment work or when explicitly selected. Read [Augment Design](../../augment-design/SKILL.md) for identity, voice, privacy, and the relevant surface rules. Generic and client diagrams select another [skin](skins.md). The gallery's earlier Geist/Instrument Serif treatment is a layout reference, not Augment conformity.

## Color roles

These roles map to the packaged Augment color tokens. A role's appearance does not change the meaning of a source edge or status.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| paper | `#f6f1ef` | `#040919` | Diagram surface |
| paper-2 | `#e9e1e1` | `#2b2d39` | Secondary surface |
| ink | `#040919` | `#ffffff` | Primary text and stroke |
| muted | `#2b2d39` | `#e3e3e8` | Secondary text and ordinary arrows |
| soft | `#6f7288` | `#afaeb1` | Supporting labels |
| rule | `rgba(4,9,25,.12)` | `rgba(255,255,255,.16)` | Subtle borders |
| rule-solid | `#afaeb1` | `rgba(255,255,255,.24)` | Stronger borders |
| accent | `#660033` | `#cf0147` | Deliberate focal emphasis |
| accent-tint | `rgba(102,0,51,.08)` | `rgba(207,1,71,.12)` | Focal surface |
| link | `#6f7288` | `#afaeb1` | Ordinary external/API relationships |

Source: [Augment color tokens](../../augment-design/tokens/colors.css). Mark pink as a dark diagram focal accent is the retained, explicitly documented diagram adaptation; it broadens Augment's usual identity/artwork-only use. It does not authorize pink arrows, document chrome, or arbitrary uses elsewhere.

Use emphasis deliberately, without turning it into a quota that conceals multiple real failures or statuses. Status colors require real states and redundant labels or marks. For multi-series charts, use approved roles and distinct neutral tones, outlines, dashes, symbols, or small multiples. If a colored series palette is needed beyond the brand's allowed surface roles, resolve that adaptation for the actual task; the old gallery's sage/blue/mustard palette is not an approved Augment token set.

Check contrast in the actual painted context, including opacity and background. Essential thin rules and graphical distinctions need enough contrast to read. A token name or nominal hex value is not a visibility receipt.

## Typography and fonts

Matter SQ owns authored text, including titles, names, axis labels, and annotations. System mono is reserved for technical values such as ports, URLs, commands, and field types. Use sentence case. Do not replace Matter with Geist, Instrument Serif, or a blanket developer mono treatment.

### Font sources

The official family is packaged in [assets/fonts](../assets/fonts/). Copy the used weights beside the artifact or embed them when the output supports it. For example:

```css
@font-face {
  font-family: "Matter SQ";
  src: url("fonts/MatterSQ-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "Matter SQ";
  src: url("fonts/MatterSQ-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
}
```

Use `"Matter SQ", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` for text and `ui-monospace, "SF Mono", Menlo, monospace` for technical values. Add the packaged italic face when using an italic annotation. Title size, node size, and spacing depend on actual reading distance and density, not the gallery's sample pixel values.

Matter SQ does not supply all scripts. For Korean, extend with Noto Sans KR, Apple SD Gothic Neo, or Malgun Gothic; for Traditional Chinese, use Noto Sans TC, PingFang TC, or Microsoft JhengHei; for Simplified Chinese, use corresponding SC families. These Noto faces are not packaged here. Supply the selected fallback when portability requires it and inspect the actual glyphs. Technical identifiers stay as sourced; prose in another language uses a readable text family rather than being forced into tiny mono.

A conservative width estimate counts every Unicode wide/full-width character as roughly 1em, narrow characters by their selected font's advance, and combining marks as zero additional advance. Include digits, punctuation, and spaces. This is an authoring heuristic, not a measurement or bundled check. Measure real rendered text and leave padding. Wrap, enlarge, or attach a full-name legend instead of cutting identity or shrinking dense script below readable size.

## Shape and surface

Use the brand's 4px spacing rhythm as a starting point. Data coordinates and optical adjustments retain their actual meaning. Light, restrained strokes and modest radii usually work; their thickness must survive the intended export size. Decorative dots, framing, shadows, and terminal treatments are optional surface choices, not default brand requirements.

A container's fill must work in its actual theme. Do not copy a white backend box blindly onto a dark diagram. Dashed, colored, or filled treatments carry only declared meanings. A security boundary needs evidence and a label, not merely an accent stroke.

For another brand, use [onboarding](onboarding.md) and [profiles](profiles.md). Those select or save a task/project skin within authorization; they do not rewrite this installed Augment guide during ordinary generation.
