import * as React from "react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Diameter in px. @default 20 */
  size?: number;
  /** @default 2 */
  thickness?: number;
  /** CSS color. @default burgundy */
  color?: string;
  /** Trailing label, e.g. "Loading". */
  label?: string;
}

/** Indeterminate loading indicator. */
export function Spinner(props: SpinnerProps): React.ReactElement;
