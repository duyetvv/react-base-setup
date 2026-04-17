import { createSlice } from "@reduxjs/toolkit";

export const SLICE_NAME = "hoinventoryDetailsme";

// Define a type for the slice state
export interface InventoryProductState {
  name: string;
}

// Define the initial state using that type
const initialState: InventoryProductState = {
  name: "Inventory Details",
};

export const inventoryDetailsSlice = createSlice({
  name: SLICE_NAME,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.productList.value

export default inventoryDetailsSlice.reducer;
