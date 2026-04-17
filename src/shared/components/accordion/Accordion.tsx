import React from "react";

import { AccordionProvider } from "./Accordion.context";

import AccordionItem from "./views/AccordionItem";
import AccordionHeader from "./views/AccordionHeader";
import AccordionPanel from "./views/AccordionPanel";

import "./styles.scss";

export const Accordion: React.FC<{ children: React.ReactNode }> & {
  Item: React.FC<any>;
  Header: React.FC<any>;
  Panel: React.FC<any>;
} = ({ children }) => {
  return (
    <AccordionProvider>
      <div className="accordion">{children}</div>
    </AccordionProvider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

