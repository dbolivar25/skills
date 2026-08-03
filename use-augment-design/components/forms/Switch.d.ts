import * as React from "react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
}

/** On/off toggle with sliding knob; burgundy when on. */
export function Switch(props: SwitchProps): React.ReactElement;
