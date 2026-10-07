# Beeswarm plots

Use this for individual observations distributed along one quantitative axis. Each dot is one observation. The perpendicular displacement packs dots to avoid overlap; it is not a second measured variable.

Preserve the measured coordinate exactly. Pack only perpendicular to it, with consistent dot size unless an additional size encoding is explicitly defined. Repeated values may form a wider stack, but their quantitative position remains identical. Give observations stable IDs when identity or traceability matters; equal values do not make records duplicates.

Use facets or distinct groups when comparing populations, with common quantitative scales and clear group labels. State the observation unit, population counts, exclusions, and any transformation. Missing values remain accounted for outside the swarm. Do not reduce a dense swarm by silently sampling or shrinking a focal dot differently.

Choose a deterministic packing method when reproducibility matters. Collision checks should include radius, stroke, and the perpendicular space available. If density overwhelms the reading size, show a distribution summary beside the swarm, enlarge or facet it, or explicitly sample with a disclosed method. A universal dot count cutoff is not a semantic rule.

Check one dot per retained record, all measured coordinates, group membership, and count reconciliation from source data. Inspect duplicate values, dense stacks, boundary clipping, labels, and any tooltip or focus state used in the delivered artifact.

Reference layouts: [beeswarm](../../assets/example-beeswarm.html), [full](../../assets/index.html#example-beeswarm-full), [dark](../../assets/index.html#example-beeswarm-dark).
