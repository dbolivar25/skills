# Tempo evidence branch

Use Tempo when the question depends on request, job, span, or dependency
causality. A fetched trace is a specimen. Trace-derived metrics can describe the observed
span population when the deployment supports them; they do not automatically count all
application requests.

## Discover

1. Read the callable Tempo configuration and TraceQL documentation.
2. Discover current resource, span, and intrinsic attribute names.
3. Inspect values for the service, environment, route, operation, status, and
   dependency dimensions needed by the question.
4. Prove one narrow selector before composing a larger expression.

Do not carry cached TraceQL syntax or OpenTelemetry attribute names across
environments. Use the current documentation and metadata response.

## Measure, then inspect

When enabled and available, use TraceQL metrics range or instant reads to measure
frequency, rate, or duration before treating traces as representative. Check
[the current metrics contract](https://grafana.com/docs/tempo/latest/metrics-from-traces/metrics-queries/)
for deployment support and query semantics. Narrow the population with verified
attributes and preserve the denominator behind a percentage. A known trace ID can be
inspected directly; unavailable aggregates limit generalization, not all diagnosis.

Then search for a few traces from the measured population and fetch only those
needed to compare:

- a failing or slow trace with a nearby successful trace;
- root operation and service/resource attributes;
- parent-child relationships and critical-path spans;
- queue or acquisition time versus execution time;
- exception events and downstream status; and
- missing roots, gaps, or incomplete trees that limit interpretation.

Define whether the aggregate counts spans, root operations, or another selected shape.
Retries and child spans can change the count without changing the number of requests.
Sampling and incomplete ingestion limit the represented population. Match a slower trace
to a similar operation/input when possible; unrelated happy-path traffic is a weak control.

## Interpret

An HTTP status population, span error population, and exception population may
differ. Report which one was queried. A missing span or event may be an
instrumentation failure rather than success.

Follow the critical path rather than summing overlapping child durations as request
latency. Parent-child structure shows instrumented relationships; queueing before the
first span or an uninstrumented dependency may remain outside that picture.

Retain verified selectors, time bounds, population unit/query when available, specimen
search or known-ID selection, safe trace pointers, and the gap between what those traces
show and what they can generalize.
