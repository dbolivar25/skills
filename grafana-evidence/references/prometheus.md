# Prometheus evidence branch

Use Prometheus for counts, rates, distributions, saturation, and change over
time.

## Discover

1. Select a current Prometheus datasource.
2. Inspect relevant dashboard panel queries when they exist.
3. Discover metric names, metadata, units, and type.
4. Discover label names and values needed to scope service, environment, route,
   status, instance, or version.

Derive the query from verified metadata and current precedent. Resolve dashboard
variables and macros instead of copying them literally.

## Measure

- Use a range query for time shape and an instant query only when its evaluation
  semantics match the requested window total or point-in-time state.
- Preserve denominators for rates and ratios.
- Treat counters, gauges, summaries, and histograms according to their current
  metadata and instrumentation semantics.
- Use the histogram query helper when its current schema matches the discovered
  metric; otherwise query verified bucket, sum, and count series directly.
- Scope high-cardinality dimensions before requesting a broad range.

Compare like windows and aggregation levels. Confirm units before combining or
describing series, and keep counter resets and missing scrape targets visible.

## Interpret

Zero values, absent series, and query errors are different observations. Verify
label selectors and target coverage before treating any as evidence of absence.

Completion criterion: the receipt names the metric type, unit, labels,
aggregation, denominator, window, result shape, and scrape or instrumentation
limits that affect the statement.
