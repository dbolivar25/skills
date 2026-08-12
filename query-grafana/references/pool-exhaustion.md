# Connection-pool exhaustion investigation

Use this branch when evidence suggests requests or jobs are waiting for a scarce
database or downstream connection.

## Establish current configuration

Inspect the deployed or authoritative configuration for:

- pool limit and acquisition timeout;
- number of application instances and whether each owns a separate pool;
- database or proxy connection limits;
- transaction and statement timeouts;
- services that share the same downstream resource; and
- pool, queue, or database metrics currently emitted.

Do not carry old limits or timeouts into the investigation. A latency cluster is
meaningful only relative to the configuration active in the window.

Completion criterion: the expected acquisition timeout and resource-sharing
topology are current facts or explicit unknowns.

## Distinguish waiting from slow work

Pool exhaustion usually combines several signals:

- otherwise cheap operations clustering near the configured acquisition timeout;
- connection-acquisition or queue spans consuming most of the request;
- elevated concurrency or request rate;
- saturation, queue depth, or instance imbalance when those metrics exist; and
- failures whose error class names acquisition or pool timeout behavior.

A slow query, file transfer, stream, or heavy endpoint can exceed the same
duration without exhausting the pool. Compare the span shape and a known-normal
window rather than classifying by latency alone.

Completion criterion: the evidence distinguishes connection wait from execution
time and names remaining alternatives.

## Choose canaries from current behavior

Find routes or jobs that normally perform one small lookup and have a stable
baseline. Query their latency around the incident and comparison windows. Do not
keep a permanent list of "known hot" or "safe" endpoints in this skill; code,
traffic, and fixes change.

If several services share the downstream resource, compare them in the same
window. Independent pools can still contend at the database while producing
different application symptoms.

## Triangulate

Use the sources that currently exist:

- metrics for request shape, latency, error rate, saturation, and instance load;
- traces for acquisition versus execution time and downstream causality;
- logs for explicit timeout classes, pool events, restarts, and deploy context;
- database or error-tracking telemetry when available and authorized.

Do not require an integration that is absent. When Grafana cannot observe the
failure class, report the blind spot and the specific additional source that
would settle it.

## Conclusion levels

- **Confirmed:** current configuration plus direct acquisition/error evidence
  establishes pool exhaustion.
- **Supported:** multiple indirect signals fit pool exhaustion and credible
  alternatives were checked, but direct acquisition evidence is absent.
- **Possible:** a timeout-shaped latency cluster exists without enough causal or
  configuration evidence.
- **Not supported:** current evidence points to slow execution, downstream
  latency, or another mechanism.

Report the level, evidence, alternatives, and smallest next observation. Never
claim all errors, affected customers, or the incident cause from a Grafana blind
spot.
