import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Accordion } from "../Accordion";
import { AccordionProvider } from "../Accordion.context";

describe("Accordion.Item", () => {
  it("renders children", () => {
    render(
      <AccordionProvider>
        <Accordion.Item index={0}>
          <div>Item Content</div>
        </Accordion.Item>
      </AccordionProvider>,
    );
    expect(screen.getByText("Item Content")).toBeInTheDocument();
  });

  it("has accordion-item class", () => {
    render(
      <AccordionProvider>
        <Accordion.Item index={0}>
          <div>Item</div>
        </Accordion.Item>
      </AccordionProvider>,
    );
    const item = screen.getByText("Item").closest(".accordion-item");
    expect(item).toBeInTheDocument();
  });
});
