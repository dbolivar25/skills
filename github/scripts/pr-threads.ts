#!/usr/bin/env node
// The review conversation for a PR: review bodies, issue comments, and inline
// threads with resolution state (isResolved/isOutdated; porcelain gh can't get it).
import { parseArgs } from "node:util";
import { resolvePr, resolveRepo, run, truncate } from "./lib.ts";
import { prReviews, prComments, prThreads } from "./pr-data.ts";

const USAGE = `usage: pr-threads.ts [pr] [-R owner/repo] [--all] [--author login] [--since ISO] [--full] [--json]

Review conversation for a PR: review bodies, issue comments, and unresolved
inline threads. Resolved/outdated threads are hidden by default (the header
counts them); --all includes them. Omit [pr] to use the current branch's PR.
  --all          include resolved and outdated threads
  --author X     only items by X (threads: any comment by X)
  --since TS     only items with activity at/after TS (ISO 8601)
  --full         don't truncate bodies
  --json         structured output, shape:
                 { conversation: [{kind: "review"|"comment", state?, author,
                                   createdAt, body}],
                   coverage: {complete, reviews, issueComments, threads, threadComments},
                   threads: [{id, isResolved, isOutdated, path, line, originalLine,
                              moreComments,
                              comments: [{author, createdAt, body}]}] }`;

interface Comment {
  author: string;
  createdAt: string;
  body: string;
}
interface Thread {
  id: string;
  isResolved: boolean;
  isOutdated: boolean;
  path: string;
  line: number | null;
  originalLine: number | null;
  moreComments: boolean;
  comments: Comment[];
}
interface ConvoItem {
  kind: "review" | "comment";
  /** Review state (APPROVED, CHANGES_REQUESTED, COMMENTED); reviews only. */
  state?: string;
  author: string;
  createdAt: string;
  body: string;
}

async function fetchConversation(repo: string, pr: number) {
  const [reviews, comments, rawThreads] = await Promise.all([
    prReviews(repo, pr), prComments(repo, pr), prThreads(repo, pr),
  ]);
  const convo: ConvoItem[] = [];
  for (const r of reviews) {
    // Draft and empty review bodies are omitted from the conversation, but counted in coverage.
    if (r.state === "PENDING" || !r.body?.trim()) continue;
    if (!r.submittedAt) throw new Error("Submitted review lacks a timestamp");
    convo.push({ kind: "review", state: r.state, author: r.author?.login ?? "ghost",
      createdAt: r.submittedAt, body: r.body });
  }
  for (const c of comments) {
    convo.push({ kind: "comment", author: c.author?.login ?? "ghost", createdAt: c.createdAt, body: c.body });
  }
  convo.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
  const threads: Thread[] = rawThreads.map((t) => ({
    id: t.id, isResolved: t.isResolved, isOutdated: t.isOutdated,
    path: t.path, line: t.line, originalLine: t.originalLine, moreComments: false,
    comments: t.comments.nodes.map((c) => ({ author: c.author?.login ?? "ghost", createdAt: c.createdAt, body: c.body })),
  }));
  return { convo, threads, coverage: { complete: true, reviews: reviews.length,
    issueComments: comments.length, threads: threads.length,
    threadComments: threads.reduce((n, t) => n + t.comments.length, 0) } };
}

run(async () => {
  const { values: v, positionals } = parseArgs({
    options: {
      repo: { type: "string", short: "R" },
      all: { type: "boolean" },
      author: { type: "string" },
      since: { type: "string" },
      full: { type: "boolean" },
      json: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
    allowPositionals: true,
  });
  if (v.help) return void console.log(USAGE);
  const pr = await resolvePr(positionals[0], v.repo);
  const repo = await resolveRepo(v.repo);

  let { convo, threads, coverage } = await fetchConversation(repo, pr);
  const totalThreads = threads.length;
  let hidden = 0;
  if (!v.all) {
    threads = threads.filter((t) => !t.isResolved && !t.isOutdated);
    hidden = totalThreads - threads.length;
  }
  if (v.author) {
    convo = convo.filter((i) => i.author === v.author);
    threads = threads.filter((t) => t.comments.some((c) => c.author === v.author));
  }
  if (v.since) {
    const since = Date.parse(v.since);
    if (Number.isNaN(since)) throw new Error(`--since is not a date: ${v.since}`);
    convo = convo.filter((i) => Date.parse(i.createdAt) >= since);
    threads = threads.filter((t) => t.comments.some((c) => Date.parse(c.createdAt) >= since));
  }

  if (v.json) return void console.log(JSON.stringify({ conversation: convo, threads, coverage, filters: { all: !!v.all, author: v.author ?? null, since: v.since ?? null } }, null, 2));

  const reviews = convo.filter((i) => i.kind === "review").length;
  const comments = convo.length - reviews;
  const threadStat = v.all
    ? `${threads.length}/${totalThreads} threads (${threads.filter((t) => !t.isResolved).length} open · ${threads.filter((t) => t.isOutdated).length} outdated)`
    : `${threads.length}/${totalThreads} threads${hidden > 0 ? ` (${hidden} resolved/outdated hidden; --all shows)` : ""}`;
  const convoStat = `${reviews} review ${reviews === 1 ? "body" : "bodies"} · ${comments} comment${comments === 1 ? "" : "s"} · `;
  console.log(`${repo}#${pr}: ${convoStat}${threadStat}\n`);
  if (convo.length === 0 && threads.length === 0) {
    return void console.log(totalThreads === 0 ? "no review activity" : "nothing matches the filters");
  }

  for (const item of convo) {
    const tag = item.kind === "review" ? `[review · ${item.state}]` : "[comment]";
    const body = v.full ? item.body : truncate(item.body, 600);
    console.log(`${tag} @${item.author} (${item.createdAt.slice(0, 10)})`);
    console.log(`  ${body.replace(/\n/g, "\n  ")}\n`);
  }

  threads.forEach((t, i) => {
    const state = t.isResolved ? "RESOLVED" : "OPEN";
    const outdatedTag = t.isOutdated ? " · outdated" : "";
    const loc = t.line ?? (t.originalLine != null ? `${t.originalLine} (original)` : "?");
    console.log(`[${i + 1}] ${state}${outdatedTag} · ${t.path}:${loc}`);
    for (const c of t.comments) {
      const body = v.full ? c.body : truncate(c.body, 600);
      console.log(`  @${c.author} (${c.createdAt.slice(0, 10)}): ${body.replace(/\n/g, "\n    ")}`);
    }
    console.log();
  });
});
