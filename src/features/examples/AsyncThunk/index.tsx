import React from "react";
import { useInjectSlice } from "../../../store/injectSlice";
import { asyncSlice } from "./slice";
import { useGetProvince } from "./useGetProvince";
import { AsyncStatus } from "../../../shared/types/asyncThunk";

const AsyncThunkExample = React.memo(() => {
  useInjectSlice(asyncSlice);

  const { errors, data, status } = useGetProvince();

  if (status === AsyncStatus.pending) {
    return <div>Loading ... </div>;
  }

  if (errors) {
    return <div>Failure request ... </div>;
  }

  return <div>{JSON.stringify(data)}</div>;
});

export default AsyncThunkExample;
