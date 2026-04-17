import React from "react";
import { useParams } from "react-router";

import { useInjectSlice } from "../../store/injectSlice";
import { useAppSelector } from "../../store/hooks";

import {
  inventoryDetailsSlice,
  SLICE_NAME,
  type InventoryProductState,
} from "./slice";

const InventoryProduct = React.memo(() => {
  const { id } = useParams();

  useInjectSlice(inventoryDetailsSlice);

  const inventoryDetails: InventoryProductState = useAppSelector(
    (state) => state[SLICE_NAME],
  );

  return (
    <section className="app-section">
      <h2>Inventory Details </h2>
      <h3>
        Injected Slice {inventoryDetails && inventoryDetails.name} at {id && id}
      </h3>
    </section>
  );
});

export default InventoryProduct;
