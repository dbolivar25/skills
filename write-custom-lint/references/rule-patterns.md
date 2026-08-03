# Common GritQL Rule Patterns

## Ban a Function Call

```gritql
`console.log($args)` where {
    register_diagnostic(
        span = $args,
        message = "Remove console.log before committing",
        severity = "warn"
    )
}
```

## Ban a React Hook

```gritql
`useMemo($args)` where {
    register_diagnostic(
        span = $args,
        message = "useMemo unnecessary with React Compiler. Remove it.",
        severity = "warn"
    )
}
```

```gritql
`useCallback($args)` where {
    register_diagnostic(
        span = $args,
        message = "useCallback unnecessary with React Compiler. Remove it.",
        severity = "warn"
    )
}
```

## Ban Fetch in useEffect

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

## Ban Dynamic Imports

```gritql
`await import($path)` where {
    register_diagnostic(
        span = $path,
        message = "Use static imports at the top of the file",
        severity = "error"
    )
}
```

## Ban Object.assign

```gritql
`Object.assign($args)` where {
    register_diagnostic(
        span = $args,
        message = "Use the spread syntax instead of Object.assign()",
        severity = "warn"
    )
}
```

## Prefer Pattern in Context

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

## Ban `as any` Type Assertion

```gritql
`$expr as any` where {
    register_diagnostic(
        span = $expr,
        message = "Avoid 'as any'. Use a proper type or unknown.",
        severity = "error"
    )
}
```

## Ban @ts-ignore

```gritql
`// @ts-ignore` where {
    register_diagnostic(
        span = $_,
        message = "Use @ts-expect-error with an explanation instead of @ts-ignore",
        severity = "error"
    )
}
```

## CSS: Ban Inline Colors

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

## Ban Date.now() for Timing

```gritql
`Date.now()` where {
    register_diagnostic(
        span = $_,
        message = "Use performance.now() for elapsed time measurements. Date.now() is affected by clock drift.",
        severity = "warn"
    )
}
```

## Ban Manual Millisecond Arithmetic for Dates

```gritql
`$x * 60 * 1000` where {
    register_diagnostic(
        span = $_,
        message = "Use Luxon DateTime for date math instead of manual millisecond arithmetic",
        severity = "warn"
    )
}
```
