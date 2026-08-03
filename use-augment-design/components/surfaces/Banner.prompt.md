Inline message strip. State the fact, consequence, and recovery path; neutral tone, no hype.

```jsx
<Banner tone="error" title="Couldn't reach the index"
  action={<Button size="sm" variant="secondary">Retry</Button>}>
  Your last results are still shown.
</Banner>
```

Tones: `info`, `success`, `warning`, `error`. Props: `title`, `icon`, `action`, `onDismiss`.
