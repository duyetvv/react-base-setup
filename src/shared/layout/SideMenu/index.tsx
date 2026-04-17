import React from "react";

import "./styles.scss";

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Product", path: "/product" },
  { label: "Inventory", path: "/inventory" },
  { label: "Customer", path: "/customer" },
  { label: "Services", path: "/services" },
];

const SideMenu: React.FC = () => {
  return (
    <aside className="side-menu">
      <nav className="side-menu__nav">
        <ul className="side-menu__list">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className="side-menu__item">
              <a href={item.path} className="side-menu__link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;