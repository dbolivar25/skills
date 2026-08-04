---
name: creative-ideation
title: Creative Ideation — Routed Library of Creative Methods
description: "Generate ideas via named methods from creative practice."
version: 2.2.1
author: SHL0MS
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [Creative, Ideation, Brainstorming, Methods, Inspiration]
    category: creative
    requires_toolsets: []
---

# Creative Ideation

Route an open-ended generative or selective request to one named method, load only that method, and produce specific, non-obvious output.

## When to use

Use for making, expanding, selecting, unblocking, subverting, refining, or synthesizing ideas in any domain.

Practice is a separate responsibility: when the user asks for an exercise, time-boxed practice, or a creative routine, load `creative-exercises` instead of routing through this library.

## Operating rules

1. **Constraint plus direction is creativity.** Methods must supply both.
2. **Refuse the first three ideas.** Generate, discard, regenerate. Apply `references/anti-slop.md`.
3. **One method per response unless asked.** Don't stack.
4. **Specificity over abstraction.** Use real proper nouns, materials, situations, and mechanisms; a tech stack alone is not specific.
5. **Weird must also be good.** Every set needs one non-obvious **grounded** idea that is pursuable now, with a real first step.
6. **Name the method you used and who invented it.** Attribution invokes the discipline.
7. **When user picks one, build it.** Don't keep generating after they've chosen.

## Routing

Route before generating; do not narrate the routing unless useful. Never trade away an idea's concrete mechanism, situational binding, or honest failure mode.

### Step 1 — Extract three signals from the prompt

**PHASE** — what stage is the user in?

| Phase | Cues |
|---|---|
| **GENERATING** | "give me an idea", "what should I make", "inspire me", no idea yet |
| **EXPANDING** | "what else", "more like this", "give me variations" — has a base idea |
| **SELECTING** | "help me pick", "which should I do", "I have these options" |
| **UNBLOCKING** | "I'm stuck", "blocked", "going in circles", "stale" — has material |
| **SUBVERTING** | "make it weirder", "less obvious", "this is too safe" |
| **REFINING** | "this is fine but missing something", "feels rough" |
| **SYNTHESIZING** | "I have a pile of notes / interviews / observations" |

**DOMAIN** — what is the user making/doing?

| Domain | Cues |
|---|---|
| **TEXT** | fiction, essay, poem, lyric, script, copy |
| **OBJECT** | visual art, music, sound, performance, installation, sculpture |
| **ARTIFACT** | software, hardware, mechanism, device |
| **SYSTEM** | org, civic, institution, ecology, community |
| **SELF** | life decision, career, personal practice |
| **RESEARCH** | paper, thesis, scholarly question |
| **PRODUCT** | business, market, service |

**SPECIFICITY** — how much constraint is in the prompt?

| Level | Cues |
|---|---|
| **NONE** | "I'm bored", "inspire me" — no domain, no project |
| **DOMAIN** | "I want to write something" — knows the field, no project |
| **PROJECT** | "I'm working on this specific X" |
| **PROBLEM** | "I have this specific friction within X" |

### Step 2 — Apply overrides first

- **Weird / strange / surprising / less obvious / more interesting** → `references/methods/lateral-provocations.md` or `references/methods/pataphysics.md`, regardless of domain.
- **User names a method** — use it.
- **User asks which method** → offer 2–3 one-line candidates and ask which to apply.
- **High-slop terrain** — AI/startup ideas, habit trackers, productivity, wellness, fitness, food, or travel apps → force `references/methods/lateral-provocations.md` or `references/methods/pataphysics.md`; refuse the first **5** ideas.

### Step 3 — Route by phase, then domain

**By phase:**

