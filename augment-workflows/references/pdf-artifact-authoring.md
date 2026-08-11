# PDF Artifact authoring

Use this reference after reading the current Create PDF Artifact authoring
resource. The live resource owns the node contract, renderer version, document
shell, published classes, limits, and error shapes. This guide owns the choices
that turn variable data into an intentional paged document.

Page count follows from the content contract and the composition. A one-page
requirement needs a bounded maximum and a render at that maximum. Variable
content needs continuation treatment.

## 1. Write the document contract

Define the document before writing HTML or CSS.

| Decision | Record |
| --- | --- |
| Reader and job | Who will read the artifact and what should they understand or do? |
| Page geometry | Paper size, orientation, margins, edge-to-edge regions, and any named page types. |
| Fixed content | Labels, furniture, marks, and images whose size the author knows. |
| Variable content | Titles, paragraphs, lists, tables, images, and optional sections fed by Liquid. |
| Rendered bounds | The shortest, typical, and longest accepted value for each field and collection. |
| Excess behavior | What happens when source data exceeds the rendered cap. |
| Page continuity | What repeats or changes after the first page so the reader keeps context. |
| Required semantics | Heading order, table headers, links, image alternatives, language, and reading order. |

Give every rendered collection an authored cap. Workflow Liquid enforces this
for loops over `json`, `trigger`, `author`, and `organization`. The workflow
receives a finite `items` array, but its document output can still grow. Choose
a product behavior for records beyond the cap: summarize them upstream, rank
and disclose a subset, place them in an appendix, or create more than one
artifact. A Liquid `limit` must enact that choice. It must not hide records to
make a layout fit.

When one page is a requirement, the contract must say what content can appear
and how long it can be. Render the longest accepted payload. If it creates a
second page, revise the content contract or the composition. Global font
shrinking, clipping, and silent truncation do not satisfy the requirement.

Completion criterion: every dynamic field and collection has a rendered bound,
optional state, excess behavior, and intended effect on page count.

## 2. Assign break intent

Map pagination at the smallest unit that carries meaning. Keep an item together
when splitting that item would confuse the reader. Let its parent continue
through normal flow.

| Intent | Authoring choice |
| --- | --- |
| Normal flow | Use ordinary block flow. Add `pdf-can-split` when a published component class protects a box that may grow. |
| Independent atom | Add `pdf-atom` to one repeating item that you tested to fit on a page. |
| Small group | Add `pdf-keep-together` to a bounded heading, summary, or related group that loses meaning when split. |
| Growing table | Add `pdf-table-fragmentable` to the table and use semantic row groups. |
| Bounded table | Add `pdf-table-keep-together` only after you render the maximum table on one page. |
| Keep with next | Add a class with `break-after: avoid` to a heading, caption, or label. |
| Start a page | Add a class with `break-before: page` when a section needs a deliberate page start. |

The Augment shell protects `tbody tr`, `pdf-card`, `pdf-stat`, and `pdf-atom`
from page breaks. Add `pdf-can-split` when one of those units can exceed the
printable page area. A keep rule can push a box to the next page and leave open
space behind. It cannot make an oversized box fit.

Apply keep rules to a row, card, figure, or small heading group. Let a variable
list, whole report section, or growing table fragment between its children.

Completion criterion: for each variable region, name where a page may break,
where it should avoid a break, and what happens when one unit grows taller than
a page.

## 3. Design pages and continuation

Start from the page size and margins in the live authoring resource. Author CSS
may set a different size, orientation, or margin with `@page`. Leave enough
margin for running furniture and readable content.

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

Use margin boxes for page numbers, repeated labels, and other page furniture.
For data-driven furniture, render escaped HTML into a running element and place
that element in a margin box:

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

Use named pages when a cover, body, appendix, or landscape table needs different
geometry. A full-bleed cover can use `@page cover { margin: 0; }`, while the body
uses a named page with reading margins and repeated furniture. Keep cover
content bounded. Put variable text in the body flow.

```html
<style>
  .cover { page: cover; }
  .body { page: body; }

  @page cover { margin: 0; }
  @page body { margin: 0.62in 0.55in 0.66in; }
</style>
```

A full-height color rail or panel beside a growing content column can become one
layout box whose decoration and sibling columns do not continue with the text.
Move the rail into the page background or margin furniture, or repeat a bounded
header on each page.

Completion criterion: the first page, continuation pages, special page types,
and edge-to-edge regions each have authored geometry and context treatment.

## 4. Compose variable content in normal flow

Use block and table flow for content whose height changes. Use grid and flex for
bounded groups such as a short stat row. Inspect them in the PDF renderer because
their fragmentation behavior differs from a browser layout.

Fixed heights belong on fixed content. Let dynamic text set its own height.
Avoid `overflow: hidden`, line clamps, and absolute positioning as layout
repairs. Use absolute positioning for bounded decoration or a proven overlay.

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
tokens readable when they wrap. Test the longest title, identifier, and URL the
contract accepts.

Render optional sections only when they have content. Put the Liquid condition
around the whole section so an absent value does not leave an empty card,
heading, border, or gap.

Images must use data URLs. Give each image a known aspect ratio, `max-width:
100%`, and a height that fits inside the printable area. Keep a figure and its
caption together when their maximum combined height fits. Split the surrounding
section instead.

Completion criterion: dynamic content has no fixed-height ancestor, hidden
overflow, empty optional wrapper, or untested long-token path.

