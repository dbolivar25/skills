# Experiment contract

Use this with the logic or UI experiment branch. A prototype is throwaway code
that answers a question. A known answer needing explanation uses visual forms,
not this experiment lifecycle.

Choose logic when the uncertainty concerns state, transitions, or a model; choose
UI when it concerns structure and appearance. If genuinely ambiguous and the
user is unavailable, follow the surrounding work (backend module suggests logic;
page or component suggests UI) and state the assumption on the artifact.

## Rules that apply to both

1. **Throwaway from day one, and clearly marked as such.** Locate the prototype code close to where it will actually be used (next to the module or page it's prototyping for) so context is obvious — but name it so a casual reader can see it's a prototype, not production. For throwaway UI routes, obey whatever routing convention the project already uses; don't invent a new top-level structure.
2. **Trivial to run.** A UI prototype starts from one command in the project's task runner — `pnpm <name>`, `python <path>`, `bun <path>`, etc. A logic demo is a single HTML file the user double-clicks. Either way, no thinking required to start it.
3. **No persistence by default.** State lives in memory. Persistence is the thing the prototype is _checking_, not something it should depend on. If the question explicitly involves a database, hit a scratch DB or a local file with a clear "PROTOTYPE — wipe me" name.
4. **Skip the polish.** No tests, no error handling beyond what makes the prototype _runnable_, no abstractions. The point is to learn something fast.
5. **Surface the state.** After every action (logic) or on every variant switch (UI), print or render the full relevant state so the user can see what changed.
6. **Capture it when done.** Record the question, observed answer, limits, and a context pointer to the prototype as a **primary source**. Preserve it on a throwaway branch or in the task’s agreed artifact location. Posting to an issue requires the surrounding task’s publication authority. When implementation is already authorized, carry the supported decision into real code through normal implementation checks. Otherwise, deliver the learning and artifact. The prototype’s result is evidence for a decision; it is not production verification.
