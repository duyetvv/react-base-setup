import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Accordion } from "../Accordion";
import { AccordionProvider } from "../Accordion.context";

describe("Accordion.Panel", () => {
  it("renders children when active", () => {
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

    // Click header to activate
    const header = screen.getByText("Header");
    fireEvent.click(header);

    expect(screen.getByText("Panel Content")).toBeInTheDocument();
  });

  it("does not render children when not active", () => {
    render(
      <AccordionProvider>
        <Accordion.Panel index={0}>
          <div>Panel Content</div>
        </Accordion.Panel>
      </AccordionProvider>,
    );
    expect(screen.queryByText("Panel Content")).not.toBeInTheDocument();
  });

  it("has accordion-panel class when rendered", () => {
    render(
      <AccordionProvider>
        <Accordion.Item index={0}>
          <Accordion.Header index={0}>
            <div>Header</div>
          </Accordion.Header>
          <Accordion.Panel index={0}>
            <div>Panel</div>
          </Accordion.Panel>
        </Accordion.Item>
      </AccordionProvider>,
    );

    const header = screen.getByText("Header");
    fireEvent.click(header);

    const panel = screen.getByText("Panel").closest(".accordion-panel");
    expect(panel).toBeInTheDocument();
  });
});
