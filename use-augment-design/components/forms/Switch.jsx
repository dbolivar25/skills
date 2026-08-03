import React from "react";

/**
 * Switch — on/off toggle with a sliding knob. Burgundy when on.
 */
export function Switch({ label, checked, defaultChecked, onChange, disabled = false, id, ...rest }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isOn = checked !== undefined ? checked : internal;
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
      <span style={{ position: "relative", display: "inline-flex", width: 38, height: 22 }}>
        <input
          type="checkbox"
          role="switch"
          id={fieldId}
          checked={isOn}
          disabled={disabled}
          onChange={toggle}
          style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          className={isOn ? "aug-glow aug-glow--brand" : undefined}
          style={{
            width: 38,
            height: 22,
            borderRadius: "var(--radius-pill)",
            background: isOn ? "var(--burgundy-600)" : "var(--neutral-100)",
            transition: "background var(--dur-200) var(--ease-1)",
          }}
        >
          {isOn && <span className="aug-glow__layer" aria-hidden="true" />}
        </span>
        <span
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "var(--white)",
            boxShadow: "var(--shadow-1)",
            transform: isOn ? "translateX(16px)" : "translateX(0)",
            transition: "transform var(--dur-200) var(--ease-3)",
          }}
        />
      </span>
      {label}
    </label>
  );
}
