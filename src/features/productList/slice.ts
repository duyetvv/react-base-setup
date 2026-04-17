import { createSlice } from "@reduxjs/toolkit";

export const SLICE_NAME = "productList";

// Define a type for the slice state
export interface ProductListState {
  name: string;
}

// Define the initial state using that type
const initialState: ProductListState = {
  name: "Product List Page",
};

export const productListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
});

// export const {} = productListSlice.actions;
export default productListSlice.reducer;
