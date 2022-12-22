import React, { FC } from "react";
import { useDrop } from "react-dnd";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectMoves,
  step,
  initStep,
  put,
} from "../../features/game/gameSlice";
import { ISourceProps, Source as BaseSource } from "../atoms/Source";
import { TColor, TSourceDim } from "../../app/types";

/*
 * @description - DnD Wrapper-Component for Sources
 * @param color - the current color of the source
 * @param x - the source row/column
 * @param y - the secondary source dimension
 * @returns the React Component Markup
 */
export const Source: FC<ISourceProps> = ({
  color = { r: 0, g: 0, b: 0 },
  x,
  y,
}) => {
  const moves = useAppSelector(selectMoves);
  const dispatch = useAppDispatch();

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "all",
    drop: (item: { color: TColor }, monitor) => {
      console.log("dropped");
      const payload: { color: TColor; x: TSourceDim; y: number } = {
        color: item.color,
        x,
        y,
      };

      dispatch(put(payload));
    },
    canDrop: (item, monitor) => moves > 2,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

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
    <div
      className="inline-flex"
      onClick={clickHandler}
      ref={drop}
      style={{
        opacity: isOver ? 0.5 : 1,
      }}
    >
      <BaseSource color={color} x={x} y={y} />
    </div>
  );
};
