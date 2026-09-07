# Leverage Points

Donella Meadows, 1997/1999. 12 places to intervene in a system, in increasing order of effectiveness. Most policy interventions happen at the bottom of the list (parameters); the actually transformative ones happen at the top (paradigms) — and are the most resisted.

## When to use

- Civic / org / institutional change
- Diagnosing why interventions fail (almost always at lower level than problem)
- Strategic critique of policy proposals
- "Where in this system should I push?"

## Don't use when

- Single-creator creative work (framework needs multi-actor systems with feedback loops)
- Short-term tactical decisions
- Team of <5 (use simpler tools)

## The 12 levels (least → most powerful)

**12. Constants, parameters, numbers** — subsidies, taxes, standards, prices. Most policy fights happen here. Rarely change behavior.

**11. Sizes of buffers** — stabilizing stocks relative to flows. Big buffer = stable but inflexible.

**10. Structure of stocks and flows** — transport networks, supply chains, age structures. Hard to change once built; high leverage in original design.

**9. Lengths of delays** — relative to rate of system change. Delays usually can't be shortened; the leverage is in *slowing the system to match the delays*.

**8. Strength of negative feedback loops** — relative to disturbance corrected against. Strengthen with: preventive medicine, pollution taxes, FOIA, whistleblower protection.

**7. Gain around positive feedback loops** — *Reducing* gain on a positive loop is more leveraged than strengthening the negative loop counter-acting it. Progressive tax weakens "success-to-the-successful" loops directly.

**6. Information flows** — who has access to what. Adding a feedback loop where one didn't exist. (Toxic Release Inventory: pure disclosure dropped emissions 40%.)

**5. Rules** — incentives, punishments, constraints. Constitutions, laws, terms of service. *"If you want to understand the deepest malfunctions of systems, pay attention to the rules, and to who has power over them."*

**4. Power to add, change, evolve, or self-organize** — biological evolution, technical advance, social revolution. Suppressing variety to maintain control is a system crime.

**3. Goals of the system** — what is it *for*? Shareholder return vs employee welfare = different systems with same physical structure. *"Everything further down the list will be twisted to conform to that goal."*

**2. Mindset / paradigm** — unstated assumptions that generate the goals. "Growth is good", "markets are efficient". Hard to change in cultures (generations); change in individuals all at once (a click).

**1. Power to transcend paradigms** — hold any paradigm lightly. The capacity to *switch*. Personal practice, not policy.

## Procedure

1. **Map the system.** Stocks, flows, feedback loops, rules, goals, paradigm.
2. **Locate the problem at a level.** A symptom at level 12 (rising costs) often originates at level 5 (rules permit cost externalization), level 3 (short-term return goal), or level 2 (paradigm assumes infinite resource).
3. **List candidate interventions at 3+ levels.** Be honest about which you can act on.
4. **Order by leverage and feasibility.** The most leveraged intervention is rarely the most feasible.
5. **Note direction risk.** A high-leverage intervention pushed wrong is worse than a low-leverage one pushed right. *"Time after time I've ... discovered that there's already a lot of attention to that point. Everyone is trying very hard to push it IN THE WRONG DIRECTION."*

## Worked example

**System**: 50-person tech company with chronic burnout despite generous benefits.
- Level 12 (PTO): fine, no help.
- Level 8 (negative feedback): weak — burnout invisible until people quit.
- Level 6 (info flows): obscured — managers don't see workload signals.
- Level 5 (rules): implicitly reward overwork.
- Level 3 (goal): "ship features fast."
- Level 2 (paradigm): "engineering output is linearly proportional to hours worked."

Recommendation: combine level-8 (mandatory monthly burnout-explicit 1:1s — feasible) + level-3 (explicit goal change to "build sustainable engineering org" — slow but high-leverage). Skip level 12.

## Anti-slop notes

- Don't list all 12 levels every time. Identify the relevant 2–3 for this problem.
- Don't claim every problem has a paradigm-level solution. Most have rule-level or parameter-level.
- Don't recommend "change the paradigm" as if it were actionable. It usually isn't, on its own.

