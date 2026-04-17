import React from "react";
import { Outlet } from "react-router";

import Footer from "../layout/Footer";
import TopMenu from "../layout/TopMenu";

const WithTopMenu = React.memo(() => {
  return (
    <main className="main">
      <TopMenu />
      <Outlet />
      <Footer />
    </main>
  );
});

export default WithTopMenu;
