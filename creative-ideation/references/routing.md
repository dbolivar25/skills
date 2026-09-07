# Choose the method

This is the routing owner. Extract phase (generate, expand, select, unblock,
subvert, refine, synthesize), domain (text, object, artifact, system, self,
research, product), and specificity (none, domain, project, concrete problem).

## Precedence

1. Honor an explicitly named method. If its prerequisites are absent, return the
   missing input; do not silently substitute or pretend to apply it.
2. A request for a method recommendation returns 2–3 candidates with one-line
   reasons and an owner choice, not generated ideas.
3. Weird/strange/surprising/less-obvious mood selects Lateral Provocations or
   Pataphysics. High-slop terrain (AI/startup ideas, habit trackers, productivity,
   wellness, fitness, food or travel apps) selects those methods and rejects five
   obvious candidates. Keep the actual domain constraints.
4. Otherwise use phase, then domain. A method's prerequisites and exclusions
   still apply. If two paths remain genuinely ambiguous, return one question
   that distinguishes them. Choose by the user's phrasing, not exotic appeal.

## Route and method index

Read only the selected named method in a paired file. Related methods share
storage; they retain different inputs, operations and results.

| Situation | Method |
| --- | --- |
| Blank page, no domain; no matching route | [Constraint dispatch](full-prompt-library.md): General; otherwise closest domain section |
| Physical maker or software artifact needs a starting constraint; participatory system | [Constraint dispatch](full-prompt-library.md): Physical, Software or Social section respectively |
| Base idea needs systematic variations | [SCAMPER](methods/constraints.md#scamper) |
| Formal text, poetry or constrained writing | [OuLiPo](methods/constraints.md#oulipo) |
| Idea too safe; break a frame procedurally | [Lateral Provocations](methods/provocation.md#lateral-provocations) |
| Specify an impossible solution or fictional artifact precisely | [Pataphysics](methods/provocation.md#pataphysics) |
| Existing media to remix; chance, cut-up or détournement | [Chance and Remix](methods/remix.md#chance-and-remix) |
| Familiar text, essay or performance needs fresh perception | [Defamiliarization](methods/remix.md#defamiliarization) |
| Engineering invention has a parameter conflict | [TRIZ](methods/invention.md#triz--theory-of-inventive-problem-solving) |
| Physical function has an understood biological analogue | [Biomimicry](methods/invention.md#biomimicry) |
| Accumulated assumptions may no longer hold | [First Principles](methods/problem-solving.md#first-principles) |
| Attack a known mathematical, algorithmic or formal problem | [Pólya](methods/problem-solving.md#pólyas-heuristics) |
| Civic, organizational or institutional intervention | [Leverage Points](methods/systems.md#leverage-points) |
| Software architecture or design from recurring problems | [Pattern Languages](methods/systems.md#pattern-languages) |
| Choose projects or pressure-test a plan for failure | [Premortem and Inversion](methods/selection.md#premortem-and-inversion) |
| Choose a research question, compare upside, seek elegance | [Compression Progress](methods/selection.md#compression-progress) |
| Stuck with material; music, visual art or playful disruption | [Oblique Strategies](methods/practice.md#oblique-strategies) |
| Refine non-text work; sustain a practice; frustration after repeated ideation | [Creative Discipline](methods/practice.md#creative-discipline) |
| Unfamiliar territory, career, life direction, site-specific work | [Dérive and Mapping](methods/derive-and-mapping.md#dérive-and-mapping) |
| Many ideas fast; AI directions converge structurally | [Volume Generation](methods/volume-generation.md): Crazy 8s, brainwriting, Young; **Seeded Range** for convergence |
| Product/service with actual customer evidence | [Jobs to Be Done](methods/jobs-to-be-done.md#jobs-to-be-done) |
| Synthesize notes, interviews or observations bottom-up | [Affinity Diagrams](methods/affinity-diagrams.md#affinity-diagrams) |
| Import structure from a remote domain | [Analogy and Blending](methods/analogy-and-blending.md#analogy-and-blending) |
| Narrative with material: spine, stalled draft or conflict arc that flattens it | [Story Skeletons](methods/story-skeletons.md#story-skeletons) |

## Discriminate close routes

Oblique is a poetic prompt; Lateral is procedural provocation. OuLiPo imposes a
rule; Chance remixes by chance. TRIZ uses patterns; First Principles questions
inherited patterns. Meadows locates intervention; Alexander shapes a design.
Compression chooses a question; Pólya attacks it. Defamiliarization disrupts the
familiar; analogy imports structure. Premortem mitigates failure; Pataphysics
explores imaginary exceptions. Crazy 8s can start blank; SCAMPER needs a base.
Dérive explores territory; Affinity synthesizes observations already acquired.

Mood: playful → OuLiPo/Oblique; personal → Discipline/Dérive; critical/political →
Defamiliarization/Pataphysics/Chance; useful → TRIZ/JTBD; rigorous → Pólya/First
Principles/Compression. Fit and prerequisites outrank mood.

## Exceptions and stacks

One method normally. Two require a named reason and an explicit sequence or
separate jobs: domain framing plus provocation (e.g. JTBD + Lateral for weird
product ideas); generation then selection (Crazy 8s → premortem); exploration then
synthesis (Dérive → Affinity); principle then mechanism (TRIZ → Biomimicry).
Conflicting domain/mood signals can justify such a pair; do not stack automatically
when one method already fits. Never stack three to mask poor selection.

Essay can pair Defamiliarization with Compression; songwriting Oblique with
Chance; algorithms Pólya with First Principles; organizations Meadows with
Alexander; career Dérive with Compression. These are alternatives or justified
pairs, not mandatory compound routes. New ventures can combine the constraint
“solve your own itch” with JTBD only when customer evidence is available.

Repeat request → switch method. Frustration → Discipline rather than more ideas.
A request to test whether to start → premortem, without treating it as a veto.
Do not use SCAMPER without a base, TRIZ for expressive/social questions, Meadows
for a single creator, or JTBD as market logic for art, civic life or pure research.
Story Skeletons needs material; it cannot supply a plot from nothing.

Excluded defaults: Hero's Journey/Save the Cat/Three-Act/Story Circle formulas;
Design Thinking as franchise; mind maps/Six Hats/fishbone as generators;
Disrupt-X/blue-ocean/lean-startup positioning; generic LLM brainstorming. Specific
traditions, actual generative operations and the user's constraints own the work.
