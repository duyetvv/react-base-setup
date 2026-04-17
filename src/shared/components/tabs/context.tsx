import { createContext, useContext } from "react";
import { type TabsContextType } from "./types";

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);

export const useTabs = (): TabsContextType => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};
