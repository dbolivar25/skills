# Engineering consolidation: ownership and preservation

The accepted design in [consolidation.md](consolidation.md) replaces six packages
with two owners. This map covers those changes only; the parent task owns caller,
catalog and invocation-case migration. Diagnosis, restraint and domain modeling
remain independent judgments.

## New ownership

| Original function | New authoritative home | Preserved entry, demand and exit |
| --- | --- | --- |
| coding-standards: eleven principles | software-engineering/references/standards.md | TypeScript changes trigger a full semantic sweep. Every principle is applicable with evidence or inapplicable; blocked obligations retain claim, blocker, risk and remaining check. |
| codebase-design: vocabulary, deep-module judgment, deletion test | software-engineering/references/module-design.md | Interface/ownership/design questions in any language. Effective interface includes invariants, order, errors, configuration and performance; leverage is not a lines ratio. Internal seams stay private. |
| codebase-design/DEEPENING: four dependency categories | software-engineering/references/dependency-seams.md | In-process, local-substitutable, remote-owned and true-external dependencies determine placement and adapter strategy. Stand-ins do not establish the real implementation's contracts. |
| codebase-design/DESIGN-IT-TWICE: design diversity | software-engineering/branches/design-alternatives.md | Chosen interface problem, user-facing frame, at least three independent agent briefs with different constraints, five-part outputs, sequential comparison and recommendation. Report unavailable agent independence instead of claiming it. |
| coding-standards testing law + tdd/tests + tdd/mocking + DEEPENING test replacement | software-engineering/references/testing-evidence.md | Tests observe the owning contract through production seams, with independent oracles and controlled nondeterminism. Real implementations establish their own claims. Preserve unique regressions before retiring tests. |
| tdd: agreed interface/behavior plan, tracer bullet and RGR | software-engineering/branches/test-first.md | Selected test-first work only; carry existing approval. One failing behavior and minimal implementation per cycle; green before finishing. No horizontal bulk-test phase. |
| tdd/refactoring + simplify | software-engineering/branches/finishing.md | One method for green refactoring, verified implementation and standalone code/comment clarity. State edit/findings mode; preserve behavior/contracts and existing scope. |
| improve-codebase-architecture: scope, evidence inventory, ownership candidates, ranking | architecture/branches/scan.md | Explicit TypeScript scan; reads/searches only. Candidate boundary and evidence halo differ. All five categories and all eleven principles accounted for; governing-source discovery and every governing read required. At most five or zero candidates. |
| improve-codebase-architecture: result and selected handoff | architecture/references/scan-result.md and branches/scan.md | Full card and coverage summary preserved. Scan stops at selection; selected brief carries all gathered constraints/invariants/paths. Brief does not itself select specification. |
| tech-spec: direct context or grill-first selection | architecture/branches/spec.md | Sufficient context goes directly to spec without a scan. Inspect discoverable facts; grill unresolved decisions with dependency-frontier rounds. Durable docs use domain-modeling only when requested. |
| tech-spec: alternative comparison and typed end-to-end handoff | architecture/branches/spec.md and references/spec-shape.md | One coverage map accounts for all new/changed/deleted contracts and behavior, every affected flow, each file owner and vertical test slices. Design only; inline unless a file is requested. |

## Distinctions retained inside shared owners

- A shared standard is not a selected workflow. Ordinary TypeScript work applies
  standards without starting TDD or a finishing pass before verification.
- General design and finishing remain language-independent. TypeScript law does
  not become a requirement for another language; the architecture scan retains
  its original TypeScript scope.
- Interface comparison and architectural specification both compare designs,
  but the former's parallel divergent briefs are a selected method. Spec requires
  materially different alternatives without silently invoking that separate
  agent method.
- A test-first plan in a spec is not authority to execute it. A candidate ranking
  is not authority to specify it. A specification is not implementation authority.
- Standalone comment clarity can enter finishing directly. A read-only review
  receives findings; an approved code change can receive edits within that scope.

## Detailed preservation checks

### Standards and design

Checked all eleven numbered principles against the original. Principles 1–9 and
11 retain their substantive obligations. Principle 10 delegates testing policy to
its single evidence owner, while retaining its numbered applicability obligation.
Domain/application/adapter module responsibilities, pure core/effectful shell,
unknown inputs and process hops, error algebra and cancellation, decision proof
surface, resource/concurrency ownership, retries/outbox, safe telemetry, strict
TypeScript and public-export documentation remain present.

The design rewrite co-locates terminology and distinctions instead of repeating
them as glossary, relationships and rejected framings. Dependency-input and
returned-value examples retain the testability contrast. The four dependency
categories, two-justified-adapter discipline, private internal seams and deletion
test survive. Essential complexity is not traded for fewer lines.

### Testing and finishing

The combined testing reference retains independent-oracle versus repeated
calculation, observable checkout versus collaborator patching, retrievability
versus durable-storage observations, recording adapters, production seams,
controlled time/randomness/IDs/cancellation, property and table-driven tests,
risk-proportionate evidence, migration-path proof and substitute limitations.
It preserves module-patching/spying exclusions and the unique-regression rule.

The finishing branch retains short/active/precise prose, one term per concept,
context-sensitive names, non-obvious comments, public-doc obligations, significant
functions first, concept-based decomposition and consolidation, existing utility
reuse, derivable-state removal, meaningful refactoring candidates, conversation-
independent code and removal of compatibility for unshipped branch-only shapes.

### Architecture

Checked the five inventory categories, equivalent-group conditions, distinct-shape
traces, test inspection/absence, evidence halo/exclusions, every numbered-standard
accounting, source-unverifiable gap bar, deletion test, single ranking universe,
leverage tie-breakers, root-friction merging and five-or-zero result. Scope discovery
retains recent commits; governing discovery retains ancestors, context maps and
equivalents, decision indexes, repository docs and ADR collections, and inspection
of every governing source found. Scan retains all command/mutation restrictions.

Spec coverage retains every new/changed/deleted domain value, refined type, state,
input/output, request/response, function/class/module/API contract, expected error,
adapter, protocol/persistence projection and runtime codec. Every affected behavior
gets the full entrypoint-to-side-effect-and-response path, with current/proposed
and reachable failure/retry/cancellation/transaction/idempotency/observability/
authorization/runtime-hop flow. Every contract and step maps to a file or explicit
unknown; every public behavior/invariant/important failure/changed seam or boundary
gets a vertical test slice or reason for omission. The shorter outline changes
presentation, not this coverage obligation.

## Checks performed and limits

- Local Markdown link targets in both new owners resolve.
- Standards headings are exactly 1 through 11, in order.
- New owners contain no references to retired package paths.
- Architecture carries `disable-model-invocation: true` and Codex
  `policy.allow_implicit_invocation: false`; software-engineering remains implicit.
- Source-level routing walkthroughs: ordinary TypeScript work → standards only;
  explicit TDD plus comment cleanup → RGR then finishing; read-only code-comment
  review → findings; explicit scan → ranking/stop; sufficient-context spec → spec
  directly; missing-context spec → inspection/grilling; selected candidate alone
  → brief without an unselected spec.

These are source and structural checks, not model invocation probes or runtime
proof. The parent task owns whole-suite caller migration, executable consumers,
independent review, invocation tests and catalog reload. No scripts/runtime changes,
commits or pushes are part of this slice.
