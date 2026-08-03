import React from "react";

/**
 * Toast — transient notification card. Render in a fixed corner stack; dismiss manually or auto-timeout upstream.
 */
export function Toast({ title, children, tone = "neutral", icon = null, onDismiss, style, ...rest }) {
  const accents = {
    neutral: "var(--woodsmoke)",
    success: "var(--green)",
    error: "var(--red)",
    brand: "var(--burgundy-600)",
  };
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        width: 340,
        padding: "14px 14px 14px 16px",
        background: "var(--white)",
        border: "1px solid var(--neutral-75)",
        borderRadius: "var(--radius-8)",
        boxShadow: "var(--shadow-4)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 3, alignSelf: "stretch", borderRadius: 999, background: accents[tone] || accents.neutral, flexShrink: 0 }} />
      {icon && <span style={{ display: "inline-flex", color: accents[tone], marginTop: 1 }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: "var(--fs-15)", fontWeight: "var(--fw-semibold)", color: "var(--ink)", marginBottom: children ? 2 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: "var(--fs-13)", lineHeight: "var(--lh-24)", color: "var(--woodsmoke)" }}>{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" aria-label="Dismiss" onClick={onDismiss} style={{ display: "inline-flex", border: "none", background: "transparent", color: "var(--cloud-burst)", cursor: "pointer", lineHeight: 1, padding: 2, flexShrink: 0 }}>
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
