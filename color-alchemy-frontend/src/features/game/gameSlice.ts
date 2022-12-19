import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchGame } from "./gameAPI";
import { TColor, TColorComponent } from "../../app/types";

export interface GameState {
  loading: boolean;
  userId: string | null;
  width: number | null;
  height: number | null;
  maxMoves: number | null;
  target: [TColorComponent?, TColorComponent?, TColorComponent?];
  gameBoardSources: {
    top: TColorComponent[];
    right: TColorComponent[];
    bottom: TColorComponent[];
    left: TColorComponent[];
  };
  gameBoardTiles: [[TColorComponent?]];
  closestColorTile: [number, number];
}

const initialState: GameState = {
  loading: true,
  userId: null,
  width: null,
  height: null,
  maxMoves: null,
  gameBoardSources: {
    top: [],
    right: [],
    bottom: [],
    left: [],
  },
  gameBoardTiles: [[]],
  target: [],
  closestColorTile: [0, 0],
};

export const fetchGameAsync = createAsyncThunk(
  "game/fetchGame",
  async (userId: string): Promise<Partial<GameState>> => {
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
      state.maxMoves! -= 1;
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

export default gameSlice.reducer;
