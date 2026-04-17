import React, { createContext, useContext, useState } from "react";

export interface AccordionContextType {
  activeIndex: number | null;
  toggleAccordion: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
};

export const AccordionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ activeIndex, toggleAccordion }}>
      {children}
    </AccordionContext.Provider>
  );
};
