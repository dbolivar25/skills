# Connection-pool exhaustion hypothesis

Use this branch only after connection-pool exhaustion is a ranked hypothesis.
It supplies falsifiable predictions and alternatives; it does not replace the
core reproduction and hypothesis loop. Acquire production telemetry through
`grafana-evidence` when Grafana is an available source.

## Establish the governing configuration

Inspect the deployed or authoritative configuration for:

- pool limit and acquisition timeout;
- application instance count and whether each owns a separate pool;
- database or proxy connection limits;
- transaction and statement timeouts;
- services sharing the downstream resource; and
- pool, queue, or database metrics currently emitted.

Old limits and timeouts cannot support a current diagnosis. Record the expected
acquisition timeout and resource-sharing topology as facts or unknowns.

## State predictions

Pool exhaustion predicts a combination such as:

- otherwise cheap operations clustering near the acquisition timeout;
- connection-acquisition or queue spans dominating request time;
- elevated concurrency or request rate near the affected window;
- saturation, queue depth, or instance imbalance when instrumented; and
- errors that identify acquisition or pool timeout behavior.

State which observations would falsify the hypothesis. Slow query execution,
file transfer, streaming, downstream latency, lock contention, or one unhealthy
instance can exceed the same duration without exhausting the pool.

## Choose current canaries

Find routes or jobs that currently perform one small lookup and have a stable
baseline. Compare their population around the affected and baseline windows. Do
not preserve a permanent list of hot or safe endpoints: code, traffic, and
instrumentation change.

If several services share the downstream resource, compare them in the same
window. Independent application pools can still contend at the database while
producing different symptoms.

## Falsify and grade the causal claim

Use the sources that exist: pool and request metrics, acquisition versus
execution spans, explicit timeout logs, authoritative configuration, database
telemetry, and a tight reproduction signal when available. Do not require a
missing integration; name the smallest additional observation that would settle
the hypothesis.

- **Confirmed:** current configuration and direct acquisition evidence establish
  the cause under the reproduction signal.
- **Supported:** multiple independent predictions hold and credible alternatives
  were falsified, but direct acquisition evidence is absent.
- **Possible:** timeout-shaped evidence exists without enough causal or
  configuration support.
- **Not supported:** current evidence points to execution, downstream latency,
  or another mechanism.

Completion criterion: the diagnosis handoff names the level, tested prediction,
falsified alternatives, direct and indirect evidence, and smallest next probe.
