# Bubble plots

Use this for two position variables plus a third nonnegative quantity encoded by circle area. If the third quantity is incidental, a scatter plot with direct labels is easier to read.

Map x and y using their real scales. For area quantity v, use area = k·v and radius = sqrt(k·v/π), or an equivalent square-root radius formula. Linear radius would square the apparent differences. Use one area scale throughout the plot and provide a small size legend with labeled values drawn by that same formula.

Zero has zero area; if it needs a visible location marker, distinguish that marker from the area encoding. Missing area is unknown, not zero. Negative quantities cannot be encoded directly as positive area. A signed-magnitude scheme is possible only with a clear separate sign encoding and an appropriate explanation.

Keep centers at their measured coordinates. Improve overlap through drawing order, transparency, outlines, faceting, or an interactive inspection state, not by moving circles or imposing a minimum area. Larger circles behind smaller ones is a useful option, but inspect occlusion in the actual plot. Color represents a stated category or quantity, never an unexplained second version of size.

Compute position and area from an independent source table. Check zero, extreme, missing, and overlapping cases; compare rendered radii after transforms. Inspect the smallest readable marks and legend at delivery size. There is no supplied automatic bubble semantic validator.

Reference layouts: [bubble](../../assets/example-bubble.html), [full](../../assets/index.html#example-bubble-full), [dark](../../assets/index.html#example-bubble-dark).
