import React, { FC, PropsWithChildren } from "react";
import { GameState } from "../../features/game/gameSlice";

interface ITitleProps {
  title: string;
}

export interface IHeadingProps {
  label: string;
  prop?:
    | string
    | number
    | (Pick<GameState, "userId" | "maxMoves"> & (string | number));
}

/*
 * @description simple header h1 wrapper title component
 * @param title - the actual title string
 * @returns the React component
 */
export const H1: FC<ITitleProps> = ({ title }) => (
  <h1 className="text-xl font-bold text-gray-800">{title}</h1>
);

/*
 * @description header h2 wrapper title component
 * @param label - the title of the heading
 * @param prop - an optional property string/number
 * @param children - optional child components
 * @returns the React component
 */
export const H2: FC<PropsWithChildren<IHeadingProps>> = ({
  label,
  prop,
  children,
}) => {
  return (
    <>
      <h2 className="inline-block text-xl text-gray-800">
        {`${label} ${prop ?? ""}`}
      </h2>
      {children ?? null}
    </>
  );
};
