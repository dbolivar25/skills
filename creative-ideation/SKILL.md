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

Route each request to one named method and load only that method.

## When to use

Use to make, expand, select, unblock, subvert, refine, or synthesize ideas in any domain.

For an exercise, time-boxed practice, or creative routine, load `creative-exercises` instead.

## Operating rules

1. **Constraint plus direction is creativity.** Methods must supply both.
2. **Refuse the first three ideas.** Generate, discard, regenerate. Apply `references/anti-slop.md`.
3. **One method per response unless asked.** Don't stack.
4. **Specificity over abstraction.** Use real proper nouns, materials, situations, and mechanisms; a tech stack alone is not specific.
5. **When user picks one, build it.** Don't keep generating after they've chosen.

## Routing

Route before generating. Explain the choice only when useful.

**T&P** means the named section in `references/methods/transform-and-provoke.md`.

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

- **Weird / strange / surprising / less obvious / more interesting** → **T&P: Lateral Provocations** or **Pataphysics**, regardless of domain.
- **User names a method** — use it.
- **User asks which method** → offer 2–3 one-line candidates and ask which to apply.
- **High-slop terrain** — AI/startup ideas, habit trackers, productivity, wellness, fitness, food, or travel apps → force **T&P: Lateral Provocations** or **Pataphysics**; refuse the first **5** ideas.

### Step 3 — Route by phase, then domain

**By phase:**

| Phase | Default route |
|---|---|
| GENERATING + SPECIFICITY=NONE | `references/full-prompt-library.md` **General** section (constraint dispatch) |
| GENERATING + DOMAIN known | route by domain (next table) |
| EXPANDING | **T&P: SCAMPER** |
| SELECTING | `references/methods/premortem-and-inversion.md` (or `references/methods/compression-progress.md` for upside) |
| UNBLOCKING | **T&P: Oblique Strategies** |
| SUBVERTING | **T&P: Lateral Provocations** (fallback **Pataphysics**) |
| REFINING (text) | **T&P: Defamiliarization** |
| REFINING (other) | `references/methods/creative-discipline.md` (Tharp's spine) |
| SYNTHESIZING | `references/methods/affinity-diagrams.md` |
| Volume needed fast | `references/methods/volume-generation.md` |

**By domain when GENERATING:**

| Domain | Default route |
|---|---|
| TEXT — formal / poetry | **T&P: OuLiPo** |
| TEXT — narrative | `references/methods/story-skeletons.md` |
| TEXT — has source material to remix | **T&P: Chance and Remix** |
| OBJECT (music, visual, performance) | **T&P: Oblique Strategies** |
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
| Need to break a frame / find analogy | **T&P: Analogy and Blending** |

### Step 4 — Handle ambiguity and contradiction

- Multiple paths → follow the user's phrasing, not the most sophisticated method.
- Genuine ambiguity → ask one clarifying question.
- Contradictory signals → stack two methods and name each role.
- No match → use constraint dispatch in `references/full-prompt-library.md`.
- Repeated question → switch methods.

Select a method before generating. Reroute generic brainstorming or bare lists. See `references/heuristics.md` for edge cases.

## Output format

For constraint dispatch:

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

Other methods keep their own format.

**For every idea set:**
- Name the method and inventor; on slop terrain, name the refused ideas.
- Give each idea a mechanism, audience/situation, and honest failure mode or tradeoff.
- Mark one non-obvious, pursuable idea **grounded** and give its first step.

## File map

- `references/full-prompt-library.md` — domain-based constraint dispatch; default when SPECIFICITY=NONE
- `references/method-catalog.md` — method summaries and uses
- `references/heuristics.md` — routing edge cases
- `references/anti-slop.md` — required anti-slop rules
- `references/methods/` — 15 files covering 22 methods; load one file or named section

## Attribution

Constraint dispatch adapted from [wttdotm.com/prompts.html](https://wttdotm.com/prompts.html). Primary sources are cited in each method file.
