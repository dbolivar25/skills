# Permission and value matrices

Use a matrix when the reader compares the same property at row × column
intersections: role × resource permissions, feature × plan coverage, control ×
enforcement surface, or capability × environment. It shows what each
intersection means; it does not show grant flow, dependency, chronology, or
protocol topology. Those need a process, sequence, or architecture companion.

## State contract

An omitted cell is **unknown**, not denied, false, unsupported, or zero. Keep
unknown, not applicable, denied, partially allowed, and allowed distinct. An
explicit empty set of permissions is a known absence only when the source says
so. Preserve source date, effective environment, scope, and any contradictory
records. A permission claim should identify whether it is documented policy,
configured policy, or observed behavior.

```yaml
rows:
  - { id: raw, name: Raw records, hint: Contains personal data }
  - { id: published, name: Published summaries }
columns:
  - { id: editors, name: Editors, code: editorial-team }
  - { id: readers, name: Readers, code: read-only-team }
cells:
  - { row: raw, column: editors, state: allowed, value: Read and write,
      source: 'Policy record 17, 2026-10-06' }
  - { row: raw, column: readers, state: denied, value: No access,
      source: 'Policy record 17, 2026-10-06' }
  - { row: published, column: readers, state: allowed, value: Read,
      source: 'Observed staging request, 2026-10-06' }
  # published × editors is not given: render “Unknown”, not “No access”.
```

Use a closed state vocabulary suited to the domain, with free-form `value`
labels for actual permissions such as `SELECT`, `Login`, or `Read and write`.
Never infer permission from a role name. If policy and observation disagree,
show the conflict or draw separate matrices. A tri-state Boolean or optional
number must not be coerced with `?? false` or `?? 0` during rendering.

## Layout recipe

Rows and columns remain stable across comparisons. Make labels complete before
assigning widths. Freeze/repeat headers for long matrices or split by a real
domain boundary; splitting must preserve a recoverable full source matrix.

A worked SVG layout inherited from the earlier access kit uses:

```text
left_pad = 12; right_pad = 48
label_width = 208; label_gap = 12
column_width = 148; column_gap = 16
header_top = 72; header_height = 52
row_top(i) = 140 + i * 40
row_height = 36
column_left(j) = left_pad + label_width + label_gap
                 + j * (column_width + column_gap)
width = left_pad + label_width + label_gap
        + n_columns * column_width + (n_columns - 1) * column_gap + right_pad
rows_bottom = row_top(n_rows - 1) + row_height
legend_top = rows_bottom + 20
height = legend_top + 44
```

For four columns and eight rows, width is 920 and height is 520. These are
example dimensions, not a grid law or row/column cap. Adjust row height for
wrapping and intended screen/print scale. Empty matrices require an empty state;
do not apply the `n_rows - 1` formula to zero rows.

Put the column's human label above its technical group ID. Keep optional row
hints separate from the row identity. Center short permission values; left
align prose. A two-line focal cell needs enough height for both lines. Use text
plus an optional symbol or pattern for unknown/denied/partial/allowed states,
so meaning survives monochrome and color-vision differences.

Styling may distinguish row identity, column identity, and cell value, but those
are independent jobs. A tinted column header does not mean every permission in
that column is allowed. Do not draw connectors between cells. Highlight a
consequential intersection when useful without forcing a focal-cell count.
The legend includes only states actually present and explains “Unknown”.

## Verify

Reconcile every drawn row, column, and populated cell with the source. Check
that duplicates, omissions, and out-of-range references are visible errors,
never last-write-wins corrections. Confirm absent cells render Unknown; explicit
No access stays distinct; not applicable has its own label. Check long group
names, row hints, glyph contrast, header association, and target-scale wrapping.
Use a native table when it is more readable or accessible than an SVG matrix.
