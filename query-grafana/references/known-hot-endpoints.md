# Known Hot Endpoints

From DS_DB_CONN_POOL_EXHAUSTION_RCA.md (Feb 17, 2026) and follow-up investigation (Feb 18, 2026).

## Decision Site API (`decision-site-api`)

### Pool-Exhausting Endpoints

| Endpoint | Queries/req | p95 Latency | Conn Hold | Key Issue |
|---|---|---|---|---|
| `plan/:meetingPlanId` | 11-18 | 38-55s | 30-55s | DetailedMeetingflowSelection joins 12+ tables |
| `call-recording/status` | 5-10 + ext | 1.2-23s | brief | Polled every 10s per active recording (was 3-4s pre-fix) |
| `dealroom/artifacts` | 5-9 + 3N | 67-90s | 60-90s | N+1 pattern, now batched (was unbounded) |
| `dealroom/notifications` | 7-12 | 2.3s | 2-10s | 8-JOIN query, polled every 5 min, now paginated |

### Code Locations

- DetailedMeetingflowSelection: `PrismaService.ts:595`
- Plan handler: `MeetingPlanRoutes.ts:1958` -> `MeetingPlanHelpers.ts:889`
- Status handler: `CallRecordingRoutes.ts:380-426`
- Artifacts handler: `DealRoomArtifactsRoutes.ts:463-479`
- Notifications handler: `DealRoomNotificationRoutes.ts:313-381`

### Post-Fix Status (PR #2711, Feb 18)

- DSMeetingStatusButton: only calls useMeetingflow() for interactive recording states now
- Artifacts: bounded concurrency (was unbounded Promise.allSettled)
- Notifications: paginated
- MeetingPlanHelpers: dropped organization from detail selection
- Result: zero 5xx on DS API on Feb 18

## MeetingFlow API (`meetingflow-api`)

### Pool-Exhausting Window: 6:00-6:40 AM Pacific Daily

Triggered by daily email batch (6:01 AM) + calendar sync enqueue (6:21 AM).

### Affected Endpoints (from Feb 18 incident)

| Endpoint | Latency During Pool Exhaustion | Normal Latency | Notes |
|---|---|---|---|
| `/api/organization/:organizationSlug` | **10,008-10,013ms** | ~40-115ms | Basic org resolution middleware |
| `/api/organization/:organizationSlug/domain-rules` | **10,007-10,009ms** | ~15-20ms | |
| `/api/organizations` | **10,007ms** | ~24-128ms | |
| `/webhooks/google/calendar` | **8,715-8,718ms** | ~17-60ms | Calendar sync webhook receiver |
| `/webhooks/recall-ai` | **10,006-10,007ms** | ~260-1600ms | Call recording webhook |
| `/webhooks/justcall/call-completed` | **10,005-18,697ms** | ~225-1,068ms | High sustained latency even outside incidents |
| `/webhooks/recall-ai/transcript` | varies | 400-3,100ms | Transcript delivery, increasing latency over day |

### Key Observations

- Pool exhaustion signature: basic routes hitting exactly **10,000ms** (the pool timeout)
- `/webhooks/justcall/call-completed` runs at **10-18s average** during the 6 AM window, then settles to 300-1,000ms — high base load
- The 5xx burst lasts ~35 minutes (6:00-6:35 AM PT) then self-resolves as sync load subsides
- Affected org (from Tempo trace): `leveltenenergy` (user 831, candela.monge@leveltenenergy.com)

## Pool Configuration (Both APIs)

- 20 connections per instance (`connection_limit=20`)
- 10 second pool timeout (Prisma default)
- 120 second transaction timeout
- DS API: 2 instances (40 total connections)
- MeetingFlow API: separate container, separate pool, same DB
- Pool config: `PrismaService.ts:38`
