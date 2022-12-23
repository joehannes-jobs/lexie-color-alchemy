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
  reset,
  init,
} from "../../features/game/gameSlice";
import { TColor, TColorComponent } from "../../app/types";
import { GameBoard } from "components/molecules/Gameboard";

export const Game = () => {
  const {
    userId,
    width: w,
    height: h,
    target: targetColor,
    maxMoves: moves,
    steps,
    delta,
  }: Partial<IGameState> = useAppSelector(selectGame);
  const closestColor = useAppSelector(selectClosestColor);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGameAsync(userId));
  }, []);

  useEffect(() => {
    let retry = false;

    if (delta <= 10) {
      retry = window.confirm(`Delta at ${delta}%! You won! Wanna play again??`);
    } else if (Number(moves) <= Number(steps)) {
      retry = window.confirm(
        `You used all available steps: You lost! Wanna play again??`
      );
    }

    if (retry) {
      dispatch(reset());
      dispatch(fetchGameAsync(userId));
      dispatch(init());
    }
  }, [delta, moves, steps]);

  return (
    <div className="flex flex-col justify-start gap-4">
      <header className="inline-flex flex-col leading-810 gap-4">
        <Title />
        <UserHeading userId={userId as unknown as Pick<IGameState, "userId">} />
        <MovesHeading
          maxMoves={moves as unknown as Pick<IGameState, "maxMoves">}
          steps={steps as unknown as Pick<IGameState, "steps">}
        />
        <TargetHeading
          targetColor={{
            r: targetColor[0] ?? 0,
            g: targetColor[1] ?? 0,
            b: targetColor[2] ?? 0,
          }}
        />
        <ClosestColorHeading closestColor={closestColor as TColor} />
      </header>
      <main className="inline-flex">
        <GameBoard />
      </main>
    </div>
  );
};
