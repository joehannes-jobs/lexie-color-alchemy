import React, { FC, useMemo } from "react";
import { useDrop } from "react-dnd";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectMoves,
  deltaCheck,
  step,
  initStep,
  put,
  calculate,
} from "../../features/game/gameSlice";
import {
  ISourceProps as IBaseSourceProps,
  Source as BaseSource,
} from "../atoms/Source";
import { TColor, TSourceDim } from "../../app/types";

interface ISourceProps extends IBaseSourceProps {
  x: TSourceDim;
  y: number;
}

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
  const memoCanDrop = useMemo(() => moves > 2, [moves]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "all",
    drop: ({ x: i, y: j }: { x: number; y: number }, monitor) => {
      /* this lib doesn't respect react lifecycle somehow! arghhh!
      if (!canDrop) {
        console.warn("Cannot drop during initial 3 steps!");
        return;
      }*/
      const payload: { i: number; j: number; x: TSourceDim; y: number } = {
        x,
        y,
        i,
        j,
      };
      dispatch(step());
      dispatch(put(payload));
      dispatch(calculate(payload));
      dispatch(deltaCheck({ x, y }));
    },
    //canDrop: (item, monitor) => moves > 2, //seems to be havinga problem with react lifecycle
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: memoCanDrop,
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
      dispatch(
        calculate({
          color: {
            r: moves === 0 ? 255 : 0,
            g: moves === 1 ? 255 : 0,
            b: moves === 2 ? 255 : 0,
          },
          x,
          y,
        })
      );
      dispatch(deltaCheck({ x, y }));
    }
  };

  return (
    <div
      className="inline-flex"
      onClick={clickHandler}
      ref={drop}
      style={{
        opacity: isOver ? 0.5 : 1,
        cursor: moves > 2 ? "default" : "pointer",
      }}
    >
      <BaseSource color={color} />
    </div>
  );
};
