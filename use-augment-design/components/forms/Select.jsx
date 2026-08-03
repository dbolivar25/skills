import React from "react";

/**
 * Select — native dropdown styled to match Input, with a chevron affix.
 */
export function Select({ label, hint, error, options = [], size = "md", disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const heights = { sm: 32, md: 40, lg: 48 };
  const h = heights[size] || heights.md;
  const borderColor = error ? "var(--red)" : focus ? "var(--burgundy-600)" : "var(--neutral-85)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <label htmlFor={fieldId} style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", fontWeight: "var(--fw-semibold)", color: "var(--woodsmoke)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative", display: "flex" }}>
        <select
          id={fieldId}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            height: h,
            padding: "0 36px 0 12px",
            background: disabled ? "var(--neutral-50)" : "var(--white)",
            border: `1px solid ${borderColor}`,
            borderRadius: "var(--radius-8)",
            boxShadow: focus && !error ? "0 0 0 3px color-mix(in srgb, var(--burgundy-600) 16%, transparent)" : "none",
            transition: "border-color var(--dur-150) var(--ease-1), box-shadow var(--dur-150) var(--ease-1)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--fs-15)",
            color: "var(--ink)",
            outline: "none",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const labelText = typeof o === "string" ? o : o.label;
            return (
              <option key={value} value={value}>
                {labelText}
              </option>
            );
          })}
        </select>
        <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--cloud-burst)", display: "inline-flex" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", color: error ? "var(--red)" : "var(--cloud-burst)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
