import { createSlice } from "@reduxjs/toolkit";

export const SLICE_NAME = "home";

// Define a type for the slice state
interface HomeState {
  name: string;
}

// Define the initial state using that type
const initialState: HomeState = {
  name: "Home Slice",
};

export const homeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
});

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.productList.value

export default homeSlice.reducer;
