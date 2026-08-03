import * as React from "react";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Accent rail color. @default "neutral" */
  tone?: "neutral" | "success" | "error" | "brand";
  icon?: React.ReactNode;
  onDismiss?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Transient notification card for a corner stack. */
export function Toast(props: ToastProps): React.ReactElement;
