import React from "react";

/**
 * Banner — inline message strip. States the fact; neutral tone; optional action and dismiss.
 */
export function Banner({ children, title, tone = "info", icon = null, action = null, onDismiss, style, ...rest }) {
  const tones = {
    info: { bg: "var(--neutral-25)", border: "var(--neutral-85)", accent: "var(--woodsmoke)" },
    success: { bg: "color-mix(in srgb, var(--green) 8%, white)", border: "color-mix(in srgb, var(--green) 30%, white)", accent: "#0a7a0a" },
    warning: { bg: "color-mix(in srgb, var(--gold) 16%, white)", border: "color-mix(in srgb, var(--gold) 45%, white)", accent: "#8a5a00" },
    error: { bg: "color-mix(in srgb, var(--red) 8%, white)", border: "color-mix(in srgb, var(--red) 30%, white)", accent: "#b32626" },
  };
  const t = tones[tone] || tones.info;

  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 14px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "var(--radius-8)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ display: "inline-flex", color: t.accent, marginTop: 1, flexShrink: 0 }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: "var(--fs-15)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: children ? 2 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: "var(--fs-13)", lineHeight: "var(--lh-24)", color: "var(--woodsmoke)" }}>{children}</div>}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      {onDismiss && (
        <button type="button" aria-label="Dismiss" onClick={onDismiss} style={{ display: "inline-flex", flexShrink: 0, border: "none", background: "transparent", color: "var(--cloud-burst)", cursor: "pointer", lineHeight: 1, padding: 2 }}>
          <XIcon />
        </button>
      )}
    </div>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
