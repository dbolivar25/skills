---
name: query-grafana
description: >-
  Use when investigating production issues, checking metrics, querying logs,
  or analyzing API performance via Grafana Cloud MCP tools. Triggers on:
  "check grafana", "query logs", "check production", "check metrics",
  "loki query", "prometheus query", "prod errors", "request latency",
  "investigate incident", "query-grafana".
---

# Querying MeetingFlow Production Grafana

## Datasource UIDs (use directly — no discovery needed)

| Type       | UID                    | Use for                        |
|------------|------------------------|--------------------------------|
| Loki       | `grafanacloud-logs`    | Application logs               |
| Prometheus | `grafanacloud-prom`    | HTTP metrics, request rates    |
| Tempo      | `grafanacloud-traces`  | Distributed traces             |

## Tool Loading (always do first)

Load tools before use with these ToolSearch queries — run in parallel:

```
"+grafana query prometheus"        → query_prometheus, query_prometheus_histogram
"+grafana query loki logs"         → query_loki_logs, query_loki_patterns, query_loki_stats
"+grafana tempo trace search"      → tempo_traceql-search, tempo_docs-traceql, tempo_get-trace
"+grafana tempo attribute names"   → tempo_get-attribute-names, tempo_get-attribute-values
```

## Service Names

| Service                  | `service_name`                   | Notes                          |
|--------------------------|----------------------------------|--------------------------------|
| Decision Site API        | `decision-site-api`              | Primary API, namespace `mfds`  |
| MeetingFlow API          | `meetingflow-api`                | Main app API                   |
| MeetingFlow Collab       | `meetingflow-collab`             |                                |
| MeetingFlow Functions    | `meetingflow-functions`          | Azure Functions                |
| MeetingFlow Workflow     | `meetingflow-workflow`           |                                |
| MeetingFlow Python       | `meetingflow-py`                 |                                |
| Embeddings               | `embeddings-py`                  |                                |
| Analysis Host            | `analysis-host`                  |                                |

Environment values (case-sensitive): `production`, `Production` (varies by service), `staging`, `preview`

## Loki (Logs)

### Always include a label selector — bare `{}` queries fail

```logql
{service_name="decision-site-api", deployment_environment_name="production"} |= "search term"
```

### Severity filtering

Use `detected_level` as a label — line filter `|= "error"` hits false positives in URLs:

```logql
{service_name="decision-site-api", detected_level="error"}
```

### Loki limitations

- Only captures Winston structured log output
- Unhandled exceptions (Prisma pool errors, middleware crashes) are NOT in Loki
- These errors are also often NOT in Tempo — BugSnag is the primary capture mechanism
- Time format: always RFC3339 (`startRfc3339: "2026-02-18T14:00:00Z"`)

## Prometheus (Metrics)

### HTTP metrics

Node.js APIs emit `http_server_duration_milliseconds` (OTel). Python services use `http_server_request_duration_seconds`.

Available series: `_bucket`, `_count`, `_sum`

### Key labels

```
service_name="decision-site-api"
deployment_environment_name="production"
http_route="/api/organization/:organizationSlug/plan/:meetingPlanId"
http_method="GET"
http_status_code="200"
service_instance_id="cd2a..."       # unique per container
```

### Not available

- `http_server_active_requests` — only Python services
- Any `prisma_*` metrics — no DB pool monitoring in Prometheus
- Histogram percentiles often return empty — use avg latency (sum/count) instead

### General-purpose PromQL templates

Replace `$SVC` with service name. All assume `deployment_environment_name="production"`.

**Request rate by route (top 10):**
```promql
topk(10, sum by (http_route) (rate(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production"}[5m])))
```

**5xx error rate by route:**
```promql
sum by (http_route) (rate(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production", http_status_code=~"5.."}[5m]))
```

**Average latency by route (scoped to specific routes):**
```promql
sum by (http_route) (rate(http_server_duration_milliseconds_sum{service_name="$SVC", deployment_environment_name="production", http_route=~"$ROUTES"}[5m]))
/
sum by (http_route) (rate(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production", http_route=~"$ROUTES"}[5m]))
```

**Per-instance load balance:**
```promql
sum by (service_instance_id) (rate(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production"}[5m]))
```

