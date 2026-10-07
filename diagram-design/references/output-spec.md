# Import output spec: format, size, fidelity, audience

Four dials decide what an imported diagram becomes. Set them **before** redrawing — they change the deliverable, layout, type ramp, node count, and wording, so retrofitting them afterwards means redrawing.

| Dial | Question it answers | Default |
|---|---|---|
| **Format** | Where does this file land? | Destination-appropriate source; `html` for a web artifact |
| **Size** | How big is the canvas, and how far away is the reader? | `doc-inline` |
| **Detail level** | Reproduce every element, or compress it? | `balanced` |
| **Audience** | How technical should the wording be? | `mixed` |

Infer choices that are clear from the request (for example, "for my deck" implies a slide preset). Ask one concise question for anything material that remains ambiguous. If the user does not care, use the defaults above and say which ones you used.

---

## 1. Format

| Format | Deliverable | Keeps | Drops |
|---|---|---|---|
| `html` | self-contained `.html` | selected wrapper, diagram, context, live fonts | source-tool editability unless also supplied |
| `svg` | `.svg` next to the source | the `<svg>` node, vector text | editorial wrapper; fonts substitute in offline tools |
| `png` | `.png` at `device_scale_factor` | pixels exactly as the browser renders them | vector editability |
| `html+png` | both | — | — |

Use the source/delivery format that fits the job. Native SVG, Mermaid, diagram-tool, and plotting outputs can be produced directly. HTML is useful when wrapper context or interaction matters. Read [export](export.md) for destination fidelity and inspect the actual deliverable.

Pick by destination:

| Destination | Format | Size preset |
|---|---|---|
| Blog post, README, docs site | `html` (embed) or `png` | `doc-inline` |
| Keynote / PowerPoint / Google Slides | `png` @2 | `slide-16x9` |
| Figma / Illustrator / further editing | `svg` | `fit` |
| X / LinkedIn / OG link card | `png` @2 | `social-og` |
| Printed handout, PDF deck | `png` @3 | `print-a4-landscape` |
| Confluence / Notion / internal wiki | `png` @2 | `doc-wide` |

---

## 2. Size

The preset suggests source coordinates and a type ramp. Actual raster dimensions follow rendered CSS bounds and capture scale, not the viewBox alone. These are useful starting sizes, not a universal grid or format law.

| Preset | viewBox | Aspect | PNG @2 if CSS frame matches | Type ramp | Use |
|---|---|---|---|---|---|
| `doc-inline` (default) | `0 0 960 600` | 8:5 | 1920×1200 | standard | Body-width diagram in a post or README |
| `doc-wide` | `0 0 1280 720` | 16:9 | 2560×1440 | standard | Full-width docs, wiki pages |
| `slide-16x9` | `0 0 1280 720` | 16:9 | 2560×1440 | presentation | Deck slide, projected |
| `slide-4x3` | `0 0 1024 768` | 4:3 | 2048×1536 | presentation | Legacy deck templates |
| `social-og` | `0 0 1200 630` | ~1.9:1 | 2400×1260 | presentation | Link preview card |
| `social-square` | `0 0 1080 1080` | 1:1 | 2160×2160 | presentation | Feed post, carousel |
| `print-a4-landscape` | `0 0 1120 792` | ~1.41:1 | @3 → 3360×2376 | print | A4 landscape, ~10mm margins at 96dpi |
| `print-letter-landscape` | `0 0 1056 816` | ~1.29:1 | @3 → 3168×2448 | print | US Letter landscape |
| `fit` | derived from content | any | @2 | standard | Vector hand-off; no fixed frame |

### Deriving `fit`

Measure content bounds and add space for the selected labels, legend, and destination safe area. A 40px margin plus 60px legend strip is a worked starting recipe, not mandatory chrome. Include strokes and meaningful overflow.

### Type ramp per size class

Node names shrink relative to the canvas as it grows — resist that. Scale the ramp with the preset so a projected slide stays readable from the back row.

| Role | standard | presentation | print |
|---|---|---|---|
| Title (selected skin) | 28 | 40 | 32 |
| Node name (selected skin) | 12 | 16 | 12 |
| Technical sublabel (selected mono) | 9 | 12 | 9 |
| Arrow label (selected skin) | 8 | 12 | 8 |
| Label / tag (selected skin) | 8 | 8 | 8 |
| Node box min height | 48 | 64 | 48 |
| Min gap between nodes | 24 | 40 | 24 |

