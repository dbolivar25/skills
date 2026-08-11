# Workflow Lifecycle Reference

Use this reference for the public Augment MCP workflow tools, canonical
resources, version concurrency, validation, release, execution, and execution
observation.

This file is the standalone current contract. Confirm required tools and
resource templates through MCP discovery before mutation. If an expected
operation-specific name is absent, stop and report the mismatch; do not
substitute another workflow interface.

## Canonical Resources

```text
decisionsite://organizations/{organizationSlug}/workflows
decisionsite://organizations/{organizationSlug}/workflows{?format,limit,offset,lifecycle,releaseState,ownerMemberUri,query}
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}

decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions{?format,limit,offset,state}
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}

decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions{?format,limit,offset,status,dateFrom,dateTo}
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions/{executionId}

decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions/{executionId}/nodes
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions/{executionId}/nodes{?format,limit,offset}
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions/{executionId}/nodes/{nodeId}
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions/{executionId}/nodes/{nodeId}/outputs/{channel}/{portIndex}
decisionsite://organizations/{organizationSlug}/workflows/{workflowId}/versions/{versionId}/executions/{executionId}/nodes/{nodeId}/outputs/{channel}/{portIndex}?offset={offset}&limit={limit}
```

Use canonical URIs returned by resources and tool receipts. Do not construct an
id from a display name. Add `format=json` through the advertised query template
when structured output is needed.

## Workflow Authoring Resources

The connected Augment MCP endpoint exposes versioned, read-only authoring
contracts for four action nodes:

```text
decisionsite://workflow-authoring/create-pdf-artifact-v1{?format}
decisionsite://workflow-authoring/publish-to-slack-v1{?format}
decisionsite://workflow-authoring/send-email-v1{?format}
decisionsite://workflow-authoring/publish-to-teams-v1{?format}
```

Their resource template names are `create-pdf-artifact-authoring`,
`publish-to-slack-authoring`, `send-email-authoring`, and
`publish-to-teams-authoring`. Read the relevant contract before authoring that
node. These resources do not create or change a workflow.

There is no Add Artifact to Decision Site authoring resource in this contract.
Use the complete bundled contract in `node-registry.md`. Do not infer a URI from
the other four names.

## Workflow Author Access

Workflow visibility and mutation depend on the current user's organization
role:

| Role | Read | Create or mutate |
| --- | --- | --- |
| Admin | All organization workflows | All organization workflows |
| Creator | Workflows the user owns | Workflows the user owns |
| Collaborator | None | None |
| Guest | None | None |

Only user identities can create workflows. A workflow owner must remain an
eligible Admin or Creator when owner authority is validated. Demoting an owner
does not automatically stop triggers from an already released version.
Downstream sender, destination, placement, and resource authorization still
apply at release or execution where their contracts require it.

## Public Tools

All tools accept optional `auditReason` and `sourceAgent` unless the active
server publishes a narrower schema. `sourceAgent`, when supplied, identifies the
actual invoking agent or client.

| Tool | Required input | Optional input | Behavior |
| --- | --- | --- | --- |
| `create_workflow` | `organizationUri`, `name` | `document`, metadata | Creates a workflow and initial draft. |
| `update_workflow` | `workflowUri`, `name` | metadata | Renames the workflow. |
| `archive_workflow` | `workflowUri` | metadata | Archives the workflow. |
| `unarchive_workflow` | `workflowUri` | metadata | Restores the workflow. |
| `create_workflow_version` | `workflowUri` | `document`, metadata | Creates a draft version. |
| `update_workflow_version_draft` | `workflowVersionUri`, `document`, `ifMatch` | `note`, metadata | Replaces a draft document and returns validation plus a fresh ETag. |
| `validate_workflow_version` | `workflowVersionUri` | `document`, metadata | Validates the stored or supplied document without mutation. |
| `release_workflow_version` | `workflowVersionUri`, `ifMatch` | `releaseNote`, metadata | Validates and releases the version. |
| `archive_workflow_version` | `workflowVersionUri` | metadata | Archives the version. |
| `unarchive_workflow_version` | `workflowVersionUri` | metadata | Restores the version. |
| `create_workflow_version_execution` | `workflowVersionExecutionsUri`, `systemEvent` | metadata | Asynchronously creates an execution. |
| `cancel_workflow_version_execution` | `workflowVersionExecutionUri` | metadata | Requests execution cancellation. |
| `retry_workflow_version_execution` | `workflowVersionExecutionUri` | metadata | Requests execution retry. |

`validate_workflow_version` is read-only. The other operations change durable
state or enqueue work.

## Workflow Document

Minimum envelope:

```json
{
  "schema_version": "ds-v1",
  "name": "Workflow name",
  "nodes": [],
  "connections": {}
}
```

`settings` and `pinData` are optional objects. The MCP document input checks the
portable envelope shallowly; semantic node and connection validation happens
separately.

Builder-ready node:

```json
{
  "id": "trigger",
  "name": "Manual trigger",
  "type": "ds.eventTrigger.perItem.in0.success1.error0",
  "typeVersion": 1,
  "mode": "per_item",
  "position": [0, 0],
  "parameters": {
    "event": "MANUAL"
  }
}
```

Do not persist `_executionMode`. Node variant is encoded in `type`. For
builder-ready documents, `.perItem.` uses node-level `mode: "per_item"` and
`.batch.` uses `mode: "batch"`.

