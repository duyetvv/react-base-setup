import React from "react";
import "./styles.scss";
import { NavLink } from "react-router";

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Product", path: "/product" },
  { label: "Inventory", path: "/inventory" },
  { label: "Examples", path: "/examples" },
];

const TopMenu: React.FC = () => {
  return (
    <nav className="top-menu">
      <div className="top-menu__container">
        <ul className="top-menu__list">
          {MENU_ITEMS.map((item) => (
            <li key={item.label} className="top-menu__item">
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  [
                    "top-menu__link",
                    isPending ? "pending" : isActive ? "active" : "",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TopMenu;
