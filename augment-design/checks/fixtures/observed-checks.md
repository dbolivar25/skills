# Browser fixture observations

Source: [audit-render.html](audit-render.html). Served from the installed skill
suite on `127.0.0.1:8766`, inspected with the current host's computer-use browser
on 2026-10-06. This diagnostic is a regression fixture, not a product design.

The initial state produced six findings: unmarked OKLCH background, generated
pseudo-element solid background, unclassified gradient background, unmarked SVG
fill, unmarked SVG stroke, and Arial applied to visible text. The correction
button marks each chromatic object, removes the gradient, and restores the
packaged Matter SQ family. Rerunning returned zero findings in covered checks.
The computed paragraph family was `"Matter SQ", sans-serif`; the audit's loaded
face check produced no finding. The rendered solid shapes, pseudo paint, text,
wrapping, and controls were inspected visually.

[Corrected desktop rendering](rendered-corrected.png) and
[narrow rendering](rendered-mobile.png) preserve the inspected views. At the
375px viewport, the samples stack and the figure renders at 327×164.5 CSS px.
The temporary viewport override was reset after inspection.

The SVG viewBox is `0 0 1000 500`; its normal rendered box is 640×321 CSS px,
including its border. An actual CDP clip capture at 1.25 on this 2× host yielded
[1600×803 pixels](responsive-figure-cdp1.25-host2x.png). Accounting for that
multiplier with clip scale 0.625 yielded
[800×401 pixels](responsive-figure-effective1.25.png), the effective scale 1.25
export. Both PNG dimensions were read from their PNG headers, and the exported
figure was inspected. Source frame alone and a capture argument alone do not
establish final pixel dimensions.

These observations exercise solid paint, browser-parsed OKLCH, generated solid
pseudo paint, primary computed text font and font readiness, and responsive
capture size. They do not certify gradient stops, masks, filters, blending,
actual glyph fallback, contrast, brand semantics, native slide/document export,
or all historical gallery files. Native-format guidance and SVG portability
limits remain methods rather than claims of an observed destination import.
