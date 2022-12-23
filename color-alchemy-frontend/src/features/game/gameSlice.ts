import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchGame } from "./gameAPI";
import { delta, bleed, shine, isShiny } from "../../app/utils";
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
      const {
        i,
        j,
        x,
        y,
      }: { color?: TColor; i?: number; j?: number; x: TSourceDim; y: number } =
        action.payload;
      const shiningColors: (TColor[] | null)[] = [];
      let {
        color,
      }: { color?: TColor; i?: number; j?: number; x: TSourceDim; y: number } =
        action.payload;

      if (
        typeof color === "undefined" &&
        typeof i === "number" &&
        typeof j === "number"
      ) {
        color = state.gameBoardTiles[i][j];
      }

      switch (x) {
        case "top":
          shiningColors.push(
            state.gameBoardSources["left"].map((c, i, arr: TColor[]) =>
              isShiny(c) ? bleed(c, i, arr.length) : c
            ),
            state.gameBoardSources["right"].map((c, i, arr: TColor[]) =>
              isShiny(c) ? bleed(c, arr.length - 1 - i, arr.length) : c
            ),
            isShiny(state.gameBoardSources["bottom"][y])
              ? state.gameBoardTiles
                  .map((cRow, i, arr) =>
                    bleed(state.gameBoardSources["bottom"][y], i, arr.length)
                  )
                  .reverse()
              : null
          );

          state.gameBoardTiles.forEach((_, i, arr) => {
            state.gameBoardTiles[i][y] = shine(
              bleed(color!, i, arr.length),
              ...shiningColors
                .filter((shinyArr) => !!shinyArr)
                .map(
                  (shinyArr) =>
                    shinyArr?.at(i) || ({ r: 0, g: 0, b: 0 } as TColor)
                )
            );
          });
          break;
        case "bottom":
          shiningColors.push(
            state.gameBoardSources["left"].map((c, i, arr: TColor[]) =>
              isShiny(c) ? bleed(c, i, arr.length) : c
            ),
            state.gameBoardSources["right"].map((c, i, arr: TColor[]) =>
              isShiny(c) ? bleed(c, arr.length - 1 - i, arr.length) : c
            ),
            isShiny(state.gameBoardSources["top"][y])
              ? state.gameBoardTiles
                  .map((c, i, arr) =>
                    bleed(state.gameBoardSources["top"][y], i, arr.length)
                  )
                  .reverse()
              : null
          );

          [...state.gameBoardTiles].forEach((_, i, arr) => {
            state.gameBoardTiles[arr.length - 1 - i][y] = shine(
              bleed(color!, i, arr.length),
              ...shiningColors
                .filter((shinyArr) => !!shinyArr)
                .map(
                  (shinyArr) =>
                    shinyArr?.at(i) || ({ r: 0, g: 0, b: 0 } as TColor)
                )
            );
          });
          break;
        case "left":
          shiningColors.push(
            isShiny(state.gameBoardSources["right"][y])
              ? state.gameBoardTiles[y]
                  .map((c, i, arr: TColor[]) =>
                    bleed(state.gameBoardSources["right"][y], i, arr.length)
                  )
                  .reverse()
              : null,
            state.gameBoardSources["top"].map((c) =>
              isShiny(c) ? bleed(c, y, state.gameBoardTiles.length) : c
            ),
            state.gameBoardSources["bottom"].map((c) =>
              isShiny(c) ? bleed(c, y, state.gameBoardTiles.length) : c
            )
          );

          state.gameBoardTiles[y].forEach((_, i, arr) => {
            state.gameBoardTiles[y][i] = shine(
              bleed(color!, i, arr.length),
              ...shiningColors
                .filter((shinyArr) => Boolean(shinyArr))
                .map((shinyArr) => shinyArr![i])
            );
          });
          break;
        case "right":
          shiningColors.push(
            isShiny(state.gameBoardSources["left"][y])
              ? state.gameBoardTiles[y]
                  .map((c, i, arr: TColor[]) =>
                    bleed(state.gameBoardSources["left"][y], i, arr.length)
                  )
                  .reverse()
              : null,
            state.gameBoardSources["top"].map((c) =>
              isShiny(c) ? bleed(c, y, state.gameBoardTiles.length) : c
            ),
            state.gameBoardSources["bottom"].map((c) =>
              isShiny(c) ? bleed(c, y, state.gameBoardTiles.length) : c
            )
          );

          state.gameBoardTiles[y].forEach((_, i, arr) => {
            state.gameBoardTiles[y][i] = shine(
              bleed(color!, arr.length - 1 - i, arr.length),
              ...shiningColors
                .filter((shinyArr) => Boolean(shinyArr))
                .map((shinyArr) => shinyArr![i])
            );
          });
          break;
        default:
          console.warn("Error: Couldn't detect dimension of row/col", x);
      }
    },
    put: (state, action) => {
      const { i, j, x, y }: { i: number; j: number; x: TSourceDim; y: number } =
        action.payload;

      state.gameBoardSources[x][y] = state.gameBoardTiles[i][j] as TColor;
    },
    deltaCheck: (state, action) => {
      const { x, y }: { x: TSourceDim; y: number } = action.payload;
      const [ox, oy]: [number, number] = state.closestColorTile;

      if (
        state.delta !==
        delta(state.gameBoardTiles[ox][oy], {
          r: state.target[0] ?? 0,
          g: state.target[1] ?? 0,
          b: state.target[2] ?? 0,
        })
      ) {
        state.delta = 100;

        state.gameBoardTiles.forEach((tileRow, i) => {
          tileRow.forEach((c, j) => {
            const d = delta(c, {
              r: state.target[0] ?? 255,
              g: state.target[1] ?? 255,
              b: state.target[2] ?? 255,
            });

            if (d < state.delta) {
              state.delta = d as TRange<0, 101>;
              state.closestColorTile = [i, j];
            }
          });
        });
      }

      switch (x) {
        case "top":
        case "bottom":
          state.gameBoardTiles.forEach((tileRow, i) => {
            const d = delta(tileRow[y], {
              r: state.target[0] ?? 255,
              g: state.target[1] ?? 255,
              b: state.target[2] ?? 255,
            });

            if (d < state.delta) {
              state.delta = d as TRange<0, 101>;
              state.closestColorTile = [i, y];
            }
          });
          break;
        case "left":
        case "right":
          state.gameBoardTiles[y].forEach((tile, i) => {
            const d = delta(tile, {
              r: state.target[0] ?? 255,
              g: state.target[1] ?? 255,
              b: state.target[2] ?? 255,
            });

            if (d < state.delta) {
              state.delta = d as TRange<0, 101>;
              state.closestColorTile = [y, i];
            }
          });
          break;
      }
    },
    reset: (state) => {
      state.delta = 100;
      state.closestColorTile = [0, 0];
      state.maxMoves = Infinity;
      state.target = [255, 255, 255];
      state.steps = 0;
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

export const { step, init, initStep, put, calculate, deltaCheck, reset } =
  gameSlice.actions;

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
