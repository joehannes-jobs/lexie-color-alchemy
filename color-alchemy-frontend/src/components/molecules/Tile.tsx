import React, { FC } from "react";
import { useDrag } from "react-dnd";

import { ITileProps, Tile as BaseTile } from "../atoms/Tile";
import { useAppSelector } from "../../app/hooks";
import { selectMoves } from "../../features/game/gameSlice";

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
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "all",
    item: { x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={moves > 2 ? dragPreview : null}
      className="inline-flex"
      style={{
        backgroundColor: "rgb(color.r, color.g, color.b)",
        width: "1.75rem",
        height: "1.75rem",
      }}
    >
      <div
        role="Handle"
        ref={moves > 2 ? drag : null}
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
