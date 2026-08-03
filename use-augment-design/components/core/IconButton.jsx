import React from "react";

/**
 * IconButton — square control for a single icon action. Pass a Lucide (or any) icon node as children.
 */
export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const dims = { sm: 28, md: 36, lg: 44 };
  const dim = dims[size] || dims.md;

  const palettes = {
    ghost: {
      base: { background: "transparent", color: "var(--woodsmoke)", border: "1px solid transparent" },
      hover: { background: "var(--neutral-50)", color: "var(--ink)" },
    },
    outline: {
      base: { background: "var(--white)", color: "var(--woodsmoke)", border: "1px solid var(--neutral-85)" },
      hover: { background: "var(--neutral-25)", color: "var(--ink)", border: "1px solid var(--neutral-100)" },
    },
    solid: {
      base: { background: "var(--burgundy-600)", color: "var(--white)", border: "1px solid transparent" },
      hover: { background: "var(--burgundy-700)" },
    },
  };
  const p = palettes[variant] || palettes.ghost;
  const isFill = variant === "solid";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={isFill ? "aug-glow aug-glow--brand" : undefined}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        borderRadius: "var(--radius-8)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background var(--dur-150) var(--ease-1), color var(--dur-150) var(--ease-1), border-color var(--dur-150) var(--ease-1), transform var(--dur-150) var(--ease-1)",
        transform: active && !disabled ? "scale(var(--scale-096))" : "scale(1)",
        ...p.base,
        ...(hover && !disabled ? p.hover : null),
      }}
      {...rest}
    >
      {isFill && <span className="aug-glow__layer" aria-hidden="true" />}
      {children}
    </button>
  );
}
