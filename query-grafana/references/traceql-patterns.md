# TraceQL Investigation Patterns

Common patterns for investigating MeetingFlow production issues via Tempo.

## Error Investigation

### All errors for a service in a time window (ALWAYS START HERE)

```traceql
{resource.service.name = "decision-site-api" && span:status = error}
```

**IMPORTANT**: Always use `span:status = error` first, not `span.http.status_code >= 500`. Many errors (pool timeouts, unhandled rejections, middleware crashes) don't have an HTTP status code because the request crashes before the HTTP response completes. The broad search catches everything; the narrow search below misses entire error classes.

### 5xx HTTP errors with route info (NARROW — use after broad search)

```traceql
{resource.service.name = "decision-site-api" && span.http.status_code >= 500}
```

### Specific HTTP error code

```traceql
{resource.service.name = "meetingflow-api" && span.http.status_code = 502}
```

## Slow Request Investigation

### Slow API requests (any route)

```traceql
{resource.service.name = "decision-site-api" && span.http.route != nil && span:duration > 10s}
```

### Slow DB queries

```traceql
{resource.service.name = "decision-site-api" && span.db.system = "postgresql" && span:duration > 5s}
```

### Slow specific route

```traceql
{resource.service.name = "decision-site-api" && span.http.route = "/api/organization/:organizationSlug/plan/:meetingPlanId" && span:duration > 10s}
```

## Per-Org / Per-User Investigation

### All errors for a specific org

```traceql
{resource.service.name = "decision-site-api" && span.organizationSlug = "augment-ai" && span:status = error}
```

### All errors for a specific user

```traceql
{resource.service.name = "meetingflow-api" && span.user.email = "user@example.com" && span:status = error}
```

### Slow requests for a specific org

```traceql
{resource.service.name = "decision-site-api" && span.organizationSlug = "augment-ai" && span:duration > 5s}
```

## Webhook Investigation

### Slow webhooks

```traceql
{resource.service.name = "meetingflow-api" && span.http.route =~ ".*webhook.*" && span:duration > 5s}
```

### Webhook errors

```traceql
{resource.service.name = "meetingflow-api" && span.http.route =~ ".*webhook.*" && span:status = error}
```

### Specific webhook

```traceql
{resource.service.name = "meetingflow-api" && span.http.route =~ ".*google.*calendar.*" && span:status = error}
```

## Parsing Traces with Python

Full trace fetches from `tempo_get-trace` can be 500K+ chars. Always parse programmatically.

### General-purpose trace parser

```python
import json, sys

data = json.load(sys.stdin)
text = data[0]['text']
trace = json.loads(text)
t = trace['trace']

for svc in t['services']:
    all_spans = []
    for scope in svc.get('scopes', []):
        all_spans.extend(scope.get('spans', []))

    errors = []
    orgs = set()
    users = set()
    slow_spans = []

    for span in all_spans:
        attrs = span.get('attributes', {})
        dur_ms = span.get('durationMs', 0)

        if 'organizationSlug' in attrs:
            orgs.add(str(attrs['organizationSlug']))
        if 'user.email' in attrs:
            users.add(str(attrs['user.email']))

        if span.get('status', {}).get('code') == 'STATUS_CODE_ERROR':
            errors.append({
                'name': span.get('name', ''),
                'route': attrs.get('http.route', ''),
                'duration_ms': dur_ms
            })

        if dur_ms > 5000:
            slow_spans.append({
                'name': span.get('name', ''),
                'duration_ms': dur_ms,
                'route': attrs.get('http.route', '')
            })

        for ev in span.get('events', []):
            msg = str(ev.get('attributes', {}).get('exception.message', ''))
            if msg:
                errors.append({
                    'name': span.get('name', ''),
                    'exception': msg[:200]
                })

    print(f'{svc["serviceName"]}: {len(all_spans)} spans, {len(errors)} errors, {len(slow_spans)} slow (>5s)')
    print(f'  Orgs: {orgs}')
    print(f'  Users: {users}')
    for e in errors[:5]:
        print(f'  ERR: {e}')
    for s in slow_spans[:5]:
        print(f'  SLOW: {s["name"]} ({s["duration_ms"]}ms)')
```

## Instrumentation Scopes

Each trace contains spans from these OTel instrumentation libraries:

| Scope | What it captures |
|---|---|
| `@opentelemetry/instrumentation-express` | Express middleware + route handlers |
| `@opentelemetry/instrumentation-http` | Inbound/outbound HTTP requests |
| `prisma` | DB connection acquisition + queries |
| `@opentelemetry/instrumentation-redis` | Redis operations |
| `@opentelemetry/instrumentation-dns` | DNS lookups |
| `@opentelemetry/instrumentation-net` | TCP connections |

## Key Span Name Patterns

| Span name pattern | What it means |
|---|---|
| `prisma:engine:connection` at ~10,000ms | Pool timeout — waiting for connection |
| `prisma:engine:connection` at <100ms | Normal connection acquisition |
| `middleware - asyncHandlerWrapper` with error | Middleware threw an exception |
| `request handler - /api/...` with error | Route handler threw an exception |
| `GET /api/...` or `POST /api/...` (HTTP scope) | Top-level HTTP request span |

## Tips

- `traceql-search` results include `serviceStats.errorCount` — scan this first before fetching full traces
- Traces with `rootServiceName: "<root span not yet received>"` are from external callers (webhooks, browser)
- Full trace fetches can be 500K+ chars — always parse with Python, never read raw
- Regex in TraceQL is fully anchored: use `=~ ".*pattern.*"` for substring match
- **Always check multiple services**: `decision-site-api` and `meetingflow-api` share the same DB. Pool pressure on one often affects the other. Run error searches for both.
- **Tempo has blind spots**: Pool timeout errors often crash before OTel records a span. If BugSnag shows errors Tempo can't find, look for indirect indicators in Prometheus (10,000ms latency on basic routes, instance churn)
