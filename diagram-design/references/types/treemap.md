# Treemaps

Use this for positive quantities arranged as parts of a whole, optionally within a hierarchy. Area encodes value. Use bars when precise category comparison matters more than compact composition.

Start with source values and hierarchy. Negative values cannot directly become positive areas. Zero and missing values have different meanings; account for each even when neither receives a tile. The displayed whole must be complete or explicitly scoped. Other is a real aggregate with retained members and a reconciled value.

Choose a tiling method, such as squarified layout, that suits the hierarchy. Derive tile area from the values without minimum-area floors that inflate tiny parts. Gutters and borders remove visible area, especially from small tiles; assess that error and reduce gutters or use another form if the composition becomes misleading.

Place labels inside their true tile bounds when they fit. Otherwise use leaders, an adjacent table, or an interaction with accessible identity. Enlarge labels or the figure rather than enlarging the data tile. Color may distinguish hierarchy or encode a separately declared variable; a decorative shade progression should not imply an unprovided ranking.

Independently compare tile areas, hierarchy membership, counts, and totals with the source. A data-share attribute attached to a tile is not independent proof of its geometry. Inspect the smallest tiles, nested gutters, rounded values, label clipping, and any focus or tooltip state in the delivered artifact.

Reference layouts: [treemap](../../assets/example-treemap.html), [full](../../assets/example-treemap-full.html), [dark](../../assets/example-treemap-dark.html).
