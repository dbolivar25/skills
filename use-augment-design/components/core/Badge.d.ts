import * as React from "react";

export interface BadgeProps {
  children?: React.ReactNode;
  /** @default "neutral" */
  tone?: "neutral" | "brand" | "success" | "warning" | "error";
  /** Solid fill instead of soft tint. @default false */
  solid?: boolean;
  /** Leading status dot. @default false */
  dot?: boolean;
}

/** Small status/label token (pill). */
export function Badge(props: BadgeProps): React.ReactElement;
