# Branch: product UI

Application surfaces someone operates: lists, tables, detail views, forms,
dashboards, agent runs, dense data.

## Moment

Someone is mid-task, in this screen repeatedly, and needs the next move to be
obvious. They will use it again tomorrow.

## Floor

Two floors apply here, and both are minimums.

The interface floor: every interactive element has a hit area of at least 44px, a
focus ring, and hover, press, disabled, and loading states. Every view has
loading, empty, error, and populated states. Keyboard reaches everything.

The AI product floor: anything the platform generates or acts on also shows
progress while it runs, gives the reader an error they can recover from,
preserves the user's work when it fails, and produces a traceable output the
reader can trace back to its inputs. An AI surface that cannot show its sources
sits below the floor however good it looks.

## Facets

Precise, dense, calm, legible under repetition.

## What this branch permits

Repetition belongs here. A list of forty records is forty objects, so forty
cards or forty rows is right, and the same goes for status pills holding live
state and filter chips holding selection. None of that needs justifying, since
it already satisfies `composition.md`.

Where repetition gets dense, drop weight and keep the structure: no shadow,
`.aug-edge-glow--flat`, hairline rules in place of frames.

## Density

Calm at density comes from grouping and alignment. Shared edges, one baseline
grid, and consistent row height do more for it than padding.

Compose repeated elements of the same class identically. At density, inconsistent
repetition is the most visible defect you can ship.

## Signal

`--red` for error, `--gold` for warning, `--green` for success, burgundy for
focus and selection. Where a color is not marking a status, use a neutral.