Source: Meadows, *Places to Intervene in a System* (1997/1999); *Thinking in Systems* (Chelsea Green, 2008). donellameadows.org.

---

# Pattern Languages

Christopher Alexander et al., *A Pattern Language* (1977). 253 patterns for designing buildings, towns, rooms — structured as a generative grammar with explicit cross-references. Spawned the Gang of Four software design patterns (1994) and many domain adaptations.

## Pattern format

A pattern has three parts:
1. **Context** — the situation in which it applies
2. **Problem** — a recurring tension in that context
3. **Solution** — a *generative* principle (not a specific design — capable of many instantiations)

A pattern *language* is a network of patterns at different scales, with explicit links: which patterns *contain* this one, which patterns *complete* it.

## When to use

- Designing physical environments (buildings, rooms, gardens, neighborhoods)
- Designing interactional environments (UX, software architecture)
- Building shared design vocabulary with a team
- Documenting design intuitions for transmission
- Civic / community design

## Don't use when

- You want to break with tradition (patterns are conservative — they encode what has worked)
- Domain has no established practice yet (no patterns to extract)
- Pure conceptual / artistic work
- You'd be implementing patterns literally (collapses generative → rule)

## Selected patterns from Alexander's 253

For texture. Real use means buying or borrowing the book.

- **8. Mosaic of Subcultures** — a region needs distinct subcultures with their own ecology, separated by zones of disuse, not homogenized.
- **53. Main Gateways** — mark every entrance with a substantial visible threshold.
- **60. Accessible Green** — green outdoor space within 3 minutes' walk.
- **105. South-Facing Outdoors** — most-used outdoor space to the south of the building.
- **111. Half-Hidden Garden** — garden right at street is too public; behind house is unused. Place it half-hidden.
- **159. Light on Two Sides of Every Room** — windows on at least two sides. Single-sided rooms are uncomfortable, rarely used.
- **179. Alcoves** — rooms with no place to retreat are unsettling. Build niches, bays, window seats.
- **188. Bed Alcove** — bed in the open is exposed. Build at least a partial enclosure.
- **191. Shape of Indoor Space** — simple, mostly orthogonal; deviate only for clear local reason.
- **230. Radiant Heat** — radiant heat (fireplace, radiator) is qualitatively different from forced air.

The patterns are arguably true and arguably false; what matters is the *form*.

## Procedure

### Using an existing language
1. Identify the relevant scale (region / neighborhood / building / room / detail).
2. Read patterns at and above your scale; note which apply.
3. Compose: apply higher-scale patterns first; let them constrain lower-scale ones.
4. Adapt to your specifics. Patterns are generative, not literal.

### Developing your own language (more useful for software, org, pedagogy)
1. Identify recurring problems in your domain. Look across many cases.
2. Name each (short, memorable, describes the *solution* shape — "Light on Two Sides", not "Insufficient Daylight").
3. State each in: context — problem — solution — therefore: [generative principle] — see also: [related patterns].
4. Map containment relations between patterns.
5. Test by applying to a fresh problem; revise.

## Worked example (software, in Alexander's form)

**Iterator pattern** (Gang of Four, 1994)

*Context*: a collection of objects must be traversable by client code.
*Problem*: client shouldn't need to know the internal structure (array vs tree vs linked list); collection shouldn't have traversal logic scattered across clients.
*Solution*: provide an Iterator object with `next()`, `hasNext()`, `current()` that encapsulates traversal state. Collection produces an Iterator on request.
*Therefore*: separate "what is being traversed" from "how it is traversed."
*See also*: Composite (tree traversal), Visitor (operations during traversal), Factory Method (producing the right Iterator).

## Anti-slop notes

- Bullet-list "design tips" are not patterns. A pattern has context, problem, generative solution, and place in a network.
- Don't generate patterns to seem comprehensive. Real patterns come from many cases.
- Don't apply Alexander's residential patterns to non-residential domains literally.
- Patterns are conservative *and* generative. They don't anti-novelty; they shape novelty.

Source: Alexander et al., *A Pattern Language* (Oxford UP, 1977); *The Timeless Way of Building* (Oxford UP, 1979). For software: Gamma et al., *Design Patterns* (Addison-Wesley, 1994).
