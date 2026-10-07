# GitHub CLI mechanics

Read this when query construction, pagination, CLI exit status, or helper output could
change the evidence you return. Inspect installed `gh --version` and command `--help`
when a flag or field matters; the current online manual can describe a newer CLI.

## Keep shell mechanics from changing the request

- Save large output to a file and inspect it there. Piping `gh` or a helper into `head`
  can close the pipe early and leave apparently successful but incomplete evidence.
- Quote API paths containing `?`, braces, or other shell syntax. `gh api` substitutes
  `{owner}/{repo}` from the current repository or `GH_REPO`; establish the intended repo.
- Adding `-f` or `-F` parameters switches `gh api` to POST unless the method is explicit.
  Use `-X GET -F per_page=100` for GET query parameters.
- Use `--body-file` or a structured argument for multiline bodies. A quoted heredoc can
  write the file. Backticks and `$()` inside a double-quoted shell body are executable.
- For a complicated jq program, write it to a file and use `jq -f`; do not let nested
  shell quoting distort the query.

The [API manual](https://cli.github.com/manual/gh_api) owns current request mechanics.
These cautions preserve the exact query and content, not a separate approval workflow.

## Acquire the population the answer needs

Use `--paginate` for REST collections such as comments, files, and reviews. `--jq` is
applied to each page. When one enclosing array is needed, use `--slurp` and flatten the
pages deliberately. GraphQL pagination needs an end-cursor variable and connection
`pageInfo`; nested connections need independent pagination.

`gh pr diff` flags vary by version. Check [its current manual](https://cli.github.com/manual/gh_pr_diff)
and installed help rather than assuming path filtering or `--stat` exists. Per-file
statistics can come from the paginated files endpoint:

```sh
gh api 'repos/{owner}/{repo}/pulls/N/files' --paginate \
  --jq '.[] | [.filename, .additions, .deletions] | @tsv'
```

Save the complete diff once, then search or read that file. To acquire a source file at
a pinned ref without decoding a contents payload:

```sh
gh api 'repos/{owner}/{repo}/contents/PATH?ref=SHA' \
  -H 'Accept: application/vnd.github.raw'
```

## Separate check status from retrieval status

`gh pr checks` can return valid status output with a nonzero exit: failing checks use 1,
and pending checks use 8. Parse that output while still surfacing retrieval errors;
exit 1 also occurs for errors such as an unavailable PR. A blanket `|| true` erases the
distinction. The [checks manual](https://cli.github.com/manual/gh_pr_checks) and installed
help describe current status fields and watch behavior.

Use `gh run watch` or checks watch mode when waiting is requested and the task harness
can yield progress. Pending, failing, skipped, canceled, absent, and unavailable checks
mean different things. A check summary alone may not identify all required rules.

For merge-policy questions, read applicable rulesets as well as classic branch
protection. A 404 from the protection endpoint is inconclusive without checking the
identifier, access, and rulesets; it does not prove an unprotected branch. See the
[branch-protection contract](https://docs.github.com/en/rest/branches/branch-protection#get-branch-protection)
for the endpoint's permission and response semantics.

## Know what the bundled helpers cover

Read each helper's `--help` for arguments and output shape. Use a runtime with native
TypeScript type stripping enabled; [Node's official history](https://nodejs.org/api/typescript.html)
lists default support in 22.18 and 23.6 and later release lines. Verify the actual
helper entrypoint rather than assuming the shell's `node` can run it. Type stripping
executes erasable syntax; it does not typecheck the scripts.

When passing `-R owner/repo`, pass an explicit PR number as well, or `--pr N`/a run ID
for CI drilldown. The helpers refuse to infer another repository's PR from the current
local branch. Their implicit-current-branch form is for the repository owning that branch.

- `pr-snapshot.ts` exhausts files, reviews, issue comments, and thread records. Thread
  counts do not include inline comment bodies. Text shows at most 50 file rows and the
  last 5 issue comments; `--full` removes body truncation but does not remove those row
  limits. JSON contains the acquired collections.
- `pr-threads.ts` exhausts reviews, issue comments, threads, and each thread's comments.
  It hides resolved/outdated threads by default; use `--all` for a complete conversation.
  JSON preserves full bodies, unfiltered coverage counts, and filters. Empty/draft review
  bodies are counted in acquisition coverage but omitted from rendered conversation.
- `ci-failures.ts` acquires selected runs, failing jobs/steps, and available full job logs.
  Its snippets are navigation aids. A successful report may contain run or log errors and
  external checks; inspect those entries before drawing a CI conclusion.

Malformed or denied connections, non-advancing cursors, and snapshot file-count mismatch
fail visibly. `coverage.complete` describes successful acquisition of the named helper
collections, not review of all source, an atomic platform snapshot, or completeness of
CI logs. The calls observe a live PR over multiple requests. Pin and recheck the actual
head and comparison before a judgment or action depends on them.
