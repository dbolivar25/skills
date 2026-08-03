# Prisma Connection Pool Exhaustion Detection

Load this reference when investigating suspected pool exhaustion or DB connection issues.

## Pool Configuration

- 20 connections per instance (`connection_limit=20`)
- 10 second pool timeout (Prisma default)
- 120 second transaction timeout
- DS API: 2 instances (40 total connections)
- MeetingFlow API: separate container, separate pool, same DB
- Pool config: `PrismaService.ts:38`

**IMPORTANT**: Both services have independent Prisma pools but share the same PostgreSQL instance. Pool starvation can occur on either or both services simultaneously. Never conclude one service is healthy based on Grafana alone — Grafana has blind spots for pool timeout errors. Always check BugSnag for both services.

## Detection Signature

Pool exhaustion causes a distinct pattern: **basic middleware routes hitting exactly ~10,000ms latency** (the Prisma pool timeout). The request itself is fast but waits 10s for a DB connection.

### What IS pool starvation (canary routes)

These routes are simple DB lookups that should complete in <200ms. When they hit ~10,000ms, it's pool starvation:
- `/api/organization/:organizationSlug` — org resolution middleware
- `/api/user/me` — basic user lookup
- `/api/organizations` — org list
- `/api/organization/:organizationSlug/domain-rules` — simple query

### What is NOT pool starvation (false positives)

High latency on these routes is expected and NOT a pool timeout indicator:
- `/user-content/.../files/:file` — file/video proxying (can take 30-180s for large media)
- `/api/.../agent/response/stream` — LLM streaming responses (100-300s is normal)
- `/api/.../dealroom/artifacts` — known heavy endpoint (many DB queries, but slow by design)
- Any route with latency well above or below 10,000ms — pool timeouts cluster at exactly ~10,000ms

## Step 1: Prometheus — Confirm pool exhaustion

**Check avg latency on canary routes (scoped to avoid 100K+ char results):**
```promql
sum by (http_route) (rate(http_server_duration_milliseconds_sum{service_name="$SVC", deployment_environment_name="production", http_route=~"/api/organization/:organizationSlug$|/api/user/me|/api/organizations$|/api/organization/:organizationSlug/domain-rules"}[5m]))
/
sum by (http_route) (rate(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production", http_route=~"/api/organization/:organizationSlug$|/api/user/me|/api/organizations$|/api/organization/:organizationSlug/domain-rules"}[5m]))
```

When these basic routes show max latency of ~10,000ms, that's pool starvation. Ignore high latencies on file-serving or streaming routes — those are expected.

**Check 5xx error rate spike on the same routes:**
```promql
sum by (http_route) (rate(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production", http_status_code=~"5.."}[5m]))
```

## Step 2: Tempo — Find pool timeout traces

**DB spans stuck at the pool timeout:**
```traceql
{resource.service.name = "$SVC" && span.db.system = "postgresql" && span:duration > 9s}
```

**Interpreting results**: Pool timeout DB spans are at **exactly ~10,000ms** (e.g., 10,000,237,942ns). A DB span at 28s or 55s is a long-running query, NOT a pool timeout — these have different root causes and fixes. Only spans clustered tightly around 10,000ms indicate pool starvation.

**Error traces correlating with pool exhaustion:**
```traceql
{resource.service.name = "$SVC" && span:status = error && span:duration > 9s}
```

## Step 3: Tempo — Identify affected customers

```traceql
{resource.service.name = "$SVC" && span.organizationSlug != nil && span:status = error}
```

## Step 4: Fetch and parse a trace

Use `tempo_get-trace` with a trace ID from step 2. Parse with Python:

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

    pool_timeouts = []
    orgs = set()
    users = set()

    for span in all_spans:
        attrs = span.get('attributes', {})
        if 'organizationSlug' in attrs:
            orgs.add(str(attrs['organizationSlug']))
        if 'user.email' in attrs:
            users.add(str(attrs['user.email']))
        for ev in span.get('events', []):
            msg = str(ev.get('attributes', {}).get('exception.message', ''))
            if 'connection pool' in msg.lower():
                pool_timeouts.append({
                    'name': span.get('name', ''),
                    'route': attrs.get('http.route', ''),
                    'msg': msg[:150]
                })

    print(f'{svc["serviceName"]}: {len(all_spans)} spans, {len(pool_timeouts)} pool timeouts')
    print(f'  Orgs: {orgs}')
    print(f'  Users: {users}')
    for pt in pool_timeouts[:5]:
        print(f'  POOL: {pt["name"]} | {pt["msg"]}')
```

## How Pool Timeouts Appear in Tempo

Pool timeouts appear as:

1. **Span events** with `exception.message` containing:
   ```
   Invalid `prisma.<model>.<method>()` invocation:
   Timed out fetching a new connection from the connection pool.
   ```

2. **`prisma:engine:connection`** spans with `db.system=postgresql` and duration of exactly ~10,000ms.

## What Does NOT Capture Pool Errors

- **Loki**: Only captures Winston structured logs. Pool timeouts are unhandled exceptions, not in Loki.
- **Prometheus**: No `prisma_*` metrics exist. 5xx counts undercount because requests that crash in middleware before HTTP response completes don't record a status code.
- **Tempo**: Unreliable for pool timeouts. When a request crashes in middleware (`CallerMiddleware`, `OrganizationMiddleware`), the OTel HTTP span may never complete, so the trace is incomplete or missing.
- **BugSnag**: **Primary source of truth** for pool timeout errors. Catches unhandled `PrismaClientKnownRequestError` exceptions that bypass OTel.

## Indirect Grafana Indicators

When BugSnag shows pool errors but Grafana can't find direct evidence, look for:

1. **10,000ms latency on basic routes** (Prometheus) — the pool timeout signature
2. **Instance churn** (Prometheus, per-instance query) — many `service_instance_id` values appearing/disappearing indicates scaling pressure
3. **Webhook traffic spikes** (Prometheus, request rate by route) — sustained webhook volume is often the trigger
4. **5xx undercounting** — if BugSnag shows 3000 errors but Prometheus shows 500, the gap is pool timeouts crashing before HTTP response

## Known Pool Exhaustion Patterns

See `known-hot-endpoints.md` for specific endpoints known to cause pool pressure.
