# GritQL Syntax Reference

## Basic Pattern

Match a code snippet using backtick-quoted patterns:

```gritql
`console.log($message)`
```

Matches any `console.log()` call regardless of argument.

## Variables

- `$name` — captures any single AST node
- `$args` — captures arguments (any name works)
- `$_` — wildcard, matches but does not capture
- Same variable name repeated = must match same value:
  ```gritql
  `$foo && $foo()`
  ```
  Matches `bar && bar()` but NOT `bar && baz()`.

## Conditions (`where`)

Add constraints with `where`:

```gritql
`console.log($message)` where {
    $message <: `'Hello, world!'`
}
```

## Operators

| Operator | Meaning |
|---|---|
| `<:` | matches (match operator) |
| `<: contains` | deep contains (searches descendants) |
| `<: r"regex"` | regex match |
| `not` | negation |
| `and` | both conditions must hold |
| `or` | either condition may hold |

## `register_diagnostic()`

Report a lint violation:

```gritql
`console.log($args)` where {
    register_diagnostic(
        span = $args,
        message = "Remove console.log before committing",
        severity = "warn"
    )
}
```

Parameters:
- `span` — the AST node to highlight (use a captured `$variable`)
- `message` — string shown to the user (make it actionable)
- `severity` — one of: `"hint"`, `"info"`, `"warn"`, `"error"`

## Deep Matching with `contains`

Match patterns anywhere inside a node:

```gritql
`useEffect($callback, $deps)` where {
    $callback <: contains `fetch`,
    register_diagnostic(
        span = $callback,
        message = "Don't fetch inside useEffect. Use TanStack Query instead.",
        severity = "error"
    )
}
```

## Negation

```gritql
`useState($initial)` where {
    not $initial <: contains `atom`,
    register_diagnostic(
        span = $initial,
        message = "Prefer Jotai atoms over useState for shared state",
        severity = "info"
    )
}
```

## CSS Rules

Prefix with `language css;` for CSS patterns:

```gritql
language css;

`$selector { $props }` where {
    $props <: contains `color: $color` as $rule,
    not $selector <: r"\.color-.*",
    register_diagnostic(
        span = $rule,
        message = "Use .color-* utility classes instead of explicit colors"
    )
}
```

## `as` Binding

Capture a sub-match for use in `span`:

```gritql
`$props <: contains `color: $color` as $rule`
```

Now `$rule` refers to the matched `color: ...` declaration specifically.

## biome.json Configuration

```json
{
  "$schema": "https://biomejs.dev/schemas/2.0.0/schema.json",
  "plugins": [
    "./rules/no-console-log.grit",
    "./rules/prefer-query-hook.grit"
  ],
  "linter": {
    "enabled": true
  }
}
```

Plugins run on all files the linter processes. Results appear in `biome lint` and `biome check` output.
