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

Use log statistics to quantify volume and change before fetching events. Use
pattern analysis to identify repeated shapes worth isolating. Then query only a
few events from a measured pattern or stratum.

Apply verified label selectors first and server-side structured filters next.
Searching for words such as `error` in raw text is a fallback whose false
positive and false negative surface must be reported.

## Interpret

A missing log proves only that the selected Loki streams recorded no match for
the query and window. Logging can fail before emission, sampling can omit events,
and parser changes can move fields out of the selector.

Completion criterion: the receipt names the stream selector, structured filter,
population statistic or pattern, specimen rule, time bounds, and logging or
sampling limits.