| Phase | Default route |
|---|---|
| GENERATING + SPECIFICITY=NONE | `references/full-prompt-library.md` **General** section (constraint dispatch) |
| GENERATING + DOMAIN known | route by domain (next table) |
| EXPANDING | `references/methods/scamper.md` |
| SELECTING | `references/methods/premortem-and-inversion.md` (or `references/methods/compression-progress.md` for upside) |
| UNBLOCKING | `references/methods/oblique-strategies.md` |
| SUBVERTING | `references/methods/lateral-provocations.md` (fallback `references/methods/pataphysics.md`) |
| REFINING (text) | `references/methods/defamiliarization.md` |
| REFINING (other) | `references/methods/creative-discipline.md` (Tharp's spine) |
| SYNTHESIZING | `references/methods/affinity-diagrams.md` |
| Volume needed fast | `references/methods/volume-generation.md` |

**By domain when GENERATING:**

| Domain | Default route |
|---|---|
| TEXT — formal / poetry | `references/methods/oulipo.md` |
| TEXT — narrative | `references/methods/story-skeletons.md` |
| TEXT — has source material to remix | `references/methods/chance-and-remix.md` |
| OBJECT (music, visual, performance) | `references/methods/oblique-strategies.md` |
| OBJECT — physical maker / wants a starting constraint | `references/full-prompt-library.md` **Physical / object** section |
| ARTIFACT — wants a starting constraint | `references/full-prompt-library.md` **Software / artifact** section |
| ARTIFACT — engineering invention with parameter conflict | `references/methods/triz-principles.md` |
| ARTIFACT — software architecture | `references/methods/pattern-languages.md` |
| ARTIFACT — has natural-system analog | `references/methods/biomimicry.md` |
| ARTIFACT — accumulated assumptions to question | `references/methods/first-principles.md` |
| SYSTEM (civic, org, institutional) | `references/methods/leverage-points.md` |
| SYSTEM — collective / participatory | `references/full-prompt-library.md` **Social / collective** section |
| SELF (life, career, what-to-study) | `references/methods/derive-and-mapping.md` |
| RESEARCH — picking a question | `references/methods/compression-progress.md` |
| RESEARCH — attacking a known problem | `references/methods/polya.md` |
| PRODUCT (business, service) | `references/methods/jobs-to-be-done.md` |
| Need to break a frame / find analogy | `references/methods/analogy-and-blending.md` |

### Step 4 — Handle ambiguity and contradiction

- Multiple paths → follow the user's phrasing, not the most sophisticated method.
- Genuine ambiguity → ask one clarifying question.
- Contradictory signals → stack two methods explicitly and name each role (for example, jobs-to-be-done for product framing plus lateral provocations to break the frame).
- No match → use constraint dispatch in `references/full-prompt-library.md`.
- Repeated question → switch methods.

Before generating, confirm that you selected a method. If the output resembles generic brainstorming or starts as a bare list, reroute. For edge cases see `references/heuristics.md`.

## Output format

For the constraint-dispatch default path:

```
## Constraint: [Name] — from [Source]
> [The constraint, one sentence]

### Ideas

1. **[One-line pitch]**
   [2-3 sentences — what specifically is made, why it's interesting]
   ⏱ [weekend/week/month]  •  🔧 [stack/medium/materials]

2. ...
3. ...
```

Other methods use their own format; do not force them into this template.

**Every idea set, regardless of method:**
- Name the method and inventor; on slop terrain, name the refused ideas.
- Give each idea a mechanism, audience/situation, and honest failure mode or tradeoff.
- Mark one non-obvious, pursuable idea **grounded** and give its first step.

## File map

- `references/full-prompt-library.md` — constraint library, sectioned by domain (General, Software, Physical, Social, Lists). Default path for SPECIFICITY=NONE.
- `references/method-catalog.md` — one-line summary + when-to-use per method
- `references/heuristics.md` — extended decision tree for edge cases
- `references/anti-slop.md` — anti-slop rules; apply to every output
- `references/methods/` — 22 named methods, one file each, load only the one you're using

## Attribution

Constraint-dispatch core adapted from [wttdotm.com/prompts.html](https://wttdotm.com/prompts.html). Methods drawn from primary sources cited in each method file.
