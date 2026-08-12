# GritQL for Biome plugins

Verify syntax against the installed Biome version and the current official
reference. This file records stable design shapes, not a complete language spec.

## Target language

JavaScript and TypeScript are the default target. Declare another supported
language explicitly:

```gritql
language css
```

Current Biome also supports JSON patterns. Language and plugin support differ,
so check Biome's current language-support table before choosing a target.

## Structural snippets

Backtick snippets ignore trivia such as whitespace and quote choice:

```gritql
`console.log($message)`
```

Metavariables such as `$message` bind syntax. Reusing a name requires the same
bound syntax. Use a surrounding pattern, `contains`, `within`, a regex, or an
`or` branch only as supported by the installed engine.

Shells execute backticks. When prototyping with `biome search`, quote the entire
query safely rather than interpolating it through a shell string.

## Diagnostics

Bind the construct you want to highlight and register one actionable diagnostic:

```gritql
`console.log($message)` as $call where {
  register_diagnostic(
    span = $call,
    message = "Use the repository logger so this event keeps its context.",
    severity = "warn"
  )
}
```

The message above is only an example of mechanics. It is a valid policy only in a
repository that owns such a logger and has established the requirement.

## Biome syntax nodes

Biome can match parser nodes directly:

```gritql
engine biome(1.0)
language js(typescript,jsx)

JsIfStatement() as $statement where {
  register_diagnostic(span = $statement, message = "Example diagnostic")
}
```

Use the Biome Playground or the installed version's grammar sources to discover
node and field names. Node-specific rules are precise but coupled to Biome's
grammar; protect them with fixtures and re-run those tests on upgrades.

## Registration and scope

Older/current configs may register a path directly:

```json
{
  "plugins": ["./config/plugins/example.grit"]
}
```

Biome versions that support scoped plugin entries can limit application:

```json
{
  "plugins": [
    {
      "path": "./config/plugins/example.grit",
      "includes": ["src/**/*.ts", "!src/**/*.test.ts"]
    }
  ]
}
```

Use only the shape supported by the repository's installed version. Preserve the
existing config hierarchy and path convention.

## Reliability boundaries

- Biome implements a changing subset of upstream GritQL.
- A syntactically valid pattern can silently miss a syntax form.
- Broad descendant searches can produce false positives outside the intended
  context.
- CST patterns can break when grammar node names change.
- Plugin diagnostics can be suppressed under the `lint/plugin` category; follow
  repository policy for when suppression is acceptable.

Fixtures on both sides of the boundary are the executable syntax reference.
