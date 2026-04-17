import React from "react";
import { Link } from "react-router";

import { useInjectSlice } from "../../store/injectSlice";
import { useAppSelector } from "../../store/hooks";
import { productListSlice, SLICE_NAME, type ProductListState } from "./slice";

const ProductList = React.memo(() => {
  useInjectSlice(productListSlice);

  const productList: ProductListState = useAppSelector(
    (state) => state[SLICE_NAME],
  );

  return (
    <section className="product-list">
      <h2>Product List</h2>
      {productList ? <h3>Product List Page {productList.name}</h3> : ""}
      <article>
        <p>
          <Link to="bike">Bike</Link>
        </p>
        <p>
          <Link to="motobike">Moto Bike</Link>
        </p>
      </article>
    </section>
  );
});

export default ProductList;
