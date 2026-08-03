import * as React from "react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}

/** Labeled boolean control with burgundy checked fill. */
export function Checkbox(props: CheckboxProps): React.ReactElement;
