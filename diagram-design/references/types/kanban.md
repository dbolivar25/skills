# Kanban snapshots

Use this to show work items in their actual workflow states at a particular time. A board is a snapshot, not an execution sequence or an implied forecast.

Use the real state names and transition model. There is no required four-column workflow. Keep every retained item in its observed state and preserve IDs when identity matters. Blocked is often a cross-cutting condition rather than an exclusive state; show it on every affected card instead of limiting it to one accent card.

Show owners, dates, priorities, and work-in-progress limits only when known and useful. A WIP limit is a declared policy, not the current card count. If it is unknown, do not invent one. Distinguish observed work from proposed examples.

For a large board, aggregate deliberately and reconcile displayed counts with the source. Hidden or collapsed cards need an explicit count and accessible detail. Dependencies usually belong in a companion graph or clearly labeled relation rather than ambiguous board arrows.

Check state membership, counts, IDs, blocked status, and any limit violations against the source snapshot. Inspect crowded columns, long titles, overflow, and interaction states if cards expand or filter.

Reference layouts: [Kanban](../../assets/example-kanban.html), [full](../../assets/example-kanban-full.html), [dark](../../assets/example-kanban-dark.html).
