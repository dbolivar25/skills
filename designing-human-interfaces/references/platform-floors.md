# Platform Floors

Use this reference when judging the credible baseline for a surface. Floors are
not goals. They are the minimum expectation users bring from familiar software.

Floors drift. Verify current platform guidance and category examples when the
stakes justify it.

## Native iOS

Default floor:

- Familiar navigation hierarchy.
- System controls where expected.
- Clear large-title or compact-title behavior.
- Native-feeling transitions.
- Touch targets that feel comfortable.
- Respect for safe areas, keyboard, sheets, and permissions.
- State restoration where users expect continuity.

Useful source:

- Apple Human Interface Guidelines:
  https://developer.apple.com/design/human-interface-guidelines

Resolved direction:

- Start from what iOS would do, then improve. Do not invent a custom control if
  it lands below system quality.

## macOS

Default floor:

- Keyboard-first access for serious tools.
- Native-feeling menus, command palette, windows, focus, and shortcuts.
- Fast transitions with minimal theatrical motion.
- Respect for system typography and density.
- Clear empty, permission, and offline states.

Reference examples:

- Raycast as a Mac-native surface that respects platform expectations while
  exceeding the built-in launcher experience.

Resolved direction:

- Belong to the platform first. Differentiate through speed, flow, and craft
  after the app feels native enough to trust.

## Modern SaaS / Internal Tools

Default floor:

- Dense but organized information.
- Stable navigation.
- Clear hierarchy.
- Useful tables with sorting/filtering where expected.
- Predictable forms and validation.
- Boring, reliable loading/error/empty states.
- Accessible keyboard and focus behavior.
- No marketing-style composition inside repeated work surfaces.

Comparable products:

- Linear.
- Stripe Dashboard.
- Vercel.
- Notion for structured workspaces.
- Figma for creation surfaces.

Resolved direction:

- Calm density beats decorative emptiness. Make repeated workflows fast,
  scannable, and forgiving.

## Web App Component Baseline

Default floor:

- Credible component primitives.
- Consistent radius, border, fill, and shadow grammar.
- Predictable responsive behavior.
- Good focus states.
- Good disabled/loading/error states.
- No layout shift on label or number changes.

Useful baseline:

- shadcn/Tailwind-style component conventions can provide a floor, but should
  not become the final personality by default.

Resolved direction:

- Start with the stable primitive, then tune the grammar, type, motion, and
  state behavior to the product's facets.

## Marketing / Launch Pages

Default floor:

- First viewport says what this is and why it matters.
- Primary action is visible and works.
- The next section is hinted, not hidden behind a dead-end hero.
- Real product, place, person, or object signal appears early.
- Mobile text and buttons fit.
- Visual assets are real or intentionally generated, not generic decoration.

Resolved direction:

- Pick one promise and execute it with unusual clarity. Avoid adding sections
  before the core offer and signup path are resolved.

## Financial Interfaces

Default floor:

- High trust.
- Clear numbers.
- Stable state.
- No surprise motion around money.
- Tabular figures for changing or comparable numbers.
- Right-aligned numeric columns.
- Clear pending, failed, settled, and reversed states.
- Conservative color semantics.

Resolved direction:

- Precision and trust beat novelty. If the surface is native, respect native
  financial-app patterns before adding differentiated polish.

## AI Product Interfaces

Default floor:

- Clear expectation of what the model can and cannot do.
- Visible progress for long-running work.
- Recoverable errors.
- Editable prompts or inputs.
- Preserved user work on failure.
- Traceable outputs when trust matters.
- Good empty states that teach the next action without becoming marketing copy.

Resolved direction:

- Do not hide uncertainty behind polish. Make state, provenance, and recovery
  explicit enough that users can trust the interaction.

