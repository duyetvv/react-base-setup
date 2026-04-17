import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  asyncActionsFunc,
  selectAsyncData,
  selectAsyncErrors,
  selectAsyncStatus,
} from "./slice";

export const useGetProvince = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncActionsFunc({}));
  }, [dispatch]);

  const status = useAppSelector(selectAsyncStatus);
  const data = useAppSelector(selectAsyncData);
  const errors = useAppSelector(selectAsyncErrors);

  return { status, data, errors };
};
