import React from "react";
import { useParams } from "react-router";

import { useAppSelector } from "../../store/hooks";
import { useInjectSlice } from "../../store/injectSlice";

import {
  productDetailsSlice,
  SLICE_NAME,
  type ProductDetailsState,
} from "./slice";

const ProductDetails = React.memo(() => {
  const { id } = useParams();

  useInjectSlice(productDetailsSlice);

  const productDetails: ProductDetailsState = useAppSelector(
    (state) => state[SLICE_NAME],
  );

  return (
    <section className="app-section">
      <h2>Product Details </h2>
      {productDetails ? (
        <h3>
          Injected Slice {productDetails.name} at {id && id}!
        </h3>
      ) : (
        ""
      )}
    </section>
  );
});

export default ProductDetails;
