import React, { useState, useEffect, FC } from "react";
import classnames from "classnames";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { TColor, TColorComponent } from "../../app/types";
import {
  fetchGameAsync,
  step,
  selectGame,
  selectClosestTile,
} from "../../features/game/gameSlice";

interface ITileProps {
  color: TColor;
  x?: number;
  y?: number;
  classNames?: string;
}

/*
 * @description - Base Component for Gameboard tiles
 * @param color - the current color of the tile
 * @param x - the x position of the tile
 * @param y - the y position of the tile
 * @param classNames - optional additional class names
 * @returns the React Component Markup
 */
export const Tile: FC<ITileProps> = ({
  color = { r: 0, g: 0, b: 0 },
  x = -1,
  y = -1,
  classNames: additionalClassNames = "",
}) => {
  const closestTilePos = useAppSelector(selectClosestTile);
  const [isClosest, setIsClosest] = useState(false);
  const classNames = classnames(
    "inline-block",
    {
      "border-2": isClosest,
      rounded: isClosest,
    },
    additionalClassNames
  );

  useEffect(() => {
    setIsClosest(closestTilePos[0] === x && closestTilePos[1] === y);
  }, [closestTilePos, x, y]);

  return (
    <div
      className={classNames}
      style={{
        backgroundColor: `rgb(
          ${color.r as number},
          ${color.g as number},
          ${color.b as number}
        )`,
      }}
    >
      &nbsp;
    </div>
  );
};
