# PDF Artifact authoring

Use this reference after reading the current Create PDF Artifact authoring
resource. The live resource owns the node contract, renderer version, document
shell, published classes, limits, and error shapes. Read it again for each
authoring run.

A document system is the set of rules that turns each accepted payload into a
complete, intentional sequence of pages. Page count can be a required invariant
or an allowed change. Name that choice in the contract.

## 1. Write the document contract

Record the reader and job. State what the reader must understand or do. Define
the information structure and semantics, including heading order, table
relationships, links, image alternatives, language, and reading order. Name the
page-count behavior and every other invariant before writing HTML or CSS.

Map each content region with these exact fields:

| Region | Accepted content | Must stay true | May change | Fit or continue | Outside behavior |
| --- | --- | --- | --- | --- | --- |
| Example: summary | Product-approved titles, text, and optional evidence | Heading stays with its first content; all evidence remains present | Height and page position | Continue in normal flow | Summarize upstream or create an appendix |

Write each `Must stay true` entry as a named invariant. Record allowed page-count
change in `May change` for each affected region.

Accepted content is the semantic product boundary. It states what the artifact
promises to handle. A technical ceiling is a validator, service, or execution
limit. A sample-driven fit cap is only the largest sample observed to fit a
particular composition. Keep these three concepts separate.

`Fit` means the region stays as one unit. A kept region needs a semantic fit
argument that explains why a split harms meaning and why every accepted unit is
smaller than the printable area. It also needs current render proof for every
demanding Accepted content case.
`Continue` means Accepted content may cross a page boundary. A growing region
needs authored continuation that preserves its context and reading order. The
semantic boundary never serves as continuation. Outside behavior applies only
after source content leaves the Accepted content boundary. It may summarize,
rank and disclose a subset, move detail to an appendix, or create another
artifact.

When one page is a required invariant, render every Accepted content partition
and interaction that can challenge it. If the invariant fails, change the
composition or make an explicit product decision about Accepted content. Font
shrinking, clipping, and silent truncation do not preserve the invariant.

Completion criterion: the reader, job, information structure, semantics,
page-count behavior, and every region-map cell are explicit. Each kept region
has a semantic fit argument. Each growing region has authored continuation.

## 2. Assign break intent

Map pagination at the smallest unit that carries meaning. Keep a unit together
when a split would damage meaning. Let its parent continue through normal flow.

| Intent | Authoring choice |
| --- | --- |
| Normal flow | Use ordinary block flow. |
| Independent atom | Consider the current `pdf-atom` hook and prove the full unit fits. |
| Small semantic group | Consider the current `pdf-keep-together` hook and prove every accepted instance fits. |
| Protected unit that may grow | Consider the current `pdf-can-split` hook and verify the observed split. |
| Growing table | Consider the current `pdf-table-fragmentable` hook and verify row and header behavior. |
| Kept table | Consider the current `pdf-table-keep-together` hook only with whole-table fit proof. |
| Keep with next | Use `break-after: avoid` on a heading, caption, or label and verify the pairing. |
| Start a page | Use `break-before: page` for a deliberate page start. |

The live resource publishes pagination class names. It does not publish their
complete CSS declarations, precedence, or interaction with author CSS. Treat a
class as a candidate hook. The current render proves its behavior in this
document system.

A keep rule can move a box to the next page and leave open space. It cannot make
an oversized box fit. Apply keep intent to a row, card, figure, or small heading
group only after fit proof for its demanding Accepted content cases. Let a
growing list, report section, or table continue between semantic children.

Completion criterion: every variable region names its allowed break points,
kept units have fit proof, and units taller than a page have a readable split or
semantic decomposition.

## 3. Design pages and continuation

Choose page size, orientation, margins, edge-to-edge regions, and named page
types here. Start from the current live resource. Leave enough margin for page
furniture and readable content.

```html
<style>
  @page {
    size: letter;
    margin: 0.62in 0.55in 0.66in;

    @top-left {
      content: "Decision brief";
      color: var(--pdf-muted);
      font-size: 8pt;
    }

    @bottom-right {
      content: counter(page) " / " counter(pages);
      color: var(--pdf-muted);
      font-size: 8pt;
    }
  }

  @page:first {
    @top-left { content: none; }
  }
</style>
```

Use margin boxes for page numbers, repeated labels, and other furniture. For
data-driven furniture, render escaped HTML into a running element and place the
element in a margin box:

