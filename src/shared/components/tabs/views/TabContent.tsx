import React from "react";
import { useTabs } from "../context";

const TabContent = React.memo(() => {
  const { sources, activeKey } = useTabs();
  const activeTab = sources.find((tab) => tab.key === activeKey);

  if (!activeTab) return null;

  return <div className="tabs__content">{activeTab.content}</div>;
});

export default TabContent;
