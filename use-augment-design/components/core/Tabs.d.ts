import * as React from "react";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** Optional count pill. */
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/** Horizontal segmented navigation with an underline indicator. */
export function Tabs(props: TabsProps): React.ReactElement;