```html
<header class="running-header">
  {{ json.account.name | escape }}
</header>

<style>
  .running-header { position: running(document-header); }

  @page {
    @top-left { content: element(document-header); }
  }
</style>
```

Use named pages when a cover, body, appendix, or landscape table needs distinct
geometry. Keep a full-bleed cover bounded. Put growing text in body flow.

```html
<style>
  .cover { page: cover; }
  .body { page: body; }

  @page cover { margin: 0; }
  @page body { margin: 0.62in 0.55in 0.66in; }
</style>
```

Author continuation pages with the context a reader needs. State which
furniture, labels, counters, and section cues repeat or change. Put a full-height
rail beside growing content in the page background or page furniture. A bounded
rail inside one content box ends with that box.

Completion criterion: the first page, continuation pages, named pages,
furniture, rails, and edge-to-edge regions have authored geometry and context
treatment.

## 4. Compose variable content in normal flow

Use block and table flow for content whose height changes. Use grid and flex for
bounded groups such as a short stat row. Inspect every fragmentation choice in
the PDF renderer.

Fixed heights belong on fixed content. Let dynamic text set its own height.
Remove hidden overflow, line clamps, and absolute positioning from growing
content. Reserve absolute positioning for bounded decoration or a proven
overlay.

Set text break behavior in the source:

```html
<main class="pdf-document report" lang="en">
  <!-- document content -->
</main>

<style>
  .report {
    hyphens: auto;
    overflow-wrap: break-word;
  }

  p,
  li {
    orphans: 3;
    widows: 3;
  }

  h2,
  h3,
  .keep-with-next {
    break-after: avoid;
  }

  .start-page {
    break-before: page;
  }
</style>
```

Automatic hyphenation needs a matching `lang` attribute. Keep links and other
tokens readable when they wrap. Test every accepted language and demanding
title, identifier, and URL partition.

Render an optional section only when it has content. Put the Liquid condition
around the whole section so an absent value leaves no empty heading, card,
border, or gap.

Follow the live resource for allowed image sources. Choose one image fit
behavior for each Accepted content partition:

- Scale proportionally inside a bounded printable box.
- Place the image on a dedicated page with suitable geometry.
- Decompose a composite into separately labeled figures when each part keeps
  its meaning.
- Use a product-defined crop only when the crop preserves meaning for every
  accepted image.

Keep a figure and caption together only with fit proof for their combined unit.
Let the surrounding section continue.

Completion criterion: dynamic content uses normal flow, optional wrappers
collapse, long text remains legible, and every image partition has a proven fit
choice.

## 5. Compose tables for pagination

Use a semantic `table` with `thead`, `tbody`, and `tfoot` when needed. Author
header relationships in HTML. Treat repeated headers as behavior to verify in
the current render.

```html
<h2 class="table-heading">Evaluation</h2>
<table class="pdf-data-table pdf-table-fragmentable">
  <thead>
    <tr>
      <th scope="col">Option</th>
      <th scope="col">Evidence</th>
    </tr>
  </thead>
  <tbody>
    <!-- Liquid row loop -->
  </tbody>
</table>

<style>
  .table-heading { break-after: avoid; }
</style>
```

Choose row behavior from the row contract:

- Keep a row atomic only when its demanding Accepted content cases fit within
  one page.
- Let a row split only when labels and reading order remain clear across the
  break.
- Reshape a large record into smaller rows or labeled blocks when a split would
  lose context.
- Keep the whole table together only with fit proof for every accepted table
  case.

Set column widths from Accepted content. Exercise the widest labels, longest
cells, and combinations that can occur. Resolve width pressure by changing
column allocation, using a named landscape page, stacking labeled values,
splitting one table into semantically linked tables, or removing a column only
through a product decision. Smaller type and tighter spacing remain subject to
the legibility invariant.

If repeated headers are required, verify them at each observed page transition.
Confirm that continued rows retain meaning under the repeated header.

Completion criterion: the table has semantic groups, an authored row policy,
width-pressure behavior, and render proof for required header repetition,
splits, and whole-table keeps.

## 6. Align Liquid with the content contract

Create PDF Artifact uses strict Liquid templates. A missing path fails the
item. Guard an optional value with `if` or give it an intentional `default`.
Escape every workflow value inserted as HTML text:

```liquid
{{ json.title | escape }}
```

