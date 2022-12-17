import * as R from "ramda";

import { TColor, TColorComponent } from "./types";


/**
 * Calculates the delta of 2 colors, respectively of all its 3 (rgb) color components
 * @param color1
 * @param color2
 * @returns percentage of difference of 2 colors
 */
export const delta = ({ r: r1, g: g1, b: b1 }: TColor, { r: r2, g: g2, b: b2 }: TColor): number => {
  return (1 / 255) * (1 / Math.sqrt(3)) * Math.sqrt((r1 - r2) ^ 2 + (g1 - g2) ^ 2 + (b1 - b2) ^ 2);
}

/**
 * Calculates a new color via shining/blending various colors together additively
 * @param c - base color
 * @param rest - shined colors array
 * @returns the calculated compound color
 */
export const shined = (c: TColor, ...rest: TColor[]): TColor => {
  const comp = (component: keyof (TColor)) =>
    rest.reduce((acc: number, cur: TColor) => acc + cur[component], c[component]);
  const r = comp("r");
  const g = comp("g");
  const b = comp("b");
  const f = 255 / Math.max(r, g, b, 255);

  return {
    r: (r * f) as TColorComponent,
    g: (g * f) as TColorComponent,
    b: (b * f) as TColorComponent,
  }
}
