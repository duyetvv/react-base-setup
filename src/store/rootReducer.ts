import { combineSlices, type Slice } from "@reduxjs/toolkit";

import { appSlice } from "../app/slice";


export interface LazyLoadedSlices {
  [key: string]: Slice;
}
/**
 * Registry to prevent duplicate injection
 */
export const injectedSlices = new Map<string, boolean>();

export const rootReducer =
  combineSlices(appSlice).withLazyLoadedSlices<LazyLoadedSlices>();
