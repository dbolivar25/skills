# Storage tiers and promotion

Use when different representations of the same underlying data have distinct
quality, access, retention, or publication states. Show what each tier contains,
who can write it, its format, its provenance, and how data is promoted. A
workflow with owners belongs in [process](process.md); physical deployment
belongs in [high-level architecture](high-level.md).

No technology or named “medallion” tier guarantees quality, anonymization,
permission, immutability, or retention. Those are claims requiring source.
“Unknown” access or quality is distinct from no access, failed quality, or zero
records. A transformation can discard information; do not imply lossless
promotion merely through arrows.

## Input contract

```yaml
tiers:
  - { id: raw, name: Received, store: raw-records,
      fields: { writer: Ingest service, format: JSON,
                quality: Unvalidated, example: Original event },
      source: Ingest contract }
  - { id: checked, name: Validated, store: checked-records,
      fields: { writer: Validation service, format: Typed record,
                quality: Passed schema checks, example: Accepted event },
      source: Validation rule set }
  - { id: published, name: Published, store: summaries,
      fields: { writer: Publication service, format: Summary,
                quality: Approved for publication, example: Released total },
      source: Publication policy }
promotions:
  - { from: raw, to: checked, label: Validate,
      condition: Required fields pass, rejected: Quarantine }
  - { from: checked, to: published, label: Approve and summarize,
      condition: Owner approval, loss: Event detail aggregated }
paths:
  - { name: Scheduled batch, tool: Batch runner, source: Job contract }
```

Give tiers stable IDs and explicit field semantics. Optional lower write-method
panels describe **how** movement happens, not the tier's contents. Unknown
conditions remain visible. Include reject, quarantine, rework, or backflow when
real; use a different graph layout if a simple strip would hide them.

## Worked strip geometry

A compact inherited recipe uses 172-wide tier columns separated by 16, with an
80-high band above them for promotion arcs. Long field values wrap below their
labels. Derive the canvas from content, not a fixed count of tiers:

```text
tier_width = 172; tier_height = 380; gap = 16
left_pad = 16; right_pad = 100
width = left_pad + n*tier_width + max(0,n-1)*gap + right_pad
arc_band = 80; tier_top = arc_band
tier_x(i) = left_pad + i*(tier_width + gap)
tier_center(i) = tier_x(i) + tier_width/2
path_gap = 16; path_height = 56; bottom_pad = 16
height = arc_band + tier_height + bottom_pad
         + (path_gap + path_height if paths else 0)
```

Five tiers with write-method panels yield 1040 × 548. For zero tiers, use an
empty state. These numbers are an example treatment, not a corner/grid law.
Choose actual column/field height from wrapping and the destination's type floor.

Within each tier: a name band, store identifier, labeled writer/tool/format or
other domain-relevant fields, then a concrete example payload. A useful field
layout has 16-pixel horizontal inset and 140-pixel usable width. Each field's
value owns its line; reserve a second line when needed instead of overlapping
the next label.

For browser-only SVG, an HTML namespace `foreignObject` can wrap field values:

```svg
<foreignObject x="FIELD_X" y="VALUE_Y" width="140" height="24">
  <div xmlns="http://www.w3.org/1999/xhtml"
       style="font-family: sans-serif; line-height: 1.25">Field value</div>
</foreignObject>
```

Use the selected skin's actual family. Some destination tools do not support
`foreignObject`; use measured `<tspan>` lines or a native plotting/document
method for those targets. Inspect the export rather than assuming browser
fidelity establishes PowerPoint or Illustrator fidelity.

## Promotion arcs

For a simple adjacent-tier handoff, a top arc gives the relation and its label
clear space without running through the field text:

```svg
<path d="M SOURCE_X,80 C SOURCE_X,0 TARGET_X,0 TARGET_X,80"
      fill="none" stroke="CURRENT_STROKE" marker-end="url(#promotion-arrow)"/>
```

The midpoint of this cubic is at y=20. A label at the midpoint x, y=50 fits
inside the open arc if its actual text bounds clear the curve. `orient="auto"`
makes the marker enter the next tier along the downward endpoint tangent. If
the label or marker collides, widen the gap or raise the arc band; do not hide
text behind a later-painted node. Draw the arcs before the tier panels when
endpoint masking is useful and inspect the arrowhead's visible extent.

Promotions carry their **actual** condition/transformation. Retention movement,
copying, validation, aggregation, and publication are different effects. Encode
that with text and optional dash/line treatment. Do not auto-color every edge
that touches a highlighted tier and thereby imply a supported status it lacks.
A path to a colored concern may share emphasis intentionally, but color is not
permission, approval, or proof. Highlight the question's important tier when
useful without a compulsory focal count.

## Meaning and verification

A tier's example should show the real transformation: raw payload, removed
fields, typed values, aggregated summary, or retained history. Verify that the
shown payload actually matches the tier's guarantee. Keep preconditions,
uncertainty, access, and loss visible rather than buried in a decorative panel.

Reconcile every tier, arrow, writer, format, access/quality statement, example,
and retention claim with its source. Ensure promotions land at the intended
tier and have the direction claimed. Check wrapped values, field association,
long identifiers, arrow labels/markers, target-scale readability, and any
export's handling of embedded HTML and fonts. A strip must not flatten branching
or reversible lifecycle semantics into a false one-way path.
