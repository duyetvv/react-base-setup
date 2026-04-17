import { BrowserRouter, Route, Routes } from "react-router";

import WithTopMenu from "../shared/themes/WithTopMenu";

import Home from "../features/home";
import ProductList from "../features/productList";
import ProductDetails from "../features/productDetails";
import InventoryList from "../features/inventoryList";
import InventoryProduct from "../features/inventoryDetails";
import Examples from "../features/examples";

import ContextAPIExamples from "../features/examples/ContextAPI";
import AsyncThunkExample from "../features/examples/AsyncThunk";
import ComponentsExample from "../features/examples/Components";

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithTopMenu />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="product">
            <Route index element={<ProductList />} />
            <Route path=":id" element={<ProductDetails />} />
          </Route>
          <Route path="inventory">
            <Route index element={<InventoryList />} />
            <Route path=":id" element={<InventoryProduct />} />
          </Route>
          <Route path="examples">
            <Route index element={<Examples />} />
            <Route path="context-api" element={<ContextAPIExamples />} />
            <Route path="async-thunk" element={<AsyncThunkExample />} />
            <Route path="components" element={<ComponentsExample />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
