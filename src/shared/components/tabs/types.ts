import React from "react";

export type TabKey = string;

export interface TabSource {
  key: TabKey;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsContainerProps {
  sources: TabSource[];
  activeKey: TabKey;
  onChange: (key: TabKey) => void;
}

export interface TabsContextType extends Omit<TabsContainerProps, "children"> {}
