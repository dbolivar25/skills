# Work through a changed assumption

An owner wants notification preferences to survive a service restart. In this
fictional example, the agent has already reproduced the loss and confirmed the
owner's desired behavior, so the first responsibility is to plan the fix.

The first plan relies on a settings store. During execution, the agent discovers
that the store is temporary. Steward records the failed premise, stops dependent
work, and returns to understanding without losing the owner's purpose.

The commands below exercise the real CLI in a temporary directory. All actors,
reports, evidence, and reviews are **fictional inputs** for the demonstration.
They do not execute a service change or dispatch reviewers. In real work, record
these events only after the named actors have performed the work and review.

Run the shell blocks in order, in one Bash or Zsh session, starting from the
Steward skill directory. JSON is passed inline; no helper or extra dependency is
needed. The displayed `Next` lines are excerpts from the readable CLI output.

## 1. Open from a grounded request

```bash
steward_cli="$PWD/scripts/steward.py"
steward_demo_root="$(mktemp -d)"
steward_demo_work="$steward_demo_root/.steward/preferences"
python3 "$steward_cli" open --root "$steward_demo_root" --slug preferences \
  --intent-json '{
    "aim":"Notification preferences survive a service restart.",
    "why":"Users should not have to restore their preferences after maintenance.",
    "rules":[],
    "nonGoals":["Redesign notification delivery."],
    "done":[{"id":"restart","expect":"A saved preference remains after restart in the requested environment.","receipt":"outcome.restart"}]
  }' \
  --events-json '[
    {"type":"work.added","payload":{"id":"W-PLAN","phase":"PLAN","text":"Choose a persistence change and restart check.","needsClaims":[],"needsWork":[]}}
  ]'
```

```text
Next: PLAN: W-PLAN
```

Intent preserves the desired outcome independently of the storage choice. Done
requires an observation after restart; completing an implementation alone will
not satisfy it.

## 2. Report the plan, then record its independent review

The fictional planner traces the save path and proposes using the settings
store. A separate reviewer accepts the plan based on the available evidence.
Record the report first:

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"work.started","payload":{"id":"W-PLAN","actor":"planner"}},
  {"type":"work.reported","payload":{"id":"W-PLAN","report":"RP-PLAN","actor":"planner","result":"Save preferences in the settings store and verify them after restart.","evidence":["Fictional source trace: the settings adapter is documented as persistent."]}}
]'
```

```text
Next: REVIEW: W-PLAN (RP-PLAN)
```

After the separate review, record acceptance and the support on which execution
will depend. A **Backing** records the supporting source; a **Claim** names the
premise that execution needs to remain true.

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"review.added","payload":{"id":"R-PLAN","report":"RP-PLAN","reviewer":"plan-reviewer","status":"ADHERES","evidence":["Fictional review: the plan fits the requested behavior, documented adapter, and restart verification; target configuration is still unobserved."],"confidence":"MEDIUM"}},
  {"type":"backing.added","payload":{"id":"B-STORE","kind":"EVIDENCE","text":"Fictional adapter documentation says settings survive restart."}},
  {"type":"claim.added","payload":{"id":"C-STORE","text":"The configured settings store survives restart.","supports":[["backing:B-STORE"]]}},
  {"type":"work.added","payload":{"id":"W-SAVE","phase":"EXECUTE","text":"Save preferences through the settings store and test restart.","needsClaims":["C-STORE"],"needsWork":["W-PLAN"]}}
]'
```

```text
Next: EXECUTE: W-SAVE
```

The plan has overreached: adapter documentation alone does not establish the
target configuration. The fictional review missed that gap. The runtime can
validate the recorded links but cannot detect this judgment error; the next
observation will contradict the premise.

## 3. Stop work whose support failed

During execution, the fictional implementer finds that the target configuration
uses an in-memory settings adapter. Withdraw the source as support for this
premise and add a responsibility to establish the actual persistence boundary.

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"work.started","payload":{"id":"W-SAVE","actor":"implementer"}},
  {"type":"backing.withdrawn","payload":{"id":"B-STORE","reason":"Fictional target configuration uses an in-memory adapter; the documentation does not support persistence here."}},
  {"type":"work.added","payload":{"id":"W-STORE","phase":"UNDERSTAND","text":"Establish which storage boundary survives restart in the target environment.","needsClaims":[],"needsWork":[]}}
]'
python3 "$steward_cli" inspect "$steward_demo_work"
```

The inspection includes:

```text
- [UNBACKED] C-STORE: The configured settings store survives restart.
- [STOPPED] W-SAVE EXECUTE @implementer: Save preferences through the settings store and test restart.
Next: UNDERSTAND: W-STORE
```

`W-PLAN` remains completed history, but it cannot keep `C-STORE` supported.
`W-SAVE` is permanently stopped. A new item will carry the revised execution;
Intent and its restart evidence requirement remain intact.

## 4. Establish a replacement boundary

The fictional investigator traces an existing preferences repository to durable
storage and verifies it with a restart probe. After the report and separate
review, record the new support and a bounded execution item.

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"work.started","payload":{"id":"W-STORE","actor":"investigator"}},
  {"type":"work.reported","payload":{"id":"W-STORE","report":"RP-STORE","actor":"investigator","result":"The existing preferences repository uses durable storage in the target configuration.","evidence":["Fictional source and configuration trace, plus successful repository restart probe."]}}
]'
```

