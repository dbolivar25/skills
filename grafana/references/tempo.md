# Tempo evidence branch

Use Tempo when the question depends on request, job, span, or dependency
causality. A trace is a specimen; Tempo metrics establish the population.

## Discover

1. Read the callable Tempo configuration and TraceQL documentation.
2. Discover current resource, span, and intrinsic attribute names.
3. Inspect values for the service, environment, route, operation, status, and
   dependency dimensions needed by the question.
4. Prove one narrow selector before composing a larger expression.

Do not carry cached TraceQL syntax or OpenTelemetry attribute names across
environments. Use the current documentation and metadata response.

## Measure, then inspect

Use TraceQL metrics range or instant reads to measure frequency, rate, or a
duration distribution before searching individual traces. Narrow the population
with verified attributes and preserve the denominator behind any percentage.

Then search for a few traces from the measured population and fetch only those
needed to compare:

- a failing or slow trace with a nearby successful trace;
- root operation and service/resource attributes;
- parent-child relationships and critical-path spans;
- queue or acquisition time versus execution time;
- exception events and downstream status; and
- missing roots, gaps, or incomplete trees that limit interpretation.

## Interpret

An HTTP status population, span error population, and exception population may
differ. Report which one was queried. A missing span or event may be an
instrumentation failure rather than success.

Completion criterion: the Tempo receipt contains the verified attributes,
population query, specimen search, retrieved trace identifiers in redacted form,
and the gap between what the traces show and what they cannot generalize.
