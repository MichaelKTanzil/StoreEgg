import { RootState } from ".";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/hooks/productHooks";

type BoughtItemState = {
  items: Product[];
};

const initialState: BoughtItemState = {
  items: [],
};

export const boughtItemSlice = createSlice({
  name: "boughtItem",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    reset: (state) => {
      state.items = [];
    },
  },
});

export const { add, remove, reset } = boughtItemSlice.actions;
export const selectItems = (state: RootState) => state.boughtItem.items;