Presentation ramp implies fewer nodes — 16px names in 64px boxes eat the canvas. If a `slide-16x9` layout won't fit, that's the size dial telling you the detail dial is set too high; drop a level rather than shrinking the type.

### Safe areas

- **Worked web presets:** start with a 40px outer margin and a 60px legend strip when the diagram has a legend. Use the destination safe area and actual content needs.
- **`social-og`:** keep the outer 64px clear on every side — link-card crops are unpredictable across platforms.
- **`slide-*`:** keep the bottom 80px clear if the deck template has a footer bar; ask if unsure.

---

## 3. Detail level

How much of the source survives. This is a *count* dial — it governs how many elements make it through, not how they're worded (that's §4).

| Level | Nodes | Edges | Sublabels | What survives |
|---|---|---|---|---|
| `faithful` (詳細) | ≤24, zoned | ≤32 | every port, protocol, version | Every distinct component in the source. Only exact duplicates merge. |
| `balanced` (default) | ≤12 | ≤16 | technical sublabel on ≤4 nodes | Components that carry the story; leaf clusters collapse to one node each. |
| `simplified` (簡略) | ≤7 | ≤9 | none | Capabilities and their sequence. Infrastructure disappears. |

These node counts are readability guidance for the worked layout. A faithful import must preserve source meaning, using zoning, a scalable renderer, or overview/detail when needed:

1. **Use meaningful zoning when it helps.** For a larger model, group by actual responsibility or scope. The worked treatment uses hairline frames, `paper-2` fill, and a mono zone label. Do not invent membership to satisfy a layout count.
2. **Keep connections traceable.** Use [connector craft](primitives.md) to preserve endpoints, direction, and meaningful labels. When the view is too dense, use overview/detail or a more capable renderer.
3. **When density is unreadable, split.** Produce an overview (zones as nodes, `balanced` grammar) plus one detail diagram per zone. Name them `<base>-overview.html`, `<base>-<zone>.html`. A larger full model may remain a companion artifact when the source needs it.
4. **Emphasis serves the question.** More nodes do not automatically need more competing emphasis.

### Degrade ladder

For an authorized summary, consider reductions in this order, preserving the relationships the reader needs. Faithful reproduction does not discard source elements to satisfy an example budget.

1. **Decorative cells** — sticky notes, free-floating text, title blocks, watermarks, the source's own legend. (Preserve notes that change interpretation as [annotation callouts](primitive-annotation.md) or accompanying source context.)
2. **Exact duplicates** — N identical workers/replicas/shards become one node labeled `Worker ×N`.
3. **Leaf clusters** — a container whose children are all leaves collapses to the container: `Core Services` replaces its three boxes. The extractor lists these under *collapsible groups*.
4. **Degree-1 sinks that don't change the story** — a monitoring hook, a log bucket, an archive tier.
5. **Cross-cutting infrastructure** — logging, metrics, secrets, CI. At `simplified` these go without asking; at `balanced` keep at most one, and only if the diagram is about it.
6. **Still over?** Split into overview + detail. Splitting beats shrinking.

Anything cut in steps 2–6 goes in the fidelity ledger (§5). Report a removed note or legend whenever it could change interpretation.

---

## 4. Audience level

Independent of the detail dial: the same 12 nodes get named differently for a platform team than for a steering committee. Detail sets *how many*; audience sets *what they're called*.

| Audience | Node names | Sublabels | Edge labels | Never |
|---|---|---|---|---|
| `engineer` | exact service / component names | protocol, port, version, image tag | `POST /v2/orders`, `SQL`, `gRPC` | Vague verbs like "connects to" |
| `mixed` (default) | component names, expanded acronyms | technology only where it changes a decision | plain verbs — `verifies`, `writes`, `notifies` | Ports, versions, internal codenames |
| `executive` | capabilities and outcomes | none | business verbs — `approves`, `pays out` | Vendor names, infrastructure, protocols |

Worked example — the same node through all three:

