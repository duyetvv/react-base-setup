import React from "react";

import { useAppSelector } from "../../store/hooks";
import { useInjectSlice } from "../../store/injectSlice";

import { examplesSlice, SLICE_NAME } from "./slice";
import { NavLink } from "react-router";

const Examples = React.memo(() => {
  useInjectSlice(examplesSlice);

  const examplesData = useAppSelector((state) => state[SLICE_NAME]);

  return (
    <section className="app-section">
      <h2>Customers Page </h2>
      {<h3>Injected Slice {examplesData ? examplesData.name : ""}!</h3>}
      <ul>
        <li>
          <NavLink to={"context-api"}>Context API</NavLink>
        </li>
        <li>
          <NavLink to={"async-thunk"}>Async Thunk</NavLink>
        </li>
        <li>
          <NavLink to={"components"}>Components</NavLink>
        </li>
      </ul>
    </section>
  );
});

export default Examples;
