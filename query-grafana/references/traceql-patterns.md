# TraceQL investigation patterns

Verify the current datasource schema and attribute names before using these
shapes. Substitute the service, route, status, database, and duration fields that
the live metadata exposes.

## Error search

Start with span status when the instrumentation records it:

```traceql
{resource.service.name = "$SVC" && span:status = error}
```

Then narrow to HTTP status only when the question is specifically about completed
HTTP responses:

```traceql
{resource.service.name = "$SVC" && span.http.status_code >= 500}
```

The two sets need not match. A request may fail before the response span records a
status, and some instrumentation never marks application errors on the span.

## Latency search

```traceql
{resource.service.name = "$SVC" && span:duration > $THRESHOLD}
```

```traceql
{resource.service.name = "$SVC" && span.db.system = "$DB" && span:duration > $THRESHOLD}
```

Add a verified route or operation attribute before fetching a broad time range.
Regex behavior varies by backend version; test a narrow known value before
depending on substring matching.

## Dependency shape

For a representative slow or failing trace:

1. Identify the root operation and service/resource attributes.
2. Sort spans by duration and preserve parent-child relationships.
3. Separate queue or connection acquisition from query execution.
4. Inspect exception events and downstream status.
5. Compare one failing trace with a nearby successful trace.

Do not assume a tool's response envelope. Inspect the current result, then parse
large JSON with a small local program or `jq`. Print counts, span names,
durations, status, and redacted error classes rather than the raw trace.

## Sensitive attributes

Filter by a user, email, organization, URL, SQL statement, or request payload only
when the investigation cannot be answered with a service, route, operation, or
pseudonymous identifier. Keep sensitive values out of the final report unless the
user explicitly needs that identity and is authorized to receive it.

## Interpretation gate

A trace is an example, not a rate. Use metrics or a trace aggregation to establish
frequency before generalizing. A missing root span, incomplete tree, or absent
error event may be an instrumentation failure rather than evidence that the
operation succeeded.
