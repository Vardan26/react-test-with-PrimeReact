import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Item } from "../../types";

type TableDataState = {
  items: Item[];
};

const initialState: TableDataState = {
  items: [],
};

const tableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setItems, updateItem, deleteItem } = tableDataSlice.actions;
export default tableDataSlice.reducer;
