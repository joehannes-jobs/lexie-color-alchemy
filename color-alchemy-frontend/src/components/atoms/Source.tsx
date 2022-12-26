import React, { FC } from "react";

import { Tile } from "./Tile";
import { TColor } from "../../app/types";

export interface ISourceProps {
  onClick?: () => void;
  color: TColor;
}

/*
 * @description - Base Component for Sources
 * @param color - the current color of the source
 * @returns the React Component Markup
 */
export const Source: FC<ISourceProps> = ({
  onClick: clickHandler = () => null,
  color = { r: 0, g: 0, b: 0 },
}) => {
  return (
    <div className="inline-flex" onClick={clickHandler}>
      <Tile color={color} classNames="!rounded-full" />
    </div>
  );
};
