// store/injectSlice.ts
import { useEffect } from "react";
import type { Slice } from "@reduxjs/toolkit";

import { rootReducer, injectedSlices } from "./rootReducer";
import { store } from "./store";

export function injectSlice(slice: Slice) {
  const path = slice.name;

  if (injectedSlices.has(path)) {
    return;
  }

  injectedSlices.set(path, true);

  // 1. Inject into reducer instance
  rootReducer.inject(slice);

  // 2. Force update store
  store.replaceReducer(rootReducer);
}

export function useInjectSlice(slice: Slice) {
  useEffect(() => {
    injectSlice(slice);
  }, [slice]);
}
