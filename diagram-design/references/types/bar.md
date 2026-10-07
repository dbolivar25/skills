# Bar charts

Use bars to compare magnitudes across categories. Use [line](line.md) for a continuous ordered axis and [dumbbell](dumbbell.md) for two endpoints per category when their gap is the question.

Bar length represents value, so the baseline is zero. For signed values, include zero and draw negative bars in the opposite direction. All compared panels need the same units and scale, or a clear separation that prevents direct length comparison. Do not impose a minimum visible bar length on a small or zero value.

Choose horizontal bars when category labels need space. Order by value, a meaningful domain order, or an explicitly named sorting rule. Preserve a meaningful natural order even when sorting would look tidier. Direct labels can carry exact values while the axis carries the scale and units.

Grouped bars compare series within categories. Stacked bars compare totals and parts; only the segment next to the common baseline is easy to compare by length. A 100% stack compares composition, so disclose denominators and any changing population. Negative stacks need a clear signed interpretation. Missing values are gaps or marked unknowns, never zero-length bars presented as measurements.

If categories are aggregated into Other, retain the members and reconciliation outside the plot. Calculate totals, stack boundaries, signs, and scales from the source before drawing. Check each visible bar against those calculations, including zero, missing, and negative cases.

Layout references: [bar](../../assets/example-bar.html), [full](../../assets/example-bar-full.html), [dark](../../assets/example-bar-dark.html). Sample counts, spacing, and palette are adaptable.
