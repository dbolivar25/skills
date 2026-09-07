# Upstream Provenance

- Repository: `https://github.com/dmmulroy/skills`
- Skill: `code-review`
- Fork base: `8a10f56abf86dc52e8209e5f61fffa6951402974`
- Forked locally: `2026-07-13`

## Intentional divergences

This fork keeps upstream's two-axis review insight but changes the operating
contract:

- The axes are request fit and codebase fit.
- Pull requests are pinned to live head, checks, and thread state.
- Investigators provide evidence; one judge integrates and ranks findings.
- Findings pass an explicit evidence and disproof gate.
- Findings lead, while axis coverage and residual risk remain visible.
- GitHub mutations require explicit intent, head revalidation, and live read-back.
- Parallel investigators are conditional rather than mandatory for every diff.

The stale dependency on `/setup-matt-pocock-skills` and
`docs/agents/issue-tracker.md` is intentionally removed.

## Refresh procedure

When upstream changes, compare its current `code-review/` against the recorded fork
base. Evaluate upstream ideas against the intentional divergences above. Rebase
useful changes manually; do not wholesale-install this directory over the fork.

The exact upstream base is archived locally at:

`~/.agents/skills-archive/2026-07-13/code-review-upstream-8a10f56`
