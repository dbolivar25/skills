# Diagram Design asset consolidation

The October 6, 2026 consolidation reduces Diagram Design from 328 to 153 package files, excluding generated Python caches. It removes no diagram method, recipe, example variant, icon source, or attribution context. The package grows from 2,927,021 to 3,214,027 bytes because the complete sources are retained with safe JSON escaping and verification metadata. This is a file-count reduction, not byte compression.

## Storage and access

The 92 dark/full example documents are stored as named complete sources in `assets/index.html`. The 87 complete SVG sources are stored in `assets/icons.html`; the original inline visual previews remain. All 54 light/single examples, five standalone templates, 12 fonts, import converters, export registry, and source checker retain their original bytes and paths.

The galleries retain selection and keyboard navigation and add stable fragment selection, standalone source opening, and downloads. The original dark/full and per-icon file paths are retired. Recipes and the icon/provenance indexes point to the corresponding gallery fragments. [Targeted source retrieval](../diagram-design/references/asset-sources.md) explains how to recover a chosen standalone file without loading the whole catalog into agent context or extracting the library into the package.

The original complete sources recover exactly, including SVG namespaces, IDs, paints, geometry, Unicode, and line endings. The test oracle was captured from the original assets before consolidation. Intentional future source edits require reviewing the behavior change before updating those expectations.

## Repeatable checks

Run the package and suite checks from the repository root:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s diagram-design/tests
ruby scripts/validate-skills.rb
ruby tests/validate-skills_test.rb
git diff --check
```

The browser acceptance utility uses an already available Playwright and pngjs runtime. It exposes only public diagram assets through a temporary loopback HTTP preview. It needs an independently frozen original package and writes screenshots, downloaded sources, exported figures, and a JSON report outside the package:

```sh
node tests/diagram-browser.mjs \
  --package /absolute/path/to/diagram-design \
  --baseline /absolute/path/to/original/diagram-design \
  --evidence /absolute/path/to/verification-artifacts \
  --runtime /absolute/path/to/node_modules
```

The source baseline for this change is Git revision `9fa9048511ef628fb36ec83cd1f0aac19290d0f2`. The browser utility checks gallery render parity, selection, links, source opening/downloads, icon geometry and paint, motion states, and reopened SVG/PNG exports. It compares both galleries with identical blocked remote-font conditions and separately observes remote and packaged font loading. Source equality and browser behavior are separate checks.

## Observed validation

- All 146 original example documents and 87 complete icon sources recover against the original hashes. All 87 existing inline icon previews retain their original markup. The 40 Diagram tests and suite checks pass.
- The 244 gallery, keyboard, deep-link, and standalone-source cases pass. All 138 static light/dark/full previews match the original gallery pixel-for-pixel under identical fallback-font conditions; all 146 selections and 92 bundled deep links are exercised.
- The corrected `--stage icons-motion` run passes 100 cases with no failures: all 87 icons retain their shapes, computed paints, typography, geometry, raw source and downloaded bytes; native source links and middle-click work in the observed Chromium run.
- Motion playback, scoped keys, static/reduced/no-JavaScript/print frames, and two identical static captures pass. The unchanged template exports a complete 1000 by 500 PNG and a standalone SVG, with reopened dimensions, paints, text metrics, fonts and geometry checked. These checks do not promise every destination application or native focus condition.
- All 12 packaged Matter SQ faces load through the browser. Separate online samples load the used Geist, Geist Mono and Instrument Serif faces; some unused or interrupted requests are recorded, so this does not promise remote-font availability.
- Root additionally checks the actual in-app gallery and motion controls, source recovery from another working directory, XML/PNG exports, all 258 linked HTML fragments, and unchanged recipe/protected-file hashes. The draw.io, Excalidraw and Mermaid CLI samples return exactly the original outputs. Independent acceptance reviews the integrated candidate and receipts.

Earlier full reports retain their failures. A color probe initially read an unfinished CSS transition and asserted a fill for a stroked icon; the corrected probe waits for the real paint state. A matched 28-download burst compares original physical SVG links with bundled Blob links: both observe 22 of 28 without pacing and 28 of 28 at 160 ms pacing, without retries. The final all-icon control checks use that pacing. This is evidence for ordinary selected downloads, not a rapid bulk-download guarantee. Passed gallery receipts and the corrected later stage are kept separate; no earlier failed full run is relabeled as passing.

Direct `file://` browser testing is unavailable in this host because the in-app browser URL policy rejects it. No alternate file-browser route was used. The catalogs require no fetch or decompression step, and Python recovery works from another working directory; HTTP interaction evidence does not establish direct file-browser behavior or every browser and destination application.

The five preexisting Augment Workflows cleanup edits are outside this consolidation and remain unchanged. Steward runtime and managed skills are unchanged. No publication or merge is part of this work.