| Audience | Node name | Sublabel |
|---|---|---|
| `engineer` | `Auth Service` | `JWT · RS256 · :8443` |
| `mixed` | `Auth Service` | `token check` |
| `executive` | `Sign-in` | — |

Two rules that hold at every audience level:

- **Never invent detail to fill a slot.** If the source says `svc-04`, `executive` output says what it does only if you can tell from context — otherwise ask, don't guess a business name.
- **Keep the source's vocabulary for proper nouns.** Renaming `Kafka` to `Message Bus` is fine at `executive`; renaming it to `Event Grid` (a different product) is a factual error.

### Non-Latin labels

Matter SQ has no CJK coverage; check the selected skin's actual family. When labels contain Japanese, Chinese, or Korean text, extend the family on those `<text>` elements — don't swap the whole skin:

```svg
<text font-family="'Matter SQ', 'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif">認証サービス</text>
<text font-family="'Matter SQ', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif">인증 서비스</text>
<text font-family="'Matter SQ', 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif">认证服务</text>
<text font-family="'Matter SQ', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif">認證服務</text>
```

The Hiragino/Yu Gothic stack carries no Hangul glyphs, so Korean labels need the Korean stack — don't reuse the Japanese one. If Noto Sans KR is actually loaded, it can lead that stack with local families following; the register, floor, and title rules Korean needs beyond the font live in [`style-guide.md`](style-guide.md#korean-labels). Japanese fonts also cover only a subset of the Chinese character set and render Simplified forms with Japanese glyph variants, so Chinese labels need a Chinese stack; Simplified and Traditional are separate stacks for the same reason. If Noto Sans TC is actually loaded, it can lead the Traditional stack with local families following; the register, floor, and title rules Traditional Chinese needs beyond the font live in [`style-guide.md`](style-guide.md#traditional-chinese-labels). For mono sublabels use `ui-monospace, 'Noto Sans Mono CJK JP', monospace` (Japanese), `ui-monospace, 'Noto Sans Mono CJK KR', monospace` (Korean), or `ui-monospace, 'Noto Sans Mono CJK SC', monospace` / `ui-monospace, 'Noto Sans Mono CJK TC', monospace` (Chinese). Budget **1em per full-width CJK glyph**, not a small percentage over the average Latin glyph; a conservative measurement includes Unicode wide/full-width characters while treating combining marks as non-advancing. Prefer 12px names over 8px sublabels for CJK; Hangul and Han go muddy below 12px, so treat 12px as the floor rather than 10px. Actual width still varies by fallback font, so inspect actual rendered geometry after translating labels.

---

## 5. Fidelity ledger

Any time output is smaller than input — every `balanced` and `simplified` run, and most `faithful` ones — report what you cut, in chat, after the file path. Short and specific:

```
Detail: balanced · 18 source nodes → 9 drawn
Merged:  worker-01..06 → "Ingest Worker ×6"
Collapsed: "Observability" group (Grafana, Loki, Tempo) → one node
Dropped: 2 sticky notes, CI pipeline (cross-cutting)
Kept in full: the request path (Client → Gateway → Orders → Postgres)
```

The reader of the diagram can't see what's missing. The person who asked for it needs to.

---

## 6. Checklist

Run alongside the [render verification](verification.md) taste gate.

- [ ] All four dials set — explicitly requested, inferred from the destination, or defaulted and stated?
- [ ] Source coordinate frame, rendered bounds, and requested destination dimensions verified?
- [ ] Type ramp matches the size class — not the standard ramp on a slide?
- [ ] Actual destination safe areas and needed label/legend margins honoured?
- [ ] Detail readable at the intended size without losing required source meaning?
- [ ] Larger faithful models use meaningful grouping, a scalable renderer, or overview/detail where useful?
- [ ] Node names, sublabels, and edge labels all at the same audience level?
- [ ] CJK labels given a font fallback?
- [ ] Fidelity ledger reported for anything cut?
- [ ] Diagram `<svg>` has `role="img"`, resolving `aria-labelledby`, a non-empty first-child `<title>`, a non-empty `<desc>`, and per-diagram/variant prefixed IDs?
- [ ] Requested format produced through an appropriate native/plotting or [export](export.md) method and inspected?
