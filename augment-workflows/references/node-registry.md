# Node Registry Reference

Use only these 44 public-authorable node type strings in Augment MCP workflow
documents. Every node uses `typeVersion: 1`.

The runtime registry also contains two `ds.internalHandler` variants. Public
workflow validation rejects them as unknown; never author them.

## Type Grammar

```text
<family>.<variant>.in<N>.success<K>.error<M>
```

Example:

```text
ds.aiAgent.perItem.in1.success1.error1
```

## Node Envelope Fields

For builder-ready documents, every node should carry this envelope:

```json
{
  "id": "node-id",
  "name": "Human readable name",
  "type": "ds.aiAgent.perItem.in1.success1.error1",
  "typeVersion": 1,
  "mode": "per_item",
  "position": [200, 100],
  "parameters": {}
}
```

`mode` is a node-level field and uses snake case:

| Type variant | Required node `mode` |
| --- | --- |
| `.perItem.` | `per_item` |
| `.batch.` | `batch` |

Do not persist `parameters._executionMode`. The builder's execution-mode
control changes the node type; validation derives the variant from that type.

## Builder Availability

Public authorability and builder visibility are different. The current builder
feature-gates these public node families:

- `ds.approval`
- `ds.notify`
- `ds.storeValue`
- `ds.loadValue`

An active server may accept a public type that the current user cannot add from
the builder palette. Treat that as an availability constraint, not as a
different node contract.

The palette also combines per-item and batch variants into one visible choice,
and it combines the three Zip arities. MCP authors must still select the exact
type string that matches the required mode and port count.

## Parameter Modes

| Mode | Authoring value | Runtime value |
| --- | --- | --- |
| `literal` | JSON value in the document | Same value |
| `cel` | String containing a CEL expression | Evaluated result |
| `liquid` | String containing a Liquid template | Rendered string |

For static strings in CEL fields, quote inside the expression:

```json
{
  "channel": "\"C0123456789\""
}
```

## Public Node Table

