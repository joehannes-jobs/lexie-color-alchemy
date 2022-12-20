import React, { FC } from "react";
import { GameState } from "../../features/game/gameSlice";
import { TColor } from "../../app/types";
import { H1, H2 } from "../atoms/Heading";
import { Tile } from "../atoms/Tile";
import { Delta } from "../atoms/Delta";

interface IUserHeadingProps {
  userId: Pick<GameState, "userId"> & string;
}

interface IMovesHeadingProps {
  maxMoves: Pick<GameState, "userId"> & string;
}

interface ITargetHeadingProps {
  targetColor: TColor;
}
/*
 * @description a concrete RGB Alchemy Heading wrapper
 * @returns a simple Heading React component
 */
export const Title: FC = () => <H1 title="RGB Alchemy" />;

/*
 * @description a concrete Heading wrapper
 * @param userId - the current users' ID
 * @returns a simple Heading React component
 */
export const UserHeading: FC<IUserHeadingProps> = ({ userId }) => (
  <H2 label="User ID:" prop={userId} />
);

/*
 * @description a concrete Heading wrapper
 * @param maxMoves - the number of moves left, initially maxMoves
 * @returns a simple Heading React component
 */
export const MovesHeading: FC<IMovesHeadingProps> = ({ maxMoves }) => (
  <H2 label="Moves left:" prop={maxMoves} />
);

/*
 * @description a concrete Heading wrapper
 * @param targetColor - the current games' target color
 * @returns a simple Heading React component
 */
export const TargetHeading: FC<ITargetHeadingProps> = ({ targetColor }) => (
  <H2 label="Target color ">
    <Tile color={targetColor} />
    <Delta />
  </H2>
);
