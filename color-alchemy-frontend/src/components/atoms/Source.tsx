import React, { FC } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectMoves, step, initStep } from "../../features/game/gameSlice";
import { Tile } from "./Tile";
import { TColor, TSourceDim } from "../../app/types";

interface ISourceProps {
  color: TColor;
  x: TSourceDim;
  y: number;
}

/*
 * @description - Base Component for Sources
 * @param color - the current color of the source
 * @returns the React Component Markup
 */
export const Source: FC<ISourceProps> = ({
  color = { r: 0, g: 0, b: 0 },
  x,
  y,
}) => {
  const moves = useAppSelector(selectMoves);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    if (moves < 3) {
      dispatch(step());
      dispatch(
        initStep({
          sourceDim: x,
          sourceIdx: y,
        })
      );
    }
  };

  return (
    <div className="inline-flex" onClick={clickHandler}>
      <Tile color={color} classNames="!rounded-full" />
    </div>
  );
};
