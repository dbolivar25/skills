# Composition

These rules apply to every Augment surface: product UI, documents, marketing.
Branch files add a floor and a set of facets. They do not override anything here.

Each rule commits to as little as it can while still forbidding something. Where
a rule seems to permit a lot, that is intended. It should reject work nobody has
drawn yet, instead of cataloguing mistakes someone already made. If you add a
rule, name one composition it forbids and one it now allows that a stricter
version would have blocked. Drop any rule that forbids nothing.

---

## Object

A border or an elevated surface marks a boundary the reader can act on or address
separately.

A card frames an object: a record, an account, an item in a set, something that
can be opened, dismissed, assigned, or referred to on its own. When the content
inside cannot be addressed apart from the content beside it, the frame is
drawing a boundary that does not exist.

Mark a real addressable surface with `data-aug-surface`. When a set of repeated
objects needs automated comparison, mark the container `data-aug-set` and each
direct repeated object `data-aug-item`.

What follows from that:

- An analysis, a conclusion, or a paragraph of reasoning is not an object. It
  reads as body text on the page.
- Twelve repeated records in a product list are twelve objects, so twelve cards
  is correct. No exception clause is needed to allow it.
- A card inside a card claims the inner content can be addressed apart from its
  own frame, which is rare. Where it does hold, the outer frame was the page.
- A label plus a value plus a source is a fact, not an object. Facts get rows.

When the boundary is real but the object should stay quiet, drop the elevation
before you drop the frame. A hairline with no shadow still separates.

## State

A pill carries state that can change: status, count, stage, severity, a live
condition. Something that could read differently on the next render.

What follows from that:

- A pill around a fixed property of the artifact, a mode, a promise about how the
  system behaves, or a description of the process is decoration shaped like a
  control. Say it in a sentence, or cut it.
- Two pills competing for the same slot means one of them is a title.
- If the reader can neither act on a pill nor watch it change, it is a label. Set
  it as one.

## Small type

Small type carries information the heading does not.

A step index, a breadcrumb, a column header, a field label, an object type, a
timestamp: each tells the reader something the heading beside it leaves out.

What follows from that: a small tracked line that restates or previews the
heading fails on its own terms, because it occupies a line and adds nothing. That
line is the eyebrow, and this rule bans it without a separate clause. Breadcrumbs
and step indices pass without needing an exemption.

## Spine

Every chromatic value names its role on the surface before you use it.

Burgundy-plum is the spine, and neutrals and bone hold everything else. Four
roles are available:

| Role | What it covers |
|---|---|
| Identity | The mark and the wordmark. `#cf0147` lives here and in artwork |
| Signal | A state the reader must notice: error, warning, success, the one number a page is about |
| Atmosphere | A large brand field: swirl, glow, a dark panel |
| Artwork | Deliberate composition at scale |

What follows from that: a divider, a rule, an arrow, a bullet, a heading accent,
and a kicker have no role to claim, so they take a neutral. The same holds for
every chromatic value in the system, including ones nobody has reached for yet.

A branch can narrow which roles are available, and `documents.md` does.

Declare the role in the markup on every chromatic fill and stroke:
`data-aug-role="identity|signal|atmosphere|artwork"`. The attribute is where you
answer the question, so declaring it is the point. Text color goes unaudited,
since burgundy text is the spine doing its job.

## One home

Each fact appears once.

A number in a card and again in a summary strip is one fact with two homes, and
the second one makes the reader check whether it is the same number.

What follows from that:

- A closing section that restates what the page already established gives the
  whole page a second home.
- A caption that repeats its figure's label is a second home.
- Repetition for navigation works differently. A running header, a page number,
  or a persistent nav item tells the reader where they are, and it has one home
  each time it appears.

## Focal point

One thing per view is largest, darkest, or most saturated, and everything else
defers to it.

A view with three elements at equal weight has no focal point, so the reader
picks one at random. Test it by looking at the render at thumbnail size. Whatever
you see first is the focal point. If you see a texture instead of a thing, fix
the composition before you touch the styling.

## Naming what went wrong

Use these when you review, so a finding reads as a diagnosis instead of an
adjective. The first five cause the feeling that something looks generated. The
last five are process failures.

| Cause | What it looks like | Fix |
|---|---|---|
| No focal point | Several elements at equal weight, and the eye lands nowhere | Promote one, demote the rest |
| Muddled hierarchy | Weight does not track importance | Make weight track importance |
| Crowded proximity | Groups touch, so unrelated things read as related | Group by spacing, separate the rest |
| Unbalanced weight | One quadrant heavy, the rest empty, with no intent behind it | Redistribute, or make the asymmetry intentional |
| Inconsistent repetition | The same element class composed differently each time | Compose one, apply it to all |
| Decoration-first | Reaching for a container or an accent before naming the job | Name the job, then choose the element |
| Grammar drift | Radius, stroke, spacing, or casing off-system | Return to tokens |
| Premature completion | Called done before rendering | Render it |
| Unverified polish | Styling refined on a composition nobody has looked at | Render, then judge the composition |
| Overfitting | Solving the last artifact instead of the class of artifact | Ask what the rule forbids beyond this one |
