# OuLiPo

*Ouvroir de Littérature Potentielle*, founded 1960 by Raymond Queneau and François Le Lionnais. Members: Perec, Calvino, Roubaud, Mathews, Garréta. "Rats who construct the labyrinth from which they plan to escape" (Queneau). Constraint as generative engine.

## When to use

- Writing — fiction, poetry, copy, lyrics, anything text
- Writing feels samey; constraint suppresses your default sentence shape
- Generating titles, names, taglines (short forms benefit most)
- Software constraint by analogy (code golf, no-dependency, single-file)

## Don't use when

- You want the prose invisible (constraints are usually visible in the result)
- Blocked because you don't know what to say (constraint gives you *how*, not *what*)
- The constraint will compensate for not having a subject (Perec's *La Disparition* works because the missing E is the subject)

## The constraints

### Lipogram
Exclude one or more letters. Perec's *La Disparition* (1969): 300 pages without E. The previous sentence is a lipogram in B, F, J, K, Q, V, Y, Z.

### Univocalism
Only one vowel letter. (Letter, not phoneme — "born" and "cot" both qualify in English.)

### Snowball / Rhopalism
Each line one word; each word one letter longer than the previous.

### S+7 (or N+7)
Replace every noun with the 7th noun after it in a dictionary. "Call me Ishmael. Some years ago..." → "Call me Ishmael. Some yes-men ago..."

Generalizes: V+7, Adj+7, N+k for any k.

### Stile
Each new sentence stems from the last word/phrase of the previous: "I descend the long ladder brings me to the ground floor is spacious..."

### Palindrome
Sonnets, paragraphs, or longer constructed palindromically. Perec wrote a 5,566-letter palindrome.

### Prisoner's constraint (Macao)
Lipogram excluding letters with ascenders or descenders (b, d, f, g, h, j, k, l, p, q, t, y).

### Pilish
Word lengths follow the digits of π: "How I want a drink, alcoholic of course, after the heavy lectures involving quantum mechanics."

### Sonnet machine (Queneau)
Fixed structure with interchangeable line-strips. Queneau's *Cent Mille Milliards de Poèmes* (1961): 10 sonnets cut into 14 strips each → 10^14 combinations.

### Antonymy
Replace each word with its antonym. Reveals what the text is *about* by what it would mean if reversed.

## Procedure

### For openings
1. Pick a constraint that fits your domain.
2. Write 200 words under it.
3. Note what the constraint forced you to say.
4. Decide: keep the constraint for the whole piece, or use the opening then unconstrain.

### For unblocking
Apply S+7 to the stuck paragraph. The dislocation surfaces what the original was about.

### Software analogues
- Lipogram → no `e` in identifiers
- N+7 → replace each function with the 7th in a library; describe what the result does
- Snowball → each commit one line longer
- Univocalism → variable names use one vowel
- Pilish → comment word counts follow π

## Anti-slop notes

- Constrained-without-subject = exercise, not work. *La Disparition* works because the missing E *is* the subject.
- Apply strictly. Half-constrained is worse than unconstrained.
- Don't fake "Calvino-style" surface qualities. Use the actual constraints.
- Acrostics are not OuLiPo (centuries older). Use a real constraint or call an acrostic an acrostic.

---

# SCAMPER

Bob Eberle, 1971, building on Alex Osborn's brainstorming checklist (1953). Seven systematic transformations of an existing thing.

## When to use

- You have a base idea and want variations cheaply
- Group brainstorming with mixed expertise
- Forcing breadth past the first instinct
- Teaching ideation

## Don't use when

- Blank page — SCAMPER amplifies a base; doesn't generate from nothing
- You need depth in one direction (SCAMPER produces breadth)
- The problem is analyzing an existing system, not modifying it

## The seven operators

**S — Substitute.** Replace a component, material, person, place, or process. *(Steel→aluminum, scheduled meetings→async docs, human→model, recipe ingredient swap.)*

**C — Combine.** Merge two things. Functions, parts, audiences, formats. *(Phone+camera+GPS→smartphone. Memoir+cookbook→food memoir. Programmer+linguist→compiler designer.)*

**A — Adapt.** Borrow from another field. *(Velcro from burrs. Toyota's just-in-time from supermarket restocking. Graphic novel from cinematic technique.)*

**M — Modify (or Magnify / Minify).** Change a property — scale, frequency, intensity, color, weight, shape. *(Twitter that posts once a year. Novel as one page. Same content as comic, song, sculpture.)*

**P — Put to other uses.** Use the existing thing for a different purpose. *(Aspirin: pain reliever → stroke prevention. Blockchain: cryptocurrency → supply chain. Sweater: garment → kiln cushioning.)*

**E — Eliminate.** Remove a component. **Usually the highest-leverage cell.** *(Eliminate UI: CLI/API as product. Eliminate menu: omakase, single-dish restaurant. Eliminate explanation: Eno's *Music for Airports*.)*

**R — Reverse / Rearrange.** Invert relationships, change sequence, turn inside out. *(Priceline reverses seller/buyer. Wikipedia reverses expert/amateur. *Memento* reverses time order.)*

## Procedure

1. State the base in one precise sentence.
2. Run all seven operators. **Don't skip cells.** The cells you don't want to run are usually where the surprise is.
3. Read the seven. Most will be slop; one or two will be interesting; one might be surprising.
4. Take the surprising one and elaborate.
5. Discard the rest.

## Worked example

**Base**: a web app that tracks reading progress across books.

- S: track your *boredom*, not progress — when did you stop and why?
- C: tracker + bookstore (already done; weak)
- A: gym-app habit tracking (slop; reading is not fitness)
- M: track only one book at a time, in extreme detail — every paragraph, every margin note
- P: not tracking *your* reading but tracking *the book's* — which paragraphs do most readers stop on?
- E: eliminate the tracking — keep the database of paragraphs as a "this is where I cried" annotation layer
- R: instead of you tracking the book, the book tracks you — delivers itself in chunks based on your demonstrated rhythm

Strongest cells: S, P, R. Elaborate P: a site where the unit of attention is the *paragraph* across the readerly population, not the book. Discard the rest.

## Anti-slop notes

- Most common SCAMPER slop: "Combine X with AI/ML/blockchain/AR". Reject.
- Second most common: "make it a subscription" (business-model shift, not product variation).
- Surface 1–3 results to the user, not 7. The seven are internal scaffolding.
- Eliminate and Reverse produce the strongest non-slop output. Spend most of the budget there.

Source: Eberle, *Scamper: Games for Imagination Development* (DOK, 1971); Osborn, *Applied Imagination* (Scribner's, 1953).
