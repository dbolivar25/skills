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
- Use an available histogram helper only when it matches the discovered metric and
  question. Classic bucket series and native histograms need their respective supported
  queries; do not assume every histogram exposes the same stored shape.
- Scope high-cardinality dimensions before requesting a broad range.

Compare like windows and aggregation levels. Confirm units before combining or
describing series, and keep counter resets and missing scrape targets visible.

Rate a counter before aggregation when resets must be detected per series. Do not
average per-instance percentiles and call the result a fleet percentile; use the
appropriate histogram aggregation when that population statistic is needed. Check the
[current function documentation](https://prometheus.io/docs/prometheus/latest/querying/functions/)
for the discovered metric shape and server version.

For example, an error-rate comparison needs failed and total requests with matching
route/environment scope and the same time window. A lower numerator from a smaller
traffic population does not establish recovery. An instant query evaluating a range
function can answer a window question; repeated evaluation points are a time series,
not independent counts to sum blindly.

## Interpret

Zero values, absent series, and query errors are different observations. Verify
label selectors and target coverage before treating any as evidence of absence.

Retain metric type, unit, selectors, aggregation, window, result shape, and coverage
limits. Include the denominator for a rate or ratio and the bucket/schema assumptions
for a distribution. Only require fields that carry the actual claim.
