# Proposal patterns

Read only the matching pattern. These tests sharpen the necessity check; they
do not replace current-system evidence.

## Dependency

Ask what makes the current stack incapable or prohibitively expensive. Test its
configuration, platform features, and narrower guarantees first. Price updates,
security, transitive code, runtime behavior, failure, and diagnosis.

## Abstraction

Ask what repeated pain or unstable coupling it removes. Prefer an inline first
use. Abstract for multiple real callers, a stable domain concept, or a smaller
interface—not imaginable reuse. Price vocabulary, indirection, extension
points, and caller migration.

## Feature surface

Ask which current user outcome fails without it. Find the smallest resolving
slice. Settings, customization, dashboards, automation, and generalization need
independent evidence. Price states, permissions, failures, support, analytics,
documentation, and compatibility.

## Service or integration

Ask which guarantee requires the new boundary and whether the existing system
can supply it. Price deployment, credentials, network failure, rate limits,
retries, observability, data ownership, incident response, and exit cost.

## Agent-generated implementation

Separate what the agent proved from what it produced. Require local integration
evidence, reviewable reasoning, applicable security checks, and removal of
unnecessary surface. Price comprehension, review, debugging, maintenance, and
assumptions trapped in the generating conversation.

## Process or workflow

Ask what recurring failure it prevents. Test an owner, checklist, or existing
tool setting before durable statuses, reports, meetings, automations, or
handoffs. Price attention, training, exceptions, stale state, enforcement, and
repair.

## Complexity lenses

Use only the lenses that expose a material commitment:

- **Conceptual:** domain concepts, states, flags, or branching rules.
- **Interface:** APIs, schemas, callbacks, permissions, or public contracts.
- **Data:** storage, migration, retention, privacy, backfills, or consistency.
- **Operational:** services, jobs, deploy steps, alerts, and failure recovery.
- **Verification:** tests, security checks, rollout proof, and monitoring.
- **Organizational:** ownership, training, support, documentation, and reviewer
  knowledge.
