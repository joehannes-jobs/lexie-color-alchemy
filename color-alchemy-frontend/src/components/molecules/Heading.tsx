import React, { FC } from "react";
import { GameState } from "../../features/game/gameSlice";
import { H1, H2 } from "../atoms/Heading";

interface IUserHeadingProps {
  userId: Pick<GameState, "userId"> & string;
}

interface IMovesHeadingProps {
  maxMoves: Pick<GameState, "userId"> & string;
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
