# TRIZ — Theory of Inventive Problem Solving

Core: external steps below are proposals or supplied evidence; the operational caller executes them.


Genrich Altshuller, 1946–. Soviet engineering invention method derived from analysis of hundreds of thousands of patents. 40 inventive principles + contradiction matrix + Ideal Final Result. Used by Samsung, Intel, Boeing, P&G.

## Core principle

Most inventive problems are technical contradictions: improving X degrades Y. The trade-off is usually an artifact of how the system is decomposed, not a fundamental constraint. Solve by identifying the contradiction explicitly, then applying principles that have historically resolved similar contradictions in patent literature.

The **Ideal Final Result**: the desired function performed without the system that performs it (the system has, in some sense, eliminated itself). Use as target.

## When to use

- Engineering / mechanism / device invention
- Measurable parameter conflict (mass/strength, cost/reliability, speed/accuracy)
- You suspect the trade-off is fake
- Group brainstorming with non-arbitrary structure

## Don't use when

- Artistic, social, or expressive problems (TRIZ requires measurable parameters)
- Your "contradiction" is preference, not parameter ("modern but classic" is not TRIZ)
- A textbook fix exists; TRIZ is for inventive problems

## The 40 inventive principles

1. **Segmentation** — divide into independent parts, increase divisibility
2. **Taking out** — extract the disturbing part; separate only what's needed
3. **Local quality** — make different parts have different properties
4. **Asymmetry** — replace symmetrical with asymmetrical
5. **Merging** — bring identical/similar objects closer; parallelize operations
6. **Universality** — one part performs multiple functions
7. **Nested doll** — place objects one inside another (matryoshka)
8. **Anti-weight** — compensate weight by combining with lift / hydro/aerodynamic forces
9. **Preliminary anti-action** — preload with opposite stress
10. **Preliminary action** — perform required action in advance
11. **Beforehand cushioning** — emergency means in advance
12. **Equipotentiality** — change conditions so object need not be raised/lowered
13. **The other way round** — invert action; movable parts fixed and vice versa
14. **Spheroidality / curvature** — replace linear with curved; flat with spherical
15. **Dynamics** — make rigid moveable; let parts shift configuration
16. **Partial or excessive actions** — slightly less or slightly more if 100% is hard
17. **Another dimension** — move 1D→2D→3D; tilt; use the other side
18. **Mechanical vibration** — oscillate, ultrasonics
19. **Periodic action** — periodic instead of continuous; vary frequency; pauses
20. **Continuity of useful action** — eliminate idle running
21. **Skipping** — perform fast through dangerous stages
22. **Blessing in disguise** — use harmful factors to obtain a positive effect
23. **Feedback** — introduce or modify feedback
24. **Intermediary** — use an intermediary article or process
25. **Self-service** — make the object service itself; use waste resources
26. **Copying** — cheap copies instead of fragile/expensive originals
27. **Cheap short-living** — disposable instead of durable
28. **Mechanics substitution** — replace mechanical with sensory (optical, acoustic, EM)
29. **Pneumatics and hydraulics** — replace solid with gas/liquid; inflatable
30. **Flexible shells and thin films** — instead of 3D structures
31. **Porous materials** — make porous; use pores to introduce useful substance
32. **Color changes** — change color or transparency
33. **Homogeneity** — interacting objects from same material
34. **Discarding and recovering** — portions disappear after use; restore consumables
35. **Parameter changes** — physical state, concentration, density, flexibility, temperature
36. **Phase transitions** — exploit phenomena at phase changes
37. **Thermal expansion** — different coefficients of thermal expansion
38. **Strong oxidants** — oxygen-enriched, ozonized
39. **Inert atmosphere** — inert environment or vacuum
40. **Composite materials** — uniform → composite

## Procedure

1. **State the contradiction** in the form: "I want X to improve, but X improvement causes Y to degrade." If you can't state it crisply, you don't yet have a TRIZ problem.
2. **Compare to Ideal Final Result.** What would it look like if the system eliminated itself?
3. **Look up candidate principles.** The contradiction matrix at triz40.com maps (X parameter, Y parameter) → recommended principles. Or scan the 40 above for fits.
4. **Translate principle to mechanism.** A principle is general; the mechanism is specific to your situation.
5. **Compare candidates against IFR.** Pick closest.

## Worked example

**Problem**: fast brew time (under 60s) vs full extraction (typically 4 min).
**Contradiction**: speed vs completeness of extraction.
**Candidate principles**: 1 (Segmentation), 17 (Another dimension), 19 (Periodic action), 35 (Parameter changes).
**Translations**:
- Segmentation: pre-extract concentrates; dilute on demand. (Nespresso.)
- Another dimension: extract under pressure (espresso).
- Periodic action: pulse-extract with pauses (some pour-over).
- Parameter changes: brew at different temperature/pressure (cold brew = low T long time; espresso = high P short time).

