import React from "react";

/**
 * Tag — removable/selectable token.
 */
export function Tag({ children, icon = null, onRemove, selected = false, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 26,
        padding: onRemove ? "0 4px 0 10px" : "0 10px",
        borderRadius: "var(--radius-8)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-13)",
        fontWeight: "var(--fw-medium)",
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: selected ? "var(--burgundy-600)" : "var(--woodsmoke)",
        background: selected ? "color-mix(in srgb, var(--burgundy-600) 8%, white)" : "var(--neutral-50)",
        border: selected ? "1px solid color-mix(in srgb, var(--burgundy-600) 30%, white)" : "1px solid var(--neutral-75)",
        transition: "background var(--dur-150) var(--ease-1)",
        ...rest.style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "inline-flex", color: "var(--cloud-burst)" }}>{icon}</span>}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={onRemove}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 18,
            height: 18,
            marginLeft: 2,
            border: "none",
            borderRadius: "var(--radius-4)",
            background: hover ? "var(--neutral-75)" : "transparent",
            color: "var(--cloud-burst)",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          <XIcon />
        </button>
      )}
    </span>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
