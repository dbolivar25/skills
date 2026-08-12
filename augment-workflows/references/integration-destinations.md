# Integration destinations

Use this reference when choosing, changing, preserving, or verifying a
destination for Publish to Slack or Publish to Teams. Read provider-native IDs
from the integration directory. Keep database configuration IDs out of workflow
documents.

Request `format=json` when you need structured output. Copy IDs from resource
fields, then follow the returned `resourceUri` and child-resource links. Those
links preserve the scope required by later reads.

## Access and credential subject

Only Admin and Creator user identities can read the integration directory.
Other roles receive a native not-found response.

Slack workspaces belong to the organization. Report the organization as the
Slack destination scope.

Teams connections belong to the Agent owner:

- For a new Agent owned by the current author, omit `memberUri`. The directory
  uses the current author.
- For an existing Agent, read its exact resource and pass `owner.memberUri` to
  the Teams root.
- Admins may select any eligible Admin or Creator in the same organization.
  Creators may select only themselves.
- Follow every returned Teams URI. Each descendant keeps the same
  `memberUri` context.

Use the returned `credentialSubject` and safe owner name or email when reporting
which Teams connection the node will use. A numeric member or user ID is not a
valid substitute for the canonical `memberUri`.

## Slack discovery

Expect these MCP resource template names: `integrations`,
`slack-integrations`, `slack-workspace`, `slack-channels`, and `slack-channel`.
Stop if the active server does not advertise the template needed for the next
read.

Read these resources in order:

```text
decisionsite://organizations/{organizationSlug}/integrations{?format}
decisionsite://organizations/{organizationSlug}/integrations/slack{?format}
decisionsite://organizations/{organizationSlug}/integrations/slack/{workspaceId}{?format}
decisionsite://organizations/{organizationSlug}/integrations/slack/{workspaceId}/channels{?format}
decisionsite://organizations/{organizationSlug}/integrations/slack/{workspaceId}/channels/{channelId}{?format}
```

Workspace entries include `workspaceId`, a display label, and `state`.
`available` means the workspace has a credential the runtime can use.
Repair the connection before a send when `state` is `reconnect_required`.
Channel entries include `channelId`, `name`, `topic`, `purpose`, `isPrivate`,
and an exact `resourceUri`.

Read the exact channel resource before writing or releasing a new destination.
A successful read returns `state: "verified"` and the two values to store:

```json
{
  "workspaceId": "T0123456789",
  "channelId": "C0123456789"
}
```

Both values are literal strings.

## Teams discovery

Expect these MCP resource template names: `teams-integrations`, `teams-tenant`,
`teams-teams`, `teams-team`, `teams-channels`, and `teams-channel`. Stop if the
active server does not advertise the template needed for the next read.

Use these templates. Pass `owner.memberUri` for an existing Agent and omit
`memberUri` for a new Agent owned by the current author:

```text
decisionsite://organizations/{organizationSlug}/integrations/teams{?format,memberUri}
decisionsite://organizations/{organizationSlug}/integrations/teams/{tenantId}{?format,memberUri}
decisionsite://organizations/{organizationSlug}/integrations/teams/{tenantId}/teams{?format,memberUri}
decisionsite://organizations/{organizationSlug}/integrations/teams/{tenantId}/teams/{teamId}{?format,memberUri}
decisionsite://organizations/{organizationSlug}/integrations/teams/{tenantId}/teams/{teamId}/channels{?format,memberUri}
decisionsite://organizations/{organizationSlug}/integrations/teams/{tenantId}/teams/{teamId}/channels/{channelId}{?format,memberUri}
```

Start from the Teams root with the intended credential subject. For an existing
Agent, use its `owner.memberUri`; the unscoped Teams root always selects the
current author.

Tenant entries include `tenantId`, a display label, and `state`. `available`
means that Agent owner has a usable token. `reconnect_required` means that owner
must reconnect before a send. Team and channel entries supply provider-native
IDs, labels, and exact resource links.

Read the exact channel resource before writing or releasing a new destination.
A successful read returns `state: "verified"` and the three values to store:

```json
{
  "tenantId": "00000000-0000-0000-0000-000000000000",
  "teamId": "00000000-0000-0000-0000-000000000000",
  "channelId": "19:channel-id@thread.tacv2"
}
```

All three values are literal strings. The node contract does not accept CEL or
Liquid expressions for them.

## Saved destinations and read failures

Verify a saved destination by reading its exact channel URI from the stored
provider-native IDs. For Teams, include the Agent owner's canonical `memberUri`.
Do this even when the destination does not appear in a list. Treat list
omission as inconclusive.

Interpret the exact read without inventing a cause:

- `state: "verified"` proves the selected credential subject can resolve the
  target now.
- A native not-found means the resource is unreadable or unavailable in the
  current authorized context. Do not claim whether access, ownership,
  connection state, or target removal caused it.
- Any other provider or resource error leaves verification unknown.

Keep saved IDs unchanged when verification is unknown. Report the failed read
and stop before release. For a native not-found, preserve the current draft and
ask the user to reconnect or choose a verified destination instead of replacing
the IDs without approval.
