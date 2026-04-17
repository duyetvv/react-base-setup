import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Accordion } from "../Accordion";
import { AccordionProvider } from "../Accordion.context";

describe("Accordion.Header", () => {
  it("renders children", () => {
    render(
      <AccordionProvider>
        <Accordion.Header index={0}>
          <div>Header Content</div>
        </Accordion.Header>
      </AccordionProvider>,
    );
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("has accordion-header class", () => {
    render(
      <AccordionProvider>
        <Accordion.Header index={0}>
          <div>Header</div>
        </Accordion.Header>
      </AccordionProvider>,
    );
    const header = screen.getByText("Header").closest(".accordion-header");
    expect(header).toBeInTheDocument();
  });

  it("toggles panel on click", () => {
    render(
      <AccordionProvider>
        <Accordion.Item index={0}>
          <Accordion.Header index={0}>
            <div>Header</div>
          </Accordion.Header>
          <Accordion.Panel index={0}>
            <div>Panel Content</div>
          </Accordion.Panel>
        </Accordion.Item>
      </AccordionProvider>,
    );

    // Initially panel is not visible
    expect(screen.queryByText("Panel Content")).not.toBeInTheDocument();

    // Click header
    const header = screen.getByText("Header");
    fireEvent.click(header);

    // Panel should be visible
    expect(screen.getByText("Panel Content")).toBeInTheDocument();

    // Click again to close
    fireEvent.click(header);
    expect(screen.queryByText("Panel Content")).not.toBeInTheDocument();
  });
});