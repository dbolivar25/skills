import React from "react";

/**
 * Tooltip — small dark label on hover/focus. Wraps a single trigger child.
 */
export function Tooltip({ children, content, side = "top", style }) {
  const [open, setOpen] = React.useState(false);

  const pos = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };

  return (
    <span
      style={{ position: "relative", display: "inline-flex", ...style }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={open ? "aug-glow aug-glow--neutral" : undefined}
        style={{
          position: "absolute",
          ...pos[side],
          padding: "5px 9px",
          background: "var(--ink)",
          color: "var(--white)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-12)",
          fontWeight: "var(--fw-medium)",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
          borderRadius: "var(--radius-4)",
          boxShadow: "var(--shadow-3)",
          opacity: open ? 1 : 0,
          transform: `${pos[side].transform} translateY(${open ? "0" : side === "top" ? "2px" : "-2px"})`,
          transition: "opacity var(--dur-150) var(--ease-1), transform var(--dur-150) var(--ease-1)",
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        {open && <span className="aug-glow__layer" aria-hidden="true" />}
        {content}
      </span>
    </span>
  );
}
