import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const SLICE_NAME = "inventoryList";

// Define a type for the slice state
export interface InventoryListState {
  name: string;
}

// Define the initial state using that type
const initialState: InventoryListState = {
  name: "Inventory Listing",
};

export const inventoryListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setName } = inventoryListSlice.actions;

export default inventoryListSlice.reducer;
