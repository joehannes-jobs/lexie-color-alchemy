import React, { FC } from "react";

import { Tile } from "./Tile";
import { TColor } from "../../app/types";

interface ISourceProps {
  color: TColor;
}

/*
 * @description - Base Component for Sources
 * @param color - the current color of the source
 * @returns the React Component Markup
 */
export const Source: FC<ISourceProps> = ({ color = { r: 0, g: 0, b: 0 } }) => {
  return <Tile color={color} classNames="!rounded-full" />;
};
