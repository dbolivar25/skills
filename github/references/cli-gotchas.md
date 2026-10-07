# GitHub CLI mechanics

- Never pipe gh into `head`: SIGPIPE can kill gh mid-write (spurious nonzero
  exit, shell-dependent) or silently truncate large output.
  Redirect to a file and read that, or trim with `--jq '.[0:20]'`.
- `gh pr diff` has no `--stat` and no positive pathspec (`--name-only` and
  `-e/--exclude` globs exist in gh ≥ 2.95). Per-file stats:
  `gh api 'repos/{owner}/{repo}/pulls/N/files' --jq '.[]|[.filename,.additions,.deletions]|@tsv'`
  Full diff: `gh pr diff N > "$TMPDIR/pr.diff"` once, then rg/sed the file.
- `gh pr checks` exits 1 for failing checks and 8 for pending checks. Parse valid output for those statuses; surface other errors. Do not let a blanket `|| true` turn a failed retrieval into favorable evidence.
- File at any ref, no base64 dance:
  `gh api 'repos/{owner}/{repo}/contents/PATH?ref=SHA' -H 'Accept: application/vnd.github.raw'`
- `gh api` fills `{owner}/{repo}` from the cwd repo (`GH_REPO=o/r` overrides).
  Quote any api path containing `?` (zsh globs it), or use `-X GET -F per_page=100`
  (any `-f`/`-F` silently flips the request to POST without `-X GET`).
- Use `--paginate` on list endpoints (`/comments`, `/files`, `/reviews`). `--jq` runs per page. Use `--slurp` when the consumer needs one enclosing array of pages, then flatten deliberately. GraphQL pagination needs an end-cursor variable and the connection pageInfo. Nested connections require their own pagination. See the [current CLI contract](https://cli.github.com/manual/gh_api).
- PR/comment bodies: `--body-file file.md` or a quoted heredoc. Never inline
  `--body "..."` containing backticks.
- Field cheat-sheet: CI status on a PR = `statusCheckRollup` (pr view); steps
  live under `gh run view N --json jobs`; `gh search prs` fields ≠ `gh pr view` fields.
- gh has no `-C`; pass `-R owner/repo` to every command, or cd first.
- Branch rules live at `gh api 'repos/{owner}/{repo}/rulesets'` on modern repos;
  `/branches/main/protection` 404s unless classic protection is on AND you have
  admin ("Branch not protected" or plain "Not Found" both mean check rulesets;
  neither is a path error).
- Branch drift: `gh api 'repos/{owner}/{repo}/compare/BASE...HEAD' --jq '{ahead_by,behind_by}'`
- jq beyond one line: write the program to a file and `jq -f prog.jq`; inline
  zsh quoting breaks.
- Don't sleep-poll runs or checks; `gh run watch ID` and
  `gh pr checks N --watch --fail-fast` exist; let the harness background them.


## Helper coverage

The PR helpers independently exhaust review, issue-comment, thread, and file connections. The conversation helper also exhausts each thread's comments. JSON includes unfiltered coverage counts and conversation filters. Text summarizes populations and marks body truncation; snapshot text shows at most 50 file rows and the last 5 comments. Use JSON or the conversation helper for the complete material.

Malformed or denied connections, non-advancing cursors, and mismatched file counts fail visibly. These are sequential observations of a live PR, not an atomic database snapshot. Pin and recheck the head when an action depends on it. Node 23.6 or newer is required for native TypeScript.
