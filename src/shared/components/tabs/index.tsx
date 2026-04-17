import React, { useState } from "react";

import TabNav from "./views/TabNav";
import TabContent from "./views/TabContent";
import { TabsContext } from "./context";

import { type TabsContainerProps } from "./types";

const Tabs: React.FC<TabsContainerProps> = ({ sources, activeKey }) => {
  const [activedKey, setActivedKey] = useState<string>(activeKey);

  const toggleTab = (key: string) => {
    setActivedKey(key);
  };
  return (
    <TabsContext.Provider
      value={{ sources, activeKey: activedKey, onChange: toggleTab }}
    >
      <div className="tabs-container">
        <TabNav />
        <TabContent />
      </div>
    </TabsContext.Provider>
  );
};

export default Tabs;
