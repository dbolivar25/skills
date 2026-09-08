# Lateral Provocations

Core: external steps below are proposals or supplied evidence; the operational caller executes them.


Edward de Bono, 1967–. The PO operator and five provocation moves for breaking pattern lock-in. PO is a linguistic marker that flags a statement as a deliberate provocation, not a claim — to be taken seriously even when implausible.

## When to use

- Idea is too safe / too obvious
- Variations are all minor rephrasings of the same core
- Suspect a hidden assumption is constraining the search
- Group with low psychological safety needs permission to say wrong things

## Don't use when

- Disciplined development of an existing idea (provocations interrupt)
- Engineering safety / legal / medical (provocations are exploratory)
- Group will dismiss the provocation rather than engage

## The five operators

**1. Escape (negation).** Take something normally true of the system; negate it.
- Po: restaurants do not serve food.
- Po: code review does not happen before merge.
- Po: the meeting has no agenda.

**2. Reversal.** Reverse a relationship.
- Po: the patient operates on the surgeon.
- Po: the listener composes the song.
- Po: the readers write the book.

**3. Exaggeration.** Push a parameter to extreme.
- Po: the meeting has 1000 attendees.
- Po: the novel has one sentence.
- Po: the company has one customer.

**4. Distortion.** Change order, location, or relationship of components.
- Po: customers pay before they're born.
- Po: the recipe lists ingredients after the cooking instructions.
- Po: revenue arrives the year before expenses.

**5. Wishful thinking.** State an impossible outcome.
- Po: the medication cures before the patient is sick.
- Po: the software ships without bugs.
- Po: the painting paints itself.

## Random-word technique

1. Pick a random noun (dictionary at random page; or list of 1000 nouns + random index).
2. List 5 connections between the random word and your problem, however tenuous.
3. Use the strongest.

Example. Problem: my CLI is hard to discover. Random word: "lighthouse".
- Lighthouses are visible from far; my CLI's affordances are not visible at all.
- Lighthouses are lit at the right time; my CLI's help is always on, never contextual.
- Lighthouses signal *danger*; my CLI doesn't signal when an action is irreversible. ← strongest
- Lighthouse keepers signal back; mine has no two-way contact.
- Lighthouses are passive; the ship approaches them.

Result: the CLI should signal danger when about to do something irreversible. Concrete, useful, not obvious from inside the original frame.

## Procedure

### Single-PO session
1. State the problem.
2. Pick an operator.
3. Generate a PO statement.
4. List 5 consequences if the PO statement were true.
5. Pick the strongest consequence.
6. Translate into a real proposal.

### Stacked operators
Two operators on the same problem. Intersection often more interesting than either alone. Example: Escape ("po: meetings don't have agendas") + Reversal ("po: attendees set the agenda after the meeting") → an asynchronous "what we ended up discussing" doc, written collectively after the fact.

## Anti-slop notes

- Generic provocations ("po: things are different") are placeholders, not provocations. Specify what's changed and how.
- Don't fake "random" word selection. "Innovation" or "synergy" defeats the operator. Use actual random.
- Don't end at the provocation. The PO statement is means; an actionable proposal is the end.
- Take the provocation seriously for at least 5 minutes. Dismissing it defeats the operation.
- Pick the operator deliberately. Different operators surface different things: Escape → purpose; Reversal → relationship; Exaggeration → parameter; Distortion → sequencing; Wishful Thinking → constraint.

Source: de Bono, *Lateral Thinking* (Harper, 1970); *Po: Beyond Yes and No* (Penguin, 1972).

---

# Pataphysics

Alfred Jarry, *Gestes et opinions du docteur Faustroll, pataphysicien* (1898/1911). The science of imaginary solutions and particular cases.

Where physics is general laws applied to common cases, **pataphysics studies particular cases and imaginary solutions** — the *one-offs*, the *exceptions*, the *imagined entities whose virtuality* (potential being) can be described as lawfully as actual objects.

The OuLiPo was founded as a sub-committee of the Collège de 'Pataphysique. Marcel Duchamp, Eugène Ionesco, Boris Vian, Italo Calvino, Umberto Eco were members. Borges, Lem, Calvino, Roussel are pataphysical writers in this sense.

## When to use

- Push past plausibility; specify the impossible thing in detail
- Parodic / satirical work that needs rigorous form
- Producing fictional artifacts (encyclopedias of non-existent civilizations, manuals for non-existent devices, reviews of non-existent books)
- Stuck and the realistic solutions feel exhausted — specify the impossible solution
- Highlighting that a "natural" framing is actually a choice

## Don't use when

- You need an actually-implementable proposal on the first pass
- Audience requires sincerity (drifts toward irony)
- Avoiding harder analysis (slop variant: pataphysical-flavored dodge)
- You don't actually have anything to say (form requires content)

## Operating moves

### Specify an imaginary object
1. Pick the object. A device, organism, institution, place, work, person — something that cannot exist.
2. Specify its **lineaments** in concrete material detail. What is it made of? How does it operate? What are its parts?
3. Identify its laws — internal consistency rules. What can it do? What can't it?
4. Describe consequences if it existed.
5. **Stop short of asking whether it could exist.** That question is not pataphysical.

### Exception-finding
1. State the general rule in your domain.
2. Find the actually-existing case that doesn't fit.
3. Describe it on its own terms — not as deviation, but as what it is.
4. Resist generalizing back into a modified rule.
5. The particular case is the result.

### Pataphysical fiction
1. Adopt the form of a serious genre (encyclopedia, manual, technical paper, museum catalog, book review).
2. Apply the form rigorously to a non-existent subject.
3. Don't break frame. Don't wink.

## Worked example

**Problem**: file synchronization software. Realistic solutions all involve some compromise on conflict resolution.

**Pataphysical specification**: a file system in which two simultaneous edits to the same file produce a *third* file containing both edits as "ghosts" — versions visible to and editable by readers but not committed until a quorum of readers reads them and chooses one. The file exists in superposition until observation.

**Lineaments**: ghost-files have an "observation count"; below threshold they are interactive but not committed; above, they collapse to chosen version.

**Consequences**: editing a popular file is fast (quorum collapses quickly); editing an obscure file is slow (no quorum). The file system has *audience-dependent commit semantics*.

The specification is impossible. But *audience-dependent commit semantics*, surfaced by the pataphysical move, is in fact a useful concept with plausible implementations.

## Anti-slop notes

- Whimsical incoherence is not pataphysics. "What if cows could fly" without the cow's wing-loading and lift coefficient = sloppy fantasy.
- Don't generate fake-Borges or fake-Calvino. Their work is grounded in deep specifics. Generated "in the style of" is decorative.
- The dry, committed register matters. Comedic SF is not pataphysics.
- Don't walk back to "of course this is just a thought experiment" at the end. That undoes the operation.

Sources: Jarry, *Gestes et opinions du docteur Faustroll, pataphysicien* (Fasquelle, 1911); Borges, *Ficciones* (1944); Lem, *A Perfect Vacuum* (1971).
