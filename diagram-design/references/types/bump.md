# Bump charts

Use this for rank across ordered snapshots. A rank chart answers who moved relative to whom, not how much the underlying quantity changed. Provide values separately if magnitude also matters.

Define the ranking metric, whether lower or higher is better, the population at each snapshot, and the ranking convention. Ties may use competition rank, dense rank, or a disclosed tie-break rule. Do not turn real ties into an arbitrary permutation merely to give each line its own row. Changes in the eligible population can change rank without a change in the item's value; disclose that when material.

Map every rank to a fixed vertical coordinate with rank one at the top. Put snapshots at positions appropriate to their ordering or real elapsed time, and explain which. Connecting segments guide identity between snapshots; they do not measure an intermediate rank. Missing ranks start or stop a line or create a gap. They are not last place.

Keep tied and overlapping items identifiable with combined labels, small multiples, or leaders. Move labels, never rank coordinates, to resolve collisions. Crossings show changes in ordering and must not be erased for neatness.

Independently recompute ranks from the metric and declared convention. Check eligibility, ties, missing snapshots, endpoint labels, and the rendered rank positions. Any task-specific geometric check must resolve transforms rather than assuming attributes are screen coordinates.

Reference layouts: [bump](../../assets/example-bump.html), [full](../../assets/index.html#example-bump-full), [dark](../../assets/index.html#example-bump-dark).
