# Grafana evidence core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Question/scope, absolute time and baseline, discovered datasource/field/unit metadata, actual aggregate/specimen query receipts and failures, release evidence when relevant.

## 4. Establish the population before specimens

Require bounded aggregate observations of the population's magnitude,
distribution, affected surface, and time shape before treating individual logs or traces as representative. Use a comparison window when the question is about change.

If only specimens exist, state that limitation instead of turning examples into
a rate. If an expected population is absent, return a need for selector validation and another relevant signal before
interpreting the absence.

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


## 7. Triangulate and grade support

Metrics, logs, traces, and profiles observe different failure surfaces. Require observations from a
second relevant signal when instrumentation can fail before an event is emitted
or completed.

Grade statements as:

- **Observed** — directly present in the recorded query result and scope.
- **Supported inference** — multiple observations fit the statement and material
  alternatives were checked.
- **Hypothesis** — plausible and testable, but the current packet does not settle
  it.
- **Unknown** — the needed signal is unavailable or outside current coverage.

Do not grade a cause here. the diagnosis module owns hypothesis falsification and a causal conclusion.

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
coverage note, and a supplied Grafana deeplink when available. Record failed or
empty queries that materially constrain interpretation.

Say “Grafana recorded no matching events under this query and window,” not “the
service had no errors.” Name affected users, severity, release state, cause, or
health only when the evidence establishes that exact claim.

Completion criterion: another investigator can reproduce each material
observation, distinguish evidence from inference, and see what Grafana could not
observe.

An unavailable metadata fact, aggregate, comparator or corroborating signal
returns the smallest evidence need and the claim it prevents. Do not construct
an executable query against guessed labels or claim source health from absence.
The shell owns discovery, query execution, redaction and link generation.
