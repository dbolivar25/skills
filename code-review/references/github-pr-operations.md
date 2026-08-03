# GitHub Pull Request Operations

Load this reference whenever the review target is a GitHub pull request or the
user asks to post, approve, request changes, reply, or resolve there.

## Pin live state

Read the current repository and pull request rather than trusting a local branch,
old description, notification, or remembered head. Capture:

- repository and PR number;
- URL, title, author, and draft/open/closed/merged state;
- base branch, head branch, and live head SHA;
- merge state and current review decision;
- check and CI status;
- changed files and diff shape; and
- local worktree state when local validation will be used.

Use the platform connector, `gh`, or GitHub GraphQL according to what is available.
`gh pr view --json` does not expose review-thread resolution state; use GraphQL or
another GitHub surface when thread state matters.

If local dependencies, credentials, containers, or generated state are unavailable,
record that as a validation gap. It is not a product finding unless the reviewed
change caused the failure.

## Read review threads before writing findings

Fetch unresolved threads before drafting new comments. On rereview, also fetch the
resolved threads relevant to the changed areas. For each material thread, retain:

- author;
- path and line;
- substantive claim without bot boilerplate;
- replies;
- resolution state; and
- the head or code state against which it was written, when available.

Check the live code before trusting thread state:

- An unresolved issue still present is existing context, not a new finding.
- A fixed issue should not be repeated.
- A resolved thread whose issue remains should be identified as inconsistent with
  the live code.
- Several comments with one cause should become one integrated finding with short
  follow-ups where needed.

## Keep review actions distinct

The user must explicitly select the live action:

- **Comment** — publish observations without an approval state.
- **Approve** — submit approval for the reviewed head.
- **Request changes** — submit a blocking review state with scoped reasons.
- **Reply** — respond inside an existing thread.
- **Resolve** — close a thread after checking that its issue is fixed or its
  disposition is explicitly accepted.

Do not infer approval from “looks good,” infer thread resolution from a reply, or
bundle extra comments into a request for one action.

Before posting an inline comment, verify that its anchor belongs to the current
diff. If an anchor is invalid, use a valid changed line or a concise top-level
comment that cites the location.

## Recheck and verify

Immediately before mutation:

1. Read the live head SHA again.
2. If it changed, revalidate every finding and the recommendation.
3. Submit exactly the requested action.
4. Read back the submitted review, comment, reply, and thread state.

Afterward report the action, target, resulting state, and any comment that could
not be anchored or verified.

Completion criterion: the review action is attached to the reviewed head, matches
the user's requested state, and is confirmed by live read-back.

