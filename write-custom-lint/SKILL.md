---
name: write-custom-lint
description: Creates and manages Biome GritQL custom lint rules to enforce coding patterns. Use when creating linter rules, enforcing code conventions, preventing anti-patterns, or when the user mentions Biome, GritQL, custom lint rules, or AST-based linting.
allowed-tools: ["Write","Read","Edit","Bash","Glob"]
---

# Biome GritQL Custom Lint Rules

Create AST-based custom lint rules using Biome's GritQL plugin system.

## Workflow

1. Identify the pattern to ban or enforce
2. Read `references/gritql-syntax.md` for syntax details
3. Read `references/rule-patterns.md` for common pattern examples
4. Create a `.grit` file in the project's `rules/` directory
5. Add the plugin path to `biome.json` `"plugins"` array
6. Test with the project's lint command (e.g., `biome check`, `biome lint`)

## Quick Start

Create a rule file (`rules/no-console-log.grit`):

```gritql
`console.log($args)` where {
    register_diagnostic(
        span = $args,
        message = "Remove console.log before committing",
        severity = "warn"
    )
}
```

Register in `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "plugins": ["./rules/no-console-log.grit"]
}
```

## Project Structure

```
project/
├── biome.json
└── rules/
    ├── no-console-log.grit
    ├── prefer-query-hook.grit
    └── no-dynamic-import.grit
```

## Guidelines

- **Actionable messages**: Tell the user what to do instead, not just what's wrong
- **Severity**: `"error"` for hard requirements, `"warn"` for preferences, `"info"` for suggestions
- **Naming**: `no-X.grit` for bans, `prefer-Y.grit` for preferences
- **One rule per file** for clarity and selective enablement
- Always test against real project code before committing

## Why Lint Rules Over CLAUDE.md

Instructions in CLAUDE.md degrade as context fills. Lint rules give immediate, persistent feedback. When a pattern is violated, the error appears in output and self-corrects — no context drift.

## Resources

- `references/gritql-syntax.md` — Full GritQL language reference (variables, operators, conditions)
- `references/rule-patterns.md` — Ready-to-use patterns for common bans and enforcements
