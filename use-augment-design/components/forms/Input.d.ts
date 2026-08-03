import * as React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  label?: string;
  hint?: string;
  /** Error message — also turns the field red. */
  error?: string;
  iconLeft?: React.ReactNode;
  /** Static text prefix (e.g. "github.com/"). */
  prefix?: React.ReactNode;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/** Single-line text field with label, hint, error, and optional leading icon/affix. */
export function Input(props: InputProps): React.ReactElement;
