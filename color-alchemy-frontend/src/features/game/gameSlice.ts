import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchGame } from "./gameAPI";
import { delta } from "../../app/utils";
import { TRange, TColor, TColorComponent, TSourceDim } from "../../app/types";

export interface IGameState {
  loading: boolean;
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  steps: number;
  target: [TColorComponent?, TColorComponent?, TColorComponent?];
  gameBoardSources: {
    top: TColor[];
    right: TColor[];
    bottom: TColor[];
    left: TColor[];
  };
  gameBoardTiles: TColor[][];
  closestColorTile: [number, number];
  delta: TRange<0, 101>;
}

const initialState: IGameState = {
  loading: true,
  userId: "",
  width: 0,
  height: 0,
  maxMoves: Infinity,
  steps: 0,
  gameBoardSources: {
    top: [],
    right: [],
    bottom: [],
    left: [],
  },
  gameBoardTiles: [],
  target: [],
  closestColorTile: [0, 0],
  delta: 100,
};

export const fetchGameAsync = createAsyncThunk(
  "game/fetchGame",
  async (userId: string): Promise<Partial<IGameState>> => {
    const response = await fetchGame(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.json();
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    init: (state) => {
      state.gameBoardSources.top = Array(state.width).fill({
        r: 0,
        g: 0,
        b: 0,
      });
      state.gameBoardSources.right = Array(state.height).fill({
        r: 0,
        g: 0,
        b: 0,
      });
      state.gameBoardSources.bottom = Array(state.width).fill({
        r: 0,
        g: 0,
        b: 0,
      });
      state.gameBoardSources.left = Array(state.height).fill({
        r: 0,
        g: 0,
        b: 0,
      });
      state.gameBoardTiles = Array(state.height).fill(
        Array(state.width).fill({ r: 0, g: 0, b: 0 })
      );
      state.delta = delta(
        {
          r: state.target[0] as TColorComponent,
          g: state.target[1] as TColorComponent,
          b: state.target[2] as TColorComponent,
        },
        {
          r: 0,
          g: 0,
          b: 0,
        }
      ) as TRange<0, 101>;
    },
    step: (state) => {
      state.steps += 1;
    },
    initStep: (state, action) => {
      const {
        sourceDim,
        sourceIdx,
      }: { sourceDim: TSourceDim; sourceIdx: number } = action.payload;
      state.gameBoardSources[sourceDim][sourceIdx] =
        state.steps === 1
          ? { r: 255, g: 0, b: 0 }
          : state.steps === 2
          ? { r: 0, g: 255, b: 0 }
          : { r: 0, g: 0, b: 255 };
    },
    calculate: (state, action) => {
      const { x, y } = action.payload;

      if (typeof x === "string") {
        // state.gameBoardSources[x][y];
      } else {
        state.gameBoardTiles[x][y];
      }
    },
    put: (state, action) => {
      const { color, x, y }: { color: TColor; x: TSourceDim; y: number } =
        action.payload;

      state.gameBoardSources[x][y] = color;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGameAsync.fulfilled, (state, action) => {
        const { userId, width, height, maxMoves, target } = action.payload;

        state.userId = userId!;
        state.width = width!;
        state.height = height!;
        state.maxMoves = maxMoves!;
        state.target = target!;
        state.loading = false;
      })
      .addCase(fetchGameAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { step, init, initStep, put } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export const selectClosestTile = (state: RootState) =>
  state.game.closestColorTile;
export const selectGameDelta = (state: RootState) => state.game.delta;
export const selectClosestColor = (state: RootState) => {
  const [x, y] = state.game.closestColorTile;

  return state.game.gameBoardTiles.at(x)?.at(y) ?? { r: 0, g: 0, b: 0 };
};
export const selectGameBoard = (state: RootState) => ({
  w: state.game.width,
  h: state.game.height,
});
export const selectSources = (state: RootState) => state.game.gameBoardSources;
export const selectTiles = (state: RootState) => state.game.gameBoardTiles;
export const selectMoves = (state: RootState) => state.game.steps;

export default gameSlice.reducer;
