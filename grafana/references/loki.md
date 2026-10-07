# Loki evidence branch

Use Loki for log population, structured event distribution, patterns, and a few
representative events.

## Discover

1. Select a current Loki datasource.
2. Discover label names and values before writing a selector.
3. Inspect a narrow result to learn current structured fields and parser shape.
4. Prefer service, environment, route, event type, severity, or error class over
   an unbounded raw-text search.

## Measure, then inspect

Use available statistics or LogQL aggregates to quantify volume and change before
treating events as representative. Pattern analysis can identify repeated shapes worth
isolating when that capability is available. Then query a few events from the measured
pattern or stratum. A one-request diagnosis can start with its known identifier without
first surveying every stream.

Apply verified label selectors first and server-side structured filters next.
Searching for words such as `error` in raw text is a fallback whose false
positive and false negative surface must be reported.

Define the counting unit. Several error lines from one retrying job are several log
events, not necessarily several failed jobs. Correlation IDs can help group events;
do not publish sensitive identifiers or pretend missing IDs support deduplication.
Parser errors are also query evidence, not automatically application failures. Use the
[current LogQL documentation](https://grafana.com/docs/loki/latest/query/) when syntax
or parser/error handling matters.

## Interpret

A missing log proves only that the selected Loki streams recorded no match for
the query and window. Logging can fail before emission, sampling can omit events,
and parser changes can move fields out of the selector.

Retain the stream selector, filters, time bounds, counting unit, specimen-selection rule,
and logging/sampling limits that affect the conclusion. Include the population statistic
when one was obtainable; otherwise keep the claim scoped to the inspected specimens.
