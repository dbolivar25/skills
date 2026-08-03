# Steward Runtime Contract

The runtime persists mission judgment. Collaboration tools perform the work.

## Interface

```text
open({root, slug, intent, events, presence}) -> Transition
advance({work, events, presence}) -> Transition
inspect({work, presence}) -> Snapshot
```

```text
Transition = {work, revision, next}
Snapshot = {work, revision, intent, state, next}
next = UNDERSTAND | PLAN | EXECUTE | REVIEW | ASK | WAIT | STOP | DONE
presence = PRESENT | AWAY
```

`open` creates a Record from one Intent and an ordered seed batch. The seed must
yield a non-`STOP` state. `advance` applies an ordered event batch. Both calls
validate the entire batch before writing. `inspect` writes nothing.

The canonical state is:

```text
<root>/.steward/<slug>/record.jsonl
```

The runtime replays this append-only Record to derive State. Do not hand-edit it
or maintain a second state file.

## Intent

```json
{
  "aim": "Observe the owner-requested behavior.",
  "why": "A locally correct result is insufficient when it misses the product intent.",
  "rules": [
    {
      "id": "intent-fidelity",
      "version": "1",
      "kind": "BEHAVIOR",
      "when": "A phase result is reviewed.",
      "expect": "The result advances the current Intent without entering a Non-goal.",
      "owner": "AGENT",
      "check": "Compare the result with Aim, Why, Rules, Non-goals, and Done."
    }
  ],
  "nonGoals": ["Do not preserve an obsolete interface."],
  "done": [
    {
      "id": "landed",
      "expect": "The intended behavior is observed.",
      "receipt": "outcome.landed"
    }
  ]
}
```

All fields are required. `rules` and `nonGoals` may be empty; `done` may not.
Rule kinds are `MUST`, `PREFER`, `AUTHORITY`, and `BEHAVIOR`. Rule owners are
`AGENT`, `OWNER`, `EXTERNAL`, and `SYSTEM`. Rule IDs and Done IDs are unique
within their lists. Change a Rule version when its meaning changes.

Rules guide judgment; they do not encode runtime actions. Use
[`../rules/default-rules.json`](../rules/default-rules.json) only for rules that
actually apply. Put request-specific behavior specifications in Intent so the
reviewer can test conduct that would otherwise remain in the owner's head.

Done is an AND of receipt obligations. A live receipt meets each Done item with
the same receipt type. Completion is derived, never declared.

## State

`state` contains:

```text
asks      active owner or external questions
backings  active evidence, owner, or policy support
claims    supported or unsupported premises
done      met and open Done item IDs
receipts  active observations
reviews   adversarial judgments on reports
work      phase responsibilities and their lifecycle
```

Work dependencies are local readiness constraints inside State. They are not a
separately managed plan.

## Work

Add work with:

```json
{
  "id": "W-UNDERSTAND",
  "phase": "UNDERSTAND",
  "text": "Ground the intended behavior in current reality.",
  "needsClaims": [],
  "needsWork": []
}
```

`phase` is `UNDERSTAND`, `PLAN`, or `EXECUTE`. A work item is `AVAILABLE` when
all needed Claims are `BACKED` and all needed Work is `DONE`; otherwise it is
`BLOCKED`.

The lifecycle is:

```text
BLOCKED -> AVAILABLE -> ACTIVE -> PAUSED -> ACTIVE
                              -> REVIEW -> DONE
                                        -> ACTIVE when review requires revision
unfinished work -> STOPPED
```

Start, pause, resume, report, and stop with these payloads:

```json
{"id":"W-UNDERSTAND","actor":"source-reader"}
{"id":"W-UNDERSTAND","actor":"source-reader","reason":"Awaiting owner context."}
{"id":"W-UNDERSTAND","actor":"replacement-reader","reason":"Fresh context is now available."}
{"id":"W-UNDERSTAND","report":"RP-01","actor":"source-reader","result":"Current source contradicts the ticket.","evidence":["source path"]}
{"id":"W-UNDERSTAND","reason":"The governing Intent changed."}
```

These are the payloads for `work.started`, `work.paused`, `work.resumed`,
`work.reported`, and `work.stopped`, in order. Reporting is legal only for the
active actor. Resume may retain or replace the actor. Stopping unfinished work
is permanent; add a new work item if the mission later needs a replacement.

