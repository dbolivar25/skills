import React from "react";

/**
 * Textarea — multi-line text field. Matches Input styling.
 */
export function Textarea({ label, hint, error, rows = 4, disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const borderColor = error ? "var(--red)" : focus ? "var(--burgundy-600)" : "var(--neutral-85)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", fontWeight: "var(--fw-semibold)", color: "var(--woodsmoke)" }}>
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          resize: "vertical",
          padding: "10px 12px",
          background: disabled ? "var(--neutral-50)" : "var(--white)",
          border: `1px solid ${borderColor}`,
          borderRadius: "var(--radius-8)",
          boxShadow: focus && !error ? "0 0 0 3px color-mix(in srgb, var(--burgundy-600) 16%, transparent)" : "none",
          transition: "border-color var(--dur-150) var(--ease-1), box-shadow var(--dur-150) var(--ease-1)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-15)",
          lineHeight: "var(--lh-24)",
          color: "var(--ink)",
          outline: "none",
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", color: error ? "var(--red)" : "var(--cloud-burst)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
