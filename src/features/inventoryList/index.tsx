import React from "react";
import { Link } from "react-router";

import { useInjectSlice } from "../../store/injectSlice";
import { useAppSelector } from "../../store/hooks";

import { inventoryListSlice, SLICE_NAME } from "./slice";

const InventoryList = React.memo(() => {
  useInjectSlice(inventoryListSlice);

  const inventoryList = useAppSelector((state) => state[SLICE_NAME]);

  return (
    <section className="app-section">
      <h2>Inventory List (Injected Slice)</h2>
      {inventoryList ? <h3>Injected Slice {inventoryList.name}!</h3> : ""}
      <article>
        <p>
          <Link to="import">Import</Link>
        </p>
        <p>
          <Link to="export">Export</Link>
        </p>
      </article>
    </section>
  );
});

export default InventoryList;
