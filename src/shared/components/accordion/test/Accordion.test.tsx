import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Accordion } from "../Accordion";

describe("Accordion", () => {
  it("renders children", () => {
    render(
      <Accordion>
        <div>Test Content</div>
      </Accordion>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("has accordion class", () => {
    render(
      <Accordion>
        <div>Test</div>
      </Accordion>,
    );
    const accordion = screen.getByText("Test").closest(".accordion");
    expect(accordion).toBeInTheDocument();
  });
});
