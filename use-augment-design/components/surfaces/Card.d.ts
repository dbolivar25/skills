import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Inner padding in px. @default 20 */
  padding?: number;
  /** Lift + deepen shadow on hover. @default false */
  interactive?: boolean;
  /** Resting shadow level. @default 1 */
  elevation?: 0 | 1 | 2 | 3;
}

/**
 * Base surface container — white, hairline border, soft shadow, 16px radius.
 * @startingPoint section="Surfaces" subtitle="Cards, banners, and code blocks" viewport="700x320"
 */
export function Card(props: CardProps): React.ReactElement;