**Total 5xx count in a window (instant query):**
```promql
sum(increase(http_server_duration_milliseconds_count{service_name="$SVC", deployment_environment_name="production", http_status_code=~"5.."}[3h]))
```

### Performance tips

- **Always scope route filters**: unscoped `avg latency by route` range queries return 94K+ chars. Filter `http_route=~"..."` to specific routes.
- **Use instant queries for totals**: `increase(...[3h])` with `queryType: "instant"` for aggregate counts.
- **stepSeconds=300** (5 min) is a good default for range queries over hours.
- **NaN for zero-traffic intervals** is normal, not missing data.

### Metric discovery

Use `regex` parameter (not `matches`) with `list_prometheus_metric_names`:

```
list_prometheus_metric_names(datasourceUid: "grafanacloud-prom", regex: "http")
```

### Time format

RFC3339 or relative: `now`, `now-1h`, `now-6h`, `now-1d`

## Tempo (Traces)

Tempo is the richest datasource. It captures per-request traces with full span trees: Express middleware, Prisma DB calls, outbound HTTP, Redis, DNS, and exception events.

### Trace structure

```
trace.services[] → service with resource attributes
  .scopes[]      → instrumentation library (express, http, prisma, redis, dns, net)
    .spans[]     → individual operations
      .attributes  → key-value pairs (http.route, organizationSlug, user.id, etc.)
      .events[]    → exception events with full error messages
      .status      → { code: "STATUS_CODE_ERROR" | "STATUS_CODE_UNSET" | "STATUS_CODE_OK" }
```

### Key span attributes

| Attribute | Scope | Use |
|---|---|---|
| `http.route` | span | Route template (e.g., `/api/organization/:organizationSlug`) |
| `http.status_code` | span | HTTP response code |
| `http.target` | span | Full URL path |
| `db.system` | span | Database type (`postgresql`) — Prisma DB spans |
| `db.statement` | span | SQL query text (when available) |
| `organizationSlug` | span | Organization identifier |
| `user.id` | span | User ID |
| `user.email` | span | User email |
| `express.name` | span | Express middleware/handler name |
| `express.type` | span | `middleware` or `request_handler` |
| `error.type` | span | Error class name |
| `service_instance_id` | resource | Container/instance identifier |

### General-purpose TraceQL templates

**All errors for a service (ALWAYS START HERE):**
```traceql
{resource.service.name = "$SVC" && span:status = error}
```

**5xx errors with route info (narrow — use AFTER broad search):**
```traceql
{resource.service.name = "$SVC" && span.http.status_code >= 500}
```

**IMPORTANT**: Many errors (pool timeouts, unhandled rejections, middleware crashes) don't have `http.status_code` because the request crashes before the HTTP response completes. Always use `span:status = error` first to get the full picture.

**Slow requests (> threshold):**
```traceql
{resource.service.name = "$SVC" && span.http.route != nil && span:duration > 10s}
```

**Slow DB queries:**
```traceql
{resource.service.name = "$SVC" && span.db.system = "postgresql" && span:duration > 5s}
```

**Per-org errors:**
```traceql
{resource.service.name = "$SVC" && span.organizationSlug = "org-slug" && span:status = error}
```

**Per-user errors:**
```traceql
{resource.service.name = "$SVC" && span.user.email = "user@example.com" && span:status = error}
```

### Trace analysis workflow

1. **Search** with `tempo_traceql-search` — returns trace IDs with `serviceStats` (spanCount, errorCount)
2. **Triage** — scan `serviceStats.errorCount` to gauge severity before fetching full traces
3. **Fetch** 1-2 representative traces with `tempo_get-trace` (can be 500K+ chars)
4. **Parse** with Bash + Python — never read raw JSON. Structure: `trace.services[].scopes[].spans[]`

### Tempo tips

- `<root span not yet received>` as rootServiceName is normal for webhook/async traces
- Regex is fully anchored — use `=~ ".*pattern.*"` for substring match
- Time params use RFC3339

## No Custom Dashboards

There are zero dashboards for MeetingFlow services. All queries go direct to datasources.

## Investigation Workflow

### Step 0: Scope the services

Before querying anything, determine which service(s) to investigate. If the user mentions a specific service, use it. Otherwise, **check all Node.js API services** (`decision-site-api` AND `meetingflow-api` at minimum). These share the same PostgreSQL instance and can exhibit the same issues independently.