## Adversarial Review

Every report enters `REVIEW`. A different actor must submit:

```json
{
  "id": "R-01",
  "report": "RP-01",
  "reviewer": "understanding-critic",
  "status": "AT_RISK",
  "evidence": ["The ticket is stale and current behavior was not checked."],
  "confidence": "HIGH"
}
```

Review status is `ADHERES`, `AT_RISK`, `VIOLATED`, or `UNCERTAIN`; confidence is
`LOW`, `MEDIUM`, or `HIGH`. `ADHERES` accepts the work as `DONE`. Every other
status returns the same phase responsibility for revision. Record a
`work.resumed` event before that actor reports again with a new report ID.

A reviewer judges a report. It cannot mutate Intent, schedule work, or perform
the correction through `review.added`.

## Support

A Backing payload is:

```json
{"id":"B-SOURCE","kind":"EVIDENCE","text":"Current source shows the behavior."}
```

`kind` is `EVIDENCE`, `OWNER`, or `POLICY`. Withdraw only an active Backing:

```json
{"id":"B-SOURCE","reason":"The source changed."}
```

A Claim has alternative support sets. The outer list is OR; each inner list is
AND:

```json
{
  "id": "C-MEANING",
  "text": "This product meaning governs execution.",
  "supports": [
    ["backing:B-SOURCE"],
    ["backing:B-OWNER", "claim:C-COMPATIBLE"]
  ]
}
```

References are `backing:<id>` or `claim:<id>` and must already exist. A Claim is
`BACKED` when any complete support set is live. Withdrawing Backing stops every
unfinished dependent branch that no longer has live support. Completed work is
historical evidence, not an automatically live premise; use Claims wherever
future authority depends on a result.

## Asks

Open an owner or external question with:

```json
{
  "id": "A-MEANING",
  "question": "Which product meaning should govern?",
  "owner": "OWNER",
  "why": "Evidence cannot choose the product promise.",
  "blocksWork": ["W-PLAN"]
}
```

Answer an active Ask with:

```json
{"id":"A-MEANING","answer":"Use navigation semantics.","evidence":["owner answer"]}
```

An answer releases the blocked work. If the answer governs downstream work,
also add an `OWNER` Backing and a Claim that cites it.

## Intent Revisions And Receipts

Revise Intent explicitly:

```json
{
  "intent": {"aim":"...","why":"...","rules":[],"nonGoals":[],"done":[{"id":"landed","expect":"...","receipt":"outcome.landed"}]},
  "reason": "The owner clarified the desired behavior.",
  "evidence": ["owner clarification"]
}
```

Apply `intent.revised` in the same batch as any affected `work.stopped`, new
work, or `receipt.withdrawn` events. The runtime cannot infer which old work or
proof remains authoritative under the new Intent.

Add or withdraw receipts with:

```json
{"id":"RC-LOCAL","type":"verification.local","evidence":["focused test passed"]}
{"id":"RC-LOCAL","reason":"The tested revision was replaced."}
```

Receipt IDs are immutable. Withdrawal makes the receipt inactive and can reopen
`DONE`.

## Next Selection

The runtime returns the first applicable responsibility:

1. an open Ask when the owner is `PRESENT`;
2. independent `REVIEW` of an unreviewed report;
3. revision of a report whose review did not `ADHERE`;
4. the first unblocked `AVAILABLE` work item in Record order;
5. an Ask when no safe work remains;
6. `WAIT` for active or paused collaborators;
7. `DONE` when every Done item has a live receipt;
8. `STOP` when nothing can advance honestly.

`PRESENT` and `AWAY` change when an Ask surfaces, never who owns the judgment.

## CLI

```bash
python3 scripts/steward.py open --root <root> --slug <slug> --intent-json '<json>' --events-json '<json-array>' --presence PRESENT --json
python3 scripts/steward.py advance <work-dir> --events-json '<json-array>' --presence AWAY --json
python3 scripts/steward.py inspect <work-dir> --presence PRESENT --json
```

`open` refuses an existing slug. IDs cannot be reused within an entity kind.
`open` and `advance` validate event shape, references, actors, and legal
transitions before appending. Use `inspect` whenever work resumes or team
composition changes.
