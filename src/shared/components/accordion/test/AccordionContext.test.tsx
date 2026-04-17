import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { AccordionProvider, useAccordion } from "../Accordion.context";

describe("AccordionContext", () => {
  it("useAccordion throws error outside provider", () => {
    const TestComponent = () => {
      useAccordion();
      return <div>Test</div>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useAccordion must be used within an AccordionProvider",
    );
  });

  it("provides initial state", () => {
    const TestComponent = () => {
      const { activeIndex } = useAccordion();
      return <div>Active: {String(activeIndex)}</div>;
    };

    render(
      <AccordionProvider>
        <TestComponent />
      </AccordionProvider>,
    );

    expect(screen.getByText("Active: null")).toBeInTheDocument();
  });

  it("toggles active index", () => {
    const TestComponent = () => {
      const { activeIndex, toggleAccordion } = useAccordion();
      return (
        <div>
          <div>Active: {String(activeIndex)}</div>
          <button onClick={() => toggleAccordion(0)}>Toggle 0</button>
          <button onClick={() => toggleAccordion(1)}>Toggle 1</button>
        </div>
      );
    };

    render(
      <AccordionProvider>
        <TestComponent />
      </AccordionProvider>,
    );

    expect(screen.getByText("Active: null")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle 0"));
    expect(screen.getByText("Active: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle 0"));
    expect(screen.getByText("Active: null")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Toggle 1"));
    expect(screen.getByText("Active: 1")).toBeInTheDocument();
  });
});
