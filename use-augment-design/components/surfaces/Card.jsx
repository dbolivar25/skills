import React from "react";

/**
 * Card — base surface container. White on a neutral canvas, hairline border, soft shadow, 16px radius.
 */
export function Card({ children, padding = 20, interactive = false, elevation = 1, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const shadows = { 0: "var(--shadow-0)", 1: "var(--shadow-1)", 2: "var(--shadow-2)", 3: "var(--shadow-3)" };

  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--white)",
        border: "1px solid var(--neutral-75)",
        borderRadius: "var(--radius-16)",
        boxShadow: hover ? "var(--shadow-3)" : shadows[elevation] || shadows[1],
        padding,
        cursor: interactive ? "pointer" : "default",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow var(--dur-200) var(--ease-1), transform var(--dur-200) var(--ease-1)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