## 5. Compose tables for pagination

Use a semantic `table` with `thead`, `tbody`, and `tfoot` when needed. The shell
repeats `thead` and `tfoot` on continuation pages and protects ordinary body
rows from splitting.

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
    <!-- bounded Liquid row loop -->
  </tbody>
</table>

<style>
  .table-heading { break-after: avoid; }
</style>
```

Choose row behavior from the row contract:

- Keep an ordinary row atomic when its longest accepted content fits within one
  page.
- Add `pdf-can-split` to a row that may exceed a page and can stay readable when
  split.
- Reshape a large record into smaller rows or stacked blocks when a split row
  would lose labels or context.
- Keep the whole table together only when the maximum table fits in the
  printable area.

Set column widths for the content, not for one sample. Test the widest label and
longest cell text. A header that repeats is useful only when each continued row
still makes sense under that header.

Completion criterion: the table has a repeated header, an authored row policy,
a maximum row count, a longest-row case, and no whole-table keep rule without
fit proof.

## 6. Align Liquid with the content contract

Create PDF Artifact uses strict Liquid templates. A missing path fails the
item. Guard optional values with `if` or give them an intentional `default`.
Escape workflow values inserted as HTML text:

```liquid
{{ json.title | escape }}
```

HTML escaping does not make a value safe for CSS, a URL, or an attribute. Keep
untrusted workflow text out of `<style>` and write context-specific encoding
for other insertion sites.

Use a numeric Liquid loop limit that matches the rendered cap from step 1. If
the source collection can contain more records, disclose or handle the remainder
before the PDF node.

A custom AI output schema can make section and field shapes predictable. The
supported schema subset does not enforce string length or array size. Put those
bounds in the AI prompt, define insufficient-context behavior, and test the
longest accepted result.

Completion criterion: each Liquid path exists or has an optional branch, the
author escapes each HTML text insertion, and each loop cap matches a stated
product behavior.

## 7. Render the content matrix

Workflow validation checks the document and some template rules. It does not
render PDF pages. A continuous browser preview also cannot show the actual page
fragmentation.

Render these cases with the same PDF path used by the workflow:

| Case | Stress tested |
| --- | --- |
| Minimum | Smallest valid content and sparse-page balance. |
| Typical | Expected hierarchy, density, and rhythm. |
| Contract maximum | Page count, continuation, and every authored cap. |
| Optional values absent | Conditional sections and collapsed spacing. |
| Long title and token | Wrapping, heading height, identifiers, and links. |
| Long paragraph or list item | Widows, orphans, hyphenation, and atom choice. |
| Maximum table rows | Repeated headers and page transitions. |
| Longest table row | Atomic-row fit or intentional row splitting. |
| Image extremes | Scaling, aspect ratio, caption grouping, and page fit. |
| Required languages | Glyph coverage, hyphenation, and text expansion. |

Inspect every page at thumbnail scale and readable zoom. Check:

- page size, margins, backgrounds, and edge-to-edge regions;
- first-page and continuation furniture, including page counters;
- complete content with no clipping, overlap, hidden records, or accidental
  blank pages;
- headings kept with the content they introduce;
- atoms and small groups kept together only where intended;
- table headers repeated and rows handled by their authored policy;
- text rhythm, long-token wrapping, image scale, and caption placement.

Inspect semantics through the authored HTML and any available PDF structure
view. Check heading order, `th` and `scope` use, link targets, image `alt` text,
and DOM reading order in the source. Inspect the PDF tag tree when a tool exposes
it. Page images prove appearance, not the tag tree or assistive reading order.
When PDF structure inspection is unavailable, report those semantics as
unverified.

Semantic HTML enables best-effort tagged output. It does not prove PDF/UA
conformance.

Creating the PDF is a side effect. `SKILL.md` still requires execution
authorization. When no test execution or trusted harness with the same shell
and renderer is available, report the layout as unverified instead of inferring
readiness from validation.

Completion criterion: every required content case has an inspected PDF result,
and the author accepts each observed break or records it for correction.

## 8. Correct the smallest responsible unit

| Symptom | Likely authoring correction |
| --- | --- |
| Heading stranded at page bottom | Add `break-after: avoid` to the heading or a small heading group. |
| Large blank area before a section | Shrink the scope of `pdf-keep-together`; let the parent fragment. |
| Whole table jumps to a new page | Use `pdf-table-fragmentable` unless the maximum table fits. |
| Short row splits | Keep that row atomic and confirm its maximum height. |
| Long row clips or overflows | Add `pdf-can-split` or reshape the record into smaller units. |
| Full-height panel ends on page one | Move it to page furniture, a page background, or a bounded repeated region. |
| Dynamic text clips | Remove fixed height, absolute placement, line clamp, or hidden overflow from its ancestors. |
| One-page maximum creates page two | Reduce the accepted content, change the composition, or remove the one-page requirement. |
| Content disappears at the cap | Implement the excess behavior instead of relying on Liquid `limit`, truncation, or clipping. |

Fix the smallest element responsible for the bad break. A global font, spacing,
or scale change can hide one overflow while weakening every other content case.

After each correction, render the affected matrix case again. Rerun every case
that shares changed CSS, structure, or content bounds. A shared style change
usually requires the full matrix.

Completion criterion: the corrected case and its regression cases pass the
page inspection and applicable semantic checks, with any blocked proof reported
as unverified.
