import React, { useState, useEffect, FC } from "react";
import classnames from "classnames";

import {
  Title,
  UserHeading,
  MovesHeading,
  TargetHeading,
  ClosestColorHeading,
} from "../molecules/Heading";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchGameAsync,
  step,
  selectGame,
  selectClosestColor,
  IGameState,
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
  }: Partial<IGameState> = useAppSelector(selectGame);
  const closestColor = useAppSelector(selectClosestColor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGameAsync(userId));
  }, []);

  return (
    <main className="inline-flex flex-col mx-auto leading-810 gap-2">
      <Title />
      <UserHeading userId={userId as unknown as Pick<IGameState, "userId">} />
      <MovesHeading
        maxMoves={moves as unknown as Pick<IGameState, "maxMoves">}
      />
      <TargetHeading
        targetColor={{
          r: targetColor[0] ?? 0,
          g: targetColor[1] ?? 0,
          b: targetColor[2] ?? 0,
        }}
      />
      <ClosestColorHeading closestColor={closestColor as TColor} />
    </main>
  );
};
