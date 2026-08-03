import * as React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Show a spinner and block interaction. */
  loading?: boolean;
  /** Icon node rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Primary action control. Sentence-case labels; calm hover; small press scale.
 * @startingPoint section="Core" subtitle="Buttons, icon buttons, badges & tags" viewport="700x260"
 */
export function Button(props: ButtonProps): React.ReactElement;