HTML escaping covers HTML text. CSS, URLs, attributes, and intentional raw
markup need their own trusted source or context-specific encoding.

Follow [Data Context loop limits](data-context.md#liquid-loop-limits) for the
validator requirements. A technical loop ceiling bounds template execution. It
does not define visual scope or Accepted content. Visual scope comes from the
region map. A Liquid limit may enact an explicit Outside behavior. It cannot
silently remove accepted records to make the layout fit.

A custom AI output schema can make section and field shapes predictable. Prompt
bounds are requested behavior, not enforced proof. They do not enforce string
length or array size. Map possible outputs to Accepted content, define
insufficient-context behavior, and render the demanding partitions.

Completion criterion: each Liquid path exists or has an optional branch, each
HTML text insertion is escaped, validator loop requirements pass, and any loop
limit implements named Outside behavior.

## 7. Render Accepted content cases

Workflow validation checks the document and template rules. It does not render
PDF pages. A continuous browser preview does not prove paged output.

Partition every `Accepted content` cell into cases that can change layout or
semantics. Include absent and present optional values, short and long text,
long tokens, collection shapes around page transitions, image aspect ratios,
required languages, and every product boundary. Add interaction cases for
partitions that can occur together, such as a long title with a wide table or a
large figure followed by a kept summary. Render each case through the current
workflow path or a trusted local harness that uses the current shell and
renderer.

Apply these universal checks to every case:

- completeness;
- legibility;
- semantics and reading order;
- authored fit-or-continue behavior;
- no clipping, overlap, hidden content, or accidental blank pages.

Take artifact-specific visual checks from the region map's `Must stay true`
cells. These checks include page count only when page count is a named invariant.
Inspect every page at thumbnail scale and readable zoom.

Record provenance for each case:

| Render path | Required identity |
| --- | --- |
| Workflow execution | Workflow version URI, execution URI, and the PDF node's returned `artifactId` |
| Trusted local harness | Harness source file and hash, plus the PDF output path |

Missing identity means the case is unverified. A proof belongs to the current
document system version. Any HTML, CSS, content contract, shell, or renderer
change invalidates the affected proof.

Inspect semantics through authored HTML and any available PDF structure view.
Check heading order, `th` and `scope`, link targets, image `alt` text, and DOM
reading order. Inspect the PDF tag tree when a tool exposes it. Page images prove
appearance only. Mark unavailable structure or assistive reading-order proof as
unverified. Semantic HTML alone does not prove PDF/UA conformance.

Creating the PDF is a side effect. Follow the execution authorization gate in
`SKILL.md`. When authorization or a trusted harness is unavailable, report the
affected cases and named invariants as unverified.

Completion criterion: every Accepted content partition and required interaction
has an inspected, identified current render. Each named invariant has explicit
proof or an unverified status.

## 8. Correct the smallest responsible unit

The document contract governs correction. Keep this loop subordinate to its
Accepted content and named invariants.

| Symptom | Likely authoring correction |
| --- | --- |
| Heading stranded at page bottom | Apply `break-after: avoid` to the heading or a small heading group, then verify the pairing. |
| Large blank area before a section | Shrink the keep scope and let the parent continue. |
| Whole table jumps to a new page | Use a fragmentable table candidate unless the whole table has fit proof. |
| Short row splits | Keep that row atomic and prove every accepted row case fits. |
| Long row clips or overflows | Let the row split or reshape the record into smaller semantic units. |
| Table fails under width pressure | Reallocate columns, use a named landscape page, stack labeled values, or decompose the table. |
| Full-height rail ends on page one | Move it to page furniture or a page background. |
| Dynamic text clips | Remove fixed height, absolute placement, line clamp, or hidden overflow from its ancestors. |
| Required page-count invariant fails | Change the composition or request a product decision about Accepted content. |
| Accepted content disappears | Restore it and implement the named Outside behavior beyond the product boundary. |
| A named invariant is lost | Correct the responsible region and rerender every case that exercises the invariant. |

Fix the smallest element responsible for the failed proof. A global font,
spacing, or scale change affects every region and requires broad regression
proof.

After each correction, render the affected case and its interaction cases.
Rerun every case that shares changed CSS, structure, content, shell, or renderer.

Completion criterion: the corrected case and its regression cases pass the
universal checks and their named invariants. Report blocked proof as unverified.
