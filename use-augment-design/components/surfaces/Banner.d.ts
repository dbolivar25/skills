import * as React from "react";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: React.ReactNode;
  /** @default "info" */
  tone?: "info" | "success" | "warning" | "error";
  icon?: React.ReactNode;
  /** Trailing action node (e.g. a Button). */
  action?: React.ReactNode;
  onDismiss?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Inline message strip — states the fact, neutral tone. */
export function Banner(props: BannerProps): React.ReactElement;
