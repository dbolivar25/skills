# Line charts

Use a line for a quantity over a continuous or meaningfully ordered axis. Use [slopegraph](slopegraph.md) for two comparable snapshots, [bump](bump.md) for changing rank, and [ridgeline](ridgeline.md) for distributions across groups. These have different meanings and should not inherit a line chart's rules accidentally.

Place observations at their actual coordinates. Unequal time intervals require unequal spacing. Label time units, timezone when relevant, value units, and any transformation. Use comparable scales across series and panels. Zero is necessary when the question is absolute magnitude; a narrowed domain can reveal variation when its bounds are visible and its interpretation is clear.

A straight segment already suggests continuity between observations. Break the line across missing or unavailable intervals unless interpolation is justified and distinguished. A measured zero is a real point. Do not smooth a sparse series into invented peaks or use an attractive curve as an unreported estimate. If smoothing is a method, disclose its basis and retain a way to inspect the observations.

Use direct series labels or a legend with distinct, accessible marks. For many series, prefer meaningful subsets or small multiples over an unreadable bundle. Name filtering or aggregation and preserve the complete source separately. Uncertainty belongs in a band, interval, or annotation appropriate to the data; do not hide it in metadata alone.

Calculate scales and any aggregate or trend from the source, then check coordinate positions and missing intervals independently. Inspect endpoints, overlapping series, clipped extrema, axis labels, and the intended reading size.

Reference layouts: [line](../../assets/example-line.html), [full](../../assets/index.html#example-line-full), [dark](../../assets/index.html#example-line-dark).
