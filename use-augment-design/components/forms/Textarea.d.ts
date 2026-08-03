import * as React from "react";

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  label?: string;
  hint?: string;
  error?: string;
  /** @default 4 */
  rows?: number;
}

/** Multi-line text field. */
export function Textarea(props: TextareaProps): React.ReactElement;
