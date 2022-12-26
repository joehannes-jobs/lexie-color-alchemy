import React, { FC } from "react";

import { H2 } from "../atoms/Heading";
import { useAppSelector } from "../../app/hooks";
import { selectGameDelta } from "../../features/game/gameSlice";

/**
 * @description a heading sub-component for displaying game delta
 * @date 12/26/2022 - 2:06:40 PM
 *
 * @returns the rendered react component
 */
export const Delta: FC = () => {
  const delta = useAppSelector(selectGameDelta);

  return <H2 label="&Delta; " prop={`${delta}%`} />;
};
