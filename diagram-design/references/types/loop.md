# Feedback loops

Use this for a cycle whose result affects a later traversal. A repeating process without persistent state may be a simple cycle; use this form without inventing a central store. Use a flowchart when the real process has an entry, branches, and termination rather than an enduring cycle.

Record the station order, circulating payload or signal, feedback condition, and any persistent state. A center hub is useful when several stations genuinely read or write shared state. Add only the supported reads and writes. Several stores or independent feedback paths need their real relationships, not a forced single hub.

Place stations around a circle or another closed route while preserving order. Clockwise reading is a layout convention, not source evidence. Equal spacing does not imply equal duration or importance. Place labels outside dense routing areas and ensure arrows visibly enter their endpoints.

For a circular recipe, station centers can use x = cx + R·cos θ and y = cy + R·sin θ. Connector endpoints must intersect the actual station bounds rather than stop at center points. If arrowheads disappear beneath a node, adjust attachment and draw order using [primitives](../primitives.md), without adding an unsupported edge or shifting station meaning.

Trace one full traversal and the feedback's effect on the next one. Check payload identity, all supported read/write paths, persistent state, delays, termination conditions, and unknowns. Inspect central congestion and arrow visibility at delivery size.

Reference layouts: [loop](../../assets/example-loop.html), [full](../../assets/example-loop-full.html), [dark](../../assets/example-loop-dark.html).
