# Github evidence core

Read the [core/shell contract](../contracts/core-shell.md).

**Inputs:** Requested PR fact/action, repository/PR identity, base/head and currentness, paginated API/helper observations, check states, discussion and action read-back receipts.

Return what the supplied receipts establish and what is missing. Keep acquisition
separate from review judgment. A full PR-state snapshot and the substantive review
conversation answer different questions; one does not substitute for the other.
Unresolved/resolved status is platform state, not proof that the underlying issue
is present or fixed. Missing pages, truncated results or stale heads are evidence
needs, not complete coverage.

Pending CI is not failing CI. A helper reporting success means the report was
retrieved, not that its checks passed. Keep observation status distinct from the
exit status of the retrieval command. A local checkout, old description or cached
head does not establish the current remote comparison.

For a requested action, distinguish comment, approval, request-changes, reply and
resolution. A reply does not resolve a thread; a drafted review is not publication;
a request accepted without read-back is not a verified resulting state. A current
inline anchor must belong to the supplied current diff. If head identity changes,
return the affected judgment/currentness need before a live action is treated as
supported. Never infer action authority from a favorable review conclusion.

Return the relevant facts, completeness/currentness limits and the exact missing
receipt. A merge recommendation belongs to review; executing an authorized
operation belongs to the shell and its PR-operations contract.
