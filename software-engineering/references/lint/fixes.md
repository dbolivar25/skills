# GritQL plugin fixes

Current Biome versions can associate a GritQL rewrite with a plugin diagnostic.
Confirm support in the installed version before using this branch.

## Rewrite shape

Bind the full construct, register the diagnostic, then rewrite the binding:

```gritql
`console.log($message)` as $call where {
  register_diagnostic(
    span = $call,
    message = "Use console.info for this repository's informational output.",
    severity = "warn",
    fix_kind = "unsafe"
  ),
  $call => `console.info($message)`
}
```

The repository must establish the policy in the message. The example only shows
the rewrite mechanism.

## Safe versus unsafe

Biome treats plugin rewrites as unsafe by default. Preserve that default when a
rewrite can change semantics, evaluation order, comments, types, formatting, or
behavior for any legal match. Unsafe fixes require the repository's explicit
unsafe-write flow.

Use `fix_kind = "safe"` only when every supported match has one semantics-
preserving replacement and fixtures prove:

- exact rewritten output;
- comments and surrounding syntax survive;
- the relevant type and runtime checks pass;
- a second write makes no change; and
- allowed cases remain untouched.

Cosmetic appearance and a green parser are not safety proof.

## Prefer no fix when judgment remains

Return only a diagnostic when the correction depends on choosing an API,
supplying domain context, moving code, or deciding whether an exception is
legitimate. An actionable message can point to the repository pattern without
automating the choice.
