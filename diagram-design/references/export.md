# Export SVG, PNG, or the requested page

Use when export, rasterization, conversion, or a portable file is requested, or
when the requested deliverable already includes it. Preserve the selected
source model. Native plotting/diagram tools can export directly; HTML is not a
mandatory intermediate for an SVG, Mermaid graph, or publication figure.

Infer whether the requested artifact is the diagram, a complete page, or a
named figure. Diagram-only is a useful default for a figure destined for a
slide or document. If the user asks for the surrounding header, cards, or page,
include them using a page screenshot, PDF, or the native document export. Do not
silently drop wrappers the request includes.

## Select the actual figure

Read the source and identify the requested diagram by its title, accessible
name, or explicit selector. The first SVG may be an icon or a mark. When a file
has several substantive figures and the request does not identify one, inspect
the visible candidates and resolve that material ambiguity before writing the
wrong export. The gallery is a selection aid, not a single diagram to export.

For motion output, use the complete static frame (`?motion=static` for the
packaged controller), wait for `document.fonts.ready`, and observe
`data-frame="static"`. A named step export may use the supported exact step
state when requested. Never capture an arbitrary delay as a settled frame.

## Standalone SVG

1. Preserve the selected complete SVG node, including nested SVGs, definitions,
   IDs, masks, markers, gradients, and its `title`/`desc` and accessible naming.
   Use an XML/HTML parser or a read-only DOM extraction; a regex ending at the
   first `</svg>` is unsafe for nested SVG.
2. Add `xmlns="http://www.w3.org/2000/svg"` if absent. Keep the authored viewBox;
   if absent, obtain actual dimensions and intended bounds rather than inventing
   a crop. Prefix IDs when several exported figures will be inlined together,
   updating every matching fragment and accessible-name reference.
3. Include the CSS the figure depends on. Presentation attributes alone do not
   capture HTML-inherited fonts/colors, class rules, CSS variables, or external
   stylesheets. Resolve inherited values or copy a scoped stylesheet and required
   definitions. Verify the standalone render against the source.
4. Preserve the **actual selected font**. There are no default Geist/Instrument
   Serif Google Font imports. Augment uses the packaged Matter SQ faces in the
   [Augment skin](style-guide.md#font-sources). Embed used WOFF2 data when that
   delivery is permitted and supported, or package the exact fonts beside the
   SVG and rebase relative URLs. For a selected remote font, copy only that
   source's exact family/weights, and disclose its network dependency. XML-escape
   ampersands in URLs, or put CSS in a valid CDATA section.
5. For strict destination consumers, inspect supported paint and effects. Some
   Office SVG importers reject `rgba()` or `transparent` presentation attributes.
   A solid rgba attribute can be expressed as `fill="#rrggbb"` plus
   `fill-opacity="alpha"` (or stroke equivalents). **Multiply** existing paint
   opacity by the color alpha; overwriting or adding duplicate opacity attributes
   changes the result. `transparent` can become `none` when it expresses no
   paint. This simple transform does not handle every CSS color, gradient,
   filter, blend mode, or embedded HTML; use a suitable parser/converter and
   verify the destination rather than promising universal SVG 1.1 equivalence.
6. Write well-formed UTF-8 XML to the requested path, otherwise beside the source
   as `<basename>.svg`. Parse the saved XML and inspect it in its intended viewer.

A loaded font in the browser does not imply the destination will use it. Figma,
Illustrator, slides, offline viewers, and SVG-as-image contexts may ignore
embedded/remote fonts or `foreignObject`. For exact pixels, use PNG; for editable
text, provide the fonts/source or a disclosed substitution. Use text outlines
only when the requested delivery calls for them and verify the outlined result.

## PNG

For HTML, render the original source so CSS and fonts have their real context.
Use the current host's supported browser/computer-use and capture APIs when it
provides them. Follow their documentation for viewport, pixel ratio, and clipping;
do not launch another browser-control stack to bypass host requirements. Native
plotting/diagram export is preferable when that is the artifact's source.

Select the actual figure, settle fonts and the complete static state, measure
its **rendered bounding box in CSS pixels**, then capture that box. A responsive
SVG's CSS width can differ from its viewBox width. Avoid clipping strokes,
shadows, or overflowing labels; if overflow is meaningful, include its bounds
or repair the source before capture.

A transparency request needs inspection of the actual PNG. Omitting the browser
page background does not remove a paper rectangle painted inside the SVG. Keep
an intentional paper background unless the requested transparent export requires
removing that paint through an appropriate source/export option.

When the execution host permits a Playwright rendering utility, this is a
bounded recipe (adapt source/selector/output to the actual request):

```python
from pathlib import Path
from math import isfinite
from playwright.sync_api import sync_playwright
import sys

source, output = sys.argv[1], sys.argv[2]
scale = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
if not isfinite(scale) or scale <= 0:
    raise ValueError('Scale must be finite and positive')
with sync_playwright() as renderer:
    browser = renderer.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 1000},
                            device_scale_factor=scale)
    page.goto(Path(source).resolve().as_uri() + '?motion=static')
    page.evaluate('() => document.fonts.ready')
    figure = page.locator('svg[role="img"]').first  # Replace if several figures exist.
    box = figure.bounding_box()
    if not box or box['width'] <= 0 or box['height'] <= 0:
        raise ValueError('Figure has no rendered dimensions')
    print({'css_width': box['width'], 'css_height': box['height'], 'scale': scale})
    # For the packaged motion method, also assert its data-frame is static.
    figure.screenshot(path=output, omit_background=True)
    browser.close()
```

Use an already available runtime/tool. If it is unavailable, preserve the source
and name the exact export blocker; do not claim a file was verified or require
an unrelated install for a native host export. A successful screenshot still
needs its actual dimensions and render checked.

## Size and fractional scale

For a browser element capture, pixel dimensions follow **rendered CSS bounds ×
device scale**, subject to capture rounding. They do not automatically follow
viewBox × scale. The viewBox defines internal coordinates; CSS controls layout.
For example, a `viewBox="0 0 1000 500"` SVG rendered at 640×320 CSS pixels yields
approximately 1280×640 at scale 2, not 2000×1000.

For target width `W`, compute the required **effective pixel scale** as
`W / rendered_css_width`. Fractional values must remain floats: 640 CSS pixels
at effective scale 1.25 is 800 pixels. A device-scale setting and a capture
API's extra clip scale may multiply: on a 2× host, CDP clip scale 1.25 produces
effective scale 2.5. Follow the actual capture API, account for each multiplier,
and verify both actual PNG dimensions after capture. If height's required scale differs,
the target aspect ratio is incompatible with that rendered figure; adjust the
source layout or an explicitly requested crop/pad rather than silently distorting
it. Exact 1200×630 output should use that actual frame, not a rounded 1200×632
“grid” preset.

Scale 2 is a useful screen default; 1 can be compact; print needs actual physical
size and resolution. Very large or small scales deserve a layout/readability
check, not a universal prohibition. A print image's pixels alone do not establish
physical inches, DPI metadata, or legibility at print size.

Keep requested output paths and source files intact. Report the usable file,
actual dimensions, relevant font/transparency/destination limitations, and any
meaningful source-to-export loss. Export controls or scripts need not be added
to the source merely to produce the file.
