import React from "react";

/**
 * Checkbox — labeled boolean control with burgundy checked fill.
 */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, id, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internal;
  const autoId = React.useId();
  const fieldId = id || autoId;

  const toggle = (e) => {
    if (disabled) return;
    if (checked === undefined) setInternal(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label
      htmlFor={fieldId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-15)",
        color: "var(--ink)",
        userSelect: "none",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", width: 18, height: 18 }}>
        <input
          type="checkbox"
          id={fieldId}
          checked={isChecked}
          disabled={disabled}
          onChange={toggle}
          style={{ position: "absolute", opacity: 0, width: 18, height: 18, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          className={isChecked ? "aug-glow aug-glow--brand" : undefined}
          style={{
            width: 18,
            height: 18,
            borderRadius: "var(--radius-4)",
            background: isChecked ? "var(--burgundy-600)" : "var(--white)",
            border: isChecked ? "1px solid var(--burgundy-600)" : "1px solid var(--neutral-100)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background var(--dur-150) var(--ease-1), border-color var(--dur-150) var(--ease-1)",
          }}
        >
          {isChecked && <span className="aug-glow__layer" aria-hidden="true" />}
          {isChecked && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
      </span>
      {label}
    </label>
  );
}
