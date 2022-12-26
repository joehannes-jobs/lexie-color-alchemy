import React, { FC } from "react";
import { IGameState } from "../../features/game/gameSlice";
import { TColor } from "../../app/types";
import { H1, H2 } from "../atoms/Heading";
import { Tile } from "../atoms/Tile";
import { Delta } from "./Delta";

interface IUserHeadingProps {
  userId: Pick<IGameState, "userId">;
}

interface IMovesHeadingProps {
  maxMoves: Pick<IGameState, "maxMoves">;
  steps: Pick<IGameState, "steps">;
}

interface ITargetHeadingProps {
  targetColor: TColor;
}

interface IClosestColorHeadingProps {
  closestColor: TColor;
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
export const MovesHeading: FC<IMovesHeadingProps> = ({ maxMoves, steps }) => (
  <H2 label="Moves left:" prop={`${Number(maxMoves) - Number(steps)}`} />
);

/*
 * @description a concrete Heading wrapper for displaying the Target Color
 * @param targetColor - the current games' target color
 * @returns a simple Heading React component
 */
export const TargetHeading: FC<ITargetHeadingProps> = ({ targetColor }) => (
  <H2 label="Target color&nbsp;">
    <Tile color={targetColor} />
  </H2>
);

/*
 * @description a concrete Heading wrapper for Displaying the closest Color & Delta
 * @param targetColor - the current games' target color
 * @returns a simple Heading React component
 */
export const ClosestColorHeading: FC<IClosestColorHeadingProps> = ({
  closestColor,
}) => (
  <H2 label="Closest color&nbsp;">
    <Tile color={closestColor ?? { r: 0, g: 0, b: 0 }} classNames="mr-2" />
    <Delta />
  </H2>
);
