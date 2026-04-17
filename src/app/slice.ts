import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  name: string;
}

const initialState: AppState = {
  name: "appSlice",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