| Category | Node type | Variant | Params |
| --- | --- | --- | --- |
| Trigger | `ds.eventTrigger.perItem.in0.success1.error0` | per item | `event: literal` |
| Trigger | `ds.scheduledTrigger.perItem.in0.success1.error0` | per item | `cronExpression: literal`, `timezone: literal` |
| Loader | `ds.loadMeeting.perItem.in1.success1.error1` | per item | `meeting_id: cel/string` |
| Loader | `ds.loadValue.perItem.in1.success1.error1` | per item | `scope_id: cel/stringOrNumber`, `key: literal`, optional `default_value: cel/json` |
| AI | `ds.aiPrompt.perItem.in1.success1.error1` | per item | `model: literal`, `messages[].role: literal`, `messages[].content: liquid`, `return_type: literal`, optional `value_schema: literal/json` |
| AI | `ds.aiPrompt.batch.in1.success1.error1` | batch | Same as per-item AI Prompt |
| AI | `ds.aiAgent.perItem.in1.success1.error1` | per item | `model: literal`, `messages[].role: literal`, `messages[].content: liquid`, `return_type: literal`, optional `value_schema: literal/json` |
| AI | `ds.aiAgent.batch.in1.success1.error1` | batch | Same as per-item AI Agent |
| Control | `ds.if.perItem.in1.success2.error0` | per item | `expr: cel/boolean` |
| Control | `ds.zip.batch.in2.success1.error0` | batch | `labels: literal string[2]` |
| Control | `ds.zip.batch.in3.success1.error0` | batch | `labels: literal string[3]` |
| Control | `ds.zip.batch.in4.success1.error0` | batch | `labels: literal string[4]` |
| Control | `ds.broadcast.batch.in2.success1.error0` | batch | `broadcast: literal`, `leftLabel: literal`, `rightLabel: literal` |
| Control | `ds.wait.perItem.in1.success1.error0` | per item | `amount: literal`, `unit: literal` |
| Control | `ds.waitUntil.perItem.in1.success1.error0` | per item | `cronExpression: literal`, `timezone: literal` |
| Control | `ds.approval.perItem.in1.success2.error1` | per item | `prompt: liquid`, `approverEmails: cel/stringOrStringArray`, optional `timeoutDays`, `approveLabel`, `denyLabel` |
| Control | `ds.approval.batch.in1.success2.error1` | batch | Same as per-item Approval |
| Action | `ds.slackPublish.perItem.in1.success1.error1` | per item | `workspaceId: literal/string`, `channelId: literal/string`, `source: liquid`, `fallback: liquid` |
| Action | `ds.slackPublish.batch.in1.success1.error1` | batch | Same as per-item Publish to Slack |
| Action | `ds.slackPost.perItem.in1.success1.error1` | per item | `channel: cel/string`, `text: liquid` |
| Action | `ds.slackPost.batch.in1.success1.error1` | batch | Same as per-item Slack Post |
| Action | `ds.emailPublish.perItem.in1.success1.error1` | per item | `to: cel/json`, optional `cc`, `bcc`, `attachments: cel/json`, `subject`, `html`, `plaintext: liquid` |
| Action | `ds.emailPublish.batch.in1.success1.error1` | batch | Same as per-item Send Email |
| Action | `ds.emailSend.perItem.in1.success1.error1` | per item | `to: cel/stringOrStringArray`, `subject: liquid`, `body: liquid` |
| Action | `ds.emailSend.batch.in1.success1.error1` | batch | Same as per-item Email Send |
| Action | `ds.teamsPublish.perItem.in1.success1.error1` | per item | `tenantId: literal/string`, `teamId`, `channelId`, `importance: literal/string`, optional `bodyHtml`, `cards: liquid` |
| Action | `ds.teamsPublish.batch.in1.success1.error1` | batch | Same as per-item Publish to Teams |
| Action | `ds.teamsPost.perItem.in1.success1.error1` | per item | `teamId: cel/string`, `channelId: cel/string`, `text: liquid` |
| Action | `ds.teamsPost.batch.in1.success1.error1` | batch | Same as per-item Teams Post |
| Action | `ds.createPdfArtifact.perItem.in1.success1.error1` | per item | `title: liquid`, `source: liquid` |
| Action | `ds.createPdfArtifact.batch.in1.success1.error1` | batch | Same as per-item Create PDF Artifact |
| Action | `ds.addArtifactToDecisionSite.perItem.in1.success1.error1` | per item | `decisionSiteId: cel/number`, `access: literal/json` |
| Action | `ds.smsSend.perItem.in1.success1.error1` | per item | `to: cel/stringOrStringArray`, `body: liquid` |
| Action | `ds.smsSend.batch.in1.success1.error1` | batch | Same as per-item SMS Send |
| Action | `ds.notify.perItem.in1.success1.error1` | per item | `contact_email: cel/stringOrStringArray`, `subject: liquid`, `body: liquid` |
| Action | `ds.notify.batch.in1.success1.error1` | batch | Same as per-item Notify |
| Action | `ds.crmUpdateOpportunity.perItem.in1.success1.error1` | per item | `deal_room_id: cel/number`, `meeting_plan_id: cel/string` |
| Action | `ds.createSalesforceTask.perItem.in1.success1.error1` | per item | `deal_room_id: cel/number`, `title: liquid`, `description: liquid`, optional `due_date: cel/string`, optional `priority: literal` |
| Action | `ds.createSalesforceTask.batch.in1.success1.error1` | batch | Same as per-item Salesforce Task |
| Action | `ds.createHubSpotTask.perItem.in1.success1.error1` | per item | `deal_room_id: cel/number`, `title: liquid`, `description: liquid`, optional `due_at: cel/string`, optional `priority: literal`, optional `status: literal` |
| Action | `ds.createHubSpotTask.batch.in1.success1.error1` | batch | Same as per-item HubSpot Task |
| State | `ds.storeValue.perItem.in1.success1.error1` | per item | `scope_id: cel/stringOrNumber`, `key: literal`, `value: cel/json`, optional `retention_days: literal` |
| Control | `ds.selectMany.perItem.in1.success1.error0` | per item | `items: cel/array`, optional `label: literal` |
| Control | `ds.sink.perItem.in1.success0.error0` | per item | none |

