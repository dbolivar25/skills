# Present need and continuing ownership

Use before adding a dependency, abstraction, feature surface, service, integration, or
process whose lifetime cost matters. Separate the protected outcome from the machinery
proposed to achieve it. Check current-system evidence and compare deletion, reuse,
configuration, documentation, or a narrower sufficient change. Apply only the matching
patterns below.

Generated code is cheap to produce, not cheap to own. Price concepts, interfaces, data,
operations, verification, organizational ownership, and irreversibility. Prefer the
smallest move that owns the real invariant; accept a larger shape when present evidence
earns it. Restraint must not obstruct confirmed user pain, security/compliance obligations,
or explicit product judgment. Respect accepted tradeoffs and do not silently substitute
a materially different authorized result.

Return the recommendation with checked evidence, material ownership costs, the smallest
sufficient alternative, and what new evidence would change the judgment. Use a short
comparison suited to the task rather than a universal gate or status form. Obtain facts
that are available; keep answer-changing unknowns explicit. A recommendation does not
create authority to block or reopen an owner choice.

Watch for austerity theater (less code treated as inherently good), the build-cost
fallacy, authority laundering, speculative generality, and silent scope changes.

## Matching proposal patterns

Read only the matching pattern. These tests sharpen the necessity check; they
do not replace current-system evidence.

### Dependency

Ask what makes the current stack incapable or prohibitively expensive. Assess current evidence about its
configuration, platform features, and narrower guarantees first; obtain missing comparisons when accessible and keep remaining gaps precise. Price updates,
security, transitive code, runtime behavior, failure, and diagnosis.

### Abstraction

Ask what repeated pain or unstable coupling it removes. Prefer an inline first
use. Abstract for multiple real callers, a stable domain concept, or a smaller
interface. Imaginable reuse alone is insufficient. Price vocabulary, indirection, extension
points, and caller migration.

### Feature surface

Ask which current user outcome fails without it. Find the smallest resolving
slice. Settings, customization, dashboards, automation, and generalization need
independent evidence. Price states, permissions, failures, support, analytics,
documentation, and compatibility.

### Service or integration

Ask which guarantee requires the new boundary and whether the existing system
can supply it. Price deployment, credentials, network failure, rate limits,
retries, observability, data ownership, incident response, and exit cost.

### Agent-generated implementation

Separate what the agent proved from what it produced. Require local integration
evidence, reviewable reasoning, applicable security checks, and removal of
unnecessary surface. Price comprehension, review, debugging, maintenance, and
assumptions trapped in the generating conversation.

### Process or workflow

Ask what recurring failure it prevents. Assess evidence for an owner, checklist, or existing
tool setting before durable statuses, reports, meetings, automations, or
handoffs; propose a bounded comparison when that evidence is absent. Price attention, training, exceptions, stale state, enforcement, and
repair.

### Complexity lenses

Use only the lenses that expose a material commitment:

- **Conceptual:** domain concepts, states, flags, or branching rules.
- **Interface:** APIs, schemas, callbacks, permissions, or public contracts.
- **Data:** storage, migration, retention, privacy, backfills, or consistency.
- **Operational:** services, jobs, deploy steps, alerts, and failure recovery.
- **Verification:** tests, security checks, rollout proof, and monitoring.
- **Organizational:** ownership, training, support, documentation, and reviewer
  knowledge.

## Explaining a recommendation

Use after the comparison supports a recommendation. Preserve the outcome, explain the
mechanism, and state what evidence would reopen the decision.

### Direct recommendation

```md
I agree with the outcome, but the current evidence proves <present need>, not
<larger design>. I recommend <smallest sufficient move> because <specific
ownership cost>. We should reopen <larger design> if <concrete signal> becomes
true.
```

### Agent or junior-produced evidence

```md
The research changes the facts we should consider, but it does not decide the
system tradeoff by itself. I verified <facts> against <local sources>. They
support <decision>; <missing evidence or ownership cost> keeps them from
supporting <larger conclusion>.
```

Do not discount evidence because of who found it. Separate observations,
assumptions, and conclusion. Observations need provenance from the system that
would carry the change; return missing verification as an evidence need.

For “easy to build,” name the lasting ownership cost. For “we may need it,” name
the trigger and cost of waiting. Build speed and hypothetical reuse are not
evidence of necessity.

### Accepting the larger proposal

```md
The proposal earns its complexity because <present evidence> requires
<specific guarantee>, and the smaller alternatives cannot provide it. We
should proceed with <safeguards and verification> and revisit the design if
<reversal condition> occurs.
```

### Durable decision record

When the decision must survive the conversation, propose a record containing the protected outcome,
evidence, accepted or rejected shape, material ownership costs, smallest move,
reopen trigger, and verification.
