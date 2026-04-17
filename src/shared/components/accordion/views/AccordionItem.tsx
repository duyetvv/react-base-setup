import React from "react";

export interface AccordionItemProps {
  children: React.ReactNode;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = React.memo(
  ({ children }) => {
    return <div className="accordion-item">{children}</div>;
  },
);

export default AccordionItem;
