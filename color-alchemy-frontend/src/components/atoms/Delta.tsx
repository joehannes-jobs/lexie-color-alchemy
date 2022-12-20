import React, { FC } from "react";

import { H2 } from "./Heading";
import { useAppSelector } from "../../app/hooks";
import { selectGameDelta } from "../../features/game/gameSlice";

export const Delta: FC = () => {
  const delta = useAppSelector(selectGameDelta);

  return <H2 label="&Delta; " prop={`${delta}%`} />;
};
