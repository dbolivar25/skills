# Sankey flows

Use this for quantities split, merged, or transferred between categories. Ribbon width encodes a quantity with shared units. Use ordinary data flow when quantities are unknown or incidental.

Build a flow table first: source, destination, value, unit, and population or time window. Derive widths using one scale. Reconcile each node's inflow and outflow where conservation applies. Loss, external input, stored remainder, or a changed population must be represented or explained, not hidden to make column totals match.

Order nodes to reduce crossings without changing their identities or flow assignments. Lay out ribbon endpoints from cumulative values; smooth control points affect routing, not width. A narrow flow remains narrow. If aggregating tiny ribbons, give Other a real value and retain its constituent paths and reconciliation.

Label important flows and nodes without covering the bands. Color has a declared meaning, such as source identity or flow category. It does not replace quantitative width. Unknown flow is unknown, not a thin decorative ribbon or zero.

Independently check every width, node total, and aggregate against the flow table. Inspect merges, splits, crossing order, tiny paths, and clipping at the final size. A multi-column layout is optional; use as many stages as the real flow needs.

Reference layouts: [Sankey](../../assets/example-sankey.html), [full](../../assets/index.html#example-sankey-full), [dark](../../assets/index.html#example-sankey-dark).
