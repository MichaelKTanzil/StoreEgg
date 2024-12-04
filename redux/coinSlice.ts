import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  add as addBoughtItem,
  remove as removeBoughtItem,
  reset as resetBoughtItem,
} from "./boughtItemSlice";

type CoinState = {
  coins: number;
};

const initialState: CoinState = {
  coins: 500,
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    addCoin: (state, action) => {
      state.coins += action.payload.coin;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addBoughtItem, (state, action) => {
        const increment = action.payload.price;
        state.coins -= increment;
      })
      .addCase(removeBoughtItem, (state, action) => {
        const decrement = action.payload.price;
        state.coins += decrement;
      })
      .addCase(resetBoughtItem, (state) => {
        state.coins = 500;
      }),
});

export const { addCoin } = coinSlice.actions;
export const selectCoin = (state: RootState) => state.coinCount.coins;
export default coinSlice.reducer;
