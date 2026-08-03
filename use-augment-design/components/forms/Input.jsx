import React from "react";

/**
 * Input — single-line text field with label, hint, error, and optional leading icon / affix.
 */
export function Input({
  label,
  hint,
  error,
  iconLeft = null,
  prefix = null,
  size = "md",
  disabled = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const heights = { sm: 32, md: 40, lg: 48 };
  const h = heights[size] || heights.md;

  const borderColor = error
    ? "var(--red)"
    : focus
    ? "var(--burgundy-600)"
    : "var(--neutral-85)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", fontWeight: "var(--fw-semibold)", color: "var(--woodsmoke)" }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: h,
          padding: "0 12px",
          background: disabled ? "var(--neutral-50)" : "var(--white)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-8)",
          boxShadow: focus && !error ? "0 0 0 3px color-mix(in srgb, var(--burgundy-600) 16%, transparent)" : "none",
          transition: "border-color var(--dur-150) var(--ease-1), box-shadow var(--dur-150) var(--ease-1)",
        }}
      >
        {iconLeft && <span style={{ display: "inline-flex", color: "var(--cloud-burst)" }}>{iconLeft}</span>}
        {prefix && <span style={{ color: "var(--cloud-burst)", fontSize: "var(--fs-15)" }}>{prefix}</span>}
        <input
          id={fieldId}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-15)",
            color: "var(--ink)",
            height: "100%",
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", color: error ? "var(--red)" : "var(--cloud-burst)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
