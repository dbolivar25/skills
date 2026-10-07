# Scatter plots

Use this for the relationship between two quantitative variables for the same observations. Use [bubble](bubble.md) when area adds a third quantity, or [beeswarm](beeswarm.md) for individual observations on one quantitative axis. A beeswarm is not a remedy for crowded two-variable data because it removes one variable.

Define the observation unit, both units, population, time window, and exclusions. Map each observation to its true x and y coordinates. Shared comparisons need shared domains and transformations. A log axis needs positive values and clear labels; disclose how zero or invalid values are handled. Missing observations are accounted for, never placed at zero.

Correlation does not establish causation. Draw a trend only when computed with an appropriate stated method; do not sketch a persuasive line through an attractive subset. Show uncertainty when the interpretation depends on it. An outlier is evidence to investigate, not an inconvenient dot to remove silently.

Handle crowding with transparency, smaller marks, faceting, or explicit density aggregation. Aggregation changes the unit from an observation to a bin or estimate, so label it and retain counts. Avoid nudging dots on either measured axis. Direct labels can move with leaders.

Check source-to-point correspondence, units, domain, transforms, and exclusions independently. Inspect dense clusters, overlapping points, clipped extremes, and any trend at final size. Optional data attributes help trace identity but do not prove the marks are correct.

Reference layouts: [scatter](../../assets/example-scatter.html), [full](../../assets/index.html#example-scatter-full), [dark](../../assets/index.html#example-scatter-dark).
