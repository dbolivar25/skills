---
name: grafana
description: Use when an investigation or production claim needs current Grafana metrics, logs, traces, or profiles. Acquire bounded, reproducible observations with population context, comparable windows, and explicit instrumentation limits.
---

# Grafana

Own the telemetry evidence needed for the actual question. Use observation operations; a separate administrative request supplies authority for mutations. Current tools, datasources, dashboards, labels, attributes, deployments, and instrumentation must be discovered rather than remembered.

## Ground the query

Pin the question, service and environment, absolute window and timezone, relevant population, and comparison baseline. Translate relative times into explicit timestamps. Expand scope only when observed dependencies justify it.

Inspect current capabilities and datasource types. Use existing dashboard queries as precedent, then verify variables, selectors, field spelling, units, response shape, and service identity through current metadata or a bounded sample.

Read the matching method before composing or interpreting its query:

- [Prometheus](references/prometheus.md) for counts, rates, distributions, or saturation.
- [Loki](references/loki.md) for logs and event populations.
- [Tempo](references/tempo.md) for request/job paths and trace-derived aggregates.
- [Pyroscope](references/pyroscope.md) for resource profiles.

Derived automated analyses may provide leads; corroborate consequential claims with
underlying evidence and preserve their coverage limits.

## Acquire representative evidence

Quantify the affected population before treating specimens as representative when an
aggregate is available. Name what it counts: requests, spans, log lines, jobs, or sampled
profiles. When only specimens are obtainable, preserve that limit and continue the
useful investigation. Compare like windows, workloads, strata, units, and denominators.
Resolve selector and instrumentation questions before interpreting absent events.

Fetch only the specimens needed to distinguish explanations or show the mechanism. Prefer server-side filters and aggregates. Use the least-sensitive dimensions that can answer the question; redact secrets and unrelated customer content.

Use a second relevant signal when instrumentation can miss the event under investigation. Preserve material failed and empty queries. Temporal coincidence with a deployment is a hypothesis until current release and causal evidence supports more.

## Return evidence with its limits

Retain reproducible receipts for material observations: datasource, exact query or redacted arguments, absolute window, concise result, and coverage. Use native deeplink generation when available.

Distinguish observed facts, supported inferences, hypotheses, and unknowns in language appropriate to the result. A specimen is not a rate, and no matching events under a query is not proof of no errors.

Finish when the useful observation can be reproduced and its population and blind spots are clear. Integrate it into Debugging or Review when the task also asks for a causal answer or verdict; acquiring evidence should not strand the investigation.
