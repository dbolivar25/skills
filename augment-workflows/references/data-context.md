# Data Context Reference

Data Context is the runtime object available while evaluating CEL and Liquid
fields. It is node-relative: it changes with the selected node, execution mode,
connections, and upstream output shapes.

## Roots

| Root | Available | Meaning |
| --- | --- | --- |
| `json` | Per-item nodes | Current item being processed. |
| `items` | Per-item and batch nodes | Input array from port 0. |
| `ports` | Per-item and batch nodes | Arrays by input port index. `ports[0]` is input port 0. |
| `trigger` | All triggered runs | System event payload that started the run. |
| `author` | CEL and Liquid evaluation | Workflow author profile. |
| `organization` | CEL and Liquid evaluation | Organization metadata. |

Per-item evaluation adds `json` to the shared roots. Batch evaluation does not
have `json`; use `items` or CEL `ports`.

`ports` is indexed, not label-keyed. Labels appear in output objects created by
nodes such as `zip` and `broadcast`.

Current limitation: the executor supplies `ports` to both CEL and Liquid, but
the server's Liquid semantic analyzer does not list `ports` as an allowed global
root. CEL may use `ports`; avoid Liquid `ports` references until the active
server accepts them.

## Liquid Vs CEL

Liquid uses braces:

```liquid
{{ json.scout.value }}
{{ author.email }}
{{ organization.slug }}
```

CEL does not use braces:

```cel
json.scout.value
author.email
organization.slug
```

Static strings in CEL string fields must be quoted inside the CEL expression:

```json
{
  "channel": "\"C0123456789\""
}
```

Wrong:

```json
{
  "channel": "C0123456789"
}
```

The wrong form is parsed as a variable lookup.

## Liquid Loop Limits

Workflow Liquid validation requires bounded loops for unbounded roots. If a
loop iterates over `json.*`, `trigger.*`, `author.*`, or `organization.*`, add
`limit:N`:

```liquid
{% for s in json.items limit:20 %}
- {{ s.name }}
{% endfor %}
```

The validator rejects unbounded loops over those roots with
`LQ_FOR_LIMIT_REQUIRED`. Loops directly over `items` are already bounded by the
input, in either execution variant, but adding an explicit limit is still a good
default when output could grow large.

## Per-Item Context Example

After a `zip` with labels `["scout", "account"]`, downstream per-item context
can look like:

```json
{
  "json": {
    "scout": {
      "type": "string",
      "value": "Sample AI-generated response.",
      "usage": {
        "prompt_tokens": 128,
        "completion_tokens": 64
      }
    },
    "account": {
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
    },
    "index": 0
  },
  "items": [
    {
      "scout": {
        "type": "string",
        "value": "Sample AI-generated response."
      }
    }
  ],
  "ports": [
    [
      {
        "scout": {
          "type": "string",
          "value": "Sample AI-generated response."
        }
      }
    ]
  ],
  "trigger": {
    "systemEventType": "MANUAL",
    "timestamp": "2025-01-01T00:00:00.000Z"
  },
  "author": {
    "firstName": "Alex",
    "lastName": "Rivera",
    "title": "Account Executive",
    "email": "alex@example.com",
    "phoneNumber": "+1 (555) 000-0100"
  },
  "organization": {
    "name": "Acme Corp",
    "slug": "acme-corp",
    "domain": "acme.com",
    "domains": ["acme.com", "acme.org"]
  }
}
```

Liquid:

```liquid
Scout summary: {{ json.scout.value }}
Input count: {{ items.size }}
Author: {{ author.firstName }} {{ author.lastName }}
```

CEL:

```cel
json.scout.value
```

## Batch Context Example

For batch nodes:

```json
{
  "items": [
    {
      "name": "Alpha"
    }
  ],
  "ports": [
    [
      {
        "name": "Alpha"
      }
    ],
    [
      {
        "context": "Shared"
      }
    ]
  ],
  "trigger": {
    "systemEventType": "MANUAL"
  }
}
```

Liquid:

```liquid
Processing {{ items.size }} records.
```

CEL:

```cel
items
ports[1][0]
```

## Trigger Context

Manual:

```json
{
  "systemEventType": "MANUAL",
  "organizationId": 1,
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

Scheduled:

```json
{
  "systemEventType": "SCHEDULED",
  "organizationId": 1,
  "scheduleId": "schedule_sample",
  "cronExpression": "0 0 13 * * 1-5",
  "timezone": "America/Los_Angeles",
  "fireAtUtc": "2025-01-01T21:00:00.000Z"
}
```

Meeting ended:

```json
{
  "systemEventType": "MEETING_ENDED",
  "organizationId": 1,
  "meetingPlanId": "8af5ce83-625f-4a52-9d23-34e88c075a40"
}
```

Deal-room meeting events include `dealRoomId`. Meeting start bucket events
include `meetingPlanId`, `occurrenceId`, `occursAtUtc`, `fireAtUtc`, and
`offsetMinutes`. Company and CRM-stage events carry company or deal-room ids
and request metadata.

Scheduled runs do not include meeting data unless the workflow creates it with
an upstream node.

## Common Traps

- `json.value` is valid after an AI node, but not after a `zip` unless one of
  the labeled inputs contains `value`.
- `json.meeting.*` is valid after Load Meeting, not after a scheduled trigger.
- `items` is always the input-port-0 array. In per-item nodes, `json` is the
  current item while `items` remains the full port-0 input.
- `ports[0]` is an array, not the first item. Use `ports[0][0]` for the first
  item on input port 0.
- Runtime presence does not override authoring validation: Liquid `ports`
  currently fails the server analyzer even though the executor supplies it.
