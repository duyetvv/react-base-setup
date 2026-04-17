import React from "react";

import { useAccordion } from "../Accordion.context";

const AccordionPanel: React.FC<{
  children: React.ReactNode;
  index: number;
}> = React.memo(({ children, index }) => {
  const { activeIndex } = useAccordion();
  
  return activeIndex === index ? (
    <div className="accordion-panel">{children}</div>
  ) : null;
});

export default AccordionPanel;
