# Components

The component files are reusable primitives, not recipes. They do not define a product flow or use case. When production code already has a component system, adapt these primitives into that system instead of importing this folder as a runtime package.

When using a primitive, read its `.prompt.md` for usage guidance and its `.d.ts` for props. Read the `.jsx` source when behavior or styling details matter.

## Core

- `components/core/Button`: action control. Variants `primary`, `secondary`, `ghost`, `danger`; sizes `sm`, `md`, `lg`; supports `disabled`, `loading`, `iconLeft`, `iconRight`, `fullWidth`.
- `components/core/IconButton`: square icon action. Variants `ghost`, `outline`, `solid`; sizes `sm`, `md`, `lg`; requires `aria-label`.
- `components/core/Badge`: status or label pill. Tones `neutral`, `brand`, `success`, `warning`, `error`; optional `solid`, `dot`.
- `components/core/Tag`: removable or selectable token. Optional `icon`, `onRemove`, `selected`.
- `components/core/Avatar`: identity primitive. Supports `src`, `name`, `size`, `status`, and `brand`.
- `components/core/Tabs`: horizontal segmented navigation with underline indicator. Items are `{ value, label, icon?, count? }`.

## Forms

- `components/forms/Input`: label, hint, error, left icon, prefix, size; spreads native input attrs.
- `components/forms/Textarea`: label, hint, error, rows; spreads native textarea attrs.
- `components/forms/Select`: label, hint, error, options, size; spreads native select attrs.
- `components/forms/Checkbox`: labeled boolean control.
- `components/forms/Switch`: on/off setting control.

## Surfaces

- `components/surfaces/Card`: white surface, hairline border, soft shadow, 16px radius. Props: `padding`, `interactive`, `elevation` 0-3.
- `components/surfaces/Banner`: inline message strip. Tones `info`, `success`, `warning`, `error`; supports `title`, `icon`, `action`, `onDismiss`.

## Feedback

- `components/feedback/Spinner`: indeterminate loading indicator.
- `components/feedback/Tooltip`: small dark tooltip on hover/focus; wrap one trigger child.
- `components/feedback/Toast`: transient notification card; stack and timing handled upstream.

## Rules

- Interactive controls need hover, press, focus, disabled, and loading states where relevant.
- Touch targets should be at least 44px when used on touch surfaces.
- Primary controls can use `aug-glow--brand`; repeated dense controls can use flat styling.
- Icon-only controls require an accessible name.
- Keep labels short and concrete.

