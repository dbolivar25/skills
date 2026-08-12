---
name: query-grafana
description: Use when an investigation needs current production logs, metrics, or traces from Grafana. Load it to bound the service and time window, query live telemetry safely, and state observability blind spots without turning absent Grafana evidence into proof of health.
---

# Query Grafana

Use Grafana as a read-only evidence source. Current tools, datasources, labels,
services, deployments, and instrumentation are live state. Discover or verify
them during the investigation instead of treating examples in this skill as
configuration.

Grafana access does not authorize changing dashboards, alerts, datasources,
retention, or production configuration.

## 1. Bound the question

Pin:

- the symptom or decision the evidence must support;
- service, environment, route, job, or component in scope;
- absolute time window and timezone;
- comparison window, when a baseline matters; and
- the minimum sensitive attributes needed.

Translate relative times such as "this morning" or "after deploy" into explicit
timestamps. Expand to related services only when current architecture or the
first evidence shows a real dependency.

Completion criterion: every query can be tied to one scoped question, service or
relationship, and explicit time window.

## 2. Discover the live telemetry surface

Inspect the Grafana tools currently available and their current schemas. Then
discover or verify:

- datasource identities and types;
- service and environment label values;
- metric names, units, buckets, and dimensions;
- log labels and structured fields; and
- trace resource and span attributes.

Start with a small metadata or sample query. Do not assume a remembered UID,
label spelling, environment casing, response envelope, dashboard inventory, or
instrumentation gap still applies.

Completion criterion: the selected datasource, query fields, service identity,
and units are proven by current results or explicitly unavailable.

## 3. Establish magnitude before examples

Use metrics to measure the incident shape before reading individual logs or
traces:

- request or job rate;
- error count and rate;
- latency or duration distribution;
- saturation, queueing, instance balance, or resource pressure when available;
- change against the comparison window.

Prefer bounded, aggregated queries. Scope high-cardinality dimensions such as
routes before requesting a range result. Use an instant query for a window total
and a range query for change over time. Confirm units before combining series.

Generic PromQL shapes, after substituting verified metric and label names:

```promql
sum(increase(<request_count>{service_name="$SVC"}[<window>]))
```

```promql
sum by (<route>) (rate(<request_count>{service_name="$SVC", <status>=~"5.."}[5m]))
```

```promql
sum by (<route>) (rate(<duration_sum>{service_name="$SVC"}[5m]))
/
sum by (<route>) (rate(<duration_count>{service_name="$SVC"}[5m]))
```

Completion criterion: the investigation has a quantified magnitude, time shape,
and affected surface, or states exactly which metric is absent.

## 4. Find representative evidence

Use logs for structured application events and deployment context. Always start
LogQL with a verified label selector; narrow by structured severity or field when
available rather than searching for words such as `error` in raw text.

```logql
{service_name="$SVC", deployment_environment_name="$ENV"} |= "$TERM"
```

Use traces when a request, job, database call, or downstream dependency needs
causal shape. Read
[`references/traceql-patterns.md`](references/traceql-patterns.md) for the
applicable branch. Fetch only a few representative traces after aggregated
triage; full traces can be large and may contain secrets or personal data.

For suspected connection-pool pressure, read
[`references/pool-exhaustion.md`](references/pool-exhaustion.md). Derive the
current timeout and canary behavior before interpreting a latency cluster.

Completion criterion: representative events explain the aggregate pattern, or
the mismatch is retained as evidence of a telemetry gap.

## 5. Protect sensitive data

- Query user, email, organization, payload, SQL, or request-body attributes only
  when the scoped question genuinely requires them.
- Prefer counts, pseudonymous identifiers, and server-side aggregation.
- Never paste raw traces or broad query results into the conversation.
- Parse large results locally, retain only the signal, and redact secrets,
  personal data, tokens, headers, query parameters, and customer content.
- Do not turn a discovered customer identifier into durable skill documentation.

Completion criterion: the result contains the least sensitive evidence capable
of supporting the conclusion.

## 6. Triangulate and report

Metrics, logs, and traces observe different failure surfaces. An absent series,
zero count, or missing trace proves only what that datasource recorded under the
query used. Check another relevant source when instrumentation can fail before an
event is emitted or completed.

Return:

```md
Question and window:
Current telemetry surface:
Quantitative findings:
Representative evidence:
Conclusion:
Blind spots and alternative explanations:
Next evidence or action:
```

Separate observation from inference. Use wording such as "Grafana recorded no
matching 5xx responses in this window" rather than "the service had no errors."
Name deployment proof, incident cause, affected users, and severity only when
the current evidence establishes them.

Completion criterion: every conclusion traces to a current query, all material
blind spots remain visible, and no absence claim exceeds the datasource's
coverage.