Common mistake: investigating only one service when pool starvation or DB pressure affects multiple services simultaneously.

### Step 1: Load tools (parallel)

```
ToolSearch: "+grafana query prometheus"
ToolSearch: "+grafana query loki logs"
ToolSearch: "+grafana tempo trace search"
```

### Step 2: Quantitative assessment (Prometheus)

Run these **for all services in scope simultaneously** — fire all queries in a single parallel batch, not service-by-service:
1. Total 5xx count per service (instant query with `increase`) — compare across services
2. 5xx error rate by route per service (range query, stepSeconds=300)
3. Latency on canary routes per service — use scoped route filters (see `references/pool-exhaustion.md` for the specific routes). Unscoped route queries return 100K+ chars.
4. Per-instance load balance per service (detect hot instances or instance churn)
5. Request rate by route per service (top 10) — understand traffic shape

**Efficiency**: With 2 services and 5 query types, that's 10 queries — fire them all in parallel. Parse large results with Python in Bash (not inline), sorting by max latency to surface the 10,000ms pool timeout signature quickly.

### Step 3: Qualitative deep-dive (Tempo)

Run broad error search **for all services in scope simultaneously**:
```traceql
{resource.service.name = "$SVC" && span:status = error}
```
Do NOT use `span.http.status_code >= 500` as the first search — this misses errors where the request crashes before an HTTP response is recorded (pool timeouts, unhandled exceptions, middleware failures).

Also run the pool timeout DB span search in parallel:
```traceql
{resource.service.name = "$SVC" && span.db.system = "postgresql" && span:duration > 9s}
```

Then:
1. Triage via `serviceStats.errorCount` in search results — compare across services
2. Check DB span durations: exactly ~10,000ms = pool timeout; other durations = long-running queries (different problem)
3. Fetch 1-2 representative traces with `tempo_get-trace`
4. Parse with Python to extract: error messages, affected orgs/users, slow spans

### Step 4: Log context (Loki)

Use for application-level log messages, structured errors, and deployment version checks (`service_version` label).

### Choosing the right datasource

| Question | Datasource | Caveats |
|---|---|---|
| How many errors? What's the rate? | Prometheus | Undercounts if requests crash before HTTP response |
| Which routes are slow? | Prometheus | |
| Why is this route failing? | Tempo | |
| Who is affected (org/user)? | Tempo | |
| What SQL is slow? | Tempo | |
| What did the app log? | Loki | Only Winston structured logs |
| What version is deployed? | Loki (`service_version` label) | |
| What exceptions are being thrown? | Tempo (span events) | Some unhandled errors bypass OTel entirely |
| Pool timeout errors? | **BugSnag** (not Grafana) | See `references/pool-exhaustion.md` |

### Reporting conclusions

Never say a service is "healthy" or has "zero errors" based on Grafana alone. Always:
- Present findings per-service side-by-side so differences are visible
- State what Grafana shows AND what it can't see (pool timeouts, unhandled exceptions)
- Distinguish pool timeouts (~10,000ms on basic routes) from legitimate slow operations (file serving, LLM streaming, heavy queries)
- If Prometheus shows 0 5xx but you suspect pool errors, say "0 5xx visible to Prometheus" — not "0 errors"

### Observability blind spots

Grafana does NOT reliably capture:
- **Prisma pool timeout errors**: Unhandled `PrismaClientKnownRequestError` exceptions crash the request before OTel records an HTTP status code. BugSnag catches these; Grafana often doesn't.
- **Prometheus 5xx undercounting**: When a request crashes in middleware (e.g., pool timeout in `CallerMiddleware` or `OrganizationMiddleware`), the HTTP span never completes with a status code, so Prometheus doesn't count it as a 5xx.
- **Loki gaps**: Only captures Winston-structured log output. Unhandled exceptions, crashes, and pool errors are not in Loki.

When BugSnag reports errors that Grafana can't find, use Grafana for **indirect indicators**: latency spikes to exactly 10,000ms on basic routes, request rate patterns, and instance churn.

## Reference files (load when relevant)

- `references/traceql-patterns.md` — Common TraceQL investigation patterns and trace parsing scripts
- `references/pool-exhaustion.md` — Prisma connection pool exhaustion detection and diagnosis
- `references/known-hot-endpoints.md` — Endpoints with known performance issues and their code locations
