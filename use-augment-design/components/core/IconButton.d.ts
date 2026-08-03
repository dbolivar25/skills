import * as React from "react";

export interface IconButtonProps {
  /** Icon node (e.g. a Lucide icon). */
  children?: React.ReactNode;
  /** @default "ghost" */
  variant?: "ghost" | "outline" | "solid";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Required for accessibility — names the action. */
  "aria-label": string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Square control for a single icon action. */
export function IconButton(props: IconButtonProps): React.ReactElement;
