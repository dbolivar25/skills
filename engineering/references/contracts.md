# Contracts, TypeScript, and effect ownership

Use this method when a change or assessment raises a real question about domain values,
contracts, state, failures, effects, or TypeScript soundness. Inspect the semantic change,
current/proposed code, callers, repository precedent, and actual check receipts. Apply
only the concerns the behavior reaches; this is not an all-concerns checklist or a reason
to introduce machinery for absent concerns. General design does not impose TypeScript on
another language.

Correctness should live in precise values, owned effects, useful interfaces, and evidence
at the seam that owns the behavior. A missing execution receipt is an evidence gap, not a
claim that code passed or failed. Use [modules](modules.md) for unsettled ownership and
[testing](testing.md) to judge what a receipt establishes.

## Repository before invention

Read existing contracts, modules, adapters, tests, dependencies, and governing domain
language before proposing a library, pattern, module, or seam. Make the smallest coherent
improvement. Speculative abstraction, migration, rollout, or compatibility machinery
needs a current constraint or explicit user intent. Preserve sound local conventions;
contain an incompatible boundary convention at its seam rather than copying it inward.

## Parse boundary data into values

Treat external, serialized, persisted, framework-shaped, and configuration values as
unknown input. A parser returns the refined value that flows inward. Checking an input
and continuing with the original value is not parsing; a cast does not make decoded data
safe. Keep protocol and persistence DTOs as explicit boundary projections.

Each serialization or process hop is a new boundary. Cross it with explicit serializable
DTOs and required context, then parse again. At the composition root, parse environment
and configuration once and translate raw platform capabilities and bindings into typed
configuration and narrow application capabilities. Do not scatter raw environment access
through policy.

## Domain values and legal states

A **Domain Module** can be a pure, type-centric abstract data type in the OCaml tradition.
This useful shape centers one primary domain type or tightly related family and
co-locates supporting types,
invariants, parsers, smart constructors, combinators, predicates, legal transitions,
domain projections, test generators, and formatting when those belong to the concept.
It owns invariants in application code. Callers use operations rather than reimplementing
checks or branding with casts; persistence mirrors applicable invariants with constraints.
Preserve another sound repository shape when it owns the same responsibilities; the
purpose is invariant ownership rather than a mandated class or module convention.

Use precise operation inputs and required values, pushing optionality toward the
boundary. Branded values or immutable value classes earn their cost when they prevent
realistic misuse. Closed variants and state machines can replace contradictory flags.
Use exhaustive case analysis for closed variants; a default branch must not mask a newly
added case. Test terms and distinctions against concrete examples using [domain](domain.md).

## Expected failures and defects

Identify the failures a caller must handle and make them explicit in the operation's
contract. Preserve the repository's sound result, exception, or framework convention;
choose a representation that lets callers distinguish outcomes and own recovery. Do not
hide a recoverable outcome merely because an underlying API throws. Avoid imposing one
global error algebra on unrelated boundaries.

For a typed result boundary, a precise union of custom errors can carry stable literal
discriminants, safe structured fields, and an optional `unknown` cause:

```typescript
// Illustrative shape. Use the project's Result and failure conventions.
class PaymentDeclined extends Error {
  readonly _tag = "PaymentDeclined";
  constructor(readonly reason: "expired" | "insufficient-funds") {
    super("Payment declined");
  }
}
type SubmitFailure = OrderNotFound | PaymentDeclined;
```

Catch thrown `unknown` where it can be classified, recovered from, or translated. Detect
cancellation before interpreting an exception as failure. Keep original causes internally
when useful, but expose or record only explicit safe projections. Defects should fail
visibly rather than masquerading as ordinary business outcomes. Document a boundary's
exception contract when a framework or protocol requires it.

## Put policy and translation with their owners

An **Application Service Module** owns one cohesive use case or capability, applying
application policy and sequencing effects through narrow application-owned ports. An
**Adapter Module** owns translation and technology mechanics: it either translates an
external request/event into an application call and projects the result, or implements
an application port using a framework, protocol, store, runtime, or third party.

A functional core and imperative shell is useful when it puts domain decisions in pure
modules and effects in application services/adapters. Raw external types stay at the
composition root or inside adapters. An interface should hide meaningful invariants,
policy, sequencing, or translation. Globals, mega-interfaces, and pass-through wrappers
usually increase caller knowledge instead. See [modules](modules.md) for depth and seams.

## Keep the proof surface explicit

A unit's **proof surface** is its behaviorally distinct paths and condition interactions.
Cyclomatic complexity, cognitive complexity, and state-space growth are signals of proof
burden, not targets to game. Respect repository checks; change numerical thresholds only
for a concrete repository-wide need.

When the proof surface grows, look for a missing domain concept: a closed variant, legal
transition, named policy, predicate, or decision table. Extract concepts, not branches.
Moving conditionals into helpers without reducing possible states or clarifying ownership
does not simplify behavior. Keep intrinsically coupled rules together when splitting
would hide the invariant. Match evidence to boundary cases and meaningful interactions;
closed rules may benefit from exhaustive/table tests and general invariants from property
tests.

## Own effects and lifetimes

Acquire a resource in the scope owning its lifetime and release it on every exit. Every
promise must be awaited, returned, collected, or transferred to explicit detached-work
machinery. Detached work needs an owner for lifetime, cancellation, rejection handling,
and observability. Avoid resources or I/O acquired at module import time.

When overlap helps, bound fan-out, propagate caller cancellation, await child work, and
keep it inside the owning scope. A helper returning early while spawned work keeps running
changes the lifetime contract even if the happy-path result looks right.

## Retried mutations and concurrency

Where retries or concurrent transitions are real, make commands idempotent and guard
transitions atomically. Avoid holding database transactions open across network calls.
Use a transactional outbox or equivalent when commit and delivery must agree. Persist
coordination state when progress must survive crashes or redelivery; durable workflow
machinery earns its cost only when that need exists. Do not expand an accepted simple
seam into speculative race, fingerprint, or timeout machinery.

## Observe without exposing

Keep sensitive data safe at ingress and unwrap only where needed. Redaction-safe types
may help when values travel through many operations. Secrets must not enter errors, logs,
traces, metrics, snapshots, or diagnostic strings. Record stable fields needed for the
operation, dependency, state, retries, safe correlation identifiers, and error tags;
avoid serializing arbitrary payloads, thrown values, or environments. Preserve reporting
hooks and keep telemetry out of domain decisions.

## Preserve TypeScript's checks

Keep compiler strictness and precise readonly contracts. Avoid `any`, non-null assertions,
unchecked casts, hidden mutation, and accidental thenables. When an escape hatch is
unavoidable, localize it behind a precise interface and state the runtime invariant that
makes it sound, using `SAFETY:` when that is the repository convention. Do not weaken
project-wide checks for a local change.

Document public behavior where the types alone cannot express important invariants,
ordering, effects, performance, or expected failure handling. Follow local documentation
conventions rather than requiring JSDoc for every directly exported symbol.

## Check the result

Use [testing](testing.md) for independent oracles, controlled nondeterminism, real seams,
and substitute limits. Claims about persistence include the actual migration path when
it affects the stored contract. Finish with the applicable obligations supported by code
and observations, and exact remaining gaps. Do not print an accounting of every possible
concern on a tiny change.
