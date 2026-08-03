import * as React from "react";

export interface TagProps {
  children?: React.ReactNode;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** When provided, renders a remove button. */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Selected/active state. @default false */
  selected?: boolean;
  style?: React.CSSProperties;
}

/** Removable/selectable token. */
export function Tag(props: TagProps): React.ReactElement;
