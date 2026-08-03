import * as React from "react";

export interface TooltipProps {
  /** The trigger element. */
  children: React.ReactNode;
  /** Tooltip text. */
  content: React.ReactNode;
  /** @default "top" */
  side?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
}

/** Small dark label shown on hover/focus of its child. */
export function Tooltip(props: TooltipProps): React.ReactElement;
