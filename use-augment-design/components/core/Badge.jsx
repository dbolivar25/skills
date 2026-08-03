import React from "react";

/**
 * Badge — small status/label token. Tone maps to brand or semantic color; soft (tinted) or solid.
 */
export function Badge({ children, tone = "neutral", solid = false, dot = false, className, ...rest }) {
  const tones = {
    neutral: { fg: "var(--woodsmoke)", soft: "var(--neutral-50)", solidBg: "var(--woodsmoke)" },
    brand: { fg: "var(--burgundy-600)", soft: "color-mix(in srgb, var(--burgundy-600) 10%, white)", solidBg: "var(--burgundy-600)" },
    success: { fg: "#0a7a0a", soft: "color-mix(in srgb, var(--green) 14%, white)", solidBg: "var(--green)" },
    warning: { fg: "#8a5a00", soft: "color-mix(in srgb, var(--gold) 26%, white)", solidBg: "var(--gold)" },
    error: { fg: "#b32626", soft: "color-mix(in srgb, var(--red) 14%, white)", solidBg: "var(--red)" },
  };
  const t = tones[tone] || tones.neutral;
  // Consistent with buttons: any solid (dark/colored) badge gets a glow — brand
  // uses the brand swirl, other solids get the colorless neutral lift.
  const glow = solid ? (tone === "brand" ? "brand" : "neutral") : null;

  return (
    <span
      className={[glow ? `aug-glow aug-glow--${glow}` : null, className].filter(Boolean).join(" ") || undefined}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 22,
        padding: "0 8px",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--fs-12)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "0.1px",
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: solid ? (tone === "warning" ? "var(--ink)" : "var(--white)") : t.fg,
        background: glow === "brand" ? undefined : solid ? t.solidBg : t.soft,
      }}
      {...rest}
    >
      {glow && <span className="aug-glow__layer" aria-hidden="true" />}
      {dot && (
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: solid ? "currentColor" : t.solidBg }} />
      )}
      {children}
    </span>
  );
}
