import { TColor, TColorComponent } from "./types";

/**
 * Calculates the delta of 2 colors, respectively of all its 3 (rgb) color components
 * @param color1
 * @param color2
 * @returns percentage of difference of 2 colors
 */
export const delta = (
  { r: r1, g: g1, b: b1 }: TColor,
  { r: r2, g: g2, b: b2 }: TColor
): number => {
  return (
    Math.round(
      (1 / 255) *
        (1 / Math.sqrt(3)) *
        Math.sqrt(
          Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
        ) *
        10000
    ) / 100
  );
};

/**
 * @description Calculates a new color via shining/blending various colors together additively
 * @param c - base color
 * @param rest - shined colors array
 * @returns the calculated compound color
 */
export const shine = (c: TColor, ...rest: TColor[]): TColor => {
  const comp = (component: keyof TColor) =>
    rest.length
      ? rest.reduce((acc: number, cur: TColor) => {
          return acc + cur[component];
        }, c[component])
      : c[component];

  const r = comp("r");
  const g = comp("g");
  const b = comp("b");
  const f = 255 / Math.max(r, g, b, 255);

  return {
    r: (r * f) as TColorComponent,
    g: (g * f) as TColorComponent,
    b: (b * f) as TColorComponent,
  };
};

/**
 * @description checks if a color is shiny regarding the additive color space
 * @param c - color
 * @returns true or false, wether full black or not (wether will influence at all if shined)
 */
export const isShiny = (c: TColor): boolean => {
  const { r, g, b } = c;

  return !(r === 0 && g === 0 && b === 0);
};

/**
 * @param baseColor - the gameboards tile to be bleeded/shined
 * @param i - the index pos of baseColor in the current row/col of the gameboard
 * @param len - the length of the cur row/col of the gameboard
 * @returns bleeded baseColor (according to tiles' index)
 */
export const bleed = (baseColor: TColor, i: number, len: number): TColor => {
  return {
    r: ((baseColor.r * (len + 1 - i)) / (len + 1)) as TColorComponent,
    g: ((baseColor.g * (len + 1 - i)) / (len + 1)) as TColorComponent,
    b: ((baseColor.b * (len + 1 - i)) / (len + 1)) as TColorComponent,
  };
};
