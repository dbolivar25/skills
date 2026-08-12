---
name: herdr
description: "Use only when the user explicitly asks an agent or shell to inspect or control Herdr. Load it to anchor the intended session, workspace, and target before any read or mutation can land in the wrong context."
---

# Herdr

Herdr exposes the same control surface through CLI wrappers and its local socket API. This skill works from an external GUI or shell and remains safe when invoked inside a managed pane.

An **anchor** is the resolved session, workspace, and explicit pane or agent target for one operation. It replaces the inherited caller context available inside a Herdr pane.

## 1. Establish authority and select the session

Determine whether Herdr injected caller context:

```bash
test "${HERDR_ENV:-}" = 1
```

When `HERDR_ENV=1`, use the injected `HERDR_WORKSPACE_ID`, `HERDR_TAB_ID`, and `HERDR_PANE_ID` as the initial anchor. Keep using explicit IDs; do not target the focused UI pane.

Otherwise use the external branch below. Proceed only when the user explicitly asked to inspect or control Herdr. An external shell having access to the socket does not itself grant authority.

Use the session named by the user. Otherwise use `HERDR_SESSION` when it is already set; otherwise use the default session. For a named session, pass the selector on every command:

```bash
herdr --session <name> <command>
```

For the default session, ensure inherited `HERDR_SESSION` or `HERDR_SOCKET_PATH` values do not redirect the command. Use `HERDR_SOCKET_PATH` only when the user or environment supplies an intentional low-level override.

This step is complete when exactly one session is selected and the requested read or mutation is within the user's authority.

## 2. Bootstrap an anchor

The installed binary is the authority for syntax. Use `herdr --help` and the relevant non-mutating command-group help when needed. Never run bare `herdr` for discovery; it launches or attaches the TUI. Never probe a potentially mutating command by omitting its arguments.

Read the live topology:

```bash
herdr api snapshot
```

Apply the session selector from step 1 to this and every later command.

Resolve the workspace in this order:

1. An explicit workspace ID supplied by the user.
2. A unique workspace whose canonical working directory matches the task's repository or working directory.
3. A unique label the user explicitly named.

Do not fall back to the server's focused workspace, tab, or pane. If resolution is missing or ambiguous, report the candidates and ask the user to choose.

Resolve the target by explicit pane ID or unique live agent name. Human-readable pane labels may narrow candidates, but never substitute for the resolved ID. Refresh the snapshot after reconnecting, after structural changes, or when a target is stale.

This step is complete when the anchor contains one live session, one workspace, and one explicit target appropriate to the requested operation.

## 3. Inspect before mutation

Choose the primitive that owns the work:

- Use workspace, tab, and pane topology to organize terminal locations.
- Use pane commands for shells, servers, tests, logs, input, and output.
- Use agent commands only for a recognized agent and its lifecycle.

Before interrupting, restarting, replacing, or sending input to a pane, inspect the anchored target:

```bash
herdr pane get <pane-id>
herdr pane process-info --pane <pane-id>
herdr pane read <pane-id> --source recent-unwrapped --lines 120
```

Verify that the pane still belongs to the anchored workspace and that its foreground occupant matches the user's intent. If it does not, stop rather than sending input to the wrong process.

Reads do not require speculative mutations. This step is complete for a read-only request once the requested live evidence has been collected from the anchored target.

## 4. Execute through explicit targets

Never use `--current`, an omitted target, or the server's focused pane from an external client.

Use the narrow command that matches the request:

```bash
herdr pane run <pane-id> "<command>"
herdr pane send-keys <pane-id> ctrl+c
herdr pane wait-output <pane-id> --match "<text>" --timeout <ms>
herdr pane read <pane-id> --source recent-unwrapped --lines 120
```

Use agent commands only with an explicit pane ID or unique live agent name:

```bash
herdr agent get <target>
herdr agent prompt <target> "<prompt>" --wait --timeout <ms>
herdr agent read <target> --source recent-unwrapped --lines 120
```

For created background work, preserve the user's focus with `--no-focus`. Parse all returned IDs from JSON; never predict IDs from examples, labels, or sidebar order.

Do not close a pane, tab, workspace, or session that this run did not create unless the user explicitly names that destructive action and target. Never stop the Herdr server as an incidental cleanup step.

This step is complete when Herdr accepts the requested operation against the anchored target and returns its result.

## 5. Verify the landing

Command submission is not the outcome. Verify the requested effect with the surface that can observe it:

- Use `pane process-info` to confirm the foreground process.
- Use `pane wait-output` for a readiness, failure, or completion signal.
- Use `pane read` for recent logs.
- Use `agent get`, `agent wait`, or `agent read` for agent lifecycle.

If the target disappeared or changed occupants, refresh the snapshot and re-anchor before any further mutation. Do not silently retarget a replacement.

Report the session, workspace, target, operation, and observed result. Distinguish a command accepted by Herdr from a server becoming ready, a test passing, or an agent finishing.

This step is complete only when the requested real-world effect is observed or the evidence shows a specific failure or unresolved state.

## Failure boundaries

- If the selected socket or session is unavailable, do not launch the Herdr TUI from the agent shell. Report that the session is unavailable and let the user start or attach Herdr.
- If workspace or target resolution is ambiguous, do not use focus as a tiebreaker.
- If a pane's foreground process does not match the intended process, do not send `ctrl+c`, text, or Enter.
- If CLI syntax is uncertain, inspect the installed help rather than guessing.
- CLI server errors are JSON on stderr with exit status 1. CLI syntax errors exit with status 2.
