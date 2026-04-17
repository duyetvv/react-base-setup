import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../store/store";
import type { HttpCaller } from "../services/types/httpCaller";

import { generateAsyncThunk } from "./generateAsyncThunk";
import { AsyncStatus, type AsyncBaseReducer } from "../shared/types/asyncThunk";

const generateAsyncSlice = <TData, TResponse, TArgument, TApiConfig>(
  sliceName: string,
  apiUrl: string,
  httpCaller: HttpCaller,
) => {
  const initialState: AsyncBaseReducer<TData> = {
    status: AsyncStatus.idle,
    data: null,
    errors: null,
  };

  const asyncActionsFunc = generateAsyncThunk<TResponse, TArgument, TApiConfig>(
    `${sliceName}/calling${sliceName}`,
    apiUrl,
    httpCaller,
  );

  const asyncSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(asyncActionsFunc.pending, (state) => {
          state.status = AsyncStatus.pending;
          state.errors = null;
        })
        .addCase(
          asyncActionsFunc.fulfilled,
          (state, action: PayloadAction<TResponse>) => {
            state.status = AsyncStatus.fulfilled;
            state.data = action.payload;
          },
        )
        .addCase(asyncActionsFunc.rejected, (state, action) => {
          state.status = AsyncStatus.rejected;
          state.data = null;
          state.errors = action.payload;
        });
    },
  });

  // Define the initial state using that type

  // Other code such as selectors can use the imported `RootState` type
  const selectAsyncStatus = (state: RootState) => {
    if (!state[sliceName]) {
      return null;
    }

    const asyncData = state[sliceName] as any;

    debugger;

    return asyncData?.status;
  };
  const selectAsyncData = (state: RootState) => {
    if (!state[sliceName]) {
      return null;
    }

    const asyncData = state[sliceName] as any;
    debugger;

    return asyncData?.data;
  };
  const selectAsyncErrors = (state: RootState) => {
    if (!state[sliceName]) {
      return null;
    }

    const asyncData = state[sliceName] as any;
    debugger;

    return asyncData.errors;
  };

  return {
    asyncActionsFunc,
    asyncSlice,
    asyncActions: asyncSlice.actions,
    asyncReducer: asyncSlice.reducer,
    selectAsyncStatus,
    selectAsyncData,
    selectAsyncErrors,
  };
};

export default generateAsyncSlice;