```text
Next: REVIEW: W-STORE (RP-STORE)
```

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"review.added","payload":{"id":"R-STORE","report":"RP-STORE","reviewer":"storage-reviewer","status":"ADHERES","evidence":["Fictional independent review confirms owner meaning, configuration trace, restart evidence, and sufficient understanding for the bounded save-path change."],"confidence":"HIGH"}},
  {"type":"backing.added","payload":{"id":"B-DURABLE","kind":"EVIDENCE","text":"Fictional configuration trace and restart probe establish durable preferences storage."}},
  {"type":"claim.added","payload":{"id":"C-DURABLE","text":"The preferences repository survives restart in the target environment.","supports":[["backing:B-DURABLE"]]}},
  {"type":"work.added","payload":{"id":"W-PERSIST","phase":"EXECUTE","text":"Use the preferences repository for saves and observe the requested restart behavior.","needsClaims":["C-DURABLE"],"needsWork":["W-STORE"]}}
]'
```

```text
Next: EXECUTE: W-PERSIST
```

A new PLAN item is unnecessary here: the accepted understanding supports this
small change directly. Add one when the new evidence leaves a consequential
choice, dependency, or verification approach unresolved.

## 5. Complete against the requested observation

In the fictional task, the authorized change is made and delivered, the saved
preference survives restart in the requested environment, and a separate reviewer
checks the result. Record the report before its review and completion receipt:

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"work.started","payload":{"id":"W-PERSIST","actor":"implementer"}},
  {"type":"work.reported","payload":{"id":"W-PERSIST","report":"RP-PERSIST","actor":"implementer","result":"The delivered save-path change preserves preferences after restart.","evidence":["Fictional focused regression passed, delivery confirmed, and saved preference observed after restart in the requested environment."]}}
]'
```

```text
Next: REVIEW: W-PERSIST (RP-PERSIST)
```

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"review.added","payload":{"id":"R-PERSIST","report":"RP-PERSIST","reviewer":"result-reviewer","status":"ADHERES","evidence":["Fictional independent review checks the bounded change, correctness, codebase and request fit, applicable behavior, delivery evidence, and observed restart outcome."],"confidence":"HIGH"}},
  {"type":"receipt.added","payload":{"id":"RC-RESTART","type":"outcome.restart","evidence":["Fictional observation: the saved preference remains after restart in the requested environment."]}}
]'
```

```text
Next: DONE
```

For this Intent, one outcome receipt meets the sole Done obligation. A different
Intent can require separate receipts for verification, delivery, and outcome.
A real completion claim needs real evidence for each obligation.

## Variation: the completion evidence becomes invalid

Continue the example by learning that the restart observation used the wrong
environment. Withdraw the receipt and add the missing verification work.

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"receipt.withdrawn","payload":{"id":"RC-RESTART","reason":"Fictional correction: the restart observation used the wrong environment."}},
  {"type":"work.added","payload":{"id":"W-VERIFY","phase":"EXECUTE","text":"Observe restart behavior in the environment the owner requested.","needsClaims":["C-DURABLE"],"needsWork":["W-PERSIST"]}}
]'
```

```text
Next: EXECUTE: W-VERIFY
```

The completed implementation remains history. Completion is open again because
the outcome evidence no longer meets Intent. Any replacement receipt needs a new
ID; withdrawn receipts are immutable.

## Variation: the owner must settle a choice

Suppose the fictional investigator now finds two plausible target environments
and the existing request does not distinguish them. Open an Ask against the
available verification item. If it were already active, pause it first.

```bash
python3 "$steward_cli" advance "$steward_demo_work" --events-json '[
  {"type":"ask.opened","payload":{"id":"A-TARGET","question":"Which of the two target environments should supply the restart observation?","owner":"OWNER","why":"The current request does not distinguish the two environments; evidence cannot choose the intended acceptance target.","blocksWork":["W-VERIFY"]}}
]'
```

```text
Next: ASK: A-TARGET (OWNER)
```

Use the [owner-decision method](../SKILL.md#bring-decisions-to-their-owners) to
prepare the real question. After the owner answers, record `ask.answered` with
their evidence. If their answer governs future work, also record an `OWNER`
Backing and a Claim. Revise Intent and affected work together if its meaning has
changed. Until then, this demonstration correctly remains at `ASK`.

The temporary record stays at `$steward_demo_work` for inspection. It contains
only this fictional demonstration, not evidence of completed product work.
