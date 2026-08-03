import React from "react";

/**
 * Augment Button — primary action control.
 * Sentence-case labels, calm hover, small press scale, visible focus ring.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  flat = false,
  type = "button",
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { height: 32, padding: "0 12px", font: "var(--fs-13)", gap: 6, radius: "var(--radius-8)" },
    md: { height: 40, padding: "0 16px", font: "var(--fs-15)", gap: 8, radius: "var(--radius-8)" },
    lg: { height: 48, padding: "0 22px", font: "var(--fs-18)", gap: 10, radius: "var(--radius-8)" },
  };
  const s = sizes[size] || sizes.md;

  const palettes = {
    primary: {
      // burgundy fill comes from the .aug-glow--brand preset (swirl edge-glow);
      // no border, so the additive glow reaches the very edge (a transparent
      // border would clip the abspos swirl to the padding box and leave a
      // darker unlit rim). Hover settles via filter.
      base: { color: "var(--white)", border: "none" },
      hover: {},
    },
    secondary: {
      base: { background: "var(--white)", color: "var(--ink)", border: "1px solid var(--neutral-85)" },
      hover: { background: "var(--neutral-25)", border: "1px solid var(--neutral-100)" },
    },
    ghost: {
      base: { background: "transparent", color: "var(--ink)", border: "1px solid transparent" },
      hover: { background: "var(--neutral-50)" },
    },
    danger: {
      base: { background: "var(--red)", color: "var(--white)", border: "1px solid transparent" },
      hover: { background: "#d23030" },
    },
  };
  const p = palettes[variant] || palettes.primary;
  // Consistent rule: any solid dark/colored fill gets depth from a glow.
  // The brand button uses the brand swirl; other dark fills (danger) get the
  // colorless neutral lift.
  const isBrand = variant === "primary";
  const isNeutralFill = variant === "danger";
  const swirlAngle = React.useMemo(() => brandSwirlAngle(children), [children]);

  const style = {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.height,
    minWidth: s.height,
    padding: s.padding,
    width: fullWidth ? "100%" : undefined,
    fontFamily: "var(--font-sans)",
    fontSize: s.font,
    fontWeight: "var(--fw-semibold)",
    letterSpacing: "-0.1px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    borderRadius: s.radius,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition:
      "background var(--dur-150) var(--ease-1), border-color var(--dur-150) var(--ease-1), transform var(--dur-150) var(--ease-1), box-shadow var(--dur-150) var(--ease-1)",
    transform: active && !disabled ? "scale(var(--scale-098))" : "scale(1)",
    filter: isBrand && hover && !disabled && !loading ? "brightness(0.93)" : "none",
    boxShadow: hover && !disabled && variant !== "ghost" ? "var(--shadow-1)" : "none",
    outline: "none",
    ...p.base,
    ...(hover && !disabled && !loading ? p.hover : null),
  };

  return (
    <button
      type={type}
      className={
        isBrand
          ? "aug-glow aug-glow--brand" + (flat ? " aug-glow--flat" : "")
          : isNeutralFill
          ? "aug-glow aug-glow--neutral"
          : undefined
      }
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--burgundy-600) 32%, transparent)")}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
      style={style}
      {...rest}
    >
      {isBrand && !flat && (
        <span className="aug-glow__layer" style={{ transform: `rotate(${swirlAngle}deg)` }} />
      )}
      {isNeutralFill && <span className="aug-glow__layer" aria-hidden="true" />}
      {loading ? <Spinner16 /> : iconLeft}
      {children && <span>{children}</span>}
      {!loading && iconRight}
    </button>
  );
}

/* Deterministic angle from the label, so each button keeps a stable swirl slice
   across renders (no jitter) while different buttons differ. */
function brandSwirlAngle(seed) {
  const s = seed == null ? "" : String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

function Spinner16() {
  return (
    <span
      style={{
        width: 15,
        height: 15,
        borderRadius: "50%",
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        display: "inline-block",
        animation: "aug-spin 0.7s linear infinite",
      }}
    >
      <style>{`@keyframes aug-spin{to{transform:rotate(360deg)}}`}</style>
    </span>
  );
}
