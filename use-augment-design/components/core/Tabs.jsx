import React from "react";

/**
 * Tabs — horizontal segmented navigation with an underline indicator.
 * Controlled (pass value + onChange) or uncontrolled (defaultValue).
 */
export function Tabs({ items = [], value, defaultValue, onChange, ...rest }) {
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.value);
  const active = value !== undefined ? value : internal;

  const select = (v) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };

  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: 4,
        borderBottom: "1px solid var(--neutral-75)",
        ...rest.style,
      }}
    >
      {items.map((it) => {
        const isActive = it.value === active;
        return (
          <button
            key={it.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => select(it.value)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 12px 12px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--fs-15)",
              fontWeight: isActive ? "var(--fw-semibold)" : "var(--fw-medium)",
              color: isActive ? "var(--ink)" : "var(--cloud-burst)",
              transition: "color var(--dur-150) var(--ease-1)",
            }}
          >
            {it.icon}
            {it.label}
            {it.count != null && (
              <span
                style={{
                  fontSize: "var(--fs-12)",
                  fontWeight: "var(--fw-semibold)",
                  color: isActive ? "var(--burgundy-600)" : "var(--neutral-100)",
                  background: isActive ? "color-mix(in srgb, var(--burgundy-600) 10%, white)" : "var(--neutral-50)",
                  borderRadius: "var(--radius-pill)",
                  padding: "1px 7px",
                  lineHeight: 1.4,
                }}
              >
                {it.count}
              </span>
            )}
            <span
              style={{
                position: "absolute",
                left: 4,
                right: 4,
                bottom: -1,
                height: 2,
                borderRadius: "2px 2px 0 0",
                background: "var(--burgundy-600)",
                opacity: isActive ? 1 : 0,
                transition: "opacity var(--dur-200) var(--ease-1)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
