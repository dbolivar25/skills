# Architecture and discovery: source investigation

Read at `abd2767`: the complete main documents for engineering-restraint, domain-modeling, codebase-design, improve-codebase-architecture, tech-spec, grilling, and tdd; both codebase-design references; both domain-modeling formats; and both engineering-restraint references. Cross-references were searched across tracked skill Markdown. Relevant historical changes were inspected in `2895660`, `cb782ac`, and `74f219e`. This is a partial investigation, not a refactoring proposal or behavioral validation.

## Distinct work the sources ask for

| Skill | Intended change in the agent's work | Details carrying that change |
| --- | --- | --- |
| engineering-restraint | Judge whether proposed machinery earns its continuing ownership cost while protecting the requested outcome. | Separating outcome from addition prevents evaluating construction as success. Present-system comparisons prevent hypothetical reuse from supplying the justification. Pattern-specific costs make ownership concrete: a service brings credentials and recovery; a process brings training and stale state. Reject/defer/reshape/accept distinguish different next moves. The larger design can be justified; austerity is explicitly a failure. |
| domain-modeling | Actively resolve the meaning of domain concepts against examples and code, then preserve what was settled. | Glossary conflicts and invented edge cases expose ambiguous boundaries. Checking code distinguishes desired behavior from implemented behavior. Immediate glossary capture preserves decisions as they crystallize. Context maps carry scope when terms differ across domains. The three-part ADR threshold and tiny ADR format jointly preserve difficult decisions without making every conversation produce documents. |
| codebase-design | Compare module shapes using depth as caller leverage and locality of change. | Interface includes ordering, failures, configuration, invariants, and performance, not only signatures. Seam and adapter name different things. Deletion asks whether complexity returns to callers. Internal seams explain how a deep external interface can contain replaceable implementation parts. Dependency categories propose different testing arrangements. Distinct briefs for alternative designs force different interfaces rather than renamed versions of one idea. |
| improve-codebase-architecture | Discover and rank evidenced ownership moves within a bounded read-only scan. | Candidate boundary versus evidence halo allows looking outward without silently expanding recommendations. Coverage categories and representative call traces constrain selective inspection. Local cleanup versus architectural friction prevents inflated candidates. Ranking across the whole boundary prevents one recommendation per checklist item. Zero candidates is valid. Selection precedes a separate spec handoff. |
| tech-spec | Turn established context into a typed architecture handoff another engineer can implement. | Typed contracts and end-to-end call stacks carry precision that a prose summary cannot. Alternatives differ by actual shape before selection. Changed/deleted behavior, failure paths, and runtime concerns prevent describing only the new happy path. Mapping contracts to files exposes missing ownership. Vertical red-green slices carry an intended implementation learning sequence. Unknowns remain questions; design does not silently become implementation. |
| grilling | Reach shared understanding by resolving consequential decisions in dependency order. | The frontier contains only questions whose prerequisites are settled. Independent questions can share a round; dependent questions wait. Recommendations include reasons. Discoverable facts remain the agent's work. Durable artifacts are conditional on the docs branch. Confirmation establishes the interview's stopping point. |

These purposes are distinguishable even where vocabulary overlaps. That does not prove that each needs a separate package. Package placement remains open until other consumers and realistic combined tasks have been examined.

## What history establishes

In `2895660`, the architecture scan gained recent-change inspection, the explicit reason that future changes are needed to realize deepening's value, a required shared vocabulary source, and the deletion test. Its detailed coverage obligations already existed and remained. This supports treating both coverage and the added design tests as deliberate parts of the method. It does not prove their current effectiveness or that their present wording is best.

The same commit deliberately changed grilling from exactly one question per turn to dependency-aware rounds. The later `74f219e` description explicitly preserved rounds. By contrast, tech-spec's grilling branch still tells the agent to ask one question at a time.

`cb782ac` removed engineering-restraint's pointer to a retired entry point. It supplies no evidence for removing the necessity gate or merging it with design judgment.

## A concrete accidental-complexity candidate

The caller at [tech-spec/SKILL.md](../../tech-spec/SKILL.md) delegates the interview to [grilling/SKILL.md](../../grilling/SKILL.md), then restates an older interaction rule that conflicts with it. The history explains the mismatch: the method changed, while the caller's duplicate instruction survived.

The intended work to preserve is dependency-aware discovery that yields enough context for a spec. A candidate repair would make the caller specify the needed discovery result while the named method supplies question sequencing. That is a proposal to investigate, not an applied change. A contrasting task should include both independent questions and a downstream question; it must preserve batching of the former and deferral of the latter.

## Tensions that need more evidence

- Codebase-design defines seams as places where behavior can vary and allows internal seams; tdd summarizes a seam as a public observable boundary. Determine whether this is a harmless task-specific narrowing or an actual source of test-placement confusion.
- Codebase-design's two-adapter rule makes variation the test for a seam. Tech-spec also admits seams justified by invariants, locality, testing, or a real boundary. Distinguish a useful interface from an injected port before deciding whether these instructions conflict.
- Deepening says old unit tests become waste once interface tests exist. Its preservation purpose is observable behavior with lower coupling, but the categorical deletion wording does not itself establish equivalent regression coverage. Trace testing law and exercise a case with an old unique regression before proposing a revision.
- The architecture scan's private evidence map and concise external cards do different work. Reducing the returned report need not reduce inspection coverage. A generic instruction to avoid ceremony could accidentally remove the latter.
- Domain-modeling repeats the ADR eligibility test in the main document and the conditional format reference. This may support correct local use of the reference or create drift. Determine how those documents are actually reached before classifying the repetition.
- Design It Twice prescribes three or more parallel agents and distinct briefs. Design diversity is the stated purpose; whether the exact execution mechanism is necessary remains untested. Reading this branch for audit does not invoke its design workflow.

## Contrasting cases for later evaluation

1. A broad scan with five coverage categories but genuine friction in only one: inspect the whole boundary, then return one candidate.
2. A bounded scan whose crucial runtime owner lives outside it: use the evidence halo without recommending unrelated work there.
3. A deep module containing a production dependency and a unique low-level regression: preserve evidence while judging seam placement and test retirement separately.
4. Two independent product decisions and a third dependent on one answer: use grilling's frontier rule through the tech-spec caller.
5. A domain term resolved mid-interview, then contradicted by an implementation: distinguish the glossary decision, the code discrepancy, and any qualifying ADR.
6. A larger addition whose present guarantees cannot be delivered by narrower options: restraint should accept the earned complexity.

These are evaluation designs, not completed tests or evidence that the original or a replacement works. No skill files have changed.
