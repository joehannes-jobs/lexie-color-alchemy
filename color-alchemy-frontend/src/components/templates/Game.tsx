import React, { useState, useEffect, FC } from "react";
import classnames from "classnames";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchGameAsync,
  step,
  selectGame,
  selectClosestTile,
} from "../../features/game/gameSlice";
import { TColor, TColorComponent } from "../../app/types";

export const Game = () => {
  const {
    loading,
    userId,
    width: w,
    height: h,
    maxMoves: moves,
    gameBoardTiles: tiles,
    gameBoardSources: sources,
    target: targetColor,
  } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();

  return <main></main>;
};
