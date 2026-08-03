import * as React from "react";

export interface AvatarProps {
  /** Image URL. Falls back to initials from `name`. */
  src?: string;
  /** Used for initials and alt text. */
  name?: string;
  /** Pixel diameter. @default 36 */
  size?: number;
  /** Status dot. */
  status?: "online" | "busy" | "away" | null;
  /** Burgundy brand fill for the Augment identity. @default false */
  brand?: boolean;
  style?: React.CSSProperties;
}

/** Identity primitive: image, initials, or brand fill. */
export function Avatar(props: AvatarProps): React.ReactElement;