**IFR comparison**: closest to "no brewing time" is pre-extracted concentrate (Segmentation). Resolves the contradiction by *separating extraction from delivery in time*.

## Anti-slop notes

- Don't present the 40 principles as a generative checklist — that's SCAMPER. TRIZ's value is the contradiction lens + patent-derived priors.
- Translate principle to mechanism, don't stop at the principle name.
- Don't claim TRIZ where it doesn't apply (artistic, social, preference contradictions).
- Don't invent principles in Altshuller's style.

Tools: triz40.com (interactive matrix). Source: Altshuller, *And Suddenly the Inventor Appeared* (1994).

---

# Biomimicry

Janine Benyus, *Biomimicry* (1997). Evolution has 3.8 billion years of R&D on most physical design problems. Use biological strategies as a library of mechanisms — adapt the *operative principle*, not the metaphor.

## When to use

- Physical design problems with parallels in evolved organisms (locomotion, sensing, adhesion, structure, energy capture, water management, thermal regulation, distribution)
- Materials science problems
- Distributed-systems problems with biological precedents (slime molds, ant colonies, immune systems)
- Sustainability or material-efficiency constraints

## Don't use when

- Software, social, or expressive problems where biological analogy = decoration. "Like a colony" applied to a startup is slop.
- Looking for "natural" answers to normative questions (nature is amoral)
- The biological mechanism isn't actually understood (you need the mechanism, not the headline)
- Manufacturing context can't match biology's ambient-temperature water-based assembly

## Catalog of strong precedents

**Velcro** ← burrs (*Arctium*). Many small barbed mechanical hooks. *Operative principle: many small interlocks, not one strong glue.*

**Shinkansen 500-series train nose** ← kingfisher beak. Tapered shape allows dive from air to water with minimal splash. *Operative principle: gradient-density transition reduces shock at medium-to-fluid interfaces.*

**Lotus effect** ← *Nelumbo* leaves. Self-cleaning via micro-structured wax. *Operative principle: hierarchical micro/nanostructure + low-energy surface = superhydrophobicity.*

**Gecko adhesive** ← gecko foot pads. Millions of setae adhering via van der Waals forces. *Operative principle: many small contact points + flexible substrate = strong reversible adhesion.*

**Termite mound HVAC** ← *Macrotermes* mounds maintain near-constant interior temperature in fluctuating Sahel conditions via passive convection. Mick Pearce's Eastgate Centre, Harare, 1996. *Operative principle: passive convection through engineered geometry.*

**Whale-fin tubercles** ← humpback flipper bumpy leading edges delay stall, reduce drag. Wind-turbine blades, WhalePower. *Operative principle: leading-edge perturbation alters boundary-layer behavior.*

**Slime-mold pathfinding** ← *Physarum polycephalum* solves shortest-path. Tero et al., *Science* 2010, recreated Tokyo rail network. *Operative principle: distributed reinforcement of high-flux paths, dissolution of unused ones.*

**Sharkskin antimicrobial** ← microscopic ribbed denticles prevent bacterial colonization. Sharklet hospital surfaces. *Operative principle: surface microtopology disrupts colonization.*

**Spider silk** ← *Nephila*, *Araneus*. Specific strength higher than steel; toughness higher than Kevlar. Spiber, Bolt Threads. *Operative principle: hierarchical protein assembly under shear-flow control.*

**Mussel adhesive** ← *Mytilus* DOPA-rich proteins stick to wet rocks. Surgical adhesives. *Operative principle: catechol chemistry remains effective in water.*

**Mycelial structure** ← fungus binds particles into rigid forms. Ecovative MycoComposite packaging. *Operative principle: cellulose-bonding via biological agents → biodegradable rigid structure.*

## Procedure

1. **State the problem as a function.** "I need to attach this reversibly, holding 50 kg." "I need to extract water from desert air." "I need to route packets without central coordination."
2. **Look up biological strategies.** AskNature.org is the curated database, indexed by function.
3. **Identify the operative principle.** Compress the strategy to its mechanism. Not "geckos can stick to walls" — "many small van der Waals contacts via flexible setae provide strong reversible adhesion."
4. **Match to your problem.** Be honest about what's missing — biological systems often work because of context (water, ambient temperature) your engineering context lacks.
5. **Prototype with the principle, not the metaphor.** Don't build a "robot gecko." Build something that uses the operative principle in your form factor and material set.

## Anti-slop notes

- "[X] inspired by nature" without specifics = marketing. Real biomimicry names the organism, the mechanism, and the operative principle.
- Avoid "like a colony / swarm / ecosystem" for non-physical problems. Slop magnet.
- Don't assume "natural" = "good". Parasitism, deception, exploitation are well-engineered.
- Resist the spiritual register. Biomimicry is engineering; the slop variant is greeting-card.

Source: Benyus, *Biomimicry* (Morrow, 1997). AskNature.org.
