import React from "react";

/**
 * Avatar — identity primitive. Image, initials, or the Augment mark. Optional status dot.
 */
export function Avatar({ src, name = "", size = 36, status = null, brand = false, flat = false, ...rest }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const statusColors = { online: "var(--green)", busy: "var(--red)", away: "var(--gold)" };

  // Brand avatars (initials/mark, no photo) get the swirl edge-glow. Each person
  // keeps a stable, distinct slice derived from their initials. flat = solid
  // burgundy for dense lists.
  const useSwirl = brand && !src && !flat;
  const swirlAngle = brandSwirlAngle(initials || name);

  return (
    <span style={{ position: "relative", display: "inline-flex", width: size, height: size, ...rest.style }}>
      <span
        className={useSwirl ? "aug-glow aug-glow--brand" : undefined}
        style={{
          width: size,
          height: size,
          borderRadius: "var(--radius-circle)",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: useSwirl ? undefined : brand ? "var(--burgundy-600)" : "var(--neutral-75)",
          color: brand ? "var(--white)" : "var(--woodsmoke)",
          fontFamily: "var(--font-sans)",
          fontSize: size * 0.4,
          fontWeight: "var(--fw-semibold)",
          letterSpacing: "-0.2px",
          userSelect: "none",
        }}
      >
        {useSwirl && (
          <span className="aug-glow__layer" style={{ transform: `rotate(${swirlAngle}deg)` }} />
        )}
        {src ? (
          <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          initials || "?"
        )}
      </span>
      {status && (
        <span
          style={{
            position: "absolute",
            right: -1,
            bottom: -1,
            width: Math.max(8, size * 0.28),
            height: Math.max(8, size * 0.28),
            borderRadius: "50%",
            background: statusColors[status] || "var(--neutral-100)",
            border: "2px solid var(--white)",
          }}
        />
      )}
    </span>
  );
}

/* Deterministic angle from the initials, so each identity keeps a stable, distinct
   swirl slice across renders. */
function brandSwirlAngle(seed) {
  const s = seed == null ? "" : String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}
