import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchGame } from "./gameAPI";
import { TRange, TColor, TColorComponent } from "../../app/types";

export interface IGameState {
  loading: boolean;
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: [TColorComponent?, TColorComponent?, TColorComponent?];
  gameBoardSources: {
    top: TColorComponent[];
    right: TColorComponent[];
    bottom: TColorComponent[];
    left: TColorComponent[];
  };
  gameBoardTiles: [[TColor?]];
  closestColorTile: [number, number];
  delta: TRange<0, 101>;
}

const initialState: IGameState = {
  loading: true,
  userId: "",
  width: 0,
  height: 0,
  maxMoves: Infinity,
  gameBoardSources: {
    top: [],
    right: [],
    bottom: [],
    left: [],
  },
  gameBoardTiles: [[]],
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
    step: (state) => {
      state.maxMoves -= 1;
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

export const { step } = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;
export const selectClosestTile = (state: RootState) =>
  state.game.closestColorTile;
export const selectGameDelta = (state: RootState) => state.game.delta;
export const selectClosestColor = (state: RootState) => {
  const [x, y] = state.game.closestColorTile;

  return state.game.gameBoardTiles[x][y];
};

export default gameSlice.reducer;
