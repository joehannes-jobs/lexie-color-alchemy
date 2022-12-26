import React, { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  init,
  selectGameBoard,
  selectTiles,
  selectSources,
} from "../../features/game/gameSlice";
import { TColor } from "../../app/types";

import { Tile } from "components/molecules/Tile";
import { Source } from "components/molecules/Source";

/**
 * @description Composite component to display tiles and sources, the gameboard
 * @date 12/26/2022 - 3:55:12 PM
 *
 * @returns the rendered gameboard
 */
export const GameBoard: FC = () => {
  const { w, h } = useAppSelector(selectGameBoard);
  const { top, right, bottom, left } = useAppSelector(selectSources);
  const tiles = useAppSelector(selectTiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (w > 0 && h > 0) {
      dispatch(init());
    }
  }, [w, h, dispatch]);

  return (
    <div className="inline-flex flex-row">
      <div className="inline-flex flex-col align-middle justify-center">
        {left.map((color: TColor, i: number) => {
          return <Source color={color} key={`left_${i}`} x="left" y={i} />;
        })}
      </div>
      <div className="inline-flex flex-col align-middle justify-center">
        <div className="inline-flex flex-row align-middle justify-center">
          {top.map((color: TColor, i: number) => {
            return <Source color={color} key={`top_${i}`} x="top" y={i} />;
          })}
        </div>
        <div className="inline-flex flex-col align-middle justify-center">
          {tiles.map((colorRow: TColor[], i: number) => {
            return (
              <div
                className="flex flex-row align-middle justify-center"
                key={`board_${i}`}
              >
                {colorRow.map((color: TColor, j: number) => {
                  return (
                    <Tile color={color} key={`board_${i}_${j}`} x={i} y={j} />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="inline-flex flex-row align-middle justify-center">
          {bottom.map((color: TColor, i: number) => {
            return (
              <Source color={color} key={`bottom_${i}`} x="bottom" y={i} />
            );
          })}
        </div>
      </div>
      <div className="inline-flex flex-col align-middle justify-center">
        {right.map((color: TColor, i: number) => {
          return <Source color={color} key={`right_${i}`} x="right" y={i} />;
        })}
      </div>
    </div>
  );
};
