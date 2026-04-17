import React from "react";
import { useTabs } from "../context";

const TabNav = React.memo(() => {
  const { sources, activeKey, onChange } = useTabs();

  return (
    <div className="tabs__nav">
      {sources.map((tab) => (
        <button
          key={tab.key}
          className={`tabs__tab ${tab.key === activeKey ? "tabs__tab--active" : ""}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
});

export default TabNav;
