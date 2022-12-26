import React, { useEffect, FC } from "react";

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
  selectGame,
  selectClosestColor,
  IGameState,
  reset,
  init,
} from "../../features/game/gameSlice";
import { GameBoard } from "../molecules/Gameboard";

/**
 * @description composite component for assembling the game pieces
 * @date 12/26/2022 - 2:36:22 PM
 *
 * @param props - Headings params
 * @returns the rendered game component
 */
export const Game: FC = () => {
  const {
    userId,
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
  }, [delta, moves, steps, userId, dispatch]);

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
        <ClosestColorHeading closestColor={closestColor} />
      </header>
      <main className="inline-flex">
        <GameBoard />
      </main>
    </div>
  );
};