Connections are grouped by source node, output channel, and source port:

```json
{
  "connections": {
    "source-node-id": {
      "success": [
        [
          {
            "node_id": "destination-node-id",
            "index": 0
          }
        ]
      ],
      "error": [[]]
    }
  }
}
```

- `success[0]` and `error[0]` identify source port 0 on each channel.
- Edge `index` identifies the destination input port.
- `if` success port 0 is true and port 1 is false.
- `approval` success port 0 is approved and port 1 is denied.
- Every required destination input port needs an inbound edge.

## Normal Sequence

1. Read organizations and select a canonical `organizationUri`.
2. Read every node-specific authoring resource needed by the proposed graph.
3. Create a workflow with `create_workflow`, optionally supplying its first
   document.
4. Read the returned workflow/version resources and preserve the draft
   `resourceUri` and `etag`.
5. Replace a draft with `update_workflow_version_draft`, passing the fresh ETag
   as `ifMatch`.
6. Validate with `validate_workflow_version`.
7. Obtain confirmation before release unless release was explicitly requested.
8. Release with `release_workflow_version` and a fresh `ifMatch`.
9. Use the released-version URI or returned `executionsResourceUri` for an
   approved execution.
10. Read execution detail, node lifecycle, and bounded node output resources.

## ETags And Version Results

Draft replacement:

```json
{
  "workflowVersionUri": "decisionsite://organizations/acme/workflows/workflow_123/versions/version_456",
  "ifMatch": "W/\"version_456.3\"",
  "document": {
    "schema_version": "ds-v1",
    "name": "Updated workflow",
    "nodes": [],
    "connections": {}
  },
  "note": "Correct the routing graph"
}
```

If the ETag is missing or may be stale, read the version before writing.

Validation returns the current ETag and does not change the version. Draft
replacement persists structurally valid documents with semantic findings so
they can be corrected. Release rejects semantic errors, publishes the current
draft, updates trigger/schedule state, and returns both the released version and
the newly created next draft.

Releasing a scheduled workflow can arm future runs. Releasing any workflow can
make its action nodes triggerable.

## Execution Events

Every `systemEvent` branch requires `organizationId`.

### Manual

```json
{
  "systemEventType": "MANUAL",
  "organizationId": 1,
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

### Scheduled

```json
{
  "systemEventType": "SCHEDULED",
  "organizationId": 1,
  "scheduleId": "workflow_schedule_id",
  "cronExpression": "0 0 13 * * 1-5",
  "timezone": "America/Chicago",
  "fireAtUtc": "2026-01-01T19:00:00.000Z"
}
```

`scheduleId` is optional. `cronExpression`, `timezone`, and `fireAtUtc` are
required.

### Meeting ended

`MEETING_ENDED` requires UUID `meetingPlanId`.
`MEETING_ENDED_FOR_DEAL_ROOM` also requires positive integer
`dealRoomId`.

### Meeting start buckets

The non-deal-room event names are:

- `MEETING_START_MINUS_24H`
- `MEETING_START_MINUS_6H`
- `MEETING_START_MINUS_1H`
- `MEETING_START_MINUS_30M`
- `MEETING_START_MINUS_15M`
- `MEETING_START`

They require UUID `meetingPlanId`, `occurrenceId`, `occursAtUtc`, `fireAtUtc`,
and finite `offsetMinutes`.

The corresponding `_FOR_DEAL_ROOM` events also require positive integer
`dealRoomId` and may include nullable `requestId`.

### Company and deal events

- `COMPANY_CHANGED`: integer `companyId`, a server-advertised `reason`, and
  `requestId`.
- `DEAL_ROOM_CRM_STAGE_CHANGED`: positive integer `dealRoomId`, `app:
  "HUBSPOT"`, positive integer `serviceConfigurationId`, `externalDealId`,
  `toCrmStageId`, and `requestId`; nullable `occurredAt` is optional.
- `DEAL_ROOM_STAGE_CHANGED`: positive integer `dealRoomId`, server-advertised
  `toStage`, and `requestId`; nullable `fromStage` is optional.

Use the active tool schema for server-controlled enums such as company-change
reasons and deal-room stages.

## Create And Observe Execution

```json
{
  "workflowVersionExecutionsUri": "decisionsite://organizations/acme/workflows/workflow_123/versions/version_456/executions",
  "systemEvent": {
    "systemEventType": "MANUAL",
    "organizationId": 1,
    "timestamp": "2026-01-01T00:00:00.000Z"
  },
  "auditReason": "User requested a manual test run",
  "sourceAgent": "<actual-invoking-agent>"
}
```

The response proves acceptance, not completion. Observe in this order:

1. execution detail;
2. execution-node collection;
3. individual node detail;
4. output port by `channel` and `portIndex`;
5. output chunks with `offset` and `limit` when the bounded response continues.

## Cancel Or Retry

Cancellation:

```json
{
  "workflowVersionExecutionUri": "decisionsite://organizations/acme/workflows/workflow_123/versions/version_456/executions/execution_789",
  "auditReason": "User requested cancellation",
  "sourceAgent": "<actual-invoking-agent>"
}
```

Retry uses the same fields with `retry_workflow_version_execution`. Both
operations change execution state; retry can enqueue additional work.
