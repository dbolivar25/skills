---
name: domain-modeling
description: Use when domain terms, invariants, boundaries, examples, ubiquitous language, or a qualifying decision need sharpening. Load it to test the model against code and edge cases while keeping its glossary and durable decisions coherent.
---

# Domain modeling

Read the [core](core.md). Load the actual glossary and context map, governing
ADRs and code/examples that can establish the model. Bring contradictions to the
core with both sources rather than asking the user for discoverable code facts.

Use the core to generate precise terms, discriminating scenarios and owner
questions. Put those questions to the owner as needed; feed answers back before
recording a proposed interpretation as settled language.

Within the task's documentation scope, capture each settled term as it
crystallizes and persist only qualifying ADRs. For discussion-only work, return
proposed deltas without writing files. Recheck the existing file before applying
a delta and preserve unrelated terms and other contributors' changes.

## File structure

Most repos have a single context:

```
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. Read the map to locate each context. Infer the current topic’s context from its
code and examples; ask the owner if the meaning boundary remains ambiguous. The
map points to where each one lives:

```
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily — only when you have something to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

A CONTEXT file remains a glossary only. Use its local format and create files
lazily when there is a settled delta to record. Read back persisted changes;
report proposed and recorded decisions distinctly.