## Triggers

### Event Trigger

Type: `ds.eventTrigger.perItem.in0.success1.error0`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `event` | literal | string enum | yes |

Allowed `event` values:

- `MEETING_START_MINUS_24H`
- `MEETING_START_MINUS_6H`
- `MEETING_START_MINUS_1H`
- `MEETING_START_MINUS_30M`
- `MEETING_START_MINUS_15M`
- `MEETING_START`
- `MEETING_START_MINUS_24H_FOR_DEAL_ROOM`
- `MEETING_START_MINUS_6H_FOR_DEAL_ROOM`
- `MEETING_START_MINUS_1H_FOR_DEAL_ROOM`
- `MEETING_START_MINUS_30M_FOR_DEAL_ROOM`
- `MEETING_START_MINUS_15M_FOR_DEAL_ROOM`
- `MEETING_START_FOR_DEAL_ROOM`
- `MEETING_ENDED`
- `MEETING_ENDED_FOR_DEAL_ROOM`
- `COMPANY_CHANGED`
- `DEAL_ROOM_CRM_STAGE_CHANGED`
- `DEAL_ROOM_STAGE_CHANGED`
- `MANUAL`

Success output:

```json
{
  "event": {
    "type": "MANUAL",
    "id": "2025-01-01T00:00:00.000Z",
    "organizationId": 1,
    "payload": {
      "systemEventType": "MANUAL",
      "organizationId": 1,
      "timestamp": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

### Scheduled Trigger

Type: `ds.scheduledTrigger.perItem.in0.success1.error0`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `cronExpression` | literal | string | yes |
| `timezone` | literal | string | yes |

`cronExpression` is six-field cron: second minute hour day month weekday.

Success output wraps a `SCHEDULED` event and does not include meeting data.

## Loader

### Load Meeting

Type: `ds.loadMeeting.perItem.in1.success1.error1`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `meeting_id` | cel | string | yes |

Typical expression: `trigger.meetingPlanId`

Success output:

```json
{
  "meeting": {
    "id": "meeting_plan_sample",
    "title": "Sample Meeting",
    "startTime": "2025-01-01T15:00:00.000Z",
    "endTime": "2025-01-01T16:00:00.000Z",
    "location": "Virtual",
    "attendees": [
      {
        "name": "Alex Rivera",
        "email": "alex@example.com",
        "response": "ACCEPTED"
      }
    ]
  },
  "callRecording": {
    "id": "call_recording_sample",
    "createdAt": "2025-01-01T16:05:00.000Z",
    "duration": 1800,
    "transcriptSummary": "Key stakeholders aligned on next steps.",
    "transcript": "(0.00) Alex Rivera: Thanks everyone for joining.",
    "keyStatements": [
      {
        "speaker": "Jamie Lee",
        "text": "We are excited to move forward pending security review.",
        "timestamp": 600,
        "sentimentScore": 0.7,
        "classification": "statement"
      }
    ],
    "insights": "Topics Discussed ... Suggested Action Items ..."
  }
}
```

### Load Value

Type: `ds.loadValue.perItem.in1.success1.error1`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `scope_id` | cel | string or number | yes |
| `key` | literal | string | yes |
| `default_value` | cel | JSON value | no |

The scope and key must match the Store Value node that wrote the value.

Success output:

```json
{
  "value": "stored value or default",
  "found": true
}
```

## AI

### AI Prompt

Types:

```text
ds.aiPrompt.perItem.in1.success1.error1
ds.aiPrompt.batch.in1.success1.error1
```

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `model` | literal | `low`, `medium`, `high` | yes |
| `messages[].role` | literal | `system`, `user`, `assistant`, `tool` | yes |
| `messages[].content` | liquid | string | yes |
| `return_type` | literal | `string`, `integer`, `boolean`, `float`, `custom` | yes |
| `value_schema` | literal | supported Draft 7 JSON Schema object | only for `custom` |

Success output:

```json
{
  "type": "string",
  "value": "Sample AI-generated response.",
  "usage": {
    "prompt_tokens": 128,
    "completion_tokens": 64
  }
}
```

For `custom`, the success output uses `"type": "custom"` and `value` is an
object conforming to `value_schema`.

### AI Agent

Types:

```text
ds.aiAgent.perItem.in1.success1.error1
ds.aiAgent.batch.in1.success1.error1
```

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `model` | literal | `low`, `medium`, `high` | yes |
| `messages[].role` | literal | `system`, `user`, `assistant`, `tool` | yes |
| `messages[].content` | liquid | string | yes |
| `return_type` | literal | scalar or list return type | yes |

Allowed return types:

- `string`
- `integer`
- `boolean`
- `float`
- `string_list`
- `integer_list`
- `boolean_list`
- `float_list`
- `custom`

Success output:

```json
{
  "type": "string_list",
  "value": ["Item A", "Item B", "Item C"],
  "usage": {
    "prompt_tokens": 96,
    "completion_tokens": 32
  }
}
```

For `custom`, the success output uses `"type": "custom"` and `value` is an
object conforming to `value_schema`.

### Custom Output Schema

`value_schema` is required when `return_type` is `custom` and forbidden for
other return types.

The supported compiler-backed subset requires:

- exact `"$schema": "http://json-schema.org/draft-07/schema#"` at the root;
- root `type: "object"` and `additionalProperties: false`;
- closed nested objects;
- types `string`, `integer`, `number`, `boolean`, `object`, and homogeneous
  `array`;
- nullable optional properties using canonical `["<type>", "null"]`;
- `required` containing unique, declared property names;
- only `type`, `properties`, `required`, `additionalProperties`, `items`,
  `enum`, `default`, `examples`, and `description`;
- no property named `__proto__`, `constructor`, or `prototype`.

Limits:

| Limit | Maximum |
| --- | --- |
| Serialized schema | 65,536 bytes |
| JSON document depth | 64 |
| Schema depth | 12 |
| Declared properties | 100 |
| Schema nodes | 256 |
| Enum entries | 100 |

This is a supported subset, not general JSON Schema validation.

## Control

### If

Type: `ds.if.perItem.in1.success2.error0`

Param: `expr: cel/boolean`.

Success port 0 is true. Success port 1 is false.

### Zip

Types:

```text
ds.zip.batch.in2.success1.error0
ds.zip.batch.in3.success1.error0
ds.zip.batch.in4.success1.error0
```

Param: `labels: literal string array matching input count`.

Output for labels `["scout", "account"]`:

```json
{
  "scout": {},
  "account": {},
  "index": 0
}
```

There is no automatic `json.value` in zip output.

### Broadcast

Type: `ds.broadcast.batch.in2.success1.error0`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `broadcast` | literal | `left` or `right` | yes |
| `leftLabel` | literal | string | yes |
| `rightLabel` | literal | string | yes |

Broadcast attaches one shared record from the selected side to each item from
the other side.

### Wait

Type: `ds.wait.perItem.in1.success1.error0`

Params: `amount: literal number`, `unit: literal enum`.

Allowed units: `seconds`, `minutes`, `hours`, `days`, `weeks`, `months`,
`years`.

### Wait Until

Type: `ds.waitUntil.perItem.in1.success1.error0`

Params: `cronExpression: literal string`, `timezone: literal string`.

### Approval

Types:

```text
ds.approval.perItem.in1.success2.error1
ds.approval.batch.in1.success2.error1
```

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `prompt` | liquid | string | yes |
| `approverEmails` | cel | string or string array | yes |
| `timeoutDays` | literal | number | no |
| `approveLabel` | literal | string | no |
| `denyLabel` | literal | string | no |

Success port 0 is approved. Success port 1 is denied.

### Select Many

Type: `ds.selectMany.perItem.in1.success1.error0`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `items` | cel | array | yes |
| `label` | literal | string | no |

If `label` is present, each emitted item is wrapped under that key.

### Sink

Type: `ds.sink.perItem.in1.success0.error0`

Consumes input and emits no outputs.

## Actions

Action nodes are side-effecting at execution time. Draft authoring does not run
them. Before release or execution, surface the concrete external effects and
apply the authorization rule in `SKILL.md`.

Choose communication nodes by the format and execution behavior the workflow
needs:

| Job | Node | Authoring behavior |
| --- | --- | --- |
| Slack Block Kit | Publish to Slack | Exact Slack JSON, fixed connected destination, per item or batch |
| Slack Markdown | Slack Post | Markdown conversion, CEL channel, per item or batch |
| Complete email | Send Email | HTML plus plain text, structured recipients, optional PDF Artifacts, per item or batch |
| Markdown email | Send Markdown Email | Markdown conversion, per item or batch |
| Teams HTML or cards | Publish to Teams | Teams-compatible HTML or Adaptive Cards, fixed connected destination, per item or batch |
| Teams Markdown | Teams Post | Markdown conversion, CEL destination, per item or batch |

Publish to Slack, Create PDF Artifact, Send Email, and Publish to Teams each
require the corresponding live authoring resource listed in
`workflow-lifecycle.md`. Read those resources for current destination grammars,
limits, diagnostics, and examples. Add Artifact to Decision Site has no live
authoring resource; its complete contract is bundled below.

For Publish to Slack, Create PDF Artifact, Send Email, and Publish to Teams,
choose the variant by effect cardinality:

- Per-item evaluates against each `json` input and creates one effect for each
  item.
- Batch evaluates once against the complete `items` collection, has no `json`,
  and creates exactly one effect.

Add Artifact to Decision Site remains per-item only. It places each input
`ArtifactRef` independently.

The per-item variants of these five native actions retain successful sibling
outputs when the terminal node outcome also contains item errors. Their
sections define structured result and error contracts. Slack Post, Teams Post,
Send Markdown Email, SMS Send, Notify, CRM Update Opportunity, Salesforce Task,
and HubSpot Task use the generic error shape:

```json
{
  "message": "Sample error",
  "code": "ERR_SAMPLE"
}
```

### Slack

#### Publish to Slack

Types:

```text
ds.slackPublish.perItem.in1.success1.error1
ds.slackPublish.batch.in1.success1.error1
```

Choose and verify `workspaceId` and `channelId` with
[`integration-destinations.md`](integration-destinations.md).

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `workspaceId` | literal | nonblank string | yes |
| `channelId` | literal | nonblank string | yes |
| `source` | liquid | Slack message JSON object with `blocks` | yes |
| `fallback` | liquid | plain text | yes |

Success output:

```json
{
  "publicationId": "publication_sample",
  "workspaceId": "T0123456789",
  "channelId": "C0123456789",
  "messageTs": "1712345678.000100",
  "acceptedAt": "2026-01-01T00:00:00.000Z"
}
```

`messageTs` is `string | null`; the other success fields are strings. The error
port returns:

| Field | Type | Required |
| --- | --- | --- |
| `status` | one of `not_created`, `unknown` | yes |
| `publicationId` | string | no |
| `problems` | nonempty problem array | yes |
| `mayRetry` | boolean | yes |
| `retryAfterMs` | number | no |

Each problem has `code: string`, `message: string`, and these exact enums:

- `kind`: `source`, `connection`, `channel`, `provider`, or
  `publication_changed`
- `action`: `edit_source`, `choose_connection`, `choose_channel`, `reconnect`,
  `retry`, or `check_slack`

A problem may include `pointer: string` and `position` with numeric `offset`,
`line`, and `column`.

#### Slack Post

Types:

```text
ds.slackPost.perItem.in1.success1.error1
ds.slackPost.batch.in1.success1.error1
```

Params: `channel: cel/string`, `text: liquid`.

Static channel:

```json
{
  "channel": "\"C0123456789\"",
  "text": "**Update**\n\n{{ json.value }}"
}
```

`text` is Markdown converted to Slack blocks.

### Email

#### Send Email

Types:

```text
ds.emailPublish.perItem.in1.success1.error1
ds.emailPublish.batch.in1.success1.error1
```

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `to` | cel | recipient or recipient array | yes |
| `cc` | cel | recipient or recipient array | no |
| `bcc` | cel | recipient or recipient array | no |
| `subject` | liquid | complete subject | yes |
| `html` | liquid | complete HTML body | yes |
| `plaintext` | liquid | complete plain-text body | yes |
| `attachments` | cel | PDF `ArtifactRef` or array | no |

A recipient is an email string or `{ "email": "...", "name": "..." }`.
Directly after Create PDF Artifact, use `attachments: "json"` in per-item mode
or `attachments: "items"` in batch mode.

Success fields:

| Field | Type |
| --- | --- |
| `status` | one of `accepted`, `simulated` |
| `publicationId` | string |
| `providerMessageId` | string or null |
| `acceptedAt` | string or null |

Error fields:

| Field | Type | Required |
| --- | --- | --- |
| `status` | one of `not_created`, `unknown` | yes |
| `publicationId` | string | no |
| `code` | string | yes |
| `kind` | one of `input`, `sender`, `attachment`, `provider`, `publication_changed` | yes |
| `message` | string | yes |
| `action` | one of `edit_message`, `change_owner`, `retry`, `contact_support` | yes |
| `mayRetry` | boolean | yes |
| `retryAfterMs` | number | no |

This node is distinct from `ds.emailSend`, whose builder label is Send Markdown
Email.

#### Send Markdown Email

Types:

```text
ds.emailSend.perItem.in1.success1.error1
ds.emailSend.batch.in1.success1.error1
```

Params: `to: cel/stringOrStringArray`, `subject: liquid`, `body: liquid`.

`body` is Markdown rendered to HTML with raw HTML disabled.

### Teams

#### Publish to Teams

Types:

```text
ds.teamsPublish.perItem.in1.success1.error1
ds.teamsPublish.batch.in1.success1.error1
```

Choose and verify `tenantId`, `teamId`, and `channelId` with
[`integration-destinations.md`](integration-destinations.md).

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `tenantId` | literal | nonblank string | yes |
| `teamId` | literal | nonblank string | yes |
| `channelId` | literal | nonblank string | yes |
| `bodyHtml` | liquid | complete Teams-compatible HTML | no |
| `cards` | liquid | JSON array of Adaptive Cards | no |
| `importance` | literal | `normal`, `important`, or `urgent` | yes |

Provide a nonblank `bodyHtml`, at least one card, or both. Success returns
these fields:

| Field | Type |
| --- | --- |
| `publicationId` | string |
| `acceptedAt` | string |
| `teamId` | string |
| `channelId` | string |
| `providerMessageId` | string or null |
| `webUrl` | string or null |

Error fields:

| Field | Type | Required |
| --- | --- | --- |
| `status` | one of `not_created`, `unknown` | yes |
| `publicationId` | string | no |
| `code` | string | yes |
| `kind` | one of `template`, `input`, `sender`, `destination`, `provider`, `publication_changed` | yes |
| `message` | string | yes |
| `action` | one of `edit_message`, `choose_destination`, `reconnect`, `retry`, `check_teams` | yes |
| `mayRetry` | boolean | yes |
| `retryAfterMs` | number | no |
| `field` | one of `bodyHtml`, `cards`, `importance` | no |
| `pointer` | string | no |
| `position` | numeric `offset`, `line`, and `column` | no |

#### Teams Post

Types:

```text
ds.teamsPost.perItem.in1.success1.error1
ds.teamsPost.batch.in1.success1.error1
```

Params: `teamId: cel/string`, `channelId: cel/string`, `text: liquid`.

`text` is Markdown converted to HTML with raw HTML disabled.

### Artifacts

#### Create PDF Artifact

Types:

```text
ds.createPdfArtifact.perItem.in1.success1.error1
ds.createPdfArtifact.batch.in1.success1.error1
```

Params: `title: liquid`, `source: liquid`. Both are strict templates.

Success is an `ArtifactRef`:

```json
{
  "kind": "artifact",
  "type": "DOCUMENT",
  "organizationId": 42,
  "artifactId": "11111111-1111-4111-8111-111111111111",
  "title": "Customer decision brief"
}
```

The node creates a durable organization Artifact and its first PDF version. It
does not place, publish, email, or expose the Artifact. In the success object,
`kind` is the literal `artifact`, `type` is the literal `DOCUMENT`,
`organizationId` is a number, `artifactId` is a UUID string, and `title` is a
string.

Error fields:

| Field | Type | Required |
| --- | --- | --- |
| `status` | one of `not_created`, `unknown` | yes |
| `code` | string | yes |
| `kind` | one of `input`, `render`, `storage`, `artifact` | yes |
| `message` | string | yes |
| `action` | one of `edit_source`, `retry`, `check_artifact`, `contact_support` | yes |
| `mayRetry` | boolean | yes |
| `artifactKey` | string | no |

#### Add Artifact to Decision Site

Type: `ds.addArtifactToDecisionSite.perItem.in1.success1.error1`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `decisionSiteId` | cel | positive safe integer | yes |
| `access` | literal | closed access object | yes |

Allowed access objects:

```json
{ "visibility": "EVERYONE" }
```

```json
{
  "visibility": "RESTRICTED",
  "scope": "DECISION_SITE",
  "userIds": [101],
  "groupIds": []
}
```

```json
{
  "visibility": "RESTRICTED",
  "scope": "ORGANIZATION",
  "groupIds": [201]
}
```

A fixed positive-integer `decisionSiteId` expression requires
`scope: "DECISION_SITE"` for restricted access. A dynamic expression requires
`scope: "ORGANIZATION"` and organization groups. Restricted access must name
at least one allowed user or group.

Success returns:

| Field | Type |
| --- | --- |
| `artifact` | complete `ArtifactRef` from Create PDF Artifact |
| `placement.kind` | literal `"artifactPlacement"` |
| `placement.organizationId` | positive safe integer |
| `placement.decisionSiteId` | positive safe integer |
| `placement.placementId` | positive safe integer |
| `placement.artifactId` | UUID string |
| `placement.title` | string |
| `placement.platformUrl` | authenticated URL string |

Both error variants have `code: string`, `message: string`,
`mayRetry: boolean`, and these exact enums:

- `kind`: `input`, `artifact`, `decision_site`, `access`, or `placement`
- `action`: `choose_input`, `choose_decision_site`, `edit_access`, `retry`,
  `check_artifact`, or `contact_support`

The `not_added` variant has only those common fields and
`status: "not_added"`. The `unknown` variant also requires
`artifactId: UUID string` and `decisionSiteId: positive safe integer` so the
caller can inspect the effect before retrying.

The two Artifact actions are separate effects. Create PDF Artifact emits one
stable reference that can fan out to placement and email. If email follows
placement sequentially, use the wrapped reference described in
`data-context.md`. See
[`../examples/create-and-share-decision-brief.json`](../examples/create-and-share-decision-brief.json)
for a complete graph with separate error paths.

### Other Communications

#### SMS Send

Types:

```text
ds.smsSend.perItem.in1.success1.error1
ds.smsSend.batch.in1.success1.error1
```

Params: `to: cel/stringOrStringArray`, `body: liquid`.

#### Notify

Types:

```text
ds.notify.perItem.in1.success1.error1
ds.notify.batch.in1.success1.error1
```

Params: `contact_email: cel/stringOrStringArray`, `subject: liquid`,
`body: liquid`.

### CRM And Tasks

#### CRM Update Opportunity

Type: `ds.crmUpdateOpportunity.perItem.in1.success1.error1`

Params: `deal_room_id: cel/number`, `meeting_plan_id: cel/string`.

#### Create Salesforce Task

Types:

```text
ds.createSalesforceTask.perItem.in1.success1.error1
ds.createSalesforceTask.batch.in1.success1.error1
```

Params:

- `deal_room_id: cel/number`
- `title: liquid`
- `description: liquid`
- optional `due_date: cel/string`
- optional `priority: literal`, one of `High`, `Normal`, `Low`

Success output:

```json
{
  "status": "created",
  "results": [
    {
      "taskId": "00T1a000000XYZU",
      "serviceConfigurationId": 123
    }
  ]
}
```

#### Create HubSpot Task

Types:

```text
ds.createHubSpotTask.perItem.in1.success1.error1
ds.createHubSpotTask.batch.in1.success1.error1
```

Params:

- `deal_room_id: cel/number`
- `title: liquid`
- `description: liquid`
- optional `due_at: cel/string`
- optional `priority: literal`, one of `HIGH`, `MEDIUM`, `LOW`, `NONE`
- optional `status: literal`, one of `NOT_STARTED`, `IN_PROGRESS`, `WAITING`,
  `COMPLETED`, `DEFERRED`

Success output:

```json
{
  "status": "created",
  "results": [
    {
      "taskId": "123456",
      "serviceConfigurationId": 123
    }
  ]
}
```

## State

### Store Value

Type: `ds.storeValue.perItem.in1.success1.error1`

Params:

| Field | Mode | Runtime type | Required |
| --- | --- | --- | --- |
| `scope_id` | cel | string or number | yes |
| `key` | literal | string | yes |
| `value` | cel | JSON value | yes |
| `retention_days` | literal | positive number | no |

Values are isolated by the pair of `scope_id` and `key`. Leaving
`retention_days` absent keeps the value indefinitely. Store Value is
side-effecting and returns:

```json
{
  "stored": true
}
```

## Retry Defaults And Deadlines

The effective retry policy is node override, then registry default, then the
workflow default. An omitted policy does not mean no retry.

| Node family | Registry retry default |
| --- | --- |
| AI Prompt and AI Agent | 2 attempts, exponential jitter, 500 ms to 10 seconds |
| Publish to Slack, Create PDF Artifact, Add Artifact to Decision Site, Send Email, and Publish to Teams | 3 attempts, exponential, 1 second to 30 seconds |
| Other communication, CRM, task, and Store Value actions | 3 attempts, exponential, 1 second to 30 seconds |
| Other trigger and control nodes | Workflow default unless the registry supplies one |

Structured action errors can further forbid retry with `mayRetry: false` or set
a longer minimum delay with `retryAfterMs`. Use the outcome-handling rules in
`12-factor-workflow-quality.md` before connecting a retry path.

When a per-item node schedules another attempt, it checkpoints successful items
and explicit terminal item errors. The next attempt invokes only unresolved
original item indexes; completed items are not run again. Intermediate attempts
publish no outputs and release no downstream nodes. Once the node is terminal,
it rebuilds outputs in original input order and applies the node's mixed-outcome
policy.

Retry isolation does not make external effects exactly once. A process failure
after a provider accepts an effect but before the checkpoint commits can still
repeat that item, so provider idempotency remains part of the action contract.
Batch nodes do not use per-item checkpoints: a retry invokes the whole batch
again.

Do not author node-level `timeout`. The document schema accepts it, but the
executor does not enforce it. Approval timeouts, renderer capacity and
deadlines, and provider request deadlines are separate surface behavior.
