import React, { useState, useCallback, FC } from "react";
import { useDrag } from "react-dnd";
import classnames from "classnames";

import { ITileProps, Tile as BaseTile } from "../atoms/Tile";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { put, selectMoves } from "../../features/game/gameSlice";
/*
 * @description - DnD Wrapper-Component for Gameboard tiles
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
  classNames = "",
}) => {
  const moves = useAppSelector(selectMoves);
  const canDrag = useCallback(() => moves > 2, [moves]);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "all",
    item: { color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // canDrag, //seems to be having problems with react lifecycle
  }));

  return (
    <div
      ref={dragPreview}
      className="inline-flex"
      style={{
        backgroundColor: "rgb(color.r, color.g, color.b)",
        width: "1.75rem",
        height: "1.75rem",
      }}
    >
      <div
        role="Handle"
        ref={drag}
        className="inline-flex"
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: moves > 2 ? "move" : "not-allowed",
        }}
      >
        <BaseTile classNames={classNames} x={x} y={y} color={color} />
      </div>
    </div>
  );
};
