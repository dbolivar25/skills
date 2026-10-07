# Ridgeline distributions

Use ridgelines to compare distributions across groups on one shared horizontal variable. They can show where observations concentrate; they do not show a time series merely because groups are stacked in time order.

Choose and state the distribution method: common histogram bins, or a density estimator with a known bandwidth. Use the same horizontal domain, units, and estimation method for comparable groups. Preserve enough domain to show relevant tails. Drawing the silhouette down to zero at the plot edge does not prove the source has no mass beyond that edge.

Choose vertical normalization deliberately. A common count scale supports population and concentration comparisons. Densities integrating to one compare distributions after removing population size. Scaling each group's maximum to the same height removes cross-group peak comparisons and must be disclosed. Include group counts when population differences matter.

Each group's baseline is a layout position. Its silhouette height follows the selected amplitude scale, not a private aesthetic multiplier. Overlap can aid scanning but must leave the shape and identity of every group readable. A missing distribution is an explicit empty or unavailable row, not a flat zero-density claim.

Compute bins or density from source data before drawing. Check normalization, domain, labels, and extrema independently. Inspect overlap, tiny tails, and boundary clipping at the delivered size. Optional source bindings are useful receipts; no supplied helper validates distribution semantics automatically.

Reference layouts: [ridgeline](../../assets/example-ridgeline.html), [full](../../assets/index.html#example-ridgeline-full), [dark](../../assets/index.html#example-ridgeline-dark).
