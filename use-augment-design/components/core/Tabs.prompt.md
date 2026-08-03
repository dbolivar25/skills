Horizontal tab navigation with an underline indicator. Controlled or uncontrolled.

```jsx
<Tabs
  defaultValue="overview"
  items={[
    { value: "overview", label: "Overview", count: 4 },
    { value: "activity", label: "Activity" },
  ]}
  onChange={setTab}
/>
```

Each item: `{ value, label, icon?, count? }`.
