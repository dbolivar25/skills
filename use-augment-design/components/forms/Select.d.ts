import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  /** Strings or {value,label} objects. */
  options?: (string | SelectOption)[];
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/** Native dropdown styled to match Input, with chevron affix. */
export function Select(props: SelectProps): React.ReactElement;
