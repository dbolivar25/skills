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

A hot frame is observed resource consumption, not automatically the cause of a
user-visible symptom. Correlate its time window and population with the relevant
metric, log, or trace evidence before handing the hypothesis to diagnosis.

Completion criterion: the receipt names profile type, units, labels, windows,
comparison basis, dominant frames, and coverage limits.
