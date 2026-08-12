---
name: grafana-evidence
description: Use when a diagnosis, review, incident question, or production claim needs current Grafana telemetry. Load it to acquire bounded metrics, logs, traces, or profiles with reproducible query receipts and explicit coverage limits; it supplies evidence, not the diagnosis or verdict.
---

# Grafana Evidence

Use Grafana as a read-only evidence substrate. Current tools, datasources,
dashboards, labels, attributes, deployments, and instrumentation are live state;
discover them during each investigation.

This skill owns evidence acquisition, not causal diagnosis, incident command, or
merge judgment. Hand a causal question to `diagnosing-bugs` and a review verdict
to `code-review` after the evidence packet exists.

## Authority boundary

Use only currently callable operations whose effect is observation:

- dashboard, panel-query, datasource, alert, incident, and analysis reads;
- Prometheus and Loki metadata or queries;
- Tempo documentation, metadata, metrics, search, and trace reads;
- Pyroscope metadata and profile reads;
- existing automated-analysis and investigation reads; and
- deeplink generation.

Grafana may expose create, update, patch, delete, resolve, annotate, incident,
alerting, OnCall, or administrative operations. Invocation of this skill grants
none of those actions. A separate administrative request must establish its own
authority and workflow.

## 1. Lock the evidence question

Pin:

- the observation or decision the evidence must support;
- service, environment, route, job, component, or relationship in scope;
- absolute start and end timestamps plus timezone;
- comparison window or expected baseline when change matters; and
- the least-sensitive dimensions needed.

Translate relative times such as “this morning” or “after deploy” into explicit
timestamps. Expand scope only when architecture or the first result establishes
a real dependency.

Completion criterion: every prospective query can be tied to one question,
scope, and explicit window.

## 2. Discover the live query surface

Inspect the currently callable Grafana tools and their schemas. Then:

1. discover the available datasources and their types;
2. when a relevant dashboard exists, read its panel queries as candidate query
   precedent and resolve current variables and datasource references;
3. discover current metric names and metadata, log labels, trace attributes, or
   profile types for the selected signal; and
4. run the smallest metadata or sample read that proves service identity, field
   spelling, units, and response shape.

A dashboard query is precedent, not authority: verify that it still measures the
question and that its variables resolve in the requested window. Do not rely on
remembered UIDs, labels, casing, buckets, attributes, or response envelopes.

Completion criterion: the datasource, fields, service identity, units, and query
mechanism are current facts or explicit unknowns.

## 3. Choose the signal

Load only the branch that matches the evidence question:

| Need | Branch |
| --- | --- |
| Counts, rates, distributions, saturation, or time-series change | [`references/prometheus.md`](references/prometheus.md) |
| Log volume, structured event distribution, or representative events | [`references/loki.md`](references/loki.md) |
| Request or job causality, span populations, or a representative trace | [`references/tempo.md`](references/tempo.md) |
| CPU, allocation, mutex, goroutine, or another profiling shape | [`references/pyroscope.md`](references/pyroscope.md) |

Existing Sift-style error-pattern and slow-request results may seed a hypothesis
or reveal a dimension worth querying. Treat them as derived leads: corroborate
material claims with the underlying aggregate or specimen evidence and report
the automation's coverage. Helpers that start a named investigation are writes
to Grafana state and require separate user authority; they are outside this
read-only path.

Completion criterion: each selected signal can distinguish at least two live
explanations or quantify the question directly.

## 4. Establish the population before specimens

Start with bounded aggregation. Measure the population's magnitude,
distribution, affected surface, and time shape before opening individual logs or
traces. Use a comparison window when the question is about change.

If only specimens exist, state that limitation instead of turning examples into
a rate. If an expected population is absent, verify the selector and another
relevant signal before interpreting the absence.

Completion criterion: the evidence packet contains a quantified population or
names the exact missing aggregate and what the remaining specimens cannot prove.

## 5. Isolate the change

Compare one material dimension at a time: window, environment, service, route,
status, version, instance, or dependency. Preserve denominators when comparing
rates. Confirm units and aggregation semantics before combining series.

Treat a deployment boundary as causal context only when current release evidence
establishes it. A temporal coincidence is a hypothesis, not a deployment result
or incident cause.

Completion criterion: the changed population and baseline are comparable, or
the mismatch is explicit.

## 6. Retrieve representative evidence safely

After aggregation, fetch only the few logs, traces, or profiles needed to
explain the pattern or falsify an alternative. Prefer server-side filtering and
aggregation. Query customer, email, payload, URL, SQL, headers, or request-body
attributes only when the scoped question cannot be answered without them.

Never paste broad raw results. Redact secrets, tokens, personal data, query
parameters, and customer content. Preserve only the fields that carry the
signal, and do not turn discovered operational identifiers into durable skill
documentation.

Completion criterion: each specimen is representative of a measured population
or explicitly labeled an anecdote, and the packet contains the least-sensitive
evidence capable of supporting the observation.

## 7. Triangulate and grade support

Metrics, logs, traces, and profiles observe different failure surfaces. Check a
second relevant signal when instrumentation can fail before an event is emitted
or completed.

Grade statements as:

- **Observed** — directly present in the recorded query result and scope.
- **Supported inference** — multiple observations fit the statement and material
  alternatives were checked.
- **Hypothesis** — plausible and testable, but the current packet does not settle
  it.
- **Unknown** — the needed signal is unavailable or outside current coverage.

Do not grade a cause here. `diagnosing-bugs` owns hypothesis falsification and a
causal conclusion.

Completion criterion: every statement has a grade, evidence source, and visible
alternative or coverage limit.

## 8. Return an Evidence Packet

Return:

```md
Question, scope, and absolute window:
Live telemetry surface:
Population and comparison:
Representative evidence:
Observed findings:
Supported inferences and live hypotheses:
Blind spots and alternative explanations:
Query receipts:
Smallest next evidence:
```

For every material query, include a receipt with datasource, tool or query
family, exact query or redacted arguments, absolute window, concise result,
coverage note, and a generated Grafana deeplink when supported. Record failed or
empty queries that materially constrain interpretation.

Say “Grafana recorded no matching events under this query and window,” not “the
service had no errors.” Name affected users, severity, release state, cause, or
health only when the evidence establishes that exact claim.

Completion criterion: another investigator can reproduce each material
observation, distinguish evidence from inference, and see what Grafana could not
observe.
