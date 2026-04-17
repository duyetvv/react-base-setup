import { createAsyncThunk, type GetThunkAPI } from "@reduxjs/toolkit";

import { isHttpError, isSuccessResponse } from "@/services/api/apiService";
import type {
  IHttpError,
  IHttpResponse,
  ISuccessResponse,
  THttpCaller,
} from "@/services/api/types";

/**
 * @file Factory utility for creating type-safe async thunks.
 *
 * Standardizes async API handling by centralizing success/error narrowing,
 * reject payload typing, and optional pre-dispatch conditions.
 */

//#region Thunk Types

/**
 * Custom configuration for `createAsyncThunk`.
 * Specifies custom types for state, reject value, and meta payloads.
 * @template TStateType The type of the Redux state.
 */
interface IApiConfig<TStateType> {
  state: TStateType;
  rejectValue: string;
  pendingMeta: unknown;
  fulfilledMeta: unknown;
  rejectedMeta: unknown;
}

/**
 * A specialized version of the `GetThunkAPI` type that uses our custom `ApiConfig`.
 * @template TStateType The type of the Redux state.
 */
type TGetThunkAPIState<TStateType> = GetThunkAPI<IApiConfig<TStateType>>;

/**
 * A function type for a selector that retrieves a loading status from the Redux state.
 * @template TStateType The type of the Redux state.
 * @param {TStateType} state The Redux state object.
 * @returns {boolean} The loading status.
 */
export type TGetStateLoading<TStateType> = (state: TStateType) => boolean;

//#endregion

/**
 * A generic factory for creating a Redux Toolkit `asyncThunk`.
 * It abstracts away the boilerplate for defining the payload creator and options,
 * making it easy to create thunks for API calls.
 *
 * @template TReturned The expected return type of the API call.
 * @template TArgument The type of the argument passed to the thunk action.
 * @template TState The type of the Redux state slice this thunk belongs to.
 * @param {string} actionTypes The action type prefix (e.g., 'pokemon/fetchPokemon').
 * @param {string} apiUrl The URL endpoint for the API call.
 * @param {THttpCaller} httpCaller The HTTP function (e.g., httpGet, httpPost) to use.
 * @returns A complete `asyncThunk` instance ready to be used in a Redux slice.
 */
export const generateAsyncThunk = <
  TResponseType extends ISuccessResponse<unknown>,
  TArgumentType,
  TApiConfigType,
>(
  actionTypes: string,
  apiUrl: string,
  httpCaller: THttpCaller,
) => {
  const payloadCreator = async (
    thunkArg: TArgumentType,
    api: TGetThunkAPIState<TApiConfigType>,
  ) => {
    const { fulfillWithValue, rejectWithValue } = api;

    try {
      /**
       * Call the HTTP method and get the response.
       * The response is shaped as IHttpResponse<TResponseType> which can be either:
       * - ISuccessResponse<TResponseType> (success case with data field)
       * - IHttpError (failure case with message field)
       */
      const response: IHttpResponse<TResponseType> = await httpCaller(
        apiUrl,
        thunkArg,
      );

      // Check if the response is an error (discriminated by presence of 'message', absence of 'data')
      if (isHttpError(response)) {
        return rejectWithValue(response.message);
      }

      // Type guard ensures the response is now ISuccessResponse<TResponseType>
      if (!isSuccessResponse(response)) {
        return rejectWithValue("Invalid API response");
      }

      // Extract and return the typed data payload (not the full response wrapper)
      return fulfillWithValue(response.data);
    } catch (err) {
      const error = err as IHttpError;
      return rejectWithValue(error.message);
    }
  };

  const options = {
    /**
     * Prepare metadata for the pending action.
     * Currently returns an empty object, but can be extended for request tracking.
     */
    getPendingMeta: () => {
      return {};
    },

    /**
     * Condition function that runs BEFORE the payload creator.
     * If it returns false, the thunk is cancelled (action not dispatched).
     *
     * Use case: Prevent duplicate API requests for the same resource.
     *
     * Current implementation: Always returns true (no deduplication).
     *
     * Future enhancement: Implement request deduplication by:
     * 1. Create a cache key from actionName + serialized thunkArg
     * 2. Check if a request for this key is already in-flight
     * 3. Return false to skip if already loading (preventing duplicates)
     *
     * See commented code below for detailed implementation notes.
     */
    condition: (): boolean => {
      return true;
      // NOTE: This is a simplistic caching mechanism. It only checks if an action with the
      // same `actionName` is currently loading. It does NOT differentiate between different
      // arguments (`thunkArg`).
      //
      // For a more robust solution inspired by RTK Query, we would need to:
      // 1. Create a unique cache key from the actionName and a serialized version of the `arg`.
      // 2. Store the loading status against this unique key.
      // 3. This would prevent duplicate requests for the same resource but allow different
      //    requests for the same action type (e.g., fetchProduct('a') and fetchProduct('b')).

      // const state = api.getState() as RootState;
      // const currLoadingState = state?.asyncRequests?.[actionTypes];

      // If no loading state is tracked for this action, proceed.
      // if (!currLoadingState) {
      //   return true;
      // }

      // Only run the thunk if not already loading.
      // return !currLoadingState?.loading;
    },
  };

  return createAsyncThunk<
    TResponseType,
    TArgumentType,
    IApiConfig<TApiConfigType>
  >(actionTypes, payloadCreator, options);
};
