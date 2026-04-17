import React from "react";
import { useAccordion } from "../Accordion.context";

const AccordionHeader: React.FC<{
  children: React.ReactNode;
  index: number;
}> = React.memo(({ children, index }) => {
  const { toggleAccordion } = useAccordion();
  return (
    <div className="accordion-header" onClick={() => toggleAccordion(index)}>
      {children}
    </div>
  );
});

export default AccordionHeader;
