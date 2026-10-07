# Waterfalls

Use this to explain how signed changes reconcile a starting total to an ending total. The data is a running account, not merely a sequence of differently positioned bars.

Calculate every running level before drawing. A change bar spans the previous and next levels. A total or subtotal is anchored to zero and does not add to the running total a second time. Preserve all signed contributions and reconcile the ending value exactly, allowing only explicitly stated rounding differences.

Include zero and all intermediate levels in one scale. Negative or zero totals are legitimate data, not an invalid chart. A zero change has no invented height; label it or mark it distinctly if it matters. Connectors align to actual running levels. Do not clamp small deltas to a minimum visible height.

Distinguish additions, reductions, subtotals, and totals with labels and a redundant visual treatment. The source may require several subtotals; there is no semantic one-subtotal limit. Keep the true order when it matters, and name any reordered decomposition.

Independently verify signs, running sums, totals, subtotal resets, scale, and rendered boundaries from the source table. Inspect small changes, negative crossings, zero cases, label placement, and the exported plot at reading size. Optional data bindings support traceability; no supplied helper validates waterfall arithmetic automatically.

Reference layouts: [waterfall](../../assets/example-waterfall.html), [full](../../assets/index.html#example-waterfall-full), [dark](../../assets/index.html#example-waterfall-dark).
