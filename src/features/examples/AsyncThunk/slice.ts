import { httpGet } from "../../../services/httpService";
import type { RootState } from "../../../store/store";
import generateAsyncSlice from "../../../utils/generateAsyncSlice";
import type {
  Province,
  GetProvinceResponse,
  GetProvinceParams,
} from "../types/province";

const SLICE_NAME = "asyncThunkExample";

export const {
  asyncActions,
  asyncActionsFunc,
  asyncSlice,
  asyncReducer,
  selectAsyncStatus,
  selectAsyncData,
  selectAsyncErrors,
} = generateAsyncSlice<
  Province,
  GetProvinceResponse,
  GetProvinceParams,
  RootState
>(SLICE_NAME, "http://localhost:3000/provinces", httpGet);
