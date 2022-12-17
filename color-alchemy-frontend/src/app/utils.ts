import * as R from "ramda";

import { TRange } from "./types";

type TColorComponent = TRange<0, 255>;
type TColor = {
  r: TColorComponent;
  g: TColorComponent;
  b: TColorComponent;
}

export const delta = ({ r: r1, g: g1, b: b1 }: TColor, { r: r2, g: g2, b: b2 }: TColor) => {
  return (1 / 255) * (1 / Math.sqrt(3)) * Math.sqrt((r1 - r2) ^ 2 + (g1 - g2) ^ 2 + (b1 - b2) ^ 2);
}
