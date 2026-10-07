# Pyroscope evidence branch

Use Pyroscope when the question depends on CPU, allocation, mutex, goroutine, or
another supported profiling shape.

## Discover

1. Select a current Pyroscope datasource.
2. Discover available profile types and their units.
3. Discover label names and values for the service, environment, instance,
   version, or operation in scope.
4. Prove one narrow profile query in the requested window.

## Compare

Fetch the same profile type, units, and label scope for the incident and baseline
windows. Compare aggregate hot paths before drilling into one function or
instance. Keep sampling rate, missing instances, label drift, and deployment
topology visible.

Check whether the displayed value is total sampled cost or cost normalized by time,
request volume, or another denominator. More traffic can increase total CPU without
making each request slower. Equal-duration windows alone do not match workload.
Use [profile-type documentation](https://grafana.com/docs/pyroscope/latest/introduction/profiling-types/)
and the actual response to distinguish CPU, allocation, live-memory, and waiting costs.

A hot frame is observed resource consumption, not automatically the cause of a
user-visible symptom. Correlate its time window and population with the relevant
metric, log, or trace evidence before handing the hypothesis to diagnosis.

Retain profile type, units, labels, windows, comparison/normalization basis, dominant
frames, and coverage limits that carry the claim. A profile without a comparable baseline
can still localize current cost, while leaving a before/after claim unresolved.
