import React from "react";

/**
 * Spinner — indeterminate loading indicator. Inherits color via currentColor.
 */
export function Spinner({ size = 20, thickness = 2, color = "var(--burgundy-600)", label, style, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, color, ...style }} {...rest}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${thickness}px solid currentColor`,
          borderTopColor: "transparent",
          opacity: 0.9,
          display: "inline-block",
          animation: "aug-spin 0.7s linear infinite",
        }}
      />
      {label && <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--fs-13)", color: "var(--cloud-burst)" }}>{label}</span>}
      <style>{`@keyframes aug-spin{to{transform:rotate(360deg)}}`}</style>
    </span>
  );
}
